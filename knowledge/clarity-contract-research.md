---
tags: [legal, contracts, partnerships, clarity]
date: 2026-02-24
---

# Profit-Share Technology Partnership Agreement: Research & Clause Guidance

Research compiled for the William Larsten / Todd Hartley (Clarity.video) partnership agreement.

**Deal summary:** 50/50 net profit split, $1K/month floor to William, William covers all development costs, initial 2-3 month trial period, then reassess.

**Core risk:** William invests significant upfront development time (security fixes, platform rebuild, AI features) worth potentially $30K+. If Todd terminates early, William has invested heavily and received minimal return.

---

## 1. Termination Protection Clauses

### 1A. Minimum Term Guarantee

The most fundamental protection. A minimum term prevents either party from terminating for convenience during an initial period, ensuring William has enough runway to recoup development investment.

**Recommendation for this deal:** 6-month minimum term (not the proposed 2-3 months). Rationale: security fixes and platform rebuild alone will consume 2-3 months. A 6-month minimum gives at least 3-4 months of revenue generation after core work is done.

**Suggested clause language:**

> **Minimum Term.** This Agreement shall have an initial term of six (6) months commencing on the Effective Date (the "Minimum Term"). Neither Party may terminate this Agreement for convenience during the Minimum Term. After the Minimum Term, either Party may terminate this Agreement for convenience upon sixty (60) days' prior written notice to the other Party.

### 1B. Early Termination Fee / Development Cost Recovery

If a minimum term is unacceptable to Todd, an early termination fee compensates William for unrecouped development investment. This is standard in IT services contracts where one party incurs significant upfront costs.

**Calculation approaches:**
- **Fixed amount:** Pre-agreed dollar amount (e.g., $25,000) owed if terminated before the minimum term
- **Sliding scale:** Decreasing fee over time (e.g., $30K in month 1, $25K in month 2, $20K in month 3, etc.)
- **Remaining-term based:** Fee equals remaining months times the $1K floor, plus an additional development recoupment amount

**Suggested clause language (sliding scale):**

> **Early Termination Fee.** If this Agreement is terminated by Clarity for convenience, or by William for cause, prior to the expiration of the Minimum Term, Clarity shall pay William an Early Termination Fee calculated as follows:
>
> - Termination during months 1-2: USD $30,000
> - Termination during months 3-4: USD $20,000
> - Termination during months 5-6: USD $10,000
>
> The Early Termination Fee reflects the fair market value of development services provided by William for which revenue share has not yet been realized. This fee shall be payable within thirty (30) days of the effective date of termination.

### 1C. Tail Revenue Provision (Post-Termination Revenue Share)

A tail provision ensures William continues to receive his share of revenue generated from work he built, even after the partnership ends. This is common in investment banking, brokerage, and agency agreements. Tail periods typically range from 6 to 24 months.

**Suggested clause language:**

> **Post-Termination Revenue Share.** Upon termination or expiration of this Agreement for any reason, William shall continue to receive his Profit Share percentage (50%) of Net Profit derived from:
>
> (a) any features, modules, or systems developed or substantially modified by William during the term of this Agreement (the "William-Developed Features"); and
>
> (b) any customer accounts that were acquired, retained, or expanded as a direct result of William-Developed Features,
>
> for a period of twelve (12) months following the effective date of termination (the "Tail Period").
>
> During the Tail Period, Clarity shall continue to provide monthly revenue reports in accordance with Section [X] of this Agreement, and all audit rights shall remain in effect.

**Alternative (simpler tail):**

> **Post-Termination Revenue Share.** Upon termination, William shall continue to receive [50%] of Net Profit from the Platform for a period of [12] months following the effective date of termination. All reporting and audit obligations survive termination for the duration of the Tail Period.

### 1D. Termination for Cause vs. Convenience

Distinguish between termination types to ensure fair treatment:

