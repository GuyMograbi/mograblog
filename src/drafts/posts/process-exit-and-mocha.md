---
title: Beware: 3 Things That Cause False Positive Builds!
published: 2017-01-01T22:30:00.001-07:00
layout: post.pug
keywords: mocha, javascript
description: Make sure your tests are actually running! 3 things that
---

[Pencils With Bad Design](/images/test-failure.jpg)

# Item 1: Process Exit

If someone snuck a `process.exit` to you tests that means your build is passing but no tests are actually running.

This issue might go unnoticed for a while and will produce errors in production.

## Problem: An example

Consider the following code in a test

```javascript
const {expect} =  require('chai');

describe('sum', function(){
  it('should sum 1 and 1', function(done){
    expect(1+1).to.eq(2);
    process.exit(0);
  })

  it('should also sum 2 and 2', function(){
    expect(2+2).to.eq(3);
  })
})
```

The expected result is to see the failure of the second test.   
But what you will get is a process that exists with error `0` and almost no output. (depends on how fast is your logger).


## Solution: Control your process with global.js

Mocha supports a file `global.js` which will execute first if exists.   
Simply create it at `test/global.js` and add `console.log('hello world')` to see it in action.

The file should contain the following content

```javascript
if (process.env.SKIP_WRAP != 'true'){
  const originalProcessExit = process.exit;
  process.exit = function(code){
    console.log('should I stay or should I go now?', code, new Error())
    if (new Error().stack.includes('node_modules/mocha/bin/_mocha')){
      originalProcessExit(code);
    }
  }
}
```

This is a pretty straight forward way to wrap the original `process.exit` with your own logic.

Note that the end goal is to get exit code `1` when the tests fail - for that it is necessary to identify when we should call process.exit (in our case, when mocha calls it) and in that case pass the exitCode along to the original function.

# Item 2: Uncaught Exception

# Solution: Exit on uncaught exception

# Item 3: Winston might mess you up... beware

This problem is just another flavor on top of uncaughtException.

To be friendly to users the awesome winston team have a feature called 'exitOnError'
#
If you have code such as the following

```javascript
const winston = require('winston');
const logger = new winston.Logger({exitOnError:true});

process.on('uncaughtException', (err) => {
  console.log('this is uncaughtException', err);
});
throw new Error('this is a problem');
```

Even `exitOnError: false` might cause a problem..

In the first case the process will exist with code `0` again, and in the second one
