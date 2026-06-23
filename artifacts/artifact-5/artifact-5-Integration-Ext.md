# The Fellowship Companion - Artifact IV: Logic & State

## System Capability

**Which capability are you implementing?**

This capability extends the Fellowship Companion system from the sender’s perspective
to the coordinator’s perspective. While Emergency Alert allows members to
send distress signals, Rescue Coordinator enables other fellowship members to visualize, track,
and manage all active incidents in real-time.

**Extension — Chart.js (library)**

Chart.js is a JavaScript visualization library used to render the decision status as a
doughnut chart.
Coordinators see the ratio of awaiting/sent/declined incidents at a glance. The chart adds visual contex and provides a good overview. The members can see the workload and bottlenecks in less than a second. The chart is linked to the status of each emergency. If an incident changes from "Awaiting" to "Accepted", the chart automatically recalculates in real-time.

## Mermaid-Chart
This flowchart shows the lifecycle of an emergency alert from the moment it hits the coordinator's dashboard until it is resolved.

Step 1: Arrival & Loading (Blue): When a Fellowship member sends an alert, the dashboard immediately calculates the data, draws the visual Chart.js pie chart, and lists the problems.

Step 2: The Choice (Yellow/Green/Red): The coordinator looks at the screen and chooses to either Accept or Decline the rescue mission.

Step 3: The Live Loop (Gray): The moment a button is clicked, the app changes its internal state. This instantly forces the KPI cards to update their numbers and recalculates the Chart.js visual layout in real-time.

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

##  Implementation

> [interface.html](./src/interface.html)

> [style.css](./src/style.css)

> [logic.js](./src/logic.js)

## Design Rationale

**How does the logic support the goal?**

The primary design goal is to reduce user mistakes under extreme stress and time pressure.

The system logic enforces this by:

- keeping the emergency button disabled by default
- requiring an explicit hazard selection before transmission is possible
- visually unlocking the interface only after a valid selection

This prevents accidental or incomplete emergency broadcasts.

**How does the behavior match the concept?**

The current interaction flow improves the original Mermaid model in Assignment 2 by removing unclear and overlapping states such as “No alert sent” or “Wait / No Alert”.

The implemented flow in the Fellowship Companion solves this by using clear and strict states:

- Setup state: The user selects a hazard before anything can be sent.
- Sending state: The interface is locked while the alert is being transmitted.
- Sent state: The interface switches to a final confirmation screen and cannot be used again for that alert.

This makes the system more predictable and easier to understand under stress.

Overall, the behavior better matches the concept of a fast, reliable emergency system.

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

## Assumptions

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
For this reason, the interface transitions into summary mode after sending and removes access to the original hazard selection interface. This prevents post-send manipulation and preserves transmission integrity.


---
