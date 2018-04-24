---
title: Beware - 3 Things That Cause False Positive Builds!
published: 2017-02-01T22:30:00.001-07:00
layout: post.pug
keywords: mocha, javascript
description: Make sure your tests are actually running! 3 things that
---

<center>![Pencils With Bad Design](/style/images/2017/02/test-failure.jpg)</center>

Non running tests are a huge threat to any software project.    
Sometimes you are resting assured thinking the tests will catch bugs before they reach production.    

But sometimes, you discover your tests are not actually running!   
Here are 3 common things that might cause your build to skip tests.

# Item 1: Process Exit

If someone snuck a `process.exit` to you tests that means your build is passing but **tests are NOT running**

This issue might go unnoticed for a while and will produce errors in production.

## Problem: An example

Consider the following code in a test

```javascript
const {expect} =  require('chai');

describe('sum', function(){
  it('should sum 1 and 1', function(){
    expect(1+1).to.eq(2);
    process.exit(0);
  })

  it('should also sum 2 and 2', function(){
    expect(2+2).to.eq(3);
  })
})
```

The second test should fail.
But, due to the `process.exit` in the first test, the process will exist with code `0` and almost no output.


## Solution: Control your process with global.js

Mocha supports a file `global.js` which will execute first if exists.   
Simply create it at `test/global.js` and add `console.log('hello world')` to see it in action.

Then add the following to fix the problem:

```javascript
const originalProcessExit = process.exit;
process.exit = function(code){
  console.log('should I stay or should I go now?', code, new Error())
  if (new Error().stack.includes('node_modules/mocha/bin/_mocha')){
    originalProcessExit(code);
  }
}
```

This is a pretty straight forward way to wrap the original `process.exit` with your own logic.

We also make sure that if mocha is trying to exit with code `1` to propagate it properly.

# Item 2: Uncaught Exception

Listening on `uncaughtException` or `unhandledRejection` is a common bad practice in nodejs community.

```javascript
process.on('uncaughtException', (err) => {
  console.log('this is uncaughtException', err);
});
```

In mocha testing you should NOT have any listeners to `uncaughtException` or `unhandledRejection`. The reason is that mocha takes care of it for you and makes sure to report test failure appropriately.

If you override this listener, mocha will not be able to do that. Your process will behave as you define in your handler. Either exit with a code you defined, or even worse - keep running.

# Solution: Do not listen on uncaughtException when testing!

The only solution is to make sure you don't have such a handler when you are running tests.    
This is the only way you can guarantee proper test failure reporting.

# Item 3: Winston might mess you up... beware

This problem is just another flavor on top of `uncaughtException`.

winston library has a feature 'handleExceptions' and `exitOnError`. Here is a very common setup for the logger.

```
const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      handleExceptions: true
    })
  ],
  exitOnError: false
});
```

# Solution: Do not handleExceptions

The only way to get mocha to work properly is to not handleExceptions at all. Let mocha do the handling.


# Share your experiences

I would love to hear about other cases where common practices caused the build to skip the tests.   
Please comment below, and don't forget to share.
