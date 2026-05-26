# Reading the Runes

## What the Code Does

The application is a simple inventory tracker for “Hobbit rations.”
It starts with 10 rations
The user can enter a number in the input field
“Add Rations” increases the total
“Eat Rations” decreases the total (but should never go below 0)
The UI should always display the current rations

## Identified Issues

**Issue 1: Unstable state model (type inconsistency and implicit coercion)**

The application stores and manipulates the main state (`rations`) inconsistently as both a string and a number.

Where:

```js
let rations = "10";
const value = amountInput.value;
rations = rations + value;
rations = rations - value;
```
What happens:

The + operator performs string concatenation:
´"10" + "5" → "105"´
The - operator forces implicit numeric conversion:
´"10" - "5" → 5´

This leads to inconsistent behaviour depending on the operation.

Why this matters:

The system does not have a reliable data model. The same variable behaves differently depending on the operator used. This creates silent state corruption, where values appear valid in the UI but are logically incorrect.

In larger systems, this can lead to broken calculations, inconsistent stored data, and hard-to-trace logic errors.

**Issue 2: Missing input validation (unsafe user input handling)**

User input is taken directly from the DOM and used in arithmetic operations without validation or type checking.

Where:
```js
const value = amountInput.value;
```

The input is used directly without validation or type conversion. This allows:

Invalid inputs such as:

- "apples"
- "" (empty input)
- negative numbers
- non-integer values

can all be processed by the system.

This can result in:

- NaN values
- unintended arithmetic results
- logical corruption of the ration count


Why this matters:

The system does not define what valid input is. As a result, invalid data can enter the state layer directly, breaking core logic.

**Issue 3: UI and state are not consistently synchronized**
Where:
```js
updateStatus();

if (rations - value < 0) {
    alert("Not enough rations!");
} else {
    rations = rations - value;
}
```
What happens:
The UI is updated before the state is validated or modified. This can result in the displayed value not matching the actual state at the moment of interaction.

Why this matters:
This breaks the principle of state-driven UI rendering, where the interface should always reflect the current state. Inconsistent ordering leads to confusing user experiences.


## AI Reflection
AI helped identify the issues quickly. Especially useful for explaining string vs number behavior.

