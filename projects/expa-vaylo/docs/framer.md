# Framer — Website & CMS

## Overview

The Expa Travel website is built in Framer, serving as both the website builder and content management system.

<!-- TODO: Add Framer project URL(s) -->
<!-- TODO: Confirm if expa.no and exparesor.se are separate Framer projects -->

## CMS Structure

Framer CMS manages all trip and travel content.

<!-- TODO: List all CMS collections and update the fields below with actual data -->

### Trips Collection

| Field | Type | Notes |
|---|---|---|
| `title` | Text | Trip name |
| `destination` | Text | |
| `capacity` | **Number** | Max participants — must be a number, not string. See [known issue](./open-issues.md#cms-data-sync-capacity-type-error) |
| `price` | Number | |
| `start_date` | Date | |
| `end_date` | Date | |
| `description` | Rich Text | |
| `image` | Image | |
| <!-- TODO --> | <!-- TODO --> | Add remaining fields |

<!-- TODO: Document other CMS collections (destinations, categories, etc.) -->

## Custom Code Components

Framer allows custom JavaScript/React code. The following components exist:

<!-- TODO: For each component, paste the actual source code into /code/ and describe it here -->

### 1. Booking Widget

<!-- TODO: What does it do? How does a visitor interact with it? -->

Source: [`/code/booking-widget.js`](../code/booking-widget.js)

### 2. <!-- TODO: next component -->

Source: [`/code/TODO.js`](../code/TODO.js)

## How to Edit

1. Log into Framer (see [access.md](./access.md))
2. Open the Expa project
3. **CMS data:** CMS panel (left sidebar) → select collection → edit entries
4. **Custom code:** Select code component on canvas → "Edit Code"
5. **Publish:** Click "Publish" top-right to push changes live

## Important Notes

- **CMS field types matter** — BuildShip expects specific types. A `Number` field must contain `20`, not `"20"`.
- **Custom code runs client-side** — all JavaScript executes in the visitor's browser
- <!-- TODO: Other gotchas? -->
