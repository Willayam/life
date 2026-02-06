# Knowledge Base

Flat folder. No subfolders. Everything is a single note with tags.

## How This Works

- Every note is a `.md` file in this folder
- Notes are tagged using YAML frontmatter `tags: [topic1, topic2]`
- Notes link to each other and to other files in the vault using `[[wiki-links]]`
- Claude can search by tags, content, or links to find relevant knowledge

## Tag Conventions

Use pluralized tags. Common tags:

**Domains:** `productivity`, `business`, `health`, `relationships`, `parenting`, `finances`, `technology`, `ai`, `design`, `marketing`, `sales`, `psychology`

**Types:** `framework`, `insight`, `lesson`, `idea`, `quote`, `principle`

**Sources:** `books`, `podcasts`, `courses`, `conversations`, `experience`

## Importing Notes

Old notes from Obsidian, Coda, and Apple Notes can be imported here. Each note gets:
1. A clear filename (kebab-case, descriptive)
2. YAML frontmatter with date, tags, and source
3. Content cleaned up into markdown

## Example Note

```markdown
---
date: 2026-02-06
tags: [productivity, framework, books]
source: "Getting Things Done - David Allen"
---

# GTD Core Loop

Capture → Clarify → Organize → Reflect → Engage

The key insight is that your brain is for having ideas, not holding them...
```
