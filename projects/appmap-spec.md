# AppMap — Automated App Flow Visualization

**Status:** Spec / Ideation
**Type:** Open-source tool + Claude Code skill
**Origin:** 2026-02-16 brainstorm session

---

## Result

A tool that automatically generates a visual, interactive map of every screen and flow in a mobile app — usable by both humans (for QA, docs, marketing) and AI agents (for codebase understanding).

## Purpose

- **For me:** See exactly how Maxa looks and flows at any point, without manually clicking through the app. Feed structured context to Claude so it understands the app deeply.
- **For the world:** An open-source, AI-native tool that any developer can add to their project to get living, visual documentation of their app.

## How It Works

### The Loop

```
1. Claude skill reads the codebase
   → Understands screens, navigation, routes

2. Skill generates Maestro .yaml flow scripts
   → One flow per navigation path
   → Each script: launch → navigate → screenshot at each screen

3. Maestro runs the flows on a simulator
   → Captures timestamped screenshots
   → Records which taps led where

4. Tool processes output → generates:
   → Interactive HTML canvas (the visual map)
   → Structured .app-map/ folder (the AI context)

5. (Future) Runs in CI on every merge
   → Map is always in sync with production
```

### The Key Insight

**The AI is the crawler.** Instead of building a dumb screen-tapper that blindly explores the app, Claude reads the codebase, understands the navigation structure, and writes intelligent Maestro scripts. This means:
- It understands *intent*, not just DOM elements
- It can name screens meaningfully
- It can identify which flows matter
- It can update scripts when the code changes

---

## Output: Two Artifacts

### 1. Interactive HTML Canvas (for humans)

A standalone `.html` file you open in a browser:
- Pan and zoom around a spatial layout of all screens
- Each screen is a screenshot node
- Arrows between nodes show navigation (labeled with the tap target)
- Click a screen to see details (route, components, interactive elements)

Think: a whiteboard with every screen laid out and connected.

### 2. Structured AI Context (for agents)

```
.app-map/
  overview.md              # High-level: all screens, navigation graph
  graph.json               # Machine-readable: nodes + edges + metadata
  flowchart.html           # The interactive visual
  screens/
    home/
      screenshot.png       # Current screenshot
      screen.md            # Route, components, interactive elements, connections
    quiz-start/
      screenshot.png
      screen.md
    quiz-question/
      screenshot.png
      screen.md
    settings/
      screenshot.png
      screen.md
    ...
```

**Progressive disclosure for AI:**
- `overview.md` gives Claude the full picture in ~50 lines
- It can drill into `screens/<name>/screen.md` for detail on a specific screen
- `graph.json` can be loaded programmatically for analysis
- Screenshots give visual context when needed

---

## Architecture Decisions

### Why Maestro (not Playwright)
- Maxa is an Expo/React Native mobile app → Maestro is built for mobile
- Maestro drives iOS Simulator / Android Emulator natively
- Playwright is for web → could be added later for web apps

### Why Claude Skill (not standalone CLI)
- The core value is AI understanding the codebase to generate flows
- A skill integrates directly into the dev workflow
- Can be triggered manually (`/appmap`) or from CI (`claude --skill appmap`)

### Why not a real crawler
- Mobile apps have complex state (auth, onboarding, conditional screens)
- A blind crawler would miss context-dependent flows
- The AI can read the code and understand: "this screen only shows if the user hasn't completed onboarding"
- The AI can set up the right preconditions in each Maestro script

---

## Screen Detection Logic

**What counts as a "screen":**
- A distinct route/page in Expo Router (each file in `app/` directory)
- Modals that cover the full screen or substantially change the view

**What counts as a "connection":**
- A tappable element on Screen A that navigates to Screen B
- Defined by: the element tapped + the resulting screen

**What is NOT a screen (v1):**
- In-screen state changes (dropdown open, tab switch within a screen)
- Toast notifications, small overlays
- (These could be added later as "sub-states" that expand on click)

---

## V1 Scope (Maxa-specific, manual run)

**In scope:**
- [ ] Claude skill that reads Expo Router file structure
- [ ] Skill generates Maestro `.yaml` flows for each screen/path
- [ ] Maestro runs flows on iOS Simulator, captures screenshots
- [ ] Script processes Maestro output → generates `.app-map/` folder
- [ ] Simple HTML canvas with screenshots as nodes + arrows as connections
- [ ] `overview.md` and per-screen `.md` files for AI context

**Out of scope (v1):**
- CI integration (v2)
- Automatic re-runs / drift detection (v2)
- Sub-screen state variants (v2)
- Playwright / web support (v2+)
- Package distribution / npm publish (v2+)

### V1 Dependencies
- Maestro installed locally (`brew install maestro`)
- Maxa app running on iOS Simulator
- Claude Code with skill access

---

## V2+ Roadmap

1. **CI integration** — Run on every merge to main. Commit updated `.app-map/` automatically.
2. **State variants** — Expand a screen node to see logged-in vs logged-out, empty state vs populated, error states.
3. **Drift detection** — Compare current screenshots to previous run, flag visual regressions.
4. **Playwright support** — Same tool for web apps.
5. **npm package** — `npx appmap init` to add to any project.
6. **Screenshot export** — One-click download of any screen for marketing/App Store assets.

---

## Open Questions

1. **Naming:** "AppMap" is the working name. Could conflict with existing tools. Alternatives: FlowSnap, ScreenGraph, AppAtlas, NavMap?
2. **Canvas library:** What to use for the interactive HTML? Options: plain Canvas API, D3.js, tldraw embed, Excalidraw embed, or a simple custom SVG layout.
3. **Layout algorithm:** How to arrange screens spatially? Tree layout (root = home)? Force-directed graph? Manual arrangement with saved positions?
4. **Auth handling:** How does Maestro handle screens that require login? The skill would need to generate a "login first" preamble flow.
5. **Screenshot consistency:** Simulator screenshots include the status bar, notch, etc. Strip those for cleaner visuals, or keep for realism?

---

## Why This Matters (RPM)

**Result:** A living visual map of Maxa that keeps AI context accurate and makes QA instant.

**Purpose:**
- Ship Maxa faster by having Claude always understand the current state of the app
- Catch visual bugs before users do
- Get App Store screenshots for free
- Build something useful for the broader dev community (open source reputation, content material)

**Massive Action Plan:**
1. Build the Claude skill (v1) for Maxa
2. Use it daily during Maxa development
3. Open source it once it's proven
4. Write about it (content strategy synergy)
5. Add CI integration when Maxa has a proper pipeline

---

*Note: This replaces/upgrades the "Create custom Claude skill for design QA" task in [projects/active.md](active.md).*
