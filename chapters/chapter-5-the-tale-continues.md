# The Red Book of Westmarch - Chapter 5: The Tale Continues

*`"The board is set, the pieces are moving." - Gandalf`*

**Table of Contents**

- [The Red Book of Westmarch - Chapter X: Title](#the-red-book-of-westmarch---chapter-x-title)
  - [Summary](#summary)
  - [Artifact](#artifact)
  - [AI Assistance](#ai-assistance)
  - [Lessons Learned](#lessons-learned)

---

## Summary

This chapter focuses on the Rescue Coordinator Dashboard, a real-time tactical interface developed for The Fellowship Companion.

This dashboard serves as a central command center to coordinate emergency calls from companions across Middle-earth (e.g., Frodo in the Mines of Moria or Gandalf fighting Nazgûl). A data-driven interface was implemented to visualize incoming incidents, calculate statistical Key Performance Indicators (KPIs), and present the current status via an interactive Chart.js doughnut chart. Additionally, the system was made completely responsive, giving coordinators in the field quick access to critical alerts via a mobile accordion layout.

**Learning Outcomes**

- Creating this entire capability in one go—instead of splitting it into separate steps like before—gave us a much better overview of the whole picture.
- Apply the Chart.js library to create an interactive doughnut chart that visualizes data states
- AI is helpful for building data structures, but human design choices are necessary to fix mobile layouts and move system feedback from background logs onto a visible screen banner.
- Contribute to a **shared, evolving system**: This capability extends the Fellowship Companion system from the sender’s perspective to the coordinator’s perspective.
---

## Artifact

**Build:**

> [interface.html](./src/rescue-coordinator-index.html)

> [style.css](./src/rescue-coordinator-style.css)

> [logic.js](./src/rescue-coordinator-logic.js)

> [Wireframe](./src/Wireframe_neu.png)

> [Mermaid-Flowchart](./src/flowchart-system.mermaid.md)

**Focus:**

Rescue Coordinator Dashboard

---

## AI Assistance

**What did we expect?**

We expected the AI to immediately generate flawless code that I could copy-paste, and that the built-in simulation feedback (console.log) would be sufficient to demonstrate the dashboard's functionality.

**What actually happened?**

While the code worked perfectly in the background, two fundamental issues occurred:

 - On mobile devices, the list disappeared completely (accordion remained closed) because the click listener was missing in the JavaScript.

 - The feedback simulation initially seemed "broken" because no visual feedback appeared on the screen after clicking a button. The feedback was mistakenly sent only to the invisible browser console.

**How did AI help or mislead us?**

The AI was very helpful in setting up the clean data structure. However, it was not perfect with user experience (UX).

**What decision (changes) did we make consciously?**

We consciously decided to fix the mobile layout interaction so the menu opens correctly on phones.

**What would I do differently next time?**

Next time, we will show system messages directly and visibly on the screen (like a colored banner) from the start, instead of just having the message in the background console.


---

## Lessons Learned

- Faster Development Due to Experience: Implementing this artifact was much faster than the previous. Because we could use our experience and the feedback from the first run.

- The Importance of UX Feedback: If a system message only shows up in the background console, it does not exist for the end-user. A good dashboard must always show a clear message or banner on the screen after an action.
