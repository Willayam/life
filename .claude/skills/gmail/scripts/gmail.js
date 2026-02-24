#!/usr/bin/env node
/**
 * Gmail CLI tool.
 *
 * Commands:
 *   search "query" [--max N]       Search emails (Gmail search syntax)
 *   read <messageId>               Read a specific email
 *   unread [--max N]               List unread emails
 *   inbox [--max N]                List inbox emails
 *   thread <threadId>              Read full email thread
 *   reply <messageId> --body "..."  Reply to an email
 *   send --to "email" --subject "..." --body "..."   Send new email
 *   draft --to "email" --subject "..." --body "..."  Create draft
 *   labels                         List all labels
 *   archive <messageId>            Archive a message
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(process.env.HOME, '.google-calendar-mcp', 'gcp-oauth.keys.json');
const TOKEN_PATH = path.join(process.env.HOME, '.gmail-skill', 'token.json');

function getAuthClient() {
  if (!fs.existsSync(TOKEN_PATH)) {
    console.error('ERROR: Not authorized yet. Run the auth script first:');
    console.error('  node ' + path.join(__dirname, 'auth.js'));
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const { client_id, client_secret } = creds.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3848/callback');

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  oAuth2Client.setCredentials(token);

  oAuth2Client.on('tokens', (newTokens) => {
    const existing = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    const merged = { ...existing, ...newTokens };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
  });

  return oAuth2Client;
}

function decodeBase64Url(str) {
  if (!str) return '';
  return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
}

function getHeader(headers, name) {
  const h = headers.find(h => h.name.toLowerCase() === name.toLowerCase());
  return h ? h.value : '';
}

function extractBody(payload) {
  // Simple text body
  if (payload.mimeType === 'text/plain' && payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }

  // Multipart — look for text/plain first, then text/html
  if (payload.parts) {
    // Try text/plain first
    for (const part of payload.parts) {
      if (part.mimeType === 'text/plain' && part.body?.data) {
        return decodeBase64Url(part.body.data);
      }
    }
    // Try nested multipart
    for (const part of payload.parts) {
      if (part.parts) {
        const nested = extractBody(part);
        if (nested) return nested;
      }
    }
    // Fallback to html, strip tags
    for (const part of payload.parts) {
      if (part.mimeType === 'text/html' && part.body?.data) {
        const html = decodeBase64Url(part.body.data);
        return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      }
    }
  }

  // Direct HTML body
  if (payload.mimeType === 'text/html' && payload.body?.data) {
    const html = decodeBase64Url(payload.body.data);
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  return '[Could not extract body]';
}

function formatDate(internalDate) {
  const d = new Date(parseInt(internalDate));
  return d.toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
}

function truncate(str, max = 200) {
  if (!str || str.length <= max) return str;
  return str.substring(0, max) + '...';
}

async function searchEmails(auth, query, maxResults = 20) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults,
  });

  const messages = res.data.messages || [];
  if (messages.length === 0) {
    console.log(`No emails found for: "${query}"`);
    return;
  }

  console.log(`\n=== Search: "${query}" (${messages.length} results) ===\n`);

  for (const msg of messages) {
    const full = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id,
      format: 'metadata',
      metadataHeaders: ['From', 'To', 'Subject', 'Date'],
    });

    const headers = full.data.payload.headers;
    const from = getHeader(headers, 'From');
    const to = getHeader(headers, 'To');
    const subject = getHeader(headers, 'Subject');
    const date = formatDate(full.data.internalDate);
    const labels = (full.data.labelIds || []).join(', ');
    const unread = (full.data.labelIds || []).includes('UNREAD') ? ' 📬' : '';
    const snippet = full.data.snippet || '';

    console.log(`--- [${msg.id}] ---`);
    console.log(`  Subject: ${subject}${unread}`);
    console.log(`  From: ${from}`);
    console.log(`  To: ${to}`);
    console.log(`  Date: ${date}`);
    console.log(`  Labels: ${labels}`);
    console.log(`  Preview: ${truncate(snippet, 150)}`);
    console.log('');
  }
}

async function readEmail(auth, messageId) {
  const gmail = google.gmail({ version: 'v1', auth });
  const full = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'full',
  });

  const headers = full.data.payload.headers;
  const from = getHeader(headers, 'From');
  const to = getHeader(headers, 'To');
  const cc = getHeader(headers, 'Cc');
  const subject = getHeader(headers, 'Subject');
  const date = formatDate(full.data.internalDate);
  const body = extractBody(full.data.payload);

  console.log(`\n=== Email ===`);
  console.log(`Subject: ${subject}`);
  console.log(`From: ${from}`);
  console.log(`To: ${to}`);
  if (cc) console.log(`CC: ${cc}`);
  console.log(`Date: ${date}`);
  console.log(`Message ID: ${messageId}`);
  console.log(`Thread ID: ${full.data.threadId}`);
  console.log(`Labels: ${(full.data.labelIds || []).join(', ')}`);
  console.log(`\n--- Body ---\n`);
  console.log(body);
}

async function readThread(auth, threadId) {
  const gmail = google.gmail({ version: 'v1', auth });
  const thread = await gmail.users.threads.get({
    userId: 'me',
    id: threadId,
    format: 'full',
  });

  console.log(`\n=== Thread (${thread.data.messages.length} messages) ===\n`);

  for (const msg of thread.data.messages) {
    const headers = msg.payload.headers;
    const from = getHeader(headers, 'From');
    const subject = getHeader(headers, 'Subject');
    const date = formatDate(msg.internalDate);
    const body = extractBody(msg.payload);

    console.log(`--- ${date} | ${from} ---`);
    console.log(`Subject: ${subject}`);
    console.log(`[${msg.id}]`);
    console.log('');
    console.log(body);
    console.log('\n' + '='.repeat(60) + '\n');
  }
}

function createRawEmail(to, subject, body, inReplyTo, references, from) {
  const boundary = 'boundary_' + Date.now();
  let headers = [
    `From: ${from || 'me'}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
  ];
  if (inReplyTo) {
    headers.push(`In-Reply-To: ${inReplyTo}`);
    headers.push(`References: ${references || inReplyTo}`);
  }

  const raw = headers.join('\r\n') + '\r\n\r\n' + body;
  return Buffer.from(raw).toString('base64url');
}

async function sendEmail(auth, to, subject, body) {
  const gmail = google.gmail({ version: 'v1', auth });
  const raw = createRawEmail(to, subject, body);

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw },
  });

  console.log(`Email sent! Message ID: ${res.data.id}`);
}

async function createDraft(auth, to, subject, body) {
  const gmail = google.gmail({ version: 'v1', auth });
  const raw = createRawEmail(to, subject, body);

  const res = await gmail.users.drafts.create({
    userId: 'me',
    requestBody: {
      message: { raw },
    },
  });

  console.log(`Draft created! Draft ID: ${res.data.id}`);
}

async function replyToEmail(auth, messageId, body) {
  const gmail = google.gmail({ version: 'v1', auth });

  // Get original email for threading
  const original = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'metadata',
    metadataHeaders: ['From', 'To', 'Subject', 'Message-ID', 'References'],
  });

  const headers = original.data.payload.headers;
  const origFrom = getHeader(headers, 'From');
  const origSubject = getHeader(headers, 'Subject');
  const origMessageId = getHeader(headers, 'Message-ID');
  const origReferences = getHeader(headers, 'References');

  const replySubject = origSubject.startsWith('Re:') ? origSubject : `Re: ${origSubject}`;
  const raw = createRawEmail(origFrom, replySubject, body, origMessageId, origReferences);

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw,
      threadId: original.data.threadId,
    },
  });

  console.log(`Reply sent! Message ID: ${res.data.id}`);
  console.log(`To: ${origFrom}`);
  console.log(`Subject: ${replySubject}`);
}

async function archiveMessage(auth, messageId) {
  const gmail = google.gmail({ version: 'v1', auth });
  await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    requestBody: {
      removeLabelIds: ['INBOX'],
    },
  });
  console.log(`Archived: ${messageId}`);
}

async function listLabels(auth) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.labels.list({ userId: 'me' });

  console.log('\n=== Labels ===\n');
  for (const label of res.data.labels.sort((a, b) => a.name.localeCompare(b.name))) {
    console.log(`  ${label.name} (${label.type}) [${label.id}]`);
  }
}

function parseArgs(argv) {
  const args = {};
  let i = 0;
  while (i < argv.length) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].substring(2);
      args[key] = argv[i + 1];
      i += 2;
    } else {
      i++;
    }
  }
  return args;
}

async function main() {
  const auth = getAuthClient();
  const command = process.argv[2] || 'inbox';

  switch (command) {
    case 'search': {
      const query = process.argv[3];
      const args = parseArgs(process.argv.slice(4));
      if (!query) {
        console.error('Usage: gmail.js search "query" [--max N]');
        process.exit(1);
      }
      await searchEmails(auth, query, parseInt(args.max) || 20);
      break;
    }

    case 'read': {
      const messageId = process.argv[3];
      if (!messageId) {
        console.error('Usage: gmail.js read <messageId>');
        process.exit(1);
      }
      await readEmail(auth, messageId);
      break;
    }

    case 'thread': {
      const threadId = process.argv[3];
      if (!threadId) {
        console.error('Usage: gmail.js thread <threadId>');
        process.exit(1);
      }
      await readThread(auth, threadId);
      break;
    }

    case 'unread': {
      const args = parseArgs(process.argv.slice(3));
      await searchEmails(auth, 'is:unread', parseInt(args.max) || 20);
      break;
    }

    case 'inbox': {
      const args = parseArgs(process.argv.slice(3));
      await searchEmails(auth, 'in:inbox', parseInt(args.max) || 20);
      break;
    }

    case 'reply': {
      const messageId = process.argv[3];
      const args = parseArgs(process.argv.slice(4));
      if (!messageId || !args.body) {
        console.error('Usage: gmail.js reply <messageId> --body "reply text"');
        process.exit(1);
      }
      await replyToEmail(auth, messageId, args.body);
      break;
    }

    case 'send': {
      const args = parseArgs(process.argv.slice(3));
      if (!args.to || !args.subject || !args.body) {
        console.error('Usage: gmail.js send --to "email" --subject "..." --body "..."');
        process.exit(1);
      }
      await sendEmail(auth, args.to, args.subject, args.body);
      break;
    }

    case 'draft': {
      const args = parseArgs(process.argv.slice(3));
      if (!args.to || !args.subject || !args.body) {
        console.error('Usage: gmail.js draft --to "email" --subject "..." --body "..."');
        process.exit(1);
      }
      await createDraft(auth, args.to, args.subject, args.body);
      break;
    }

    case 'archive': {
      const messageId = process.argv[3];
      if (!messageId) {
        console.error('Usage: gmail.js archive <messageId>');
        process.exit(1);
      }
      await archiveMessage(auth, messageId);
      break;
    }

    case 'labels': {
      await listLabels(auth);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.error('Commands: search, read, thread, unread, inbox, reply, send, draft, archive, labels');
      process.exit(1);
  }
}

main().catch(err => {
  if (err.message?.includes('invalid_grant') || err.message?.includes('Token has been expired')) {
    console.error('ERROR: Token expired or revoked. Re-authorize by running:');
    console.error(`  rm ${TOKEN_PATH}`);
    console.error(`  node ${path.join(__dirname, 'auth.js')}`);
  } else {
    console.error('Error:', err.message);
    if (err.errors) console.error(JSON.stringify(err.errors, null, 2));
  }
  process.exit(1);
});
