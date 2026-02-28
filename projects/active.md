# Active Projects

## Priority Order

1. **Maxa** - The main bet. Ship it.
2. **Inkarnate** - The lifeline. Protect it.
3. **Clarity.video** - Upside. Follow up.
4. **Expa** - Winding down. Minimal effort.
5. **Frida's school offer** - Help her when time allows.

---

## 1. Maxa (Högskoleprovet App)

**Result:** A launched, growing app with paying subscribers. The Duolingo of högskoleprovet.

**Purpose:** This is the primary vehicle to financial freedom. Recurring revenue that scales without my time.

**Status:** Pre-launch. Core app close. Blocked on finishing question extraction.

### What It Is
- Gamified test prep for högskoleprovet (Swedish university entrance exam)
- Fun, engaging, bite-sized practice (Duolingo-style)
- Mobile-first experience

### Business Model
- **Who pays:** Students preparing for högskoleprovet
- **Pricing (testing):**
  - Monthly: ~50-100 SEK/month
  - Yearly: TBD
  - Lifetime: ~1,000 SEK
- **Revenue math:**
  - 100 subscribers x 100 SEK = 10,000 SEK/month
  - 1,000 subscribers x 100 SEK = 100,000 SEK/month (replaces consulting!)
  - 10,000 subscribers x 100 SEK = 1,000,000 SEK/month

### Current Blockers
- [ ] **Question extraction** - Need to get all tests/questions into the system
- [ ] **Calculation algorithm** - Estimated score calculation needs to be correct

### Remaining Before Launch
- [ ] Finish question extraction (THE BLOCKER - days, not weeks)
- [ ] Fix calculation algorithm for estimated score
- [ ] Add gamification (fun sounds, engaging feel)
- [ ] Mascot from Pietro (contacted, need follow-up)
- [ ] Landing page (use [landing page framework](../landing-pages.md))
- [ ] **App Store submission** - Get it to Olivia for testing ASAP
- [ ] App Store submission
- [ ] Payment/subscription integration

### Design & Quality
- [ ] **AppMap** - Automated flow visualization tool → [spec](appmap-spec.md) (replaces manual design QA)
- [ ] Implement claymorphism on site and app

### First 10 Customers Plan
- [ ] Personal network - who is taking högskoleprovet?
- [ ] Find online communities (Reddit, Facebook groups, Discord)
- [ ] Schools / study groups
- [ ] Content marketing (build in public)

### Future Potential
- Could expand to nationella prov (high school tests) → Frida connection to schools
- International versions (SAT, etc.)

---

## 2. Inkarnate Consulting

**Result:** Stable 90K/month income for as long as I need it.

**Purpose:** This is the bridge. It pays the bills while I build Maxa. Do great work, but don't let it consume me.

**Status:** Active engagement. Actively working on multiple workstreams.

**Revenue:** 90,000 SEK/month (~$10K USD)

**Key contact:** (Inkarnate team)

### Current Workstreams (Feb 2026)
1. **Map creation flow** - Top-down overhaul: intuitive nav, updated look and feel, clean and awesome UX experience. Start from the top and work to the details.
	1. Problems to solve:
		1. Simplify for new users
		2. Increase marketplace sales
		3. Increase explore discoverability
	2. Design principles:
		1. Shortcut to my goals
		2. No choice is irreversible
	3. Thinking of new map creation on a spectrum from blank -> done
		1. Everything just leads into the editor in different ways.
			1. 1-click shortcuts
			2. Via preview
2. **Editor changes** - Core editor improvements
	1. High level hierarchy
		1. Current has things a bit spread out
		2. Unified, Figma style
		3. Quick wins:
			1. Cleaned up navbar
				1. Remove tools from top
				2. Add map rename/details to top
				3. Emphasize Export more
				4. Move zoom/canvas controls in here.
			2. Merge objects & layer panel.
			3. Simplified main menu
				1. Use icons sparingly, just to "anchor" most important actions visually
				2. "Add New"- button for faster map creation.
	2. Per tool
		1. Group without dialogs
			1. Faster rename
3. **Performance strategy** - Come up with a good strategy to help them make a real impact on performance
4. **Website landing page** - Ideas for improving the marketing site

### Ongoing
- [ ] Weekly check-ins with Inkarnate team
- [ ] Work on editor changes, performance strategy, landing page, and map creation flow
- [ ] Track hours - keep this efficient, don't let it creep

### Boundary
Time-box consulting work. It should not expand to fill all available time. Target: focused blocks, not all-day availability.

---

## 3. Clarity.video

**Result:** Full product partnership with profit share. Build Clarity into a strong standalone platform with recurring revenue.

**Purpose:** Additional revenue stream aligned with my skills. Skin in the game means I only win when the platform wins. Builds portfolio, network, and potential equity position.

**Status:** Meeting with Todd, Mikey, Joe, and William held 2026-02-20. Deal verbally agreed — profit share model, start with 2-3 month test. Full proposal document created. Next meeting Thu Feb 26 to finalize and sign.

### Deal Structure (Agreed Feb 2026)
- **Model:** 50/50 net profit split. I cover all dev costs.
- **Floor:** $1,000/month (invoiced immediately to start)
- **Monthly process:** I send P&L report + invoice the difference
- **Net profit =** Stripe revenue - direct platform costs (hosting, APIs, Stripe fees, dev resources)
- **Dev costs (Marcus, etc.) come out of revenue before split** — incentive to be lean
- **Equity:** Separate conversation with Todd after 2-3 months of results
- **Initial term:** 2-3 months as collaboration test, then reassess
- **Last summer comparison:** They paid $10K/month for a 2-month sprint. Now getting full product team for $1K/month floor.

