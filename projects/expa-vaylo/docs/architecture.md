# Architecture

## System Overview

```mermaid
graph TB
    subgraph "Frontend"
        FW["Framer Website<br/>(expa.no / exparesor.se)"]
        FC["Framer Custom Code<br/>(booking widget, forms)"]
    end

    subgraph "Backend"
        BS["BuildShip<br/>(workflow automation)"]
        SYNC["Framer CMS Data Sync<br/>(BuildShip workflow)"]
    end

    subgraph "Data"
        CMS["Framer CMS<br/>(trips, destinations, content)"]
        DB["Database / API<br/><!-- TODO: specify -->"]
    end

    subgraph "Vaylo"
        VY["Vaylo Platform<br/><!-- TODO: describe -->"]
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

<!-- TODO: Verify this diagram matches reality and adjust -->

## How the Pieces Fit Together

### Framer — Website & CMS

Framer is both the **website builder** and **content management system**.

- Public-facing website built in Framer
- Trip data, destinations, and content managed in Framer CMS
- Custom code components handle interactive elements (booking widget, forms)

<!-- TODO: Are expa.no and exparesor.se separate Framer projects or one? -->

### BuildShip — Backend Workflows

BuildShip handles serverless backend logic:

- **Framer CMS Data Sync** — syncs CMS data to external systems
- <!-- TODO: List other workflows -->

### Vaylo — Booking Platform

<!-- TODO: Describe what Vaylo provides and how it integrates
  - Booking engine? Trip management?
  - APIs? Webhooks? Direct DB?
  - What did Vaylo already own vs. what's being inherited?
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
    CMS->>BS: CMS Data Sync triggers
    BS->>Vaylo: Synced data pushed

    User->>Framer: Visits website
    Framer->>CMS: Loads trip data
    Framer-->>User: Displays trips & availability

    User->>Framer: Initiates booking
    Framer->>BS: Booking request (custom code)
    BS->>Vaylo: Process booking
    Vaylo-->>BS: Confirmation
    BS-->>Framer: Booking confirmed
    Framer-->>User: Confirmation shown
```

<!-- TODO: Verify this flow is accurate -->

## Environments

| Environment | URL | Notes |
|---|---|---|
| Production (NO) | <!-- TODO --> | |
| Production (SE) | exparesor.se | |
| Staging | <!-- TODO: does one exist? --> | |
| BuildShip | <!-- TODO: project URL --> | |
| Framer | <!-- TODO: project URL --> | |

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Website | Framer | Website builder + CMS |
| Custom code | JavaScript (Framer) | Booking widget, interactive components |
| Backend | BuildShip | Serverless workflows, data sync |
| Booking platform | Vaylo | <!-- TODO --> |
| <!-- TODO --> | <!-- TODO --> | Other services? |
