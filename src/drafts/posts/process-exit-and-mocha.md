---
title: Process Exit And Mocha
published: 2017-01-01T22:30:00.001-07:00
layout: post.pug
keywords: mocha, javascript
description: Make sure your tests are actually running!
---

[Pencils With Bad Design](/images/test-failure.jpg)

If someone snuck a `process.exit` to you tests that means your build is passing but no tests are actually running.

This issue might go unnoticed for a while and will produce errors in production.

# Control your process with global.js

Mocha supports a file `global.js` which will execute first if exists.   
Simply create it at `test/global.js` and add `console.log('hello world')` to see it in action.
