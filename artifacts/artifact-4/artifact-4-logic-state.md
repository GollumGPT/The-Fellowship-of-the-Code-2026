# The Fellowship Companion - Artifact IV: Logic & State

## System Capability

**Which capability are you implementing?**

The implemented capability is the Emergency Hazard Alert system. It allows a Fellowship member to instantly broadcast their current location together with a selected threat type to the rest of the group.

**What state does it use or change?**

The interface manages four primary state variables in JavaScript:

- currentLocation: Stores the current location name (e.g., “Mines of Moria”).
- selectedHazard: Stores the currently selected danger type (Orcs, Traps, Nazgûl, etc.).
- isSending:Becomes true while the alert transmission is in progress. This prevents duplicate transmissions and blocks repeated button presses.
- isSent: Becomes true after the transmission has completed successfully. This permanently switches the interface into confirmation mode.

**Why does it matter for the Fellowship right now?**

During high-risk situations such as the attack at Amon Hen, traditional warning methods like Boromir’s horn provided limited contextual information and arrived too late.

This emergency system improves coordination by instantly communicating:

- the exact location of the danger
- the specific type of threat

As a result, the Fellowship can react faster, coordinate more effectively, and reduce confusion during critical moments.

## Static Interface Implementation

`[Static Interface](/src/interface.html)`

> For this example see [interface.html](./src/interface.html) *(**logic implementation:** [logic.js](./src/logic.js))*

## Design Rationale

**How does the logic support the goal?**

The primary design goal is to reduce user mistakes under extreme stress and time pressure.

The system logic enforces this by:

- keeping the emergency button disabled by default
- requiring an explicit hazard selection before transmission is possible
- visually unlocking the interface only after a valid selection

This prevents accidental or incomplete emergency broadcasts.

**How does the behavior match the concept?**

The interaction behavior is intentionally designed to reflect the urgency and simplicity of an emergency communication device used under extreme pressure.

The interaction flow intentionally follows a highly simplified sequence:

- Select a hazard
- Press the emergency button
- Wait during transmission
- Receive visual confirmation

The confirmation summary reassures the user that the signal has been successfully delivered and that assistance is on the way.

**Constraints and System Boundaries:**

The application deliberately uses a strict interaction lock after transmission.

Once the system state changes to isSent:

- the setup interface is hidden
- the selection grid becomes inaccessible
- interaction with hazard controls is disabled

This prevents users from modifying or corrupting an already dispatched alert.

Additionally, the persistent green “GPS Signal Locked” status pill functions independently from the transmission state. It continuously communicates that the device maintains an active positional signal even after an alert has been sent.

**Deliberate Omissions (Scope Limitation):**

This prototype intentionally excludes:

- a real backend infrastructure
- persistent databases
- actual GPS hardware integration
- real-time networking

The displayed location (“Mines of Moria”) is currently represented as a static string inside the frontend state object.

These omissions keep the project focused entirely on:

- frontend interaction design
- state management
- user experience under stress conditions

**Assumption:** 

**Active Signal Lock:** 

The system assumes that the device already has an active network and positioning connection before the interface is opened.
This assumption is visually reinforced through the permanently active green status indicator (“GPS Signal Locked”).

**Stress Limits:** 

The interface assumes that the user may be operating under panic or physical stress.

To minimize cognitive load:

- no typing is required
- no menus must be navigated
- no confirmation pop-ups interrupt the workflow

The entire emergency process requires only two simple interactions.

**Sent Means Sent:** 

The system assumes that emergency broadcasts are irreversible once transmitted.
For this reason, the interface permanently transitions into summary mode after sending and removes access to the original hazard selection interface. This prevents post-send manipulation and preserves transmission integrity.


---
