# The Fellowship Companion - Artifact IV: Logic & State

## System Capability

**Which capability are you implementing?**
The "Emergency Hazard Alert". It lets a companion instantly send their location and a specific threat type to the rest of the group.

**What state does it use or change?**
It manages four simple state variables in JavaScript:
- currentLocation: The name of the place (e.g., "Mines of Moria").
- selectedHazard: The chosen danger (Orcs, Traps, etc.).
- isSending: True while the message is being sent (blocks double-clicks).
- isSent: True after sending is successful (changes the screen view).

**Why does it matter for the Fellowship right now?**
In situations like Amon Hen, Boromir's horn was too late and lacked clear information. This digital alert saves lives because the team instantly sees exactly **what** the danger is and **where** it is happening, allowing a fast, coordinated rescue.

## Static Interface Implementation

`[Static Interface](/src/interface.html)`

> For this example see [interface.weak.html](/src/interface.weak.html) *(**logic implementation:** [logic.weak.js](/src/logic.weak.js))*

## Design Rationale

**How does the logic support the goal?**
Our goal is to reduce mistakes under heavy time pressure. The logic ensures that the main button stays disabled and grey until a danger type is clicked. This prevents accidental false alarms inside a pocket while walking.

**How does the behavior match the concept?**
It follows a clear step-by-step flow: 
- Select a hazard 
- Click the red button 
- Wait 1.5 seconds (sending animation) 
- View final confirmation summary. This gives the stressed user immediate peace of mind that help is on the way.

**Constraints and System Boundaries:**
We deliberately introduced a hard interaction lock. Once the alert status is set to isSent, the setup interface is systematically destroyed and replaced by the summary. The user cannot loop infinitely or toggle hazards post-send. The green status-pill acts as an independent system health indicator, signaling to the user that the background GPS service remains locked even after a broadcast.

**Deliberate Omissions (Scope Limitation):**
There is no real backend, no database, and no real GPS tracking. The location "Mines of Moria" is a simple text string in the code. This keeps the focus 100% on the frontend design.

**Assumption:** 

**Active Signal Lock:** We assume the device already has a strong network connection before the screen opens. In the code, the bottom status pill immediately shines green (GPS Signal Locked) to reassure the user.

**Stress Limits:** We assume the user has shaky hands and no time to type. The logic requires only two simple clicks with no annoying pop-ups or text inputs.

**Sent Means Sent:** We assume that a broadcast cannot be stopped once it leaves the device. The logic enforces this by hiding the selection grid after sending, so the user cannot tamper with or break the running transmission.



---
