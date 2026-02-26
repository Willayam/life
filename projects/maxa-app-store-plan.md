# Maxa — App Store Launch & Monetization Roadmap

**Created:** 2026-02-25
**Goal:** Ship Maxa to the App Store and build the monetization + engagement loop that drives recurring revenue.

---

## Part 1: App Store Submission Checklist

### Prerequisites (Must Be Done First)

- [ ] **Apple Developer enrollment approved** — Check case #20000105358621. Cannot submit without this.
- [ ] **4 practice tests fully working** — Every question displays correctly, answers are correct, scoring works on both web and app.
- [ ] **Calculation algorithm verified** — Estimated score calculation is correct.

### App Store Connect Setup

- [ ] **Sign Paid Applications Agreement** — Required for in-app purchases. Under App Store Connect > Business.
- [ ] **Complete banking & tax info** — Status must show "Clear" before subscriptions work.
- [ ] **Enroll in Apple Small Business Program** — Reduces commission from 30% to 15% (you qualify as <$1M/year).
- [ ] **Create subscription products** in App Store Connect:
  - Create a Subscription Group (e.g., "Maxa Premium")
  - Add products: Monthly (99 SEK), Annual (499 SEK)
  - Add localizations (Swedish + English display name/description)
  - Upload placeholder screenshot for review (640x920)
- [ ] **Generate In-App Purchase Key** — App Store Connect > Users & Access > Integrations > In-App Purchase. Download the `.p8` file (one-time download only).

### RevenueCat Setup

- [ ] Create RevenueCat account at revenuecat.com
- [ ] Create project + app in RevenueCat dashboard
- [ ] Upload App Store Connect In-App Purchase Key (`.p8` file) + Issuer ID
- [ ] Configure Entitlements (e.g., "premium" — unlocks all tests)
- [ ] Configure Offerings (map to App Store products)
- [ ] Install SDK: `npx expo install react-native-purchases react-native-purchases-ui`
- [ ] Install dev client: `npx expo install expo-dev-client`
- [ ] Initialize RevenueCat in app root:
  ```typescript
  import Purchases from 'react-native-purchases';
  Purchases.configure({ apiKey: 'your_revenuecat_api_key' });
  ```
