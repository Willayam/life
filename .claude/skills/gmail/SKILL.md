---
name: gmail
description: Search, read, reply to, and send Gmail emails. Use when asked about email, inbox, messages, or when needing to draft/send replies.
---

# Gmail Skill

Search, read, and manage William's Gmail directly from Claude Code.

## Setup (One-time)

If not yet authorized, run the auth script:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && node /Users/williamlarsten/life/.claude/skills/gmail/scripts/auth.js
```

Token saved at `~/.gmail-skill/token.json`.

## Commands

Base command:
```bash
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh" && node /Users/williamlarsten/life/.claude/skills/gmail/scripts/gmail.js <command>
```

### Reading Emails

| Command | Description |
|---------|-------------|
| `inbox --max 10` | List inbox emails |
| `unread --max 10` | List unread emails |
| `search "from:catrine expa" --max 10` | Search with Gmail syntax |
| `read <messageId>` | Read full email body |
| `thread <threadId>` | Read entire email thread |
| `labels` | List all Gmail labels |

### Gmail Search Syntax

Use standard Gmail search operators:
- `from:catrine` — emails from Catrine
- `to:erik` — emails to Erik
- `subject:expa` — subject contains "expa"
- `is:unread` — unread only
- `newer_than:7d` — last 7 days
- `has:attachment` — has attachments
- `in:inbox` — inbox only
- Combine: `from:catrine expa newer_than:30d`

### Sending / Replying

| Command | Description |
|---------|-------------|
| `reply <messageId> --body "text"` | Reply to an email |
| `send --to "email" --subject "..." --body "..."` | Send new email |
| `draft --to "email" --subject "..." --body "..."` | Create draft (doesn't send) |
| `archive <messageId>` | Archive a message |

### Important Rules

1. **Always show email content to William before sending replies** — never auto-send
2. **Use `draft` instead of `send`** when unsure — creates a draft William can review in Gmail
3. **Follow the email-rules skill** for classification and auto-archive patterns
4. **Never send sensitive information** via email through this tool

## Workflows

### Check Inbox
1. Run `inbox --max 15` to see recent emails
2. Classify using email-rules skill patterns
3. Present summary grouped by action needed

### Search for Topic
1. Use Gmail search syntax: `search "topic newer_than:30d"`
2. Read relevant emails with `read <id>`
3. Summarize findings

### Draft Replies
1. Read the email/thread first
2. Draft the reply text
3. Show William the draft for approval
4. Use `draft` to save in Gmail (safest) or `reply` after explicit approval
