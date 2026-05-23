## Application Description

The application is designed to manage rations.
The user can enter a value and either add it to the total or consume it.
The current amount is displayed in the interface.


## Issues

**Issue 1**
Since rations is a string, JavaScript concatenates instead of adding → "10" + 5 = "105"
Wrong Data Type (String instead of Number)
It occurs in:
let rations = "10";
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

