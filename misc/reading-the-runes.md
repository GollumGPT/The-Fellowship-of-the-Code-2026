# Reading the Runes

## What the Code Does

The application is a simple inventory tracker for “Hobbit rations.”
It starts with 10 rations
The user can enter a number in the input field
“Add Rations” increases the total
“Eat Rations” decreases the total (but should never go below 0)
The UI should always display the current rations

## Identified Issues

**Issue 1: Type inconsistency**

The application stores and manipulates the main state (`rations`) inconsistently as both a string and a number.

***Where:***

```js
let rations = "10";
const value = amountInput.value;
rations = rations + value;
rations = rations - value;
```
***What happens:***

The + operator performs string concatenation:

```"10" + "5" → "105"```

The - operator forces implicit numeric conversion:

```"10" - "5" → 5```

This leads to inconsistent behaviour depending on the operation.

***Why this matters:***

The system does not have a reliable data model. The same variable behaves differently depending on the operator used. This creates silent state corruption, where values appear valid in the UI but are logically incorrect.

In larger systems, this can lead to broken calculations, inconsistent stored data, and hard-to-trace logic errors.

***Fix***

```js
let rations = 10;
const value = Number(amountInput.value);
rations = rations + value;
rations = rations - value;
```

**Issue 2: Missing input validation**

User input is taken directly from the DOM and used in arithmetic operations without validation or type checking.

***Where:***
```js
const value = amountInput.value;
```

***What happens:***
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

***Why this matters:***

The system does not define what valid input is. As a result, invalid data can enter the state layer directly, breaking core logic.

***Fix***

```js
const value = Number(amountInput.value);

if (!Number.isInteger(value) || value <= 0) {
    alert("Please enter a whole number greater than 0.");
    return;
}
```

**Issue 3: UI and state are not consistently synchronized**

The UI update is not consistently aligned with state changes, particularly in the “Eat” logic.

***Where:***
```js
updateStatus();

if (rations - value < 0) {
    alert("Not enough rations!");
} else {
    rations = rations - value;
}
```
***What happens:***
The UI is updated before the state is validated or modified. This can result in the displayed value not matching the actual state at the moment of interaction.

***Why this matters:***
This breaks the principle of state-driven UI rendering, where the interface should always reflect the current state. Inconsistent ordering leads to confusing user experiences.

***Fix***

```js
const newValue = rations - value;

if (newValue < 0) {
    alert("Not enough rations!");
    return;
}

rations = newValue;
updateStatus();
```

## AI Reflection
First, we tested the application to understand its behaviour. This allowed us to identify the most obvious problem areas in the code. Afterwards, we used AI to double-check whether we had missed any relevant issues.

In addition, we used AI to help structure our findings in a more systematic way by organising the problems using the “where / what happens / why this matters” format.

At first, the AI described a large number of issues, but many of them were very similar or closely related. After asking for clarification, we realised that several of these points could be grouped together. As a result, we consolidated them into the three main issues described above.

Finally with the help of AI we could find fixes for the issuses.
