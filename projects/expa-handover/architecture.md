# Architecture Overview

## System Diagram

```mermaid
graph TB
    subgraph "Frontend"
        FW["Framer Website<br/>(expa.no / exparesor.se)"]
        FC["Framer Custom Code<br/>(booking widget, forms)"]
    end

    subgraph "Backend / Workflows"
        BS["BuildShip<br/>(workflow automation)"]
        SYNC["Framer CMS Data Sync<br/>(BuildShip workflow)"]
    end

    subgraph "Data"
        CMS["Framer CMS<br/>(trips, destinations, content)"]
        DB["Database / API<br/><!-- TODO: specify -->"]
    end

    subgraph "Vaylo / Strativ"
        VY["Vaylo Platform<br/><!-- TODO: describe relationship -->"]
    end

    FW --> FC
    FC -->|"API calls"| BS
    CMS -->|"data sync"| SYNC
    SYNC -->|"transforms & pushes"| DB
    BS <-->|"integration"| VY
    VY -->|"booking data"| FW

    style FW fill:#6c5ce7,color:#fff
    style BS fill:#00b894,color:#fff
    style VY fill:#fdcb6e,color:#000
    style CMS fill:#74b9ff,color:#000
```

## How the Pieces Fit Together

### Framer → Website & CMS

Framer serves as both the **website builder** and **content management system** for Expa Travel.

- The public-facing website is built in Framer
- Trip data, destinations, and content are managed in Framer CMS
- Custom code components handle interactive elements (booking widget, forms)

<!-- TODO: Confirm if there are separate Framer projects for expa.no vs exparesor.se, or one project -->

### BuildShip → Backend Workflows

BuildShip handles serverless backend logic:

- **Framer CMS Data Sync** - Syncs CMS data between Framer and external systems
  - Known issue: type mismatch on `capacity` field (expects number, gets string) — see [open-issues.md](./open-issues.md)
- <!-- TODO: List other BuildShip workflows -->

### Vaylo → Booking Platform

<!-- TODO: Describe the Vaylo/Strativ platform relationship -->
<!-- Questions to answer:
  - What does Vaylo provide? (booking engine? trip management?)
  - How does data flow between Framer and Vaylo?
  - Are there APIs? Webhooks? Direct DB connections?
  - What does Erik's team at Vaylo already own vs. what they're inheriting?
-->

## Data Flow

```mermaid
sequenceDiagram
    participant User as Website Visitor
    participant Framer as Framer Website
    participant CMS as Framer CMS
    participant BS as BuildShip
    participant Vaylo as Vaylo Platform

    Note over CMS: Trip data managed here
    CMS->>BS: CMS Data Sync workflow triggers
    BS->>Vaylo: Synced data pushed to Vaylo

    User->>Framer: Visits website
    Framer->>CMS: Loads trip data
    Framer-->>User: Displays trips & availability

    User->>Framer: Initiates booking
    Framer->>BS: Booking request (custom code)
    BS->>Vaylo: Process booking
    Vaylo-->>BS: Confirmation
    BS-->>Framer: Booking confirmed
    Framer-->>User: Confirmation displayed
```

<!-- TODO: Verify this flow is accurate. Adjust arrows and participants as needed. -->

## Environments

| Environment | URL | Notes |
|---|---|---|
| Production (NO) | <!-- TODO --> | Live site |
| Production (SE) | exparesor.se | Live site |
| Staging | <!-- TODO: does one exist? --> | |
| BuildShip | <!-- TODO: BuildShip project URL --> | Backend workflows |
| Framer | <!-- TODO: Framer project URL --> | Website editor |

## Tech Stack Summary

| Layer | Technology | Purpose |
|---|---|---|
| Website | Framer | Website builder + CMS |
| Custom code | JavaScript (Framer) | Interactive components, booking widget |
| Backend | BuildShip | Serverless workflows, data sync |
| Booking platform | Vaylo | <!-- TODO: describe --> |
| <!-- TODO --> | <!-- TODO --> | Any other services? |
