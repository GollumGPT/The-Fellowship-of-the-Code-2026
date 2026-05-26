# The Fellowship Companion - Artifact IV: Logic & State

*`(For demonstration purposes only)`*

## System Capability

**Track the Fellowship's current quest step.**

Track the Fellowship's progress through the quest.

## Static Interface Implementation

`[Static Interface](/src/interface.html)`

> For this example see [interface.weak.html](/src/interface.weak.html) *(**logic implementation:** [logic.weak.js](/src/logic.weak.js))*

## Design Rationale

This logic supports the intent because when the user clicks the button, the quest step changes. The JavaScript follows the interface and updates what the user sees. I did not add advanced logic because this is a simple example.

**Assumption:** The Fellowship understands what the current quest step means.

---
---

## Why this is weak

- **Capability is too vague:** *"Track the current quest step"* is not a clearly scoped capability.
- **No concrete context:** No reference to why the step changes, who triggers it, or what constraints apply.
- **Logic & State issues:**
  - **UI text is the state**
    - Logic depends on string matching
    - Copy changes break behavior
  - **No constraints**
    - You can loop forever
    - No "end" condition
  - **Silent fallback**
    - Invalid states reset without explanation
  - **Event-driven, not system-driven**
    - Clicking causes change
    - Not rules, intent, or context
  - **Impossible to extend cleanly**
    - Adding one step means rewriting conditionals
    - No structure to reason about
- **Flow & Consistency issues:**
  - Flow from Assignment 2 is not represented
  - Behavior is linear by accident, not by design
- **Conceptual issues:**
  - Could belong to any app, not this system
  - The Logic does not express intent - it merely updates text
- **Design rationale is superficial:** Restates the assignment constraints instead of reflecting on decisions.
- **Assumptions are not examined:** *"The Fellowship understands the quest step"* avoids responsibility instead of reasoning.
- **No linkage:** Weak or missing connection to Assignment 1 (situation/intent), Assignment 2 (decisions), and Assignment 3 (representation).

*`This example technically works and shows interaction, but it has no stable state model and would be very difficult to extend, debug, or reason about in later assignments.`*
