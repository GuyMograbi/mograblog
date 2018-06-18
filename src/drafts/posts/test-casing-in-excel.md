---
title: Write awesome QA tool in 1 hour
published: 2016-10-15T22:30:00.001-07:00
layout: post.pug
keywords: qa, mocha, jasmine, protractor, nodejs, javascript, excel
description: Don't compromise on your quality. Make your ALL your tests reusable and data driven with this simple idea
cover: /style/images/2017/04/qa_failure.jpg
coverTitle: Funny Paddington Bear picture when fur swelled due to electricity
---

QA process can be very cumbersome.   
Test case creations, execution and reports review (if such exist) is time consuming and error prone if done manually.
Making this step automatic is not always easy especially when your team is low on resources.

But this does not mean you have to compromise on your quality.

> Quality is never an accident; it is always the result of high intention, sincere effort, intelligent direction and skillful execution; it represents the wise choice of many alternatives.
>
> -- <cite>WILLIAM A. FOSTER</cite>



# So many test cases

As an example I will use [todomvc.com](http://todomvc.com/examples/angularjs/#/) website which displays multiple implementations of a todo list in different frameworks.

Some of the actions you should test are:

 - Add a task
 - Mark task as completed
 - Remove a task
 - See how many tasks are in list (bottom left)
 - Filter list by: 'all', 'active', 'completed'

 Some interesting scenarios you might want to check

  - Typing tasks with weird characters
  - Marking all tasks as completed
  - Deleting all tasks
  - Adding a lot of tasks

Lets try to define a test case in a table. It might look something like this:



| Step  | Test Case 1 |
|---|---|
| Add task | buy milk |
| Check list size | 1 |
| Mark task as completed | buy milk |
| Check list size | 0 |
