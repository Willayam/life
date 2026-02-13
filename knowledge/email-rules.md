---
tags: [systems, email, automation]
updated: 2026-02-13
---

# Email Processing Rules

Living document. Claude reads this before processing inbox and updates it when William corrects a decision.

## Auto-Archive (skip labeling, just archive)
- Google Calendar notifications (from calendar-notification@google.com)
- Marketing/promotional emails with "sale", "discount", "% off" from retail senders
- Social media notifications (Facebook, Instagram, Twitter) — not LinkedIn
- App update notifications ("new version available", "update your app")
- Two-factor auth codes older than 1 day

## Auto-Label Patterns Learned
- Anthropic receipts → Receipt + Expense (always business)
- Coda receipts → Receipt + Expense (always business)
- Wispr Flow receipts → Receipt + Expense (always business)
- Google Workspace invoices → Receipt + Expense (always business)
- Google Cloud invoices → Receipt + Expense (always business)
- Figma receipts → Receipt + Expense (always business)
- Mobbin receipts → Receipt + Expense (always business)
- BILL/Inkarnate → NOT expense, this is income. Leave in inbox.
- Fortnox invoices with "påminnelse" or "faktura" → Receipt + 1-Action (needs paying)

## Uncertain — Always Ask William
- Apple receipts (could be personal or business — check the specific charge)
- SAS/travel bookings (could be work or personal travel)
- Audible (fiction = personal, business/productivity books = Expense)
- IKEA (almost always personal, but sometimes office supplies)
- Tesla (personal or company car?)
- Balanzen (wellness — personal or company health benefit?)
- one.com domain charges (check which domain — williamlarsten.com = business)

## Principles
- When in doubt, DON'T archive — leave in inbox and ask
- Financial emails always get Receipt label, even if personal
- Never auto-archive anything from a real person (not a noreply address)
- Emails in Swedish follow the same rules as English
- Show archive summary before archiving — group by type, let William approve
- When William corrects a decision, update this file immediately
