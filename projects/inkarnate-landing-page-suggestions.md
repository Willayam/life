---
date: 2026-02-11
project: inkarnate
tags: [projects, inkarnate, landing-page, ux, ui, suggestions]
type: planning
---

> Part of [[inkarnate]] project

# Inkarnate Landing Page — UI/UX Suggestions for Ingmar

Brainstorm of directions for improving the Inkarnate web experience, split into **large structural changes** (requires alignment, design, dev effort) vs **isolated papercut improvements** (quick wins, low risk, high impact-per-effort).

Context: Inkarnate 2.0 just shipped (Dec 2025) with new editor UI, custom layers, marketplace, scene stamps. The landing page and marketing site haven't had the same level of attention. This is the moment to align the front door with the product upgrade.

---

## Large Structural Changes

These require product/design alignment and meaningful dev work. Each is a direction to discuss, not a spec.

### 1. Reframe the Homepage Around Outcomes, Not Features

**Problem:** The current homepage leads with "Create Fantasy Maps Online" and a free signup CTA. This is feature-first messaging. It tells you *what* the tool does but not *why it matters to you*.

**Direction:** Shift to outcome-first messaging. The hero should make visitors feel something before they think.

- **Current feel:** Tool description
- **Target feel:** "I can make something incredible, starting now"

**Examples of outcome-first headlines:**
- "Your world deserves a real map"
- "From imagination to map in minutes"
- "The maps you've been picturing — now you can actually make them"

Follow with a stunning full-bleed hero map (best community map, rotated monthly) and a single CTA.

### 2. Social Proof & Community as Core Landing Page Section

**Problem:** Inkarnate has a massive community (Explore page, Champions, Explorers, Discord) but the landing page doesn't showcase this. For a creative tool, seeing what others make is the most powerful conversion driver.

**Direction:** Add a "Made with Inkarnate" gallery section on the homepage — a curated, auto-updating showcase of featured community maps.

- Show 6-9 stunning maps in a responsive grid
- Each links to the Explore page map
- Badge the creator (Champion/Explorer/Featured)
- Subtle "Join 500K+ creators" or similar social proof number

This turns existing community content into a conversion engine.

### 3. Interactive "Try It Now" Experience Before Signup

**Problem:** Current flow is: land on page -> read about features -> sign up -> then see the editor. This is high friction for a tool that sells itself the moment you use it.

**Direction:** Embed a lightweight interactive demo or guided map-creation experience directly on the landing page or as a one-click "try before you sign up" flow.

- Could be a constrained editor (one style, limited assets) that runs without auth
- Or a 60-second guided experience: "Place a mountain. Add a river. Name your kingdom. → Now sign up to keep building"
- Canva, Figma, and Photopea all use this pattern to great effect

This is the biggest structural bet but potentially the highest impact on conversion.

### 4. Rethink the Pricing/Upgrade Page

**Problem:** $25/year is absurdly good value but the pricing comparison between Free/Creator/Studio may not be clear enough. Users on Reddit and review sites often say "just get Pro, it's $25."

**Direction:**
- Lead with the free plan value: "Start for free. Upgrade when you're ready."
- Show a clear visual comparison table (Free vs Creator vs Studio)
- Add a "What you get" visual — show a map made with free assets next to one made with Pro assets. Let the art do the talking.
- Consider a "Most Popular" badge on the annual plan
- Add a FAQ section addressing common hesitations (Can I cancel? What happens to my maps?)

### 5. Dedicated Use-Case Landing Pages

**Problem:** Inkarnate serves multiple distinct audiences (D&D GMs, fantasy authors, worldbuilders, educators, game devs) but the homepage tries to speak to all of them at once.

**Direction:** Create targeted landing pages per audience segment:
- `/dnd` — "Build maps your players will never forget"
- `/authors` — "Bring your fictional world to life"
- `/worldbuilding` — "Every great world starts with a great map"

Each page would show relevant example maps, use-case-specific testimonials, and tailored CTAs. The main homepage stays general, but paid acquisition and content marketing link to targeted pages.

### 6. Onboarding Flow Redesign (Post-Signup)

**Problem:** The gap between "I signed up" and "I made something I'm proud of" is where creative tools lose users. If the first experience is overwhelming (thousands of assets, blank canvas), users bounce.

**Direction:**
- Guided first-map experience: "Choose a style → Pick a template → Customize → Export → Share"
- Template gallery as the default starting point (not a blank canvas)
- "Quick start" vs "Start from scratch" fork
- Progress celebration: "You made your first map!" moment with share prompt

