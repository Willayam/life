# Framer - Custom Code & CMS

## Overview

The Expa Travel website is built in Framer, which serves as both the website builder and content management system.

<!-- TODO: Add Framer project URL(s) -->
<!-- TODO: Confirm if expa.no and exparesor.se are separate Framer projects or one -->

## CMS Structure

The Framer CMS manages trip and travel content. Key collections:

<!-- TODO: List all CMS collections. Example structure below — update with actual fields -->

### Trips Collection

| Field | Type | Notes |
|---|---|---|
| `title` | Text | Trip name |
| `destination` | Text | Where the trip goes |
| `capacity` | **Number** | Max participants — **must be a number, not string** (see [known issue](./open-issues.md#cms-data-sync-capacity-type-error)) |
| `price` | Number | Trip price |
| `start_date` | Date | |
| `end_date` | Date | |
| `description` | Rich Text | |
| `image` | Image | |
| <!-- TODO --> | <!-- TODO --> | Add remaining fields |

<!-- TODO: Add other CMS collections (destinations, categories, etc.) -->

## Custom Code Components

Framer allows embedding custom code (JavaScript/React). The following custom components exist in the Expa project:

<!-- TODO: For each custom code component, paste the actual code below -->

### 1. Booking Widget

<!-- TODO: Describe what the booking widget does -->
<!-- TODO: Paste the custom code -->

```javascript
// TODO: Paste booking widget code here
```

### 2. <!-- TODO: Name -->

```javascript
// TODO: Paste next custom code component
```

## How to Edit

1. Log into Framer (see [access.md](./access.md))
2. Open the Expa project
3. CMS data: Go to CMS panel (left sidebar) → select collection → edit entries
4. Custom code: Select the code component on the canvas → click "Edit Code"
5. Publish: Click "Publish" in top-right to push changes live

## Important Notes

- **CMS field types matter** - BuildShip data sync expects specific types. If a field is defined as `Number`, the CMS must contain a number value, not a string like `"20"`. See [open issues](./open-issues.md).
- **Custom code runs client-side** - All custom JavaScript executes in the visitor's browser
- <!-- TODO: Any other gotchas or important notes -->
