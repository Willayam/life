# Open Issues

## CMS Data Sync: Capacity Type Error

**Status:** Open
**Severity:** Blocks data sync
**Where:** BuildShip → Framer CMS Data Sync workflow

**Error:**
> Expected a number value for field: capacity

**What's happening:** The sync fails because `capacity` is passed as a string (`"20"`) instead of a number (`20`).

**Likely fix:**
- **Option A (CMS):** Ensure `capacity` field in Framer CMS is typed as Number and all entries have numeric values
- **Option B (BuildShip):** Add a `parseInt()` / `Number()` conversion in the workflow before pushing data

---

## Open Questions from Expa NO

From Catrine (Feb 5, 2026 email). Erik/Vaylo to answer going forward.

1. **Will mobile number be mandatory in the next update?**
   - <!-- TODO -->

2. **Will email double-checking be added?**
   - <!-- TODO -->

3. **Will the Expa logo be visible on the widget?**
   - <!-- TODO -->

---

## Other

<!-- TODO: Add other known bugs, pending requests, or tech debt -->

- [ ] <!-- TODO -->
