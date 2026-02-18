---
name: email-rules
description: Process William's Gmail inbox using learned email rules. Use when asked to check, triage, or clean up email.
---

# Email Processing Rules

When processing William's inbox, follow these rules exactly. When William corrects a decision, update the rules below immediately.

## Workflow

1. **Fetch unread/inbox emails** using Gmail MCP tools
2. **Classify each email** against the rules below
3. **Present a summary** grouped by action type before taking any action
4. **Wait for approval** before archiving or labeling
5. **Update rules** if William corrects any classification

## Auto-Archive (skip labeling, just archive)

These get archived immediately (still show in summary):

- Google Calendar notifications (from `calendar-notification@google.com`)
- Marketing/promotional emails with "sale", "discount", "% off" from retail senders
- Social media notifications (Facebook, Instagram, Twitter) — **not** LinkedIn
- App update notifications ("new version available", "update your app")
- Two-factor auth codes older than 1 day

## Auto-Label Patterns

Apply these labels automatically:

| Sender / Pattern | Labels | Notes |
|---|---|---|
| Anthropic receipts | Receipt + Expense | Always business |
| Coda receipts | Receipt + Expense | Always business |
| Wispr Flow receipts | Receipt + Expense | Always business |
| Google Workspace invoices | Receipt + Expense | Always business |
| Google Cloud invoices | Receipt + Expense | Always business |
| Figma receipts | Receipt + Expense | Always business |
| Mobbin receipts | Receipt + Expense | Always business |
| BILL/Inkarnate | — | This is **income**. Leave in inbox. |
| Fortnox with "paminnelse" or "faktura" | Receipt + 1-Action | Needs paying |

## Uncertain — Always Ask William

Never auto-process these. Present them and ask:

- **Apple receipts** — could be personal or business (check specific charge)
- **SAS/travel bookings** — could be work or personal
- **Audible** — fiction = personal, business/productivity = Expense
- **IKEA** — almost always personal, sometimes office supplies
- **Tesla** — personal or company car?
- **Balanzen** — wellness: personal or company health benefit?
- **one.com domain charges** — check which domain (williamlarsten.com = business)

## Principles

1. **When in doubt, DON'T archive** — leave in inbox and ask
2. **Financial emails always get Receipt label**, even if personal
3. **Never auto-archive anything from a real person** (not a noreply address)
4. **Emails in Swedish follow the same rules** as English
5. **Always show summary before acting** — group by type, let William approve
6. **When William corrects a decision, update this skill file immediately**