> **Termination for Cause.** Either Party may terminate this Agreement immediately upon written notice if the other Party:
>
> (a) commits a material breach that remains uncured for thirty (30) days after written notice;
> (b) becomes insolvent, files for bankruptcy, or makes an assignment for the benefit of creditors;
> (c) engages in fraud, willful misconduct, or gross negligence that materially harms the other Party or the Platform.
>
> **Termination for Convenience.** After the Minimum Term, either Party may terminate this Agreement for convenience upon sixty (60) days' prior written notice. The terminating Party's obligations under the Post-Termination Revenue Share and IP provisions shall survive termination.
>
> **Effect on Fees.** If Clarity terminates for convenience or William terminates for cause, the Early Termination Fee (if within the Minimum Term) and Post-Termination Revenue Share shall apply. If William terminates for convenience, only the Post-Termination Revenue Share shall apply. If Clarity terminates for cause due to William's material breach, no Early Termination Fee or Post-Termination Revenue Share shall be owed.

---

## 2. IP Ownership and Vesting

This is the most critical section for William. In a profit-share arrangement (not employment, not standard work-for-hire), default IP rules are ambiguous and vary by jurisdiction.

### 2A. Background IP vs. Foreground IP

**Background IP** = Pre-existing IP each party brings to the partnership. **Foreground IP** = New IP created during the partnership.

**Suggested clause language:**

> **Background IP.** Each Party retains sole ownership of all Intellectual Property owned by or licensed to such Party prior to the Effective Date, or developed independently outside the scope of this Agreement ("Background IP"). Neither Party acquires any right, title, or interest in the other Party's Background IP except as expressly set forth herein.
>
> **License to Background IP.** Each Party grants the other a non-exclusive, royalty-free, limited license to use its Background IP solely to the extent necessary to perform obligations under this Agreement. Such licenses terminate upon termination of this Agreement, subject to the transition provisions in Section [X].

### 2B. Foreground IP Ownership

Three main approaches, ranked by how favorable they are to William:

**Option A: William retains IP, licenses to Clarity (Most protective for William)**

> **Foreground IP Ownership.** All code, software, systems, architectures, algorithms, and other Intellectual Property created by William in connection with this Agreement ("Foreground IP") shall be owned by William. William hereby grants Clarity an exclusive, royalty-free license to use the Foreground IP in connection with the Platform during the term of this Agreement.
>
> **Post-Termination License.** Upon termination, the exclusive license converts to a non-exclusive, perpetual, royalty-free license to use the Foreground IP as it exists on the date of termination, solely in connection with the Platform. Clarity may not sublicense, modify, or create derivative works of the Foreground IP without William's prior written consent.

**Option B: Joint Ownership with restrictions (Balanced)**

> **Foreground IP Ownership.** All Foreground IP shall be jointly owned by the Parties. Each Party may use the jointly-owned Foreground IP for its own purposes, provided that neither Party may license, transfer, or sublicense the jointly-owned Foreground IP to a third party without the prior written consent of the other Party.

**Option C: Clarity owns IP, William gets license-back (Least protective for William)**

> **Foreground IP Ownership.** All Foreground IP shall be owned by Clarity. Clarity hereby grants William a non-exclusive, perpetual, royalty-free license to use the general concepts, techniques, methodologies, and know-how developed by William during the term (the "Residual Knowledge"), provided that William does not use any Clarity-specific code, trade secrets, or proprietary business logic.

**Recommendation:** Negotiate for Option A or B. Option A is the strongest protection: if Todd terminates, William still owns the code he built. This provides massive leverage against early termination because Clarity would need William's ongoing consent for IP use beyond the frozen version.

### 2C. Vesting Schedule for IP

If the parties agree that IP transfers to Clarity (Option C), a vesting schedule protects William by ensuring the transfer is gradual:

> **IP Vesting.** Ownership of Foreground IP shall vest with Clarity according to the following schedule:
>
> - Months 1-6: 0% vested (William retains full ownership)
> - Month 7-12: 50% vested (joint ownership)
> - Month 13+: 100% vested (Clarity owns, William retains Residual Knowledge license)
>
> If this Agreement is terminated before full vesting, Clarity's ownership interest shall be limited to the vested percentage, and William shall retain ownership of the unvested percentage.

### 2D. Residual Knowledge Protection

Regardless of IP ownership structure, William must protect his right to reuse general skills, patterns, and approaches:

