# Clarity Platform Partnership Proposal

**Prepared by:** William Larsten
**Date:** 2026-02-20
**For:** Todd Hartley, Mikey Brown, Joe
**Next meeting:** Thursday, February 26, 2026 at 8:30 AM MST / 4:30 PM CET

---

## Executive Summary

This proposal formalizes the partnership between William Larsten and the Clarity team to take full ownership of Clarity's product development, security, and growth. The structure is designed so that both sides win only when the platform wins: a net profit share with a low guaranteed floor, where I absorb all development costs and risk.

The work breaks into three tracks:

1. **Immediate:** Fix critical security vulnerabilities and stabilize the platform
2. **Near-term:** Rebuild core flows using a strangler pattern, ship AI-powered features, and prepare for the Business Mastery booth opportunity
3. **Long-term:** Expand into native iOS (iMessage distribution), testimonial platform, and AI automation features that drive recurring revenue

---

## Partnership Structure

### Profit Share Model

| Term | Detail |
|------|--------|
| **Split** | 50/50 on net profit |
| **Net profit defined as** | Stripe revenue minus direct platform costs (hosting, APIs, Stripe fees, development resources) |
| **Monthly floor** | $1,000/month, invoiced immediately |
| **Dev cost coverage** | I cover all development costs. Developers, tools, and AI services come out of the shared revenue pool before the split. |
| **Monthly reporting** | I deliver a simple P&L each month: total revenue, costs, profit, and the split. Full transparency. |
| **Initial term** | 2-3 months as a collaboration test, then reassess |
| **Equity** | Separate conversation after proving results together. Not part of this initial agreement. |

### Why This Works

- **For Clarity:** Your guaranteed cost is $1,000/month. Last summer you paid $10K/month for a 2-month sprint on one feature. Now you're getting a full product team covering security, platform rebuild, AI features, analytics, and ongoing iteration. Zero development cost risk.
- **For me:** I only earn meaningfully when the platform earns. That aligns my incentives completely with growing Clarity's revenue, not billing hours.

---

## Track 1: Immediate Priorities (Weeks 1-4)

### Security Remediation (Critical)

The platform currently has exposed credentials that need to be resolved immediately:

- **Stripe payment keys** visible in the web application (anyone can see them when the app fires)
- **OpenAI, AWS, and Adobe API keys** hardcoded in the application
- **Inconsistent session handling** (random logouts, sessions persisting incorrectly)

**Action plan:**
1. Rotate all exposed keys immediately
2. Move all credentials to secure server-side environment variables
3. Audit and fix session management
4. Implement proper error tracking (currently none exists)
5. Document security posture for any future enterprise/compliance conversations

### Technical Foundation Cleanup

The platform is running two separate backends simultaneously, creating unnecessary complexity and fragility. The Angular frontend complicates any future mobile development.

**Approach: Strangler Pattern**
Rather than a risky full rewrite, I'll wrap new functionality around the existing system, gradually replacing legacy pieces while continuously delivering value:

- Build new flows alongside the old system
- Route users to improved versions as they're ready
- Decommission legacy components only after replacements are proven
- Zero downtime, continuous improvement

---

## Track 2: Near-Term Product Improvements (Months 1-3)

### Journey Page Creation Flow Rebuild

The core action Clarity needs users to take (record video, build a page, send it) is the thing that works least reliably. This is the highest-leverage product fix.

**Deliverables:**
- Rebuild the video recorder to work reliably across browsers and mobile
- Simplify the page builder (currently a 5-step process with too many options)
- Wire up AI so users can describe what they need and get a page generated
- Make it something Todd can demo on stage and have it sell itself

### AI-Powered Automation

Based on our conversation, the highest-value AI features:

1. **Meeting-to-proposal automation:** Pull Fathom/meeting transcript notes and auto-generate a personalized Journey Page proposal for the prospect. Todd's 7-minute prep example becomes zero-minute prep.
2. **Calendar integration:** Auto-create draft proposal pages for upcoming meetings, pre-populated based on previous conversations and CRM data.
3. **AI page generation:** Describe what you want in plain language, get a complete Journey Page.

