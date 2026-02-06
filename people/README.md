# People

A personal CRM. One file per person. Track relationships, context, notes, and follow-ups.

## How This Works

- One `.md` file per person, named `firstname-lastname.md`
- YAML frontmatter with structured data (relationship, tags, contact info)
- Body contains notes, history, context, and follow-up items
- Claude can search across all people files for context before meetings, follow-ups, etc.

## When to Create a New Person File

- Anyone you want to maintain a relationship with
- Business contacts and collaborators
- People from Platinum Partnership network
- Anyone with open follow-ups or action items

## Template

```markdown
---
name: "First Last"
relationship: [partner|family|friend|collaborator|client|mentor|network]
tags: [relevant, tags]
company:
location:
met:
last_contact:
---

# First Last

## Who They Are
_Brief context - what do they do, how did we meet, what's the connection_

## Notes
_Ongoing notes from interactions_

## Follow-ups
- [ ] Action items related to this person
```
