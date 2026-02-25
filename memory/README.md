# Memory

Persistent memory for Claude across sessions. This is what gives continuity between conversations.

## How This Works

- **sessions/** — One file per day of Claude interaction. Topics discussed, decisions made, action items generated.
- **commitments.md** — Single source of truth for all open commitments and promises William has made.
- **decisions.md** — Running log of key decisions with context and rationale.

## Session Files

Claude writes a session summary at the end of each session (or when context is getting long). Format:

```markdown
---
date: YYYY-MM-DD
tags: [session]
---
# Session: YYYY-MM-DD

## Topics Discussed
- Topic 1
- Topic 2

## Decisions Made
- Decision with rationale

## Action Items Generated
- [ ] Task → due date
- [ ] Task → due date

## People Referenced
- [[person]] - context
```

## Rules

- Claude reads the last 2-3 session logs at the start of each session for continuity
- Commitments and decisions are the most important — always keep these updated
- Session logs are append-only — don't edit past sessions
