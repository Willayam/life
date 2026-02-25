---
date: 2026-02-25
tags: [technology, ai, productivity, framework, architecture]
source: "Research session - Claude + web sources"
related_to: ["[[overview]]", "[[Claude]]", "[[always-on-life-server-architecture]]"]
---

# Personal Knowledge Management Architecture for AI

Research on how to structure a personal knowledge system optimized for LLM consumption (Claude as personal assistant).

## Core Decision: Markdown + Git > Database

**Why markdown wins for AI consumption:**
- LLMs read markdown natively - no serialization/translation layer needed
- Markdown is literally the format AI models are trained on
- Git gives versioning for free (full history, not just current state)
- Local-first = no service dependency, no API limits, no subscription
- Portable forever - no vendor lock-in (Obsidian, VS Code, any future AI system)
- Files are debuggable - open and read, no tooling needed to inspect

**When a database becomes relevant:**
- Building a web/mobile app UI on top of the data
- Ingesting thousands of records (years of emails, calendar events)
- Needing semantic/vector search across large corpus
- Running structured analytics at scale
- If needed later: Convex (TypeScript-native, AI-friendly) or Supabase (PostgreSQL, open source) are top choices

**The hybrid principle:** Markdown for curated high-level context (fits in prompt). Database only for large-scale retrieval when knowledge exceeds context window.

## Architecture Principles

### "Structured enough to query, flat enough to read"
- YAML frontmatter for machine-queryable metadata
- Markdown body for narrative context
- Wiki-links for relationships
- Index files for cross-cutting views
- Git for versioning and portability

### Context Engineering Layers (Anthropic's framework)
1. System rules (`Claude.md`)
2. Long-term memory (persistent facts: people, preferences, principles)
3. Retrieved documents (knowledge base entries pulled on demand)
4. Tool schemas (what Claude can do)
5. Recent conversation (session context)
6. Current task (immediate request)

### Memory Persistence Rules
Only persist facts that are:
- **Durable** - likely true across sessions
- **Actionable** - changes what Claude recommends
- **Explicit** - stated by user, not inferred

## Structural Improvements Needed

### 1. Session Memory (`memory/`)
Biggest gap: no continuity between Claude sessions. Need:
- `memory/sessions/YYYY-MM-DD.md` - topics discussed, decisions made, action items
- `memory/commitments.md` - single source of truth for open commitments
- `memory/decisions.md` - running log of key decisions with rationale

### 2. Index Files (`indexes/`)
Cross-cutting views maintained by Claude:
- `indexes/tasks.md` - all open action items, single source of truth
- `indexes/waiting-for.md` - things waiting on others
- `indexes/interactions.md` - recent interactions log

### 3. Consistent Frontmatter Schemas
Every entity type needs standardized YAML fields:

**Person:** name, relationship, tags, company, location, met, last_contact, next_followup, connected_to, projects
**Project:** name, status, type, priority, started, target_date, revenue_monthly, people, tags
**Knowledge:** date, tags, source, related_to, confidence
**Interaction:** date, type, people, project, summary

### 4. Bidirectional Cross-References
- Person files list `projects: ["[[maxa]]"]`
- Project files list `people: ["[[frida]]"]`
- Creates traversable knowledge graph without a graph database

### 5. Interaction Logging
After meetings/important emails, write summary to relevant person file. This is "manual ETL curated by AI" - higher quality than automated sync because Claude filters for what matters.

## External Data Sync Strategy

**Current (on-demand via MCP):** Claude queries Gmail/Calendar when asked. Zero infrastructure. Always fresh.

**Enhancement:** After significant interactions, Claude writes summaries into person files and daily notes. Persistent, curated record without sync infrastructure.

**Future (if scale demands it):**
- n8n (self-hosted) for automated sync pipelines
- Periodic ETL scripts to write emails/events as markdown
- Vector embeddings for semantic search over large corpus

## Tools & References

- **Anthropic Knowledge Graph Memory MCP** - JSONL-based entity/relation store for cross-session memory
- **Obsidian Dataview** - SQL-like queries over frontmatter fields
- **Obsidian Bases** - Native database-like views (queries YAML frontmatter only)
- **n8n** - Self-hosted workflow automation for Google API sync

## Sources

- [Anthropic: Effective Context Engineering for AI Agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [OpenAI Cookbook: Context Engineering for Personalization](https://developers.openai.com/cookbook/examples/agents_sdk/context_personalization/)
- [AI Agent Memory Management: When Markdown Files Are All You Need](https://dev.to/imaginex/ai-agent-memory-management-when-markdown-files-are-all-you-need-5ekk)
- [Markdown: The Best Text Format for Training AI Models](https://blog.bismart.com/en/markdown-ai-training)
- [Convex: The Database Designed to Be Generated](https://www.convex.dev/ai)
