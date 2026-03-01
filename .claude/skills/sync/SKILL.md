---
name: sync
description: Automated daily sync of Google Calendar + Gmail into the life vault. Runs via cron or manually.
---

# Life Vault Sync

Automated job that pulls calendar events and inbox emails into the daily notes. Runs on a schedule or on-demand.

## What It Does

1. **Calendar** — Fetches today's (or tomorrow's) events from all Google Calendars
2. **Email** — Fetches inbox emails and classifies them using email-rules
3. **Daily Note** — Updates/creates the daily markdown file with Schedule + Inbox Summary sections
4. **Git** — Auto-commits and pushes changes

## Usage

```bash
# Full morning sync (today's calendar + inbox → daily note)
node /home/user/life/.claude/skills/sync/scripts/sync.js morning

# Evening sync (tomorrow's calendar + inbox → tomorrow's daily note)
node /home/user/life/.claude/skills/sync/scripts/sync.js evening

# Preview without writing files
node /home/user/life/.claude/skills/sync/scripts/sync.js morning --dry-run

# Sync but don't git commit/push
node /home/user/life/.claude/skills/sync/scripts/sync.js morning --no-git
```

## Cron Setup (Local Mac)

Add these to your crontab (`crontab -e`):

```cron
# Morning sync at 07:00 Stockholm time
0 7 * * * cd /Users/williamlarsten/life && /opt/homebrew/bin/node .claude/skills/sync/scripts/sync.js morning >> /tmp/life-sync.log 2>&1

# Evening sync at 22:00 Stockholm time
0 22 * * * cd /Users/williamlarsten/life && /opt/homebrew/bin/node .claude/skills/sync/scripts/sync.js evening >> /tmp/life-sync.log 2>&1
```

**Note:** Adjust the `node` path to match your system (`which node`). If using nvm:
```cron
0 7 * * * export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && cd /Users/williamlarsten/life && node .claude/skills/sync/scripts/sync.js morning >> /tmp/life-sync.log 2>&1
```

## Launchd Setup (Alternative for macOS)

Create `~/Library/LaunchAgents/com.williamlarsten.life-sync-morning.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.williamlarsten.life-sync-morning</string>
    <key>ProgramArguments</key>
    <array>
        <string>/opt/homebrew/bin/node</string>
        <string>/Users/williamlarsten/life/.claude/skills/sync/scripts/sync.js</string>
        <string>morning</string>
    </array>
    <key>WorkingDirectory</key>
    <string>/Users/williamlarsten/life</string>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>7</integer>
        <key>Minute</key>
        <integer>0</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>/tmp/life-sync-morning.log</string>
    <key>StandardErrorPath</key>
    <string>/tmp/life-sync-morning-error.log</string>
    <key>EnvironmentVariables</key>
    <dict>
        <key>HOME</key>
        <string>/Users/williamlarsten</string>
    </dict>
</dict>
</plist>
```

Load with:
```bash
launchctl load ~/Library/LaunchAgents/com.williamlarsten.life-sync-morning.plist
```

## Auth Requirements

Reuses existing tokens from the calendar and gmail skills:
- Calendar: `~/.google-calendar-mcp/token.json`
- Gmail: `~/.gmail-skill/token.json`
- Shared credentials: `~/.google-calendar-mcp/gcp-oauth.keys.json`

If tokens expire, re-run the auth scripts:
```bash
node /home/user/life/.claude/skills/google-calendar/scripts/auth.js
node /home/user/life/.claude/skills/gmail/scripts/auth.js
```

## Output Format

The sync inserts/updates these sections in the daily note:

### Schedule Section
```markdown
## Schedule

- **09:00–10:00** — Finance walkthrough [Personal]
- **13:00–14:00** — Inkarnate meeting [Personal] @ Discord
- **All day** — Charlie pickup [Custody]
```

### Inbox Summary Section
```markdown
## Inbox Summary

_12 emails in inbox, 3 unread._

### Action Needed (5)
- Todd via Clarity: Contract review **NEW**
- Fortnox: Faktura mars 2026 _(Fortnox invoice — needs paying)_

### Auto-Archive Candidates (3)
- ~~Google Calendar: Event updated~~ _(Calendar notification)_
```

## How It Fits Together

```
cron (07:00 / 22:00)
  → sync.js morning/evening
    → Google Calendar API → fetch events
    → Gmail API → fetch inbox + classify
    → Write to daily/YYYY-MM-DD.md
    → git commit + push
```

The daily notes then feed into your weekly review process. Calendar is always current, inbox status is captured for later triage with Claude.