---

## Isolated Papercut Improvements

These are lower effort, lower risk, and can be shipped independently. Good candidates for quick wins.

### A. Hero Image Refresh

**Current state:** The hero section likely hasn't been updated to reflect 2.0's new art quality.

**Fix:** Replace with a stunning 2.0-era map. Rotate seasonally. Consider a subtle parallax or pan animation to bring it to life. The hero image is doing 80% of the selling for a visual product.

### B. Page Load Performance

**Historical issue:** Inkarnate has had reports of slow landing page loads (menus loading slowly, elements popping in).

**Fix:** Audit Core Web Vitals. Lazy-load below-fold images. Ensure hero renders in <1s. Compress all assets. Use modern image formats (WebP/AVIF). This is foundational — nothing else matters if the page is slow.

### C. Navigation Clarity

**Fix:** Simplify top nav to 5 items max. Suggested: `Create` | `Explore` | `Marketplace` | `Pricing` | `Login/Signup`. Remove or collapse secondary items into a dropdown. The nav should feel as clean as the 2.0 editor UI.

### D. CTA Copy & Placement

**Current:** "FREE SIGN-UP" is the primary CTA.

**Issues:** "Free sign-up" emphasizes the cost (free) but not the value. It also sounds transactional.

**Better alternatives:**
- "Start creating" (action-oriented)
- "Make your first map — free" (outcome + free)
- "Create a map now" (immediate, active)

Also: ensure the CTA appears at least 3 times on the page (hero, mid-page after social proof, bottom).

### E. Mobile Experience Polish

**Current state:** Inkarnate's editor is desktop-focused (makes sense), but the marketing site should be flawless on mobile since discovery often happens on phones.

**Fix:** Ensure the landing page is fully responsive. Tap targets large enough. Hero image crops well. CTA is thumb-reachable. No horizontal scrolling. Test on actual devices.

### F. "What's New" / 2.0 Launch Banner

**Opportunity:** Inkarnate 2.0 is a huge update. There should be a prominent but dismissible banner or section on the homepage celebrating it.

**Execution:** "Inkarnate 2.0 is here → See what's new" linking to the updates page. This re-engages returning visitors and signals momentum to new ones.

### G. Explore Page as Landing Page Extension

**Problem:** The Explore page is one of Inkarnate's biggest strengths but it's buried behind nav.

**Fix:** Surface a "Featured Maps" carousel or grid on the homepage. 3-6 maps, auto-curated from featured. Each card shows: map thumbnail, creator name, style tag, clone count. This is low-effort (data already exists) and high-impact.

### H. Testimonials / Reviews Integration

**Current state:** No visible testimonials or review scores on the landing page.

**Fix:** Add a small social proof section. Options:
- Pull from Trustpilot/G2 (if reviews exist there)
- Curate 3 short quotes from community Discord or Reddit
- Show creator spotlights: "I used Inkarnate to illustrate my novel" with photo
- "Used by GMs in 150+ countries" or similar aggregate stat

### I. Footer Cleanup

**Fix:** Ensure the footer has: clear links to Help/FAQ, community Discord, social accounts, Terms/Privacy, and a final CTA ("Ready to start? Create your free account"). Many users scroll to the footer for trust signals.

### J. SEO & Meta Improvements

**Fix:** Ensure each page has unique, descriptive meta titles and descriptions. The homepage should target "fantasy map maker" and "D&D map creator" explicitly. Add structured data (FAQ schema, product schema). Ensure Open Graph images are set so shares look great on social media.

---

## Suggested Priority for Discussion with Ingmar

**Quick wins (ship this month):**
1. Hero image refresh with 2.0 art (A)
2. CTA copy improvement (D)
3. "What's New" 2.0 banner (F)
4. Featured maps on homepage from Explore (G)

**Medium effort (next quarter):**
5. Social proof / community section (2)
6. Pricing page redesign (4)
7. Navigation cleanup (C)
8. Mobile polish (E)

**Big bets (requires alignment):**
9. Outcome-first messaging reframe (1)
10. Use-case landing pages (5)
11. Interactive try-before-signup (3)
12. Onboarding flow redesign (6)

---

## Reference

- [Hormozi landing page framework](../references/landing-pages-hormozi.md) — principles for high-converting pages
- [Inkarnate updates](https://inkarnate.com/updates) — 2.0 release notes
- [Inkarnate feature requests](https://feedback.inkarnate.com/feature-requests) — community signal
- [Inkarnate Explore](https://inkarnate.com/explore) — community maps (the hidden gem)
