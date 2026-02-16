---
tags: [systems, tools, mcp, calendar]
created: 2026-02-16
---

# Google Calendar MCP Setup

How the Google Calendar integration works in Claude Code.

## Architecture

- **Package**: `@cocal/google-calendar-mcp` (via [nspady/google-calendar-mcp](https://github.com/nspady/google-calendar-mcp))
- **Binary**: `/Users/williamlarsten/.nvm/versions/node/v22.17.1/bin/google-calendar-mcp`
- **OAuth keys**: `~/.google-calendar-mcp/gcp-oauth.keys.json` (copied from Gmail MCP - same GCP project)
- **Token**: Stored by the MCP server after first auth (location set by `GOOGLE_CALENDAR_MCP_TOKEN_PATH` or defaults)

## Configuration

In `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "/Users/williamlarsten/.nvm/versions/node/v22.17.1/bin/google-calendar-mcp",
      "args": [],
      "env": {
        "GOOGLE_OAUTH_CREDENTIALS": "/Users/williamlarsten/.google-calendar-mcp/gcp-oauth.keys.json"
      }
    }
  }
}
```

Permission in settings.json: `"mcp__google-calendar__*"`

## Available Tools

The MCP server provides 12 tools:
1. **List calendars** - See all available calendars
2. **List events** - Get events from a calendar
3. **Search events** - Search for specific events
4. **Get event** - Get details of a specific event
5. **Create event** - Create new calendar events
6. **Update event** - Modify existing events
7. **Delete event** - Remove events
8. **Respond to invitation** - Accept/decline event invitations
9. **Check availability** - Free/busy lookup
10. **Get colors** - Calendar color options
11. **Get current time** - Current time in any timezone
12. **Manage accounts** - Account management

## First-Time Setup

### Prerequisites
1. **Google Calendar API must be enabled** in Google Cloud Console:
   - Go to: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com
   - Project: `william-larsten`
   - Click "Enable"

2. **Your email must be a test user** in the OAuth consent screen (likely already set from Gmail MCP setup)

### Authentication
After enabling the API and restarting Claude Code:
1. The MCP server will open a browser window for Google OAuth
2. Sign in and grant Calendar permissions
3. Token is stored automatically

## Common Issues

### "Calendar API not enabled"
- Go to Google Cloud Console → APIs & Services → Enable Google Calendar API
- Same project as Gmail: `william-larsten`

### Token Expired
- The server should auto-refresh tokens
- If issues: delete the token file and re-authenticate

### Re-Authentication
```bash
# If needed, remove stored token and restart Claude Code
# Token location varies - check server docs
```

## After Changes

**Restart Claude Code** for MCP changes to take effect.

## Sources

- [Google Calendar MCP GitHub](https://github.com/nspady/google-calendar-mcp)
- [npm package](https://www.npmjs.com/package/@cocal/google-calendar-mcp)
