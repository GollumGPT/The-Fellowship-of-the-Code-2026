# Reading the Runes

## What the Code Does

The application is a simple inventory tracker for “Hobbit rations.”
It starts with 10 rations
The user can enter a number in the input field
“Add Rations” increases the total
“Eat Rations” decreases the total (but should never go below 0)
The UI should always display the current rations

## Identified Issues

**Issue 1: Rations are stored as a string (type design error)**

```js
let rations = 10;
rations = rations + 5;
```

Because rations is a string, this line:
rations = rations + value;
performs string concatenation instead of numeric addition.

The state alternates between string and number behavior depending on the operator.
"10" + "5" → "105"
"105" - "2" → 103

## Why the Issues Matter

This matters because the app does not work properly. Users could get confused.

## Fixes

I fixed the code by converting everything to numbers and moving some lines around.

    rations = Number(rations) + Number(value);

## AI Assistance Reflection

- I asked ChatGPT to fix the code. It gave me the correct solution.
- I learned that JavaScript has problems with strings and numbers.


## Application Description

The application is designed to manage rations.
The user can enter a value and either add it to the total or consume it.
The current amount is displayed in the interface.


## Issues

**Issue 1**
Since rations is a string, JavaScript concatenates instead of adding → "10" + 5 = "105"
Wrong Data Type (String instead of Number)
It occurs in:

```js
let rations = 10;
rations = rations + 5;
```
rations = rations + value;


**Issue 2**
Users can enter values like "apples", which leads to **NaN** or unpredictable results.
No Input Validation (User can enter text)
It occurs in button Eat Rations


## Why These Issues Matter
1. Users get confused when numbers behave incorrectly (e.g. 10 → 105).
2. Wrong data types cause inconsistent behavior.
3. Missing validation can break the application and lead to future bugs.


## AI Reflection
AI helped identify the issues quickly. Especially useful for explaining string vs number behavior.

