# The Fellowship Companion - Artifact V: Integration & Extension

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

Step 2: The Choice: The coordinator looks at the screen and chooses to either Accept or Decline the rescue mission. The moment the choice is made, the system automatically sends a live notification back to the Fellowship member who created the alert (from Artifacts 3 and 4). This lets them know if help is on the way or if the request was declined.

Step 3: The UI Update: At the exact same time, the dashboard updates its internal counters and redraws the Chart.js pie chart in real-time.

> [Mermaid-Flowchart](./src/flowchart-system.mermaid.md)

## Wireframe

> [Wireframe](./src/Wireframe_neu.png)

##  Implementation

> [interface.html](./src/rescue-coordinator-index.html)

> [style.css](./src/rescue-coordinator-style.css)

> [logic.js](./src/rescue-coordinator-logic.js)

## Design Rationale

**1. How the integrated system still reflects the original intent and value**

The original intent of the overall project was to create an emergency alert system for Fellowship members facing extreme dangers in Middle-earth. This integrated dashboard keeps that exact intent alive. It takes raw emergency signals and presents them in a way that allows an operational coordinator (like Aragorn) to understand the crisis and deploy help immediately.


**2. How individual slices connect meaningfully**

The project connects the previous work with this final step by completing the communication loop:

Artifacts 1–4 (The Sender Side): Focused on the user in distress. They established how a Fellowship member generates an emergency alert with location, time, and threat.

Artifact 5 (The Receiver Side): Functions as the coordinator’s dashboard. It ingests the alerts created by the fellowship members.

They connect meaningfully because they form a full lifecycle: an alert is sent from the field, received by the dashboard, visualized in the chart, resolved via action buttons ("Accept" / "Decline"), and a confirmation log is sent back to the sender.


**3. Why your chosen extension makes sense**

The chosen extension is a real-time Chart.js Doughnut Chart. This choice makes sense for two operational reasons:

**Cognitive Load Reduction:** A coordinator managing multiple life-or-death situations under stress cannot quickly interpret rows of raw text or tables. The chart aggregates the data into an instant visual shape, showing the ratio of open requests versus resolved operations.

**Dynamic Interaction:** The chart is not static. It listens to the coordinator's actions. When a button is clicked, the chart updates in real-time. This changes the behavior of the system from a simple viewing page into an interactive decision-making tool.

**4. What you intentionally did not build**

Following the principle of "clarity over completeness," We deliberately chose not to build:

**A Real Backend Database:** The data is handled locally via a JavaScript array. Building a persistent database would add server complexity without adding value to the core UI/UX goals of this artifact.

**A Live Network Layer (WebSockets):** The feedback notification to the sender is simulated using console.log statements instead of building real network sockets.

Why? Leaving these backend elements out allowed us to focus purely on creating a clean layout structure, ensuring robust responsiveness across mobile and desktop device.

## Reflection
Reflecting on the development process, our understanding of the system has evolved significantly from a simple messaging tool into a complete, closed-loop emergency ecosystem.

**Phase 1 Perspective:**
In the early design stages, we imagined data management as a straightforward list or table of active emergencies.

Initially, the project felt like a one-way application focused entirely on the sender.

**Current Understanding:**
We learned that data visibility is not the same as data clarity. A coordinator managing critical, life-or-death situations has a high cognitive load. Translating raw row-and-column data into immediate visual ratios allows for instant situational awareness. The chart turned from a "nice-to-have visual extension" into the functional heart of the dashboard's decision-making layout.

By building the Rescue Coordinator Dashboard, the system transitioned into a bidirectional architecture. The connection is no longer just a message delivery; it is a full operational loop where data is sent, visualized, evaluated, acted upon, and confirmed back to the source.


