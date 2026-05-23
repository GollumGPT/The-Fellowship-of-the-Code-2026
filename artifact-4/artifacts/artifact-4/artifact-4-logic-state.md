# The Fellowship Companion - Artifact IV: Logic & State

## System Capability

The selected system capability is the **Emergency Alert** function.

This capability allows a Fellowship member to quickly send an emergency signal during a dangerous or high-stress situation.

The system tracks and modifies several states during the interaction process:

- whether the emergency process has started
- whether the countdown is active
- whether the alert has been cancelled
- whether the alert has already been sent

This capability is important because Fellowship members may need to react quickly under pressure. The interface therefore focuses on clarity, fast interaction, and minimizing mistakes during stressful situations.

---

## Static Interface Implementation

[Emergency Alert Interface](/src/interface.html)

Logic implementation: `logic.js`

---

## Logic & State

The static interface from Assignment 3 was extended with JavaScript to support interaction and explicit state changes.

The implementation uses plain JavaScript and introduces a small state model for the emergency process.

### Example State Variables

```javascript
let emergencyActive = false;
let countdown = 5;
let alertSent = false;
let alertCancelled = false;
