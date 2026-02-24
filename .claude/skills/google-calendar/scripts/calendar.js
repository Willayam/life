#!/usr/bin/env node
/**
 * Google Calendar CLI tool.
 *
 * Commands:
 *   list [days]           List events for next N days (default: 7)
 *   today                 List today's events
 *   tomorrow              List tomorrow's events
 *   week                  List this week's events (Mon-Sun)
 *   date YYYY-MM-DD       List events for a specific date
 *   range YYYY-MM-DD YYYY-MM-DD   List events in a date range
 *   search "query"        Search for events matching query
 *   calendars             List all available calendars
 *   create                Create an event (interactive via args)
 *     --title "Event"     Event title (required)
 *     --date YYYY-MM-DD   Date (required)
 *     --start HH:MM       Start time (required for timed events)
 *     --end HH:MM         End time (required for timed events)
 *     --allday             Create all-day event
 *     --calendar "name"   Calendar name (default: primary)
 *     --description "..."  Event description
 *     --location "..."     Event location
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const CREDENTIALS_PATH = path.join(process.env.HOME, '.google-calendar-mcp', 'gcp-oauth.keys.json');
const TOKEN_PATH = path.join(process.env.HOME, '.google-calendar-mcp', 'token.json');
const TIMEZONE = 'Europe/Stockholm';

function getAuthClient() {
  if (!fs.existsSync(TOKEN_PATH)) {
    console.error('ERROR: Not authorized yet. Run the auth script first:');
    console.error('  node ' + path.join(__dirname, 'auth.js'));
    process.exit(1);
  }

  const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, 'utf-8'));
  const { client_id, client_secret } = creds.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, 'http://localhost:3847/callback');

  const token = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
  oAuth2Client.setCredentials(token);

  // Auto-refresh token
  oAuth2Client.on('tokens', (newTokens) => {
    const existing = JSON.parse(fs.readFileSync(TOKEN_PATH, 'utf-8'));
    const merged = { ...existing, ...newTokens };
    fs.writeFileSync(TOKEN_PATH, JSON.stringify(merged, null, 2));
  });

  return oAuth2Client;
}

function formatEvent(event) {
  const calName = event._calendarName || '';
  const calLabel = calName ? ` [${calName}]` : '';

  if (event.start.date) {
    // All-day event
    return `  ALL DAY  | ${event.summary || '(no title)'}${calLabel}`;
  }

  const start = new Date(event.start.dateTime);
  const end = new Date(event.end.dateTime);
  const startStr = start.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE });
  const endStr = end.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit', timeZone: TIMEZONE });
  const location = event.location ? ` @ ${event.location}` : '';

  return `  ${startStr}-${endStr} | ${event.summary || '(no title)'}${calLabel}${location}`;
}

function dayLabel(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${days[d.getDay()]} ${dateStr}`;
}

async function listCalendars(auth) {
  const calendar = google.calendar({ version: 'v3', auth });
  const res = await calendar.calendarList.list();
  console.log('\n=== Your Calendars ===\n');
  for (const cal of res.data.items) {
    const primary = cal.primary ? ' (PRIMARY)' : '';
    const access = cal.accessRole;
    console.log(`  ${cal.summary}${primary} [${access}]`);
    console.log(`    ID: ${cal.id}`);
  }
}

async function listEvents(auth, timeMin, timeMax, query) {
  const calendar = google.calendar({ version: 'v3', auth });

  // Get all calendars
  const calList = await calendar.calendarList.list();
  const allEvents = [];

  for (const cal of calList.data.items) {
    try {
      const params = {
        calendarId: cal.id,
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
        timeZone: TIMEZONE,
      };
      if (query) params.q = query;

      const res = await calendar.events.list(params);
      const events = (res.data.items || []).map(e => ({ ...e, _calendarName: cal.summary }));
      allEvents.push(...events);
    } catch (err) {
      // Skip calendars we can't read
    }
  }

  // Sort by start time
  allEvents.sort((a, b) => {
    const aTime = a.start.dateTime || a.start.date + 'T00:00:00';
    const bTime = b.start.dateTime || b.start.date + 'T00:00:00';
    return new Date(aTime) - new Date(bTime);
  });

  // Group by date
  const byDate = {};
  for (const event of allEvents) {
    const dateKey = event.start.date || event.start.dateTime.split('T')[0];
    if (!byDate[dateKey]) byDate[dateKey] = [];
    byDate[dateKey].push(event);
  }

  if (allEvents.length === 0) {
    console.log('\nNo events found in this time range.');
    return;
  }

  console.log('');
  for (const [date, events] of Object.entries(byDate).sort()) {
    console.log(`--- ${dayLabel(date)} ---`);
    for (const event of events) {
      console.log(formatEvent(event));
    }
    console.log('');
  }
  console.log(`Total: ${allEvents.length} event(s)`);
}

async function createEvent(auth, args) {
  const calendar = google.calendar({ version: 'v3', auth });

  const title = args.title;
  const date = args.date;
  const start = args.start;
  const end = args.end;
  const allday = args.allday;
  const description = args.description || '';
  const location = args.location || '';
  const calendarId = args.calendar || 'primary';

  if (!title || !date) {
    console.error('ERROR: --title and --date are required for create');
    process.exit(1);
  }

  let event;
  if (allday) {
    // All-day event — end date is exclusive in Google Calendar API
    const endDate = new Date(date + 'T12:00:00');
    endDate.setDate(endDate.getDate() + 1);
    const endDateStr = endDate.toISOString().split('T')[0];
    event = {
      summary: title,
      description,
      location,
      start: { date: date },
      end: { date: endDateStr },
    };
  } else {
    if (!start || !end) {
      console.error('ERROR: --start and --end are required (or use --allday)');
      process.exit(1);
    }
    event = {
      summary: title,
      description,
      location,
      start: { dateTime: `${date}T${start}:00`, timeZone: TIMEZONE },
      end: { dateTime: `${date}T${end}:00`, timeZone: TIMEZONE },
    };
  }

  const res = await calendar.events.insert({ calendarId, resource: event });
  console.log(`Event created: ${res.data.summary}`);
  console.log(`  When: ${allday ? date : `${date} ${start}-${end}`}`);
  console.log(`  Link: ${res.data.htmlLink}`);
}

function parseArgs(argv) {
  const args = {};
  let i = 0;
  while (i < argv.length) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].substring(2);
      if (key === 'allday') {
        args[key] = true;
        i++;
      } else {
        args[key] = argv[i + 1];
        i += 2;
      }
    } else {
      i++;
    }
  }
  return args;
}

async function main() {
  const auth = getAuthClient();
  const command = process.argv[2] || 'week';
  const now = new Date();

  // Helper to get start of day in Stockholm
  function startOfDay(date) {
    const d = new Date(date.toLocaleString('en-US', { timeZone: TIMEZONE }));
    d.setHours(0, 0, 0, 0);
    return new Date(date.getTime() - (date.getTime() - d.getTime()) % 86400000);
  }

  switch (command) {
    case 'today': {
      const start = new Date(`${now.toLocaleDateString('sv-SE', { timeZone: TIMEZONE })}T00:00:00+01:00`);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      console.log(`\n=== Today's Events ===`);
      await listEvents(auth, start, end);
      break;
    }

    case 'tomorrow': {
      const tom = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const dateStr = tom.toLocaleDateString('sv-SE', { timeZone: TIMEZONE });
      const start = new Date(`${dateStr}T00:00:00+01:00`);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      console.log(`\n=== Tomorrow's Events ===`);
      await listEvents(auth, start, end);
      break;
    }

    case 'week': {
      const todayStr = now.toLocaleDateString('sv-SE', { timeZone: TIMEZONE });
      const today = new Date(todayStr + 'T00:00:00+01:00');
      const dayOfWeek = today.getDay();
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(today.getTime() + mondayOffset * 24 * 60 * 60 * 1000);
      const sunday = new Date(monday.getTime() + 7 * 24 * 60 * 60 * 1000);
      console.log(`\n=== This Week (${monday.toISOString().split('T')[0]} – ${new Date(sunday.getTime() - 86400000).toISOString().split('T')[0]}) ===`);
      await listEvents(auth, monday, sunday);
      break;
    }

    case 'list': {
      const days = parseInt(process.argv[3]) || 7;
      const todayStr = now.toLocaleDateString('sv-SE', { timeZone: TIMEZONE });
      const start = new Date(`${todayStr}T00:00:00+01:00`);
      const end = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
      console.log(`\n=== Next ${days} Days ===`);
      await listEvents(auth, start, end);
      break;
    }

    case 'date': {
      const dateStr = process.argv[3];
      if (!dateStr) {
        console.error('Usage: calendar.js date YYYY-MM-DD');
        process.exit(1);
      }
      const start = new Date(`${dateStr}T00:00:00+01:00`);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      console.log(`\n=== Events on ${dateStr} ===`);
      await listEvents(auth, start, end);
      break;
    }

    case 'range': {
      const from = process.argv[3];
      const to = process.argv[4];
      if (!from || !to) {
        console.error('Usage: calendar.js range YYYY-MM-DD YYYY-MM-DD');
        process.exit(1);
      }
      const start = new Date(`${from}T00:00:00+01:00`);
      const end = new Date(`${to}T23:59:59+01:00`);
      console.log(`\n=== Events ${from} to ${to} ===`);
      await listEvents(auth, start, end);
      break;
    }

    case 'search': {
      const query = process.argv[3];
      if (!query) {
        console.error('Usage: calendar.js search "query"');
        process.exit(1);
      }
      const todayStr = now.toLocaleDateString('sv-SE', { timeZone: TIMEZONE });
      const start = new Date(`${todayStr}T00:00:00+01:00`);
      const end = new Date(start.getTime() + 90 * 24 * 60 * 60 * 1000);
      console.log(`\n=== Search: "${query}" (next 90 days) ===`);
      await listEvents(auth, start, end, query);
      break;
    }

    case 'calendars': {
      await listCalendars(auth);
      break;
    }

    case 'create': {
      const args = parseArgs(process.argv.slice(3));
      await createEvent(auth, args);
      break;
    }

    default:
      console.error(`Unknown command: ${command}`);
      console.error('Commands: today, tomorrow, week, list [days], date YYYY-MM-DD, range FROM TO, search "query", calendars, create');
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
  }
  process.exit(1);
});
