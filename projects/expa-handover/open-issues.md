# Open Issues

## CMS Data Sync: Capacity Type Error

**Status:** Open
**Severity:** Blocks data sync
**Workflow:** BuildShip → Framer CMS Data Sync

**Error message:**
> Expected a number value for field: capacity

**What's happening:**
The BuildShip "Framer CMS Data Sync" workflow fails because the `capacity` field is being passed as a string (e.g. `"20"`) instead of a number (`20`).

**Likely fix:**
- **Option A (CMS fix):** Ensure the `capacity` field in Framer CMS is typed as `Number` and all entries have numeric values (not quoted strings)
- **Option B (BuildShip fix):** Add a `parseInt()` / `Number()` conversion step in the BuildShip workflow before the data is pushed to the destination

**Screenshot:** See the BuildShip workflow error in the sync node.

---

## Expa NO Open Questions (from Feb 5, 2026 email)

These questions came from Catrine (Expa NO). They should be answered by Erik/Vaylo going forward.

1. **Will mobile number be mandatory in the next update?**
   - <!-- TODO: Answer or assign to Erik -->

2. **Will email double-checking be added?**
   - <!-- TODO: Answer or assign to Erik -->

3. **Will the Expa logo be visible on the widget?**
   - <!-- TODO: Answer or assign to Erik -->

---

## Outstanding Items

<!-- TODO: Add any other known bugs, pending requests, or technical debt -->

- [ ] <!-- TODO -->
- [ ] <!-- TODO -->
