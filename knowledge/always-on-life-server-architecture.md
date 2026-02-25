---
date: 2026-02-25
tags: [technology, infrastructure, ai, architecture]
source: "Research session - Claude + web sources"
related_to: ["[[personal-knowledge-management-architecture]]", "[[overview]]"]
---

# Always-On Life Server Architecture

Research on running a personal server that keeps the life OS synced, accessible from any device, and always up-to-date with email/calendar/contacts.

## The Problem

- Gmail/Calendar integrations only work during active Claude sessions
- Vault is only accessible on the device it's stored on
- No background processing = no proactive sync of external data
- Can't check tasks, schedule, or email summaries from phone

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              ALWAYS-ON SERVER                    │
│              (Mac Mini / N100 / Pi / VPS)        │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │ Cron Jobs │  │ Git Repo │  │  Tailscale   │  │
│  │           │  │ (source  │  │  (secure     │  │
│  │ • Gmail   │  │  of      │  │   access     │  │
│  │   sync    │  │  truth)  │  │   from       │  │
│  │ • Cal     │  │          │  │   anywhere)  │  │
│  │   sync    │  │          │  │              │  │
│  │ • git     │  │          │  │              │  │
│  │   push    │  │          │  │              │  │
│  └──────────┘  └──────────┘  └──────────────┘  │
└─────────────────────────────────────────────────┘
         │                          │
         ▼                          ▼
┌─────────────┐            ┌──────────────┐
│  GitHub     │            │ Your Devices │
│  (remote    │◄──────────►│              │
│   backup)   │  git sync  │ • Laptop     │
│             │            │ • Phone      │
│             │   (Obsidian)│ • iPad      │
└─────────────┘            └──────────────┘
```

## Hardware Options

| Option | Upfront | Monthly | Idle Power | Best For |
|--------|---------|---------|-----------|----------|
| **Mac Mini M2/M4** | 8-15K SEK | ~15 SEK elec | 5-15W | Already wanted, runs local AI, multi-purpose |
| **Intel N100 Mini PC** | 1.5-3K SEK | ~10 SEK elec | 6-8W | Best value, x86, runs everything |
| **Raspberry Pi 5** | ~1.2K SEK | ~4 SEK elec | 2.7W | Cheapest, ultra-low power |
| **Hetzner VPS** | 0 SEK | ~40 SEK/mo | N/A | Zero hardware, always accessible |

**Decision:** Mac Mini is the long-term play (multi-purpose: server + local AI + media). For testing the concept first: Hetzner VPS at ~40 SEK/month, or a Raspberry Pi 5 if hardware is preferred.

## Component 1: Tailscale (Access from Anywhere)

- Free for personal use (up to 100 devices)
- Mesh VPN using WireGuard — encrypted, no port forwarding needed
- Each device gets stable `100.x.y.z` IP
- MagicDNS: access server by hostname, not IP
- SSH into server from anywhere (phone, café, travel)
- 5 minutes to set up per device

## Component 2: Vault Sync Across Devices

**Option A: Obsidian Sync ($4/month annual)**
- Zero-friction mobile experience
- E2E encrypted, conflict resolution built in
- "It just works" — best for iOS

**Option B: Git-based (free)**
- Server: cron auto-commits + pushes every 5 min
- Desktop: Obsidian Git plugin (auto-pull/push)
- iOS: Working Copy app ($25 one-time) + Obsidian
- More control, full version history, but mobile workflow is clunkier

**Option C: Syncthing + Git (free, real-time)**
- Syncthing for real-time peer-to-peer file sync
- Git for version history and backup
- Great on Android/desktop, weak on iOS

**Recommendation:** Obsidian Sync for the mobile experience. It's worth $4/month. Git remains the versioning + backup layer regardless.

## Component 3: Background Sync Scripts

Adapt existing Gmail/Calendar scripts to run on a schedule and write markdown:

```
Cron Schedule:
  Every 15 min  → Sync unread emails → sync/email-digest.md
  Every hour    → Sync calendar → sync/today-schedule.md
  Every night   → Full daily briefing → daily notes
  Every 5 min   → Git auto-commit + push if changes
```

### Sync Script Architecture

```
~/sync/
  sync-gmail.js        # Fetch new emails → markdown
  sync-calendar.js     # Fetch calendar events → markdown
  sync-contacts.js     # Fetch contacts → update people/
  sync-all.sh          # Runs all three, then git commit + push
  config.json          # OAuth tokens, sync cursors
  logs/                # Timestamped log files
```

### Key Google API Techniques
- **Gmail:** Use `historyId` for incremental sync (only fetch new messages)
- **Calendar:** Use `syncToken` (only fetch changed events)
- **Contacts:** Use `syncToken` for incremental updates
- All support offline refresh tokens for unattended operation

### n8n vs Cron Scripts

n8n (self-hosted workflow automation) provides a visual UI and built-in Google API nodes, but it's a heavy always-running process (~100-300MB RAM idle). For 3 sync jobs, cron scripts are simpler, lighter, and more debuggable. n8n becomes worth it if sync complexity grows significantly.

## Component 4: Claude Integration

**Sync layer (no AI needed):** Cron scripts fetch raw data and write structured markdown. Cheap, reliable, always running.

**Optional AI enrichment:** Claude API (Haiku model) can summarize emails, generate daily briefings, tag/categorize notes. Called from sync scripts when valuable. Very cheap per call.

**Interactive sessions:** SSH into server via Tailscale → run Claude Code for complex analysis, reorganization, weekly reviews. Same as current workflow but accessible from anywhere.

## What This Gets You

- Wake up → open Obsidian on phone → see today's calendar, unread email summary, open tasks
- Start Claude session → reads latest sync files + recent session logs → full context immediately
- Everything versioned in git, backed up to GitHub, synced to all devices
- No dependency on any single cloud service
- Markdown files remain the source of truth — portable forever

## Cost Estimates

**Cheapest path (Pi 5 + git sync):** ~1,200 SEK upfront, ~50 SEK/year ongoing
**Comfort path (N100 + Obsidian Sync):** ~2,500 SEK upfront, ~700 SEK/year
**Mac Mini path (long-term):** ~10,000 SEK upfront, ~700 SEK/year
**VPS path (no hardware):** ~500 SEK/year + ~500 SEK Obsidian Sync

## Implementation Order

1. **Obsidian Sync** — get vault on all devices (today, 5 min)
2. **Tailscale** on laptop + phone — practice accessing things remotely (today, 5 min)
3. **Server hardware** — Mac Mini, Pi, or VPS (when ready)
4. **Adapt sync scripts** — modify existing Gmail/Calendar tools to write markdown
5. **Cron jobs** — schedule the sync scripts on server
6. **Git auto-sync** — auto-commit and push changes from server

Steps 1-2 are zero-cost, zero-risk, and give immediate value.

## Sources

- [Tailscale Pricing & Quickstart](https://tailscale.com/pricing)
- [Obsidian Sync Pricing](https://obsidian.md/pricing)
- [Jeff Geerling - N100 vs Raspberry Pi](https://www.jeffgeerling.com/blog/2025/intel-n100-better-value-raspberry-pi/)
- [Hetzner Cloud Pricing](https://www.hetzner.com/cloud)
- [Google Calendar API - Sync Efficiently](https://developers.google.com/workspace/calendar/api/guides/sync)
- [n8n Community - Setup on Pi 5](https://community.n8n.io/t/how-to-setup-n8n-on-a-raspberry-pi-5-local-setup/120609)
