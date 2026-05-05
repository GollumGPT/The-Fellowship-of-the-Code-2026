# The Fellowship Companion - Artifact III: Representation

*`(For demonstration purposes only)`*

## System Capability

**The system helps the Fellowship make decisions.**

I chose this capability because decisions are important for the Fellowship and they have to decide a lot during the journey.

## Static Interface Implementation

`[Static Interface](/src/interface.html)`

> For this example see [interface.weak.html](/src/interface.weak.html)

## Design Rationale

This design supports the intent because it lets the user decide things. I followed the wireframe I made before. I did not implement functionality because this is only HTML and CSS.

**Assumption:** The Fellowship knows how to use the interface.

---
---

## Why this is weak

- **Capability is too vague:** *"Helps the Fellowship make decisions"* is not a clearly scoped capability.
- **No concrete context:** No reference to which decision, when, or why it matters in the journey.
- **HTML issues:**
  - No semantic structure (header, main, section, etc.)
  - Buttons are not connected to a specific task
  - No labels, grouping, or hierarchy
  - Capability is implicit and vague (*"Choose what to do next"*)
  - No trace of the wireframe beyond *"there are buttons"*
- **CSS issues:**
  - Styling is arbitrary (*"make it look okay"*)
    - No connection to the narrative (LotR)
  - No layout logic (no flex/grid, no alignment intention)
  - Visual hierarchy is accidental
  - Colors have no meaning
- **Conceptual issues:**
  - The interface does not clearly represent:
    - What decision is being made?
    - Why now?
    - What information supports the decision?
  - Could belong to any app, not this system
  - The UI does not express intent - it merely exists
- **Design rationale is superficial:** Restates the assignment constraints instead of reflecting on decisions.
- **Assumptions are not examined:** *"I assume the Fellowship knows how to use it"* avoids responsibility instead of reasoning.
- **No linkage:** Weak or missing connection to Assignment 1 (situation/intent) and Assignment 2 (decisions).
- **Reads like a checklist:** Not like a considered design step in a larger system.

*`This example is not entirely wrong, but it is very generic and would be very hard to build on in later assignments.`*
