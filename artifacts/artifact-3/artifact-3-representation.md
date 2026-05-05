# The Fellowship Companion - Artifact III: Representation

## System Capability

**Emergency Alert**

We chose this capability because it solves a key problem in our system: slow communication in dangerous situations.

The Emergency Alert enables Fellowship members to request immediate assistance during life-threatening situations. It automatically pairs the distress signal with critical data (precise location and specific type of threat) to ensure the rest of the group can react fast and correctly.

## Static Interface Implementation

> [interface.html](https://github.com/GollumGPT/The-Fellowship-of-the-Code-2026/blob/b7998aad9230dd48950877b99bb85550fc408b89/artifacts/artifact-3/src/interface.html)

## CSS

> [style.css](https://github.com/GollumGPT/The-Fellowship-of-the-Code-2026/blob/b7998aad9230dd48950877b99bb85550fc408b89/artifacts/artifact-3/src/style.css)

## Design Rationale

This design is focused on speed and clarity to help a user who is under extreme pressure and has no time to think.

- Decision Hierarchy: To prevent "choice paralysis" under pressure, the UI is reduced to a single primary action: Send Emergency Alert. The alternative ("Wait/Cancel") is moved to a secondary back-button, ensuring the main goal is unmistakable.
- High-Contrast: The "Send Alert" button is the most visible element. Its bright red color and large size ensure that the user knows exactly where to press to get help.
- Narrative Specificity: Instead of generic risk levels (High/Low), the interface uses Lore-specific hazards (Orc Ambush, Nazgûl Sighted). This allows the receiver to know immediately whether they should draw swords or hide.
- Automated Information: The location is displayed clearly as "detected," reassuring the user that the system is already working and their coordinates are ready to be sent.

**Assumptions:** 

- Instant Location Availability: It is assumed that the device has already established a stable GPS connection (a "GPS lock") by the time the screen is opened, so the location is displayed immediately without delay.

- Physical Limitations: We assume the user may have shaky hands or be moving quickly, which is why the primary button is oversized and the interactive elements are spaced far apart.
