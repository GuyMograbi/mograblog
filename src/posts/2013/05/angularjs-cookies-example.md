---
title: AngularJS Cookies Example
published: 2013-05-06
keywords: angular, javascript
description: here is how you can use cookies in angular
layout: post.hbs
---



## Step 1 - include cookies module

Your first step would be to include the JS file and then add dependency on cookie module.  

```
var DemoApp = angular.module( 'DemoApp', ['ngCookies'] ).config( demoConfig );     
```

## Step 2 - Inject into controller

Now that the module is available to you, you can finally inject it to your controller.

```
DemoApp.controller('DemoController', function($cookieStore, $scope, $location, $routeParams, $http , $timeout ){ .. body here .. })  
```

## Step 3 - Using the cookie store

Now you can use `put` and `get` and `remove` like so:

```
$cookieStore.put("name","my name");  
$cookieStore.get("name") == "my name";  
$cookieStore.remove("name");  
```

## Out of the Box

Angular support JSONs serialization automatically for cookies.  

## Limitations

By the time of writing this, angularJS does not support "expires" or "path" attributes on cookies.  
If you must use it, you can always include and use JQuery cookies in Angular.  
Angular works well with JQuery, detecting it exists and using it.  
If JQuery is unavailable, Angular uses a simpler version of it called JQLite.  

## A Note on Minifaction

As explained in [AngularJS documentation](http://docs.angularjs.org/tutorial/step_05#anoteonminification "angularJS documentation"), the examples I show above  
will not support minification.  
In order to support them, you should use a different syntax for constructors.  
My controller constructor for example would look like so

```
DemoApp.controller('DemoController', ['$cookieStore','$scope','$location','$routeParams','$http','$timeout',function($cookieStore, $scope, $location, $routeParams, $http , $timeout ){ .. body here }])       
```

