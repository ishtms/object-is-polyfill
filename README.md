# Polyfill for `Object.is(..)`

This is a polyfill for `Object.is(..)` on old browsers!

# How it works

1. `Object.is(..)` takes two parameters.

2. It returns `true` if the passed in parameters are exactly the same value (not just `===` -- see below!), or `false` otherwise.

3. For `NaN` testing, we can test NaN without using the utility Number.isNaN() or isNaN()?

4. For `-0` testing, no built-in utility exists for now. But this polyfill will take care of it.

5. If the parameters are any other values, it tests them for being strictly equal.

## Polyfill Pattern

**NOTE:** Since we're defining this, you might want to add a condition that checks whether the browser has ```Object.is``` support. If it does, use the current version:


```js
if (!Object.is) {
	Object.is = function ObjectIs(..) { .. };
}
```