> **Residual Knowledge.** Nothing in this Agreement shall restrict William's right to use the general knowledge, skills, experience, ideas, concepts, techniques, and know-how ("Residual Knowledge") that William develops or acquires during the performance of this Agreement, provided that such use does not include Clarity's Confidential Information, trade secrets, proprietary business logic, customer data, or any code that constitutes a derivative work of the Platform's proprietary codebase.

---

## 3. Revenue Share Mechanics

### 3A. Defining "Net Profit"

The single most common source of disputes in profit-share agreements. Be surgical in defining what qualifies as a deductible cost.

**Suggested clause language:**

> **Gross Revenue.** "Gross Revenue" means all revenue received by Clarity directly attributable to the Platform, including subscription fees, usage fees, implementation fees, one-time charges, and any other amounts paid by customers for access to or use of the Platform.
>
> **Permitted Deductions.** The following are the sole permitted deductions from Gross Revenue to calculate Net Profit:
>
> (a) Payment processing fees (e.g., Stripe, PayPal) actually incurred;
> (b) Refunds and chargebacks actually issued to customers;
> (c) Sales taxes, VAT, or other government-imposed transaction taxes actually remitted;
> (d) Third-party hosting and infrastructure costs (e.g., AWS, cloud services) directly attributable to the Platform;
> (e) Third-party SaaS tools and API costs directly integrated into the Platform and agreed upon by both Parties in writing.
>
> **Excluded Costs.** The following shall NOT be deducted from Gross Revenue:
>
> (a) Clarity's general overhead, salaries, rent, or administrative expenses;
> (b) Sales, marketing, or advertising costs unless mutually agreed in writing in advance;
> (c) Todd's compensation, travel, or personal expenses;
> (d) Legal or accounting fees;
> (e) Any costs not listed in Permitted Deductions above.
>
> **Net Profit.** "Net Profit" means Gross Revenue minus Permitted Deductions.

### 3B. The $1,000/Month Floor

> **Minimum Monthly Payment.** Regardless of Net Profit in any given month, Clarity shall pay William a minimum of USD $1,000 per month (the "Floor Payment"). If William's Profit Share for any month exceeds the Floor Payment, William shall receive the Profit Share amount. The Floor Payment is not an advance against future Profit Share; it is a minimum guarantee.

**Note:** Consider whether the $1K floor is really sufficient given the development investment. At $1K/month, it takes 30 months to recoup $30K of development value. Consider negotiating a higher floor ($2-3K) or a front-loaded higher floor during the initial development-heavy months.

### 3C. Reporting Requirements

> **Monthly Reports.** Within fifteen (15) days after the end of each calendar month, Clarity shall provide William with a detailed written report containing:
>
> (a) Gross Revenue for the month, itemized by revenue stream;
> (b) Each Permitted Deduction, with supporting documentation;
> (c) Calculated Net Profit;
> (d) William's Profit Share amount;
> (e) Number of active customers, new customers, and churned customers.
>
> **Payment.** William's Profit Share shall be paid within fifteen (15) days after the end of each calendar month via wire transfer or other mutually agreed method.

### 3D. Audit Rights

> **Audit Rights.** William shall have the right, at his own expense (except as provided below), to audit or have audited by an independent certified public accountant the financial records of Clarity related to the Platform, upon thirty (30) days' prior written notice, no more than once per calendar year. Clarity shall provide reasonable access to all books, records, and accounts relevant to the calculation of Gross Revenue, Permitted Deductions, and Net Profit.
>
> **Underpayment.** If any audit reveals an underpayment of more than five percent (5%) for any audited period, Clarity shall (a) promptly pay the deficiency plus interest at [8%] per annum from the date originally due, and (b) reimburse William for the reasonable costs of the audit.

### 3E. Handling Disputes Over Expenses

> **Expense Disputes.** If William disputes any Permitted Deduction, he shall notify Clarity in writing within thirty (30) days of receiving the monthly report. The Parties shall negotiate in good faith to resolve the dispute within fifteen (15) days. If unresolved, the dispute shall be submitted to an independent accountant mutually selected by the Parties, whose determination shall be final and binding. The cost of the independent accountant shall be borne by the Party whose position is further from the accountant's determination.