- [ ] Implement paywall screen (can use RevenueCat's pre-built paywall templates)
- [ ] Implement entitlement checking (gate premium content behind `customerInfo.entitlements.active['premium']`)

**RevenueCat pricing:** Free until $2,500/month in tracked revenue. Then 1% of revenue. Perfect for launch.

### App Store Metadata

- [ ] **App name:** Maxa (check availability)
- [ ] **Subtitle:** (max 30 chars, e.g., "Högskoleprovet — övningsappen")
- [ ] **Description:** 300-1000 chars explaining the app
- [ ] **Keywords:** Comma-separated, 100 char limit (högskoleprovet, test prep, övning, etc.)
- [ ] **Category:** Education
- [ ] **Screenshots:** iPhone 6.7" (required), iPhone 6.1", iPad (if supporting)
- [ ] **Privacy policy URL** — Required. Host a simple privacy policy page.
- [ ] **Support URL** — Required. Can be a simple contact page.

### Build & Test

- [ ] Build with EAS: `eas build --platform ios --profile development`
- [ ] Create sandbox test accounts in App Store Connect (Users & Access > Sandbox Testers)
- [ ] Test all 4 practice tests end-to-end on real device
- [ ] Test purchase flow with sandbox account
- [ ] Send TestFlight build to Olivia
- [ ] Fix any issues from TestFlight feedback

### Submit

- [ ] Submit production build for App Store review
- [ ] Apple review typically takes 24-48 hours
- [ ] Address any rejection feedback and resubmit if needed

---

## Part 2: Pricing Strategy

### Recommended Launch Pricing

| Tier | Price | Notes |
|------|-------|-------|
| **Free** | 0 SEK | Limited tests (1-2). Enough to experience the full loop and get hooked. |
| **Monthly** | 99 SEK/month | Lower barrier. Show this as the "default." |
| **Annual** | 499 SEK/year (~42 SEK/month) | Push this as best value. 58% discount vs monthly. |
| **Lifetime** | 999 SEK | One-time. Appeals to committed users. |

### Key Decisions

- **7-day free trial on Annual plan** — Data shows 5-9 day trials convert at ~45%, much better than shorter trials.
- **Freemium, not hard paywall** — Let users complete at least one full test before hitting the paywall. Duolingo saw +20% next-day retention by letting users complete their first lesson before even signing up.
- **When to show upsell:** After completing a test (emotional high) and when they try to access a locked test (friction point).

### Revenue Math (Swedish Market)

| Subscribers | Monthly Revenue | Annual Revenue |
|-------------|----------------|----------------|
| 100 | 9,900 SEK | 118,800 SEK |
| 500 | 49,500 SEK | 594,000 SEK |
| 1,000 | 99,000 SEK | 1,188,000 SEK |

After Apple's 15% cut (Small Business Program): multiply by 0.85.

---

## Part 3: Engagement & Monetization Features — Prioritized by Impact/Effort

### The Core Loop (What Duolingo Does After Every Lesson)

```
Complete quiz/test
  → Celebration animation + stats (XP, accuracy, time)
    → Streak counter increments
      → [Conditional — rotate one of these:]
          → Upsell / paywall (if free user)
          → Rating prompt: "How are you enjoying Maxa?" 1-5 stars
              → 4-5 stars: route to App Store review (expo-store-review)
              → 1-3 stars: in-app feedback form → your inbox
          → Share / invite friends
          → "Enable notifications" (if not yet granted)
        → Return to home with next action highlighted
          → Push notification if user doesn't return
            → "Don't lose your streak!" drives them back
```

This loop is responsible for the majority of Duolingo's 4.5x DAU growth. Build it.

---

### TIER 0 — Ship Before Launch (1-3 days each, highest ROI)

#### 1. Streaks
**Impact:** Users with 7-day streaks are 3.6x more likely to stay long-term. 55% daily return rate for streak maintainers.
**Effort:** 1-3 days
**What to build:**
- Track `last_completed_date` per user
- Increment streak if completed within 24h window
- Reset if gap > 1 day
- Display flame icon + counter on home screen and post-quiz
- Streak milestone celebrations (7, 14, 30 days)
- Optional: "Streak Freeze" item (1 skip per purchase) — creates monetization opportunity

**Why #1:** The single most proven retention mechanic in education apps. Loss aversion is the strongest behavioral lever.

#### 2. Celebration Animations
**Impact:** 40-60% higher DAU when combined with milestones. +15% lesson completion from reward animations.
**Effort:** 1-3 days
**What to build:**
- Confetti animation on quiz completion (use `react-native-confetti-cannon` or Lottie)
- XP/score display with satisfying number animation
- Haptic feedback on correct answers (`expo-haptics`)
- Streak milestone celebration screens (special animation at 7, 30 days)
- Sound effects on completion (fun, satisfying sounds)

**Why #2:** Costs almost nothing to build and makes the product *feel* good. Dopamine micro-rewards keep users coming back.

#### 3. Post-Quiz Stats Screen
**Impact:** Foundation for the entire engagement loop. This is the canvas for streaks, XP, upsells, celebrations.
**Effort:** 1 day
**What to build:**
- Score/accuracy display
- Time taken
- XP earned
- Streak counter
- "Next test" CTA
- Conditional: upsell card or share prompt

---

### TIER 1 — Ship in First 2 Weeks Post-Launch

#### 4. Push Notifications (Streak-saver + Daily Reminder)
**Impact:** +2-3% D14 retention. +5% DAU with mascot. +17% daily learning time.
**Effort:** 1-3 days (Expo makes this easy)
**What to build:**
- Streak-saver notification (evening, "Don't lose your X-day streak!")
- Daily reminder at user's preferred time
- Use `expo-notifications` — handles both iOS and Android
- Start with just these 2 notification types. Cap at 1-2/day.
- A/B test copy (small wording changes compound)

**Best practice from Duolingo:** "Protect the channel." Never increase notification frequency without extreme care.

#### 5. Basic XP System
**Impact:** +17% learning time. Foundation for all gamification.
**Effort:** 1-2 days
**What to build:**
- Award XP on quiz completion (e.g., 20 XP base + accuracy bonus)
- Display XP in post-quiz stats
- Total XP on profile
- Level system (simple thresholds: Level 1 at 0 XP, Level 2 at 100 XP, etc.)

#### 6. Review Gate (Rating Intercept)
**Impact:** Apps with 4.5+ stars get 7x more downloads than 3-star apps. Routing unhappy users to feedback instead of App Store prevents 1-star reviews.
**Effort:** 1 day
**What to build:**
- After quiz completion (on the stats screen), occasionally show a simple prompt: "How are you enjoying Maxa?" with 1-5 stars
- **5 stars:** Trigger `expo-store-review` (native App Store review dialog). Say "Thanks! Would you mind rating us on the App Store?" The native SKStoreReviewController handles the rest — Apple limits it to 3 prompts per year per device.
- **4 stars:** Same as 5 — still route to App Store, but with a softer ask.
- **1-3 stars:** Show an in-app feedback form: "What can we improve?" with a text field. Send to your email/backend. Do NOT route to App Store.
- **Timing:** Don't show on first quiz. Trigger after the user has completed 3-5 quizzes (they have enough experience to give a meaningful rating). Then don't re-ask for 30+ days.
- **Package:** `expo-store-review` — one API call, handles iOS + Android natively.

**Why this matters:** The average user never leaves a review unless prompted. Prompting at the right moment (post-quiz high) while filtering unhappy users privately is the #1 way to build a high App Store rating fast.

#### 7. Paywall / Upsell (RevenueCat)
**Impact:** ~2-4% freemium conversion at scale. This is where revenue comes from.
**Effort:** 2-3 days (with RevenueCat pre-built paywalls)
**What to build:**
- Paywall screen using RevenueCat's paywall templates (saves days of UI work)
- Show at two moments:
  1. Post-quiz completion (emotional high — "Unlock all tests!")
  2. When tapping a locked test (friction point — value is most felt)
- 7-day free trial on Annual plan
- "Premium" badge/indicator on locked content

---

### TIER 2 — Ship Within First Month

#### 8. Weekly Leaderboard
**Impact:** +25% lesson completion. +40% engagement for active participants.
**Effort:** 3-5 days
**Why wait:** Needs enough users to fill leaderboards meaningfully. Build after you have a user base.

#### 9. Share / Invite Friends (Simple Deep Link)
**Impact:** K-factor 0.15-0.4. Referred users have 37% lower churn, 16% higher LTV.
**Effort:** 2-3 days
**What to build:** Simple share link with deep linking (`expo-linking` or Branch). Don't over-engineer referral tracking for v1.

#### 10. iOS Home Screen Widget
**Impact:** Duolingo says widget users have "far better retention." Half of widget users have 6+ month streaks.
**Effort:** 3-5 days (requires some Swift)
**What to build:** Simple streak + daily progress widget. Use `expo-widgets`.

---

### TIER 3 — Ship When You Have Product-Market Fit

| Feature | Effort | Impact | Notes |
|---------|--------|--------|-------|
| Friend Streaks | 5-10 days | +22% daily completion | Needs critical mass of users |
| League/tier system | 1-2 weeks | 3x highly engaged learners | Complex backend |
| Live Activities (iOS) | 3-7 days | Unproven in education | Requires Swift |
| Daily quests | 3-5 days | +25% DAU | After core streak loop is solid |

### TIER 4 — Skip for Now

| Feature | Why Skip |
|---------|----------|
| Customizable app icons | Vanity feature. No proven retention impact in education. Build in v3+ when brand love exists. |
| Advanced referral tracking/rewards | Over-engineering for MVP. Simple share link is enough. |

---

## Part 4: Implementation Timeline

### Week 1: Ship to App Store
- Apple Developer enrollment confirmed
- 4 tests fully working + QA'd
- App Store metadata prepared
- RevenueCat account + dashboard configured
- Privacy policy + support URL live
- TestFlight build to Olivia
- Submit to App Store

### Week 2: Core Engagement Loop
- Streaks (1-3 days)
- Celebration animations + sounds (1-3 days)
- Post-quiz stats screen (1 day)
- Push notifications — streak-saver + daily reminder (1-2 days)

### Week 3: Monetization
- RevenueCat SDK integration (1-2 days)
- Paywall screen at completion + locked content (2-3 days)
- Basic XP system (1-2 days)

### Week 4+: Growth
- Weekly leaderboard
- Share/invite flow
- iOS widget
- Iterate based on data

---

## Part 5: Key Principles (From Duolingo's Playbook)

1. **Compound small wins.** No single feature drove Duolingo's growth. Dozens of +1-2% improvements compounding through relentless A/B testing.
2. **Protect the notification channel.** Never spam. One bad notification = permanently lost user.
3. **Delay signup, accelerate the first win.** Let users complete a test before asking for an account. (+20% next-day retention for Duolingo)
4. **Lower the bar for daily habits.** Daily minimum should feel trivially easy to maintain. Consistency > intensity.
5. **Make losing feel worse than winning feels good.** Loss aversion (streaks) is more powerful than positive rewards. But balance with intrinsic motivation to avoid hollow engagement.
6. **Measure everything.** Duolingo runs 300+ experiments per quarter. Build analytics from day one.

---

## References

- RevenueCat Expo docs: https://www.revenuecat.com/docs/getting-started/installation/expo
- RevenueCat State of Subscription Apps 2025
- Duolingo growth analysis: Lenny's Newsletter
- Duolingo streak research: blog.duolingo.com
- Education app benchmarks: businessofapps.com