### Key Findings from Meeting (2026-02-20)
- **Security is critical:** Stripe keys exposed in web app, multiple API keys hardcoded
- **Technical debt:** Two backends running simultaneously, Angular instead of React
- **Approach agreed:** Strangler pattern — build new flows while gradually replacing old system
- **Business Mastery booth opportunity:** Todd presenting day 2, 300+ attendees, testimonial collection, 2-week window to propose to Team Tony
- **iMessage/App Store distribution:** ~80% approval rate, early adopter play, requires native iOS (long-term)
- **AI features:** Meeting-to-proposal automation, calendar integration, avatar video generation
- **Testimonial platform ("Wall of Love"):** Senja-inspired, white-label for Tony events

### Proposal Document
- [Full proposal](clarity-proposal-2026-02.md)

### Next Steps
- [x] Write and send initial proposal
- [x] Received reply - they want deeper proposal
- [x] Write and send deeper proposal
- [x] Reviewed last summer's deal ($10K/mo, 2 months, Journey Page flow)
- [x] Mikey asked follow-up Qs (who pays devs, what rev share)
- [x] Sent risk-based proposal: 50/50 profit, $1K floor, I cover dev costs
- [x] Mikey replied — looping in rest of team, discussing internally
- [x] William replied: return to me with any questions
- [x] Meeting with full team (Todd, Mikey, Joe, William) — 2026-02-20
- [x] Create detailed partnership proposal document
- [ ] **Thu Feb 26 meeting: Finalize and sign agreement**
- [ ] Todd: Schedule Team Tony follow-up (2-week window for booth proposal)
- [ ] Develop bigger vision for Business Mastery booth opportunity before Thu call
- [ ] Get full codebase access, Stripe dashboard, analytics tools
- [ ] Coordinate handover with Marcus
- [ ] Send first $1K invoice once signed
- [ ] Have equity conversation with Todd (after 2-3 months)

### Stripe Reporting
- [ ] Set up multi-reports: Stripe payments vs costs of running the service
  - Marcus costs = pulled from William personally
  - App running/dev costs (Claude, infra, etc.) = paid from company/app

---

## 4. Expa Travel (Winding Down)

**Result:** Clean exit. Minimal ongoing time investment. Maybe small income from dad's work.

**Purpose:** Don't let a dead project drain energy. Close it cleanly.

**Status:** Transitioning out. On-call paid support. Haven't been paid since October 2025.

### Key Facts
- Erik Karlsson (Strativ/Vaylo) taking over technical work
- Catrine needs to know if all changes go to Erik now
- You stopped receiving payment since October 2025

### Remaining Items
- [ ] Confirm handoff to Erik is complete
- [ ] Resolve any outstanding questions from Catrine
- [ ] Explore: AI automation / ads work for dad (Bill) at Expa SE - separate arrangement

### Open Questions from Expa NO (Feb 5 email)
1. Will mobile number be mandatory in next update?
2. Will email double-checking be added?
3. Will Expa logo be visible on the widget?
→ These should go to Erik now if handoff is complete.

---

## 5. Frida's School Offer

**Result:** Help Frida create a scalable product/offer she can sell to schools.

**Purpose:** Support my partner. Reduce her financial stress. Potentially synergize with Maxa.

**Status:** Planning session prep. See [frida-business-system.md](frida-business-system.md) for full session plan.

**Concept:** Frida is a PhD sleep researcher who wants to work with kids in schools on sleep and play. Needs a scalable offer (not 1-on-1 consulting). Now expanding to sports orgs too.

**Next step:** Schedule 3-4 hour session with Frida to set up her repo, define offers, build outreach pipeline, and draft website copy.

### Ideas
- Online course/program for schools and sports orgs
- Workshop-in-a-box that can be licensed
- Tiered offers: digital course → live workshops → premium program
- [ ] Schedule setup session with Frida
- [ ] Prep session materials (see [frida-business-system.md](frida-business-system.md))

---

---

## 6. Building Projects (Queue)

_These are valuable but should not jump ahead of revenue-critical work._

- [ ] **Email classifier** - Build a classifier to zero out inbox
- [ ] **Framer/Vaylo replication** - Try replicating the Framer and Vaylo solution fully in code with agents
- [x] **Expa meeting** - Confirmed Thu Feb 19 at 11:00

---

## Project Pipeline (Future Bets)

_Ideas to evaluate when bandwidth allows. Each should meet the small bets criteria._

- [ ] **Mortality Map** - Interactive open-source node graph: Causes of Death ← Mechanisms ← Trainable Actions/Protocols. Visual tool showing how specific interventions (exercise, nutrition, sleep) flow through biological mechanisms to reduce specific mortality risks. Built on real study data. See [[exercise-longevity-research]] for the research foundation. Could be a content play + open source reputation builder + genuinely useful tool. Scope: web app, interactive graph visualization (D3/force-directed or similar), open data format so others can contribute.
- [ ] Opportunities from Michael's network
- [ ] AI automation services (testing with dad's Expa SE work)
- [ ] Products born from consulting patterns (Inkarnate/Clarity insights)
- [ ] Content-driven products (once audience exists)