---

## 4. Non-Compete and Non-Solicitation

### 4A. Current Legal Landscape

The FTC's proposed blanket ban on non-competes was vacated by federal courts and the FTC abandoned its appeal in September 2025. Enforceability falls back to state law. Courts are generally more willing to enforce non-solicitation clauses than broad non-competes.

For a cross-border deal (Sweden/US), focus on non-solicitation rather than non-compete, as these are more universally enforceable.

### 4B. Non-Solicitation of Personnel

> **Non-Solicitation of Personnel.** During the term of this Agreement and for a period of twelve (12) months following termination, neither Party shall, directly or indirectly, solicit, recruit, hire, or engage any employee, contractor, or agent of the other Party who was involved in the performance of this Agreement, without the prior written consent of the other Party.

### 4C. Non-Solicitation of Customers

> **Non-Solicitation of Customers.** During the term and for twelve (12) months following termination, neither Party shall solicit the customers of the Platform for a competing video sales platform, using customer information obtained through this Agreement.

### 4D. Non-Circumvention

This is arguably more important than a non-compete. It prevents Todd from replicating William's work with a new developer immediately after termination:

> **Non-Circumvention.** For a period of twelve (12) months following termination of this Agreement, Clarity shall not engage any third party to replicate, reproduce, or create a substantially similar version of any William-Developed Features, nor shall Clarity use knowledge of William's architecture, design decisions, or technical approach (obtained through this Agreement) to brief or direct a replacement developer to recreate such features.

### 4E. Why Non-Compete Should Be Narrow

A broad non-compete (e.g., "William cannot work on any video platform") would be hard to enforce and unfair. Instead, use a narrow restriction:

> **Limited Non-Compete.** During the term and for six (6) months following termination, William shall not develop or launch a product that directly competes with the Clarity Platform in the video sales enablement market. This restriction does not apply to William's general software development activities, consulting work, or the development of products in other markets.

---

## 5. Standard Minimum Terms

### 5A. What Is Typical?

Based on research across technology partnership agreements:

| Partnership Type | Typical Minimum Term |
|---|---|
| SaaS technology partnerships | 12-24 months |
| IT managed services | 12-36 months |
| Joint software ventures | 12-24 months |
| Pilot/trial periods | 3-6 months |
| Revenue share partnerships | 6-12 months |

### 5B. Recommendation for This Deal

**Proposed structure:**

- **Phase 1 (Months 1-3): Trial Period.** Both parties commit to a 3-month trial. During this period, the $1K/month floor applies. Either party can terminate at end of month 3 with 30 days notice, but only if they provide notice before end of month 2.
- **Phase 2 (Months 4-12): Committed Term.** If neither party terminates at the end of the trial, the agreement automatically converts to a 12-month committed term (months 4-15 total). Early termination during this phase triggers the Early Termination Fee and Tail Revenue provisions.
- **Phase 3 (Month 13+): Evergreen.** Agreement renews on a month-to-month basis with 60 days notice to terminate.

**Suggested clause language:**

> **Term.** This Agreement shall commence on the Effective Date and shall continue for an initial Trial Period of three (3) months. If neither Party provides written notice of termination at least thirty (30) days before the end of the Trial Period, this Agreement shall automatically continue for an additional nine (9) months (the "Committed Term"), for a total initial period of twelve (12) months. Following the Committed Term, this Agreement shall renew automatically on a month-to-month basis unless either Party provides sixty (60) days' prior written notice of termination.

---

## 6. Dispute Resolution

### 6A. Why Arbitration for This Deal

For a Sweden-US cross-border partnership, international arbitration is strongly preferred over litigation:

- **Enforceability:** Arbitral awards are enforceable in 170+ countries under the New York Convention (1958). Both Sweden and the US are signatories. Court judgments across borders are much harder to enforce.
- **Neutrality:** Neither party has "home court advantage."
- **Speed:** Faster than litigation in most jurisdictions.
- **Confidentiality:** Arbitration is private; court proceedings are public.

### 6B. Recommended Forum: SCC (Stockholm Chamber of Commerce)

