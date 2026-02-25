---
date: 2026-02-25
tags: [memory, decisions]
updated: 2026-02-25
---

# Decision Log

Running log of key decisions with context and rationale. Newest first.

---

## 2026-02-25 — PKM Architecture: Stay with Markdown + Git

**Decision:** Keep the markdown-in-git vault as the primary system. Do not migrate to a database (Convex, Supabase, etc.).

**Context:** Researched whether to build a database backend for the life OS to sync contacts, calendar, conversations, etc.

**Rationale:**
- LLMs read markdown natively — no translation layer needed
- Portability: markdown files work everywhere, forever
- Git gives versioning for free
- Local-first = no service dependency
- A database only makes sense if building a web/mobile app on top of the data

**What instead:** Improve structure with session memory, index files, consistent frontmatter, cross-references.

See: [[personal-knowledge-management-architecture]]

---

## 2026-02-25 — Always-On Server: Mac Mini Long-Term, Start with Obsidian Sync + Tailscale

**Decision:** Build toward a Mac Mini home server for background sync. Start with Obsidian Sync ($4/month) and Tailscale (free) for immediate cross-device access.

**Context:** Needed vault accessible from all devices and background sync of email/calendar.

**Rationale:**
- Mac Mini serves multiple purposes (server, local AI, media)
- Obsidian Sync is worth $4/month for zero-friction mobile experience
- Tailscale gives secure access from anywhere for free
- Cron scripts on the server adapt existing Gmail/Calendar tools

See: [[always-on-life-server-architecture]]

---

## 2026-02-16 — Salary: 52,000 SEK/month

**Decision:** Set company salary at 52,000 SEK/month gross.

**Context:** Need consistent salary history for SGI (parental leave payout). Baby due July 2026.

**Rationale:** Balances maximizing SGI with keeping enough in the company for operations. Must be paid consistently on the 25th each month Feb-Jul.

---

## 2026-02-20 — Clarity Deal: 50/50 Profit Share

**Decision:** Accept 50/50 net profit split with Clarity.video. $1K/month floor. William covers dev costs.

**Context:** Meeting with Todd, Mikey, Joe. Previously paid $10K/month for a 2-month sprint.

**Rationale:**
- Low downside ($1K floor guarantees minimum)
- High upside if platform grows
- Skin in the game aligns incentives
- Equity conversation after 2-3 months of proven results
- Todd's audience = distribution channel
