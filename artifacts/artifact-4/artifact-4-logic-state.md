# The Fellowship Companion - Artifact IV: Logic & State

## System Capability

**Which capability are you implementing?**
The "Emergency Hazard Alert". It lets a Fellowship member select a danger and send their location to the team immediately.

**What state does it use or change?**
It manages four simple state variables in JavaScript:
- currentLocation: The name of the place (e.g., "Mines of Moria").
- selectedHazard: The chosen danger (Orcs, Traps, etc.).
- isSending: True while the message is being sent (blocks double-clicks).
- isSent: True after sending is successful (changes the screen view).

**Why does it matter for the Fellowship right now?**
In dangerous places like Moria, companions need to send a warning in less than two seconds without shouting. This tool saves lives through fast, silent communication.

## Static Interface Implementation

`[Static Interface](/src/interface.html)`

> For this example see [interface.weak.html](/src/interface.weak.html) *(**logic implementation:** [logic.weak.js](/src/logic.weak.js))*

## Design Rationale

**How does the logic support the goal?**
The main button is grey and disabled at first. It only becomes active when a hazard is clicked. This prevents accidental false alarms while walking.

**How does the behavior match the concept?**
It follows a clear step-by-step flow: Select a hazard 
Click the red button 
Wait 1.5 seconds (sending animation) 
See the final summary card.

**Constraints and System Boundaries:**
We deliberately introduced a hard interaction lock. Once the alert status is set to isSent, the setup interface is systematically destroyed and replaced by the summary. The user cannot loop infinitely or toggle hazards post-send. The green status-pill acts as an independent system health indicator, signaling to the user that the background GPS service remains locked even after a broadcast.

**Deliberate Omissions (Scope Limitation):**
There is no real backend, no database, and no real GPS tracking. The location "Mines of Moria" is a simple text string in the code. This keeps the focus 100% on the frontend design.

**Assumption:** The Fellowship understands what the current quest step means.

---
---


*`This example technically works and shows interaction, but it has no stable state model and would be very difficult to extend, debug, or reason about in later assignments.`*
