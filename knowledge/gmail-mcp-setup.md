---
tags: [systems, tools, mcp, email]
created: 2026-02-09
---

# Gmail MCP Setup

How the Gmail integration works in Claude Code.

## Architecture

- **Package**: `@gongrzhe/server-gmail-autoauth-mcp`
- **Binary**: `/Users/williamlarsten/.nvm/versions/node/v22.17.1/bin/gmail-mcp`
- **Credentials**: `~/.gmail-mcp/credentials.json`
- **OAuth keys**: `~/.gmail-mcp/gcp-oauth.keys.json`

## Configuration

In `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "gmail": {
      "command": "/Users/williamlarsten/.nvm/versions/node/v22.17.1/bin/gmail-mcp",
      "args": []
    }
  }
}
```

Using the direct binary path instead of `npx` avoids the ~5-10 second startup delay from package download.

## Common Issues

### MCP Not Loading / Laggy

1. **Check if using npx**: Change to direct binary path (see above)
2. **Token expired**: Run `gmail-mcp auth` to re-authenticate
3. **Port 3000 in use**: Run `lsof -ti:3000 | xargs kill -9` before auth

### Re-Authentication

```bash
# Kill anything on port 3000
lsof -ti:3000 | xargs kill -9

# Re-authenticate
/Users/williamlarsten/.nvm/versions/node/v22.17.1/bin/gmail-mcp auth
```

This opens browser for Google OAuth. Complete the flow and credentials.json updates automatically.

### Verify Setup

```bash
# Check credentials exist
ls -la ~/.gmail-mcp/

# Check token expiry (should be in the future)
cat ~/.gmail-mcp/credentials.json | python3 -c "
import json,sys,datetime
d=json.load(sys.stdin)
exp = datetime.datetime.fromtimestamp(d['expiry_date']/1000)
print(f'Token expires: {exp}')
print(f'Valid: {exp > datetime.datetime.now()}')
"
```

## After Changes

**Restart Claude Code** for MCP changes to take effect.

## Sources

- [Gmail MCP Server GitHub](https://github.com/GongRzhe/Gmail-MCP-Server)
- [npm package](https://www.npmjs.com/package/@gongrzhe/server-gmail-autoauth-mcp)