### Onboarding & Retention

- Instrument the full user funnel (currently no data on where users succeed or drop off)
- Tighten first-time user experience to get people to their first win faster
- Target: average dollar retention above 100% (users who stay longer and expand usage)

---

## Track 3: Growth Opportunities

### Business Mastery Booth (2-Week Window)

Todd is presenting on day 2. The booth opportunity:

- **300+ attendees** recording business mastery testimonials at the booth
- **Live video review and feedback** as the hook
- **Automatic Clarity account creation** for every participant (lead generation)
- **Affiliate/partnership revenue model** with Team Tony

**What I need to prepare:**
- Concrete proposal for Team Tony (booth partnership terms, what we provide, what they get)
- Technical setup: streamlined recording flow, auto-account creation, testimonial display
- "Wall of Love" testimonial display feature ready for the event

**Timeline:** Proposal to Team Tony needed within 2 weeks. Todd to schedule the follow-up meeting.

### Testimonial Platform ("Wall of Love")

Inspired by Senja's model (free up to 15 testimonials, then paid tiers). Natural fit for Todd's audience.

**Use cases:**
1. Sales proposals via Clarity Journey Pages
2. Customer service interaction capture
3. Testimonial collection and public display
4. White-label deployment across all Tony Robbins events

**Revenue insight:** 5+ testimonials increase purchase intention 270%. This is a strong upsell path.

### iMessage / App Store Distribution

Todd identified a third-party app creation opportunity with ~80% approval rate. Early adopter advantage potential (similar to Todd's Google News play that drives 36M visitors/year).

**Requirements:**
- Native iOS app (the Angular frontend is a blocker here; the strangler pattern rebuild sets the foundation)
- Not a convenience play — this is a distribution play
- Strategy introduced in 2024, so timing matters

**My recommendation:** This is a Track 3 priority. We build toward it via the strangler pattern (React/React Native path), but don't let it distract from security fixes and creation flow improvements that drive revenue now.

### Avatar Video Generation (Future)

Address the 70% of users who won't record themselves on camera:
- AI-generated avatar videos maintain the human touch
- Removes the biggest barrier to Journey Page creation
- Evaluate after core creation flow is stable

---

## Delivery Timeline

| Period | Focus | Deliverables |
|--------|-------|-------------|
| **Weeks 1-2** | Security + setup | All credentials secured, error tracking live, access to all systems, security audit documented |
| **Weeks 3-4** | Foundation + instrumentation | Funnel analytics instrumented, strangler pattern architecture in place, first legacy component wrapped |
| **Month 2** | Creation flow + Business Mastery prep | Video recorder rebuilt, simplified page builder, AI generation MVP, booth proposal to Team Tony, testimonial display ready |
| **Month 3** | AI automation + retention | Meeting-to-proposal automation, calendar integration, onboarding improvements, first monthly P&L with real data |
| **Review point** | End of Month 3 | Assess partnership, discuss equity, evaluate iOS/distribution timeline |

---

## What I Need From You to Start

1. **Full codebase access** (repos, environments, deployment pipeline)
2. **Stripe dashboard access** (to set up proper reporting and track revenue)
3. **Access to any analytics/tracking tools** currently in use
4. **Intro to Marcus** for handover coordination
5. **Business Mastery event details** (dates, booth specs, Team Tony contact)
6. **Signed agreement** on the profit share terms above

---

## Summary

This isn't a consulting engagement. It's a partnership where I take on the risk and only win when Clarity wins. The $1,000/month floor is a fraction of what you paid last summer, and everything above that is earned through results.

I'm ready to start shipping the week we sign.

Let's finalize on Thursday, February 26th.

---

*William Larsten*
*williamlarsten@gmail.com*
*https://calendly.com/william-larsten/meet-will*
