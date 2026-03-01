#!/usr/bin/env node
/**
 * Life Vault Sync — Automated daily sync of calendar + email into the vault.
 *
 * Usage:
 *   node sync.js                  Full sync (calendar + email → daily note)
 *   node sync.js morning          Morning sync (today's schedule + inbox summary)
 *   node sync.js evening          Evening sync (tomorrow's schedule + end-of-day inbox)
 *   node sync.js --dry-run        Preview output without writing files
 *   node sync.js --no-git         Skip git commit/push
 *
 * What it does:
 *   1. Fetches today's (or tomorrow's) calendar events from all calendars
 *   2. Fetches unread/inbox emails and classifies them using email-rules
 *   3. Updates (or creates) the daily note with schedule + inbox summary
 *   4. Optionally commits and pushes to git
 *
 * Auth: Reuses tokens from google-calendar and gmail skills.
 *   - Calendar token: ~/.google-calendar-mcp/token.json
 *   - Gmail token: ~/.gmail-skill/token.json
 *   - Shared credentials: ~/.google-calendar-mcp/gcp-oauth.keys.json
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// --- Config ---
const VAULT_ROOT = path.resolve(__dirname, '../../../../');
const DAILY_DIR = path.join(VAULT_ROOT, 'daily');
const WEEKLY_DIR = path.join(VAULT_ROOT, 'planning', 'weekly');
const TIMEZONE = 'Europe/Stockholm';

const CREDENTIALS_PATH = path.join(process.env.HOME, '.google-calendar-mcp', 'gcp-oauth.keys.json');
const CALENDAR_TOKEN_PATH = path.join(process.env.HOME, '.google-calendar-mcp', 'token.json');
const GMAIL_TOKEN_PATH = path.join(process.env.HOME, '.gmail-skill', 'token.json');

// --- Auth ---
function getAuthClient(tokenPath, callbackPort) {
  if (!fs.existsSync(tokenPath)) {
    console.error(`ERROR: Token not found at ${tokenPath}. Run the auth script first.`);
    return null;
  }
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    console.error(`ERROR: Credentials not found at ${CREDENTIALS_PATH}.`);
    return null;
  }

  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const { client_id, client_secret } = creds.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, `http://localhost:${callbackPort}/callback`
  );

  const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
  oAuth2Client.setCredentials(token);

  oAuth2Client.on('tokens', (newTokens) => {
    const existing = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'));
    const merged = { ...existing, ...newTokens };
    fs.writeFileSync(tokenPath, JSON.stringify(merged, null, 2));
  });

  return oAuth2Client;
}

// --- Calendar ---
async function fetchCalendarEvents(auth, date) {
  const calendar = google.calendar({ version: 'v3', auth });
  const calList = await calendar.calendarList.list();
  const allEvents = [];

  const start = new Date(`${date}T00:00:00+01:00`);
  const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);

  for (const cal of calList.data.items) {
    try {
      const res = await calendar.events.list({
        calendarId: cal.id,
        timeMin: start.toISOString(),
        timeMax: end.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: TIMEZONE,
      });
      const events = (res.data.items || []).map(e => ({
        ...e,
        _calendarName: cal.summary,
      }));
      allEvents.push(...events);
    } catch (err) {
      // Skip calendars we can't read
    }
  }

  allEvents.sort((a, b) => {
    const aTime = a.start.dateTime || a.start.date + 'T00:00:00';
    const bTime = b.start.dateTime || b.start.date + 'T00:00:00';
    return new Date(aTime) - new Date(bTime);
  });

  return allEvents;
}

function formatEventMarkdown(event) {
  const calLabel = event._calendarName ? ` [${event._calendarName}]` : '';
  const location = event.location ? ` @ ${event.location}` : '';

  if (event.start.date) {
    return `- **All day** — ${event.summary || '(no title)'}${calLabel}`;
  }

  const start = new Date(event.start.dateTime);
  const end = new Date(event.end.dateTime);
  const startStr = start.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE });
  const endStr = end.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE });

  return `- **${startStr}–${endStr}** — ${event.summary || '(no title)'}${calLabel}${location}`;
}

function buildScheduleSection(events, label) {
  if (events.length === 0) {
    return `## ${label}\n\n_No events scheduled._\n`;
  }

  const lines = events.map(formatEventMarkdown);
  return `## ${label}\n\n${lines.join('\n')}\n`;
}

// --- Gmail ---
function decodeBase64Url(str) {
  if (!str) return '';
  return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
}

function getHeader(headers, name) {
  const h = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
  return h ? h.value : '';
}

// Email-rules classification
const AUTO_ARCHIVE_PATTERNS = [
  { from: 'calendar-notification@google.com', reason: 'Calendar notification' },
  { subject: /sale|discount|% off/i, fromNot: /inkarnate|clarity|anthropic/i, reason: 'Marketing/promotional' },
  { from: /noreply.*facebook|noreply.*instagram|noreply.*twitter/i, reason: 'Social media notification' },
  { subject: /new version available|update your app/i, reason: 'App update notification' },
];

const AUTO_LABEL_PATTERNS = [
  { from: /anthropic/i, labels: ['Receipt', 'Expense'], reason: 'Anthropic receipt' },
  { from: /coda/i, subject: /receipt|invoice|payment/i, labels: ['Receipt', 'Expense'], reason: 'Coda receipt' },
  { from: /wispr/i, labels: ['Receipt', 'Expense'], reason: 'Wispr receipt' },
  { from: /google/i, subject: /workspace|cloud.*invoice/i, labels: ['Receipt', 'Expense'], reason: 'Google invoice' },
  { from: /figma/i, subject: /receipt|invoice|payment/i, labels: ['Receipt', 'Expense'], reason: 'Figma receipt' },
  { from: /mobbin/i, labels: ['Receipt', 'Expense'], reason: 'Mobbin receipt' },
  { from: /fortnox/i, subject: /påminnelse|faktura|paminnelse/i, labels: ['Receipt', '1-Action'], reason: 'Fortnox invoice — needs paying' },
];

const ALWAYS_ASK_PATTERNS = [
  { from: /apple/i, subject: /receipt|invoice|charge/i, reason: 'Apple receipt — personal or business?' },
  { from: /sas/i, reason: 'SAS/travel — work or personal?' },
  { from: /audible/i, reason: 'Audible — fiction or business?' },
  { from: /ikea/i, reason: 'IKEA — personal or office?' },
  { from: /tesla/i, reason: 'Tesla — personal or company?' },
  { from: /balanzen/i, reason: 'Balanzen — personal or company benefit?' },
  { from: /one\.com/i, reason: 'one.com — check which domain' },
];

function matchesPattern(pattern, from, subject) {
  if (pattern.from && typeof pattern.from === 'string') {
    if (!from.includes(pattern.from)) return false;
  }
  if (pattern.from instanceof RegExp) {
    if (!pattern.from.test(from)) return false;
  }
  if (pattern.fromNot instanceof RegExp) {
    if (pattern.fromNot.test(from)) return false;
  }
  if (pattern.subject instanceof RegExp) {
    if (!pattern.subject.test(subject)) return false;
  }
  return true;
}

function classifyEmail(from, subject) {
  for (const p of AUTO_ARCHIVE_PATTERNS) {
    if (matchesPattern(p, from, subject)) return { action: 'archive', reason: p.reason };
  }
  for (const p of AUTO_LABEL_PATTERNS) {
    if (matchesPattern(p, from, subject)) return { action: 'label', labels: p.labels, reason: p.reason };
  }
  for (const p of ALWAYS_ASK_PATTERNS) {
    if (matchesPattern(p, from, subject)) return { action: 'ask', reason: p.reason };
  }
  return { action: 'inbox', reason: 'Needs review' };
}

async function fetchInboxEmails(auth, maxResults = 30) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: 'in:inbox',
    maxResults,
  });

  const messages = res.data.messages || [];
  const emails = [];

  for (const msg of messages) {
    const full = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id,
      format: 'metadata',
      metadataHeaders: ['From', 'To', 'Subject', 'Date'],
    });

    const headers = full.data.payload.headers;
    const from = getHeader(headers, 'From');
    const subject = getHeader(headers, 'Subject');
    const date = new Date(parseInt(full.data.internalDate));
    const unread = (full.data.labelIds || []).includes('UNREAD');
    const classification = classifyEmail(from, subject);

    emails.push({
      id: msg.id,
      from: from.replace(/<[^>]+>/, '').trim(),
      subject,
      date: date.toLocaleString('sv-SE', { timeZone: TIMEZONE }),
      unread,
      snippet: full.data.snippet || '',
      classification,
    });
  }

  return emails;
}

function buildInboxSection(emails) {
  const actionNeeded = emails.filter(e => e.classification.action === 'inbox' || e.classification.action === 'ask' || e.classification.action === 'label');
  const autoArchive = emails.filter(e => e.classification.action === 'archive');
  const unreadCount = emails.filter(e => e.unread).length;

  let md = `## Inbox Summary\n\n`;
  md += `_${emails.length} emails in inbox, ${unreadCount} unread._\n\n`;

  if (actionNeeded.length > 0) {
    md += `### Action Needed (${actionNeeded.length})\n\n`;
    for (const e of actionNeeded) {
      const flag = e.unread ? ' **NEW**' : '';
      const note = e.classification.reason !== 'Needs review' ? ` _(${e.classification.reason})_` : '';
      md += `- ${e.from}: ${e.subject}${flag}${note}\n`;
    }
    md += '\n';
  }

  if (autoArchive.length > 0) {
    md += `### Auto-Archive Candidates (${autoArchive.length})\n\n`;
    for (const e of autoArchive) {
      md += `- ~~${e.from}: ${e.subject}~~ _(${e.classification.reason})_\n`;
    }
    md += '\n';
  }

  return md;
}

// --- Daily Note ---
function todayStr() {
  return new Date().toLocaleDateString('sv-SE', { timeZone: TIMEZONE });
}

function tomorrowStr() {
  const tom = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return tom.toLocaleDateString('sv-SE', { timeZone: TIMEZONE });
}

function getDailyNotePath(date) {
  return path.join(DAILY_DIR, `${date}.md`);
}

function readOrCreateDailyNote(date) {
  const filePath = getDailyNotePath(date);
  if (fs.existsSync(filePath)) {
    return fs.readFileSync(filePath, 'utf-8');
  }

  // Create from template
  const template = fs.readFileSync(path.join(VAULT_ROOT, 'templates', 'daily.md'), 'utf-8');
  return template.replace(/\{\{date\}\}/g, date);
}

function insertOrReplaceSection(content, sectionHeader, newSection) {
  // Match ## Header through to the next ## or end of file
  const headerRegex = new RegExp(
    `(^|\\n)(## ${sectionHeader.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?)(?=\\n## |$)`,
    'm'
  );

  if (headerRegex.test(content)) {
    return content.replace(headerRegex, `$1${newSection}`);
  }

  // Insert before "## Brain Dump" if it exists, otherwise append after frontmatter
  const brainDumpIndex = content.indexOf('## Brain Dump');
  if (brainDumpIndex !== -1) {
    return content.slice(0, brainDumpIndex) + newSection + '\n' + content.slice(brainDumpIndex);
  }

  // Append after frontmatter
  const fmEnd = content.indexOf('---', content.indexOf('---') + 1);
  if (fmEnd !== -1) {
    const insertAt = fmEnd + 3;
    return content.slice(0, insertAt) + '\n\n' + newSection + '\n' + content.slice(insertAt);
  }

  return content + '\n\n' + newSection;
}

// --- Git ---
function gitCommitAndPush(message) {
  try {
    execSync('git add daily/ planning/', { cwd: VAULT_ROOT, stdio: 'pipe' });
    const status = execSync('git status --porcelain', { cwd: VAULT_ROOT, encoding: 'utf-8' });
    if (!status.trim()) {
      console.log('No changes to commit.');
      return;
    }
    execSync(`git commit -m "${message}"`, { cwd: VAULT_ROOT, stdio: 'pipe' });
    console.log(`Committed: ${message}`);

    // Push with retry
    for (let attempt = 1; attempt <= 4; attempt++) {
      try {
        execSync('git push', { cwd: VAULT_ROOT, stdio: 'pipe' });
        console.log('Pushed to remote.');
        return;
      } catch (err) {
        if (attempt < 4) {
          const wait = Math.pow(2, attempt) * 1000;
          console.log(`Push failed, retrying in ${wait / 1000}s...`);
          execSync(`sleep ${wait / 1000}`);
        } else {
          console.error('Push failed after 4 attempts. Changes are committed locally.');
        }
      }
    }
  } catch (err) {
    console.error('Git error:', err.message);
  }
}

// --- Main ---
async function sync(mode, options = {}) {
  const { dryRun = false, noGit = false } = options;

  console.log(`\n=== Life Vault Sync (${mode}) — ${todayStr()} ===\n`);

  // Auth
  const calAuth = getAuthClient(CALENDAR_TOKEN_PATH, 3847);
  const gmailAuth = getAuthClient(GMAIL_TOKEN_PATH, 3848);

  if (!calAuth && !gmailAuth) {
    console.error('No auth available. Run auth scripts for calendar and/or gmail first.');
    process.exit(1);
  }

  const targetDate = mode === 'evening' ? tomorrowStr() : todayStr();
  let scheduleSection = '';
  let inboxSection = '';

  // Calendar sync
  if (calAuth) {
    try {
      const scheduleLabel = mode === 'evening' ? 'Tomorrow\'s Schedule' : 'Schedule';
      const events = await fetchCalendarEvents(calAuth, targetDate);
      scheduleSection = buildScheduleSection(events, scheduleLabel);
      console.log(scheduleSection);
    } catch (err) {
      console.error('Calendar sync error:', err.message);
    }
  } else {
    console.log('Skipping calendar (no auth).');
  }

  // Email sync
  if (gmailAuth) {
    try {
      const emails = await fetchInboxEmails(gmailAuth, 30);
      inboxSection = buildInboxSection(emails);
      console.log(inboxSection);
    } catch (err) {
      console.error('Email sync error:', err.message);
    }
  } else {
    console.log('Skipping email (no auth).');
  }

  // Write to daily note
  if (!dryRun && (scheduleSection || inboxSection)) {
    const noteDate = mode === 'evening' ? tomorrowStr() : todayStr();
    let content = readOrCreateDailyNote(noteDate);

    if (scheduleSection) {
      const label = mode === 'evening' ? "Tomorrow's Schedule" : 'Schedule';
      content = insertOrReplaceSection(content, label, scheduleSection);
    }
    if (inboxSection) {
      content = insertOrReplaceSection(content, 'Inbox Summary', inboxSection);
    }

    const notePath = getDailyNotePath(noteDate);
    fs.mkdirSync(path.dirname(notePath), { recursive: true });
    fs.writeFileSync(notePath, content, 'utf-8');
    console.log(`Updated: ${notePath}`);

    // Git
    if (!noGit) {
      gitCommitAndPush(`sync: ${mode} update ${noteDate}`);
    }
  } else if (dryRun) {
    console.log('\n[DRY RUN] No files written.\n');
  }
}

// --- CLI ---
const args = process.argv.slice(2);
const mode = ['morning', 'evening'].includes(args[0]) ? args[0] : 'morning';
const dryRun = args.includes('--dry-run');
const noGit = args.includes('--no-git');

sync(mode, { dryRun, noGit }).catch(err => {
  console.error('Sync error:', err.message);
  process.exit(1);
});
