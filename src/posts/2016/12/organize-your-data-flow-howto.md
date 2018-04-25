---
title: Don't overthink it - unidirectional data flow
published: 2016-12-17T22:30:00.001-07:00
layout: post.pug
keywords: javascript, flux, angular, unidirectional, event-driven
description: You won't believe how easy it is to organize your data flow!
cover: /style/images/2016/12/drawing-hands.jpg
coverTitle: Escher Drawing Hands
---

Unidirectional data flow has many benefits. I am sure you already heard about them.      
Here is a way you can start implementing it in a couple of minutes!   
No new library, no new learning curve..

For the purpose of this post I will use Angular 1.x but it can easily translate to Angular2 and React.

# 2 types of components

Define 2 different types of components

 * Presentational Component -    
   Make all of its bindings one way     
   Fires events or invokes a callback to parent on interactions that require data modification.       

 * Container Component
   Handles the triggered events and modifies the data.

# Lets see an example

In the following example we have 2 angular components

 * `main` - a container component
   * handles events and modifies the data
   * Shares the data between different parts in the view.
 * `tasks-list` - a presentational component
   * displays the tasks
   * triggers functions when you add an event, and when you remove an event


```javascript

// index.html === <main></main>

angular.module('app', []);

angular.module('app').component('main', {
  template:`
    <tasks-list
                tasks="$ctrl.tasks"
                on-add="$ctrl.addTask(task)"
                on-remove="$ctrl.removeTask(index)">
    </tasks-list>
    <div> Recently Removed: {{$ctrl.recentlyRemoved}}</div>
    <div> Recently Added: {{$ctrl.recentlyAdded}}</div>
  `,
  controller: function(){
    this.tasks = ['foo'];
    this.addTask = (task) =>{ // possible asynchronous operation! also, you can delegate to a service..
      this.recentlyAdded = task;
      this.tasks.push(task);
    }

    this.removeTask = (index) =>{ // possible asynchronous operation! also, you can delegate to a service..
      this.recentlyRemoved = this.tasks[index];
      console.log('removing!', index)
      this.tasks.splice(index,1);
    }
  }
})

angular.module('app').component('tasksList', {
  bindings: {
    tasks: '<',
    onAdd: '&',
    onRemove: '&'
  },
  template: `
      <div ng-repeat="task in $ctrl.tasks track by $index">{{task}} <button ng-click="$ctrl.onRemove({index:$index})">remove</button></div>
      <hr/>
      <form>
      <input ng-model="$ctrl.newTask"/>
      <button ng-click="$ctrl.addNewTask()">Add</button>
      </form>

    `,
  controller: function () {
    this.addNewTask = () => {
      console.log('adding new task!', this.newTask , this.onAdd );
      this.onAdd({ task : this.newTask });
      this.newTask = ''; // clear
    }
  }
})
```

Some notes:

  * I allow myself to mutate the model. But if you want to you can avoid it very easily.
  * `tasks-list` changes the data on `$ctrl.newTask` and that is fine!
  * This should look like your everyday angular code with small modification.

# Strengths and Improvements

 * We can easily apply it to new code without effort.
 * No use of external library. We are using our framework's existing strengths for our benefit.
 * Easily applied to other frameworks/libraries.
 * We have a very clear separation of concerns between data modifications and data display.
   * And so made `tasks-list` more reusable and maintainable.
 * By looking at `tasks-list` bindings we know what kind of model changes events it can trigger.
 * We could easily share the data to other parts in the view (potentially other components)

# So...... flux?

Could it be I just implemented a flux architecture?    

Could be.. the more I learn about flux, the less I feel confident defining it.  
Either way, you can definitely consider this as a step towards that direction if you wish..    

My goal was to improve my code with minimal changes.

# This post was inspired by

I was very inspired by this post: [Don't overthink it grids!](https://css-tricks.com/dont-overthink-it-grids/)

The post that got me started on grids without fear! Another awesome post by Chris Coyer. Thanks you!