The SCC Arbitration Institute is well-established, handles ~200 cases/year (half international), and is recognized globally. It offers expedited rules for smaller claims.

**Suggested clause language (SCC combination clause):**

> **Governing Law.** This Agreement shall be governed by and construed in accordance with the laws of Sweden, without regard to its conflict of law provisions.
>
> **Dispute Resolution.** Any dispute, controversy, or claim arising out of or in connection with this Agreement, or the breach, termination, or invalidity thereof, shall be finally settled by arbitration administered by the Arbitration Institute of the Stockholm Chamber of Commerce (the "SCC").
>
> The Rules for Expedited Arbitrations of the SCC shall apply where the amount in dispute does not exceed EUR 100,000. Where the amount in dispute exceeds EUR 100,000, the SCC Arbitration Rules shall apply. The seat of arbitration shall be Stockholm, Sweden. The language of the arbitration shall be English.

### 6C. Escalation Clause (Negotiate Before Arbitrating)

> **Escalation.** Before initiating arbitration, the Parties shall attempt to resolve any dispute through good faith negotiation for a period of thirty (30) days following written notice of the dispute. If the dispute remains unresolved, either Party may initiate arbitration in accordance with the provisions above.

### 6D. Interim Measures

> **Interim Relief.** Nothing in this Section shall prevent either Party from seeking interim or injunctive relief from any court of competent jurisdiction to prevent irreparable harm pending the outcome of arbitration.

### 6E. Alternative: US-Based Arbitration

If Todd objects to Stockholm, a neutral US option:

> **Alternative:** ...shall be finally settled by arbitration administered by the American Arbitration Association ("AAA") under its International Arbitration Rules. The seat of arbitration shall be New York, New York. The language of the arbitration shall be English.

---

## 7. Additional Protective Provisions

### 7A. Most Favored Partner Clause

> **Most Favored Terms.** If Clarity enters into a revenue-sharing, profit-sharing, or similar arrangement with any other technology partner on terms more favorable than those in this Agreement, Clarity shall promptly notify William and offer William the option to amend this Agreement to include such more favorable terms.

### 7B. Change of Control

> **Change of Control.** If Clarity undergoes a Change of Control (defined as a sale of all or substantially all assets, merger, acquisition, or transfer of more than 50% of voting interests), William may elect to (a) continue this Agreement with the successor entity on the same terms, or (b) terminate this Agreement and receive the Early Termination Fee (if within the Minimum Term) and a lump-sum payment equal to twelve (12) months of the average monthly Profit Share calculated over the preceding six (6) months.

### 7C. Access and Transparency

> **Platform Access.** During the term, William shall have full access to the Platform's codebase, analytics, billing systems, and customer data necessary to perform his obligations and to verify revenue reports. Clarity shall not restrict or revoke such access without thirty (30) days' prior written notice and mutual agreement.

### 7D. Insurance Against Scope Creep

> **Scope of Work.** The Parties shall maintain a mutually agreed written scope of work ("SOW") describing the features, fixes, and improvements William shall develop. Changes to the SOW require written agreement of both Parties. If Clarity requests work materially outside the SOW, William may (a) decline such work, (b) agree to perform it under the existing terms, or (c) negotiate additional compensation for such work.

---

## 8. Summary: William's Priority Negotiation List

Ranked by importance for protecting William's investment:

1. **Minimum 6-month term** (non-negotiable). Without this, the entire deal is high-risk.
2. **Tail revenue provision** (12 months post-termination). This is the single most important protection.
3. **IP ownership remains with William** (Option A) or at minimum joint ownership (Option B) with vesting.
4. **Clear net profit definition** with explicit excluded costs. Do not let "net profit" become a loophole.
5. **Early termination fee** (sliding scale). Financial penalty for walking away early.
6. **Audit rights** with underpayment penalty. Trust but verify.
7. **Non-circumvention clause**. Prevents Todd from replicating the work with a cheaper developer.
8. **Change of control provision**. Protects against Clarity being sold and the new owner terminating.
9. **Access to financials and platform**. Cannot verify revenue without access.
10. **SCC arbitration**. Enforceable, neutral, and in your jurisdiction.

---

## 9. Key Negotiation Strategy

