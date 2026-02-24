---
name: google-calendar
description: Check, search, and create Google Calendar events. Use when asked about schedule, calendar, availability, time-blocking, or creating events.
---

# Google Calendar Skill

View and manage William's Google Calendar directly from Claude Code.

## Setup (One-time)

If not yet authorized, run the auth script:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && node /Users/williamlarsten/life/.claude/skills/google-calendar/scripts/auth.js
```

This opens a browser for Google OAuth. After authorizing, a token is saved at `~/.google-calendar-mcp/token.json`.

## Commands

All commands use this base:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && node /Users/williamlarsten/life/.claude/skills/google-calendar/scripts/calendar.js <command>
```

### Viewing Events

| Command | Description |
|---------|-------------|
| `today` | Show today's events across all calendars |
| `tomorrow` | Show tomorrow's events |
| `week` | Show this week (Mon-Sun) |
| `list 14` | Show next 14 days |
| `date 2026-02-25` | Show events for a specific date |
| `range 2026-02-24 2026-02-28` | Show events in a date range |
| `search "Clarity"` | Search for events matching text (next 90 days) |
| `calendars` | List all available calendars and their IDs |

### Creating Events

```bash
# Timed event
... calendar.js create --title "Deep work: Maxa" --date 2026-02-25 --start 09:00 --end 12:00

# All-day event
... calendar.js create --title "Mountain trip" --date 2026-02-26 --allday

# With details
... calendar.js create --title "Call with Todd" --date 2026-02-27 --start 16:30 --end 17:30 --description "Clarity partnership finalization" --location "Zoom"
```

## Workflows

### Check Calendar
When the user asks "check my calendar", "what's on my schedule", "am I free on...":
1. Run the appropriate view command (today/week/date)
2. Present events in a clear summary
3. Note any conflicts or gaps

### Time-Block
When the user wants to time-block tasks:
1. First run `week` or the relevant date range to see existing events
2. Identify open slots
3. Propose time blocks for the tasks
4. After user approval, create the events using the `create` command

### Find Availability
When checking if a time slot is free:
1. Run `date` for the target date
2. Check for conflicts with the proposed time
3. Report back clearly

## Notes

- All times are in Europe/Stockholm timezone (CET/CEST)
- Events from ALL calendars are shown (personal, shared with Frida, custody calendar)
- Calendar names are shown in brackets after each event
- Token auto-refreshes; if it expires, re-run the auth script
- William's calendars: personal, shared with Frida, shared custody with ex