**What Todd probably wants:** Low commitment, flexibility to end if it is not working, full IP ownership.

**What William needs:** Enough protection to justify $30K+ of upfront development work with limited guaranteed income.

**The compromise pitch:** Frame the protections as alignment mechanisms. The tail revenue and IP provisions mean both parties are incentivized to make the partnership work long-term. If Todd truly believes in the partnership, these provisions cost him nothing because he would never trigger them.

**Red flags to watch for:**
- Todd insisting on owning all IP with no vesting = he may plan to use William as a short-term fix
- Resistance to any minimum term = he is not committed
- Vague "net profit" definitions = costs will expand to eat profits
- No audit rights = lack of transparency

---

## 10. Sources

- [Structuring Profit-Sharing Clauses - Aaron Hall](https://aaronhall.com/structuring-profit-sharing-clauses-in-partnership-agreements/)
- [Revenue Share Clauses in Joint Software Ventures - Aaron Hall](https://aaronhall.com/revenue-share-clauses-in-joint-software-ventures/)
- [Essential Partnership Agreement Clauses - The Applegate Firm](https://www.theapplegatefirm.com/blog/essential-clauses-to-include-in-business-partnership-agreements/)
- [Revenue Sharing Agreement Basics - UpCounsel](https://www.upcounsel.com/revenue-share-partnership-agreement)
- [Profit Sharing Agreement Template - ShareWillow](https://www.sharewillow.com/blog/profit-sharing-agreement-template)
- [10 Tips for Revenue Sharing Agreements - M Accelerator](https://maccelerator.la/en/blog/entrepreneurship/10-tips-for-structuring-revenue-sharing-agreements/)
- [Joint Ventures: IP Ownership - Norton Rose Fulbright](https://www.nortonrosefulbright.com/en/knowledge/publications/c19352aa/joint-ventures-ip-ownership-and-development-considerations)
- [Joint IP Ownership Guide - UpCounsel](https://www.upcounsel.com/joint-ownership-of-intellectual-property)
- [IP Joint Venture Agreements - LegalGPS](https://www.legalgps.com/intellectual-property/blog/ip-joint-venture-agreement-guide)
- [SCC Dispute Resolution Clauses](https://sccarbitrationinstitute.se/en/dispute-resolution-clauses/)
- [SCC Expedited Arbitration](https://sccarbitrationinstitute.se/en/our-services/expedited-arbitration/)
- [International Arbitration Sweden - Chambers](https://practiceguides.chambers.com/practice-guides/international-arbitration-2025/sweden)
- [Cross-Border Arbitration - Fitch Law Partners](https://www.fitchlp.com/blog/2019/03/top-five-reasons-to-include-international-arbitration-provisions-in-cross-border-contracts/)
- [Early Termination Fee Clauses - Law Insider](https://www.lawinsider.com/clause/early-termination-fee)
- [Buyout Clause Samples - Law Insider](https://www.lawinsider.com/clause/buyout)
- [Profit Share Clauses - Law Insider](https://www.lawinsider.com/clause/profit-share)
- [Termination Clauses in IT Contracts - Scott & Scott LLP](https://scottandscottllp.com/termination-clauses-in-it-managed-services-contracts/)
- [Tail Period Clauses - Aaron Hall](https://aaronhall.com/tail-period-clauses-in-business-broker-agreements/)
- [FTC Non-Compete Update - Venable](https://www.venable.com/insights/publications/2025/10/ftc-non-compete-enforcement-and-state-law)
- [Sweat Equity Agreements - Eqvista](https://eqvista.com/sweat-equity-agreement/)
- [Non-Compete in Partnerships - FasterCapital](https://fastercapital.com/content/Non-compete-clause--Preventing-Competition-with-a-Non-Compete-Clause-in-Your-Partnership-Agreement.html)
- [Partnership Duration - FasterCapital](https://fastercapital.com/content/Partnership-duration--Establishing-Duration-in-Your-Partnership-Agreement.html)

---

*This document is research guidance, not legal advice. Consult a qualified attorney before signing any agreement. For a cross-border deal of this nature, consider engaging a Swedish attorney with experience in international commercial agreements.*
