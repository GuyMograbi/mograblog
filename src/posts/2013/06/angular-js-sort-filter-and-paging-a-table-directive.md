---
title: AngularJS - Sort, Filter and Paging - A Table Directive
published: 2013-06-17T20:18:00.000-07:00
keywords: angular, javascript
description: here is how you can easily write a table sort, filter and paging directive
shortcodes: true
layout: post.hbs

---

AngularJS is GREAT!
you should neglect whatever framework you are using right now,
and switch to AngularJS immediately!

In the following posts I will show you how you can easily
write a reusable table with sorting, filter and paging!
And it is all reusable, customizable and easy - thanks to AngularJS! You guys rock!
At the end I will show you how it all comes together,
and I will provide a github link to the source code.
This example is great for advanced programming in AngularJS.

For production purposes you should definitely check out [AngularUI's](http://angular-ui.github.io "Angular UI") [NG-Grid](http://angular-ui.github.io/ng-grid/ "NG Grid") project.

[#alert-info]

#### DISCLAIMER

I am not an AngulrJS expert. I am an enthusiast.
The things I write here can probably be improved.
I use AngularJS v-1.0.6\.
[#/alert-info]

*   [Paging Directive](/2013/06/angularjs-smart-table-1.html)
*   [Paging Filter](/2013/07/angularjs-using-our-table-paging.html)
*   [Toggling Headers](/2013/07/angularjs-adding-toggle-header-feature.html)
*   [Adding Sort](/2013/07/angularjs-adding-sort.html)
*   [Adding Search](/2013/07/angularjs-searching-table.html)

## Outcome

Weeks after writing these posts (not all published yet) - I came across [a nice project called "smart table"](http://lorenzofox3.github.io/smart-table-website/ "Smart Table") - what do you know?
After you read my posts, you will know how to write this "smart table" plugin in AngularJS.

Let me use this opportunity to point out this plugin did a nice job with the filtering feature.
It simply placed an input field on every column header - which is very intuitive and space is used well.

## More Possible Features

What I show in these posts is the basics.
You can easily modify them to include server side filtering,
customizable templates, page jump links and probably a lot more.

# Getting Started

Before we begin implementing the features, we need to set the environment.
For data, I decided to use a nifty cool tool for [JSON data generation](http://www.json-generator.com/ "JSON Data Generator"). However, since they will not save my JSON for longer than 30 days,
I saved their output into a google doc, and I serve it from my google drive.

Below you can find an HTML template to start from.
This template shows a simple AngularJS usage for building a table from JSON data.
I added some basic CSS to comfort.
For some reason, using $http.get did not go that well, so I used JQuery instead.

```
<html ng-app="myApp">
 <head>
  <style>
   body {background-color:#cecece; margin:0; padding:0; font-family:Arial; }
   body>div:first-child {width:50%; margin:auto; margin-top:40px;}
   table {border:none; border-collapse:collapse; width:100%;}
   table tr { border:none;}
   table tr td { border:none; font-size:37px; font-weight:bolder;}
   table tr:first-child{background-color:#00ff00;}
   table tr:nth-child(2n){ background-color:blue;}
   table tr:nth-child(2n+3){ background-color:red;}
  </style>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
  <script src="http://code.angularjs.org/1.0.6/angular.min.js"></script>

  <script type="text/javascript">

   var myApp = angular.module("myApp",[]);

   myApp.controller("PostController", function( $scope, $http ){
    $scope.headers = ["name","age"];
    $scope.availableHeaders = [];
    // using JQuery because $http does not work as expected here..
    $.ajax({
     url:"https://googledrive.com/host/0BzBTj4P1uKcAMVVNa0VySm5fbjg",
     success:function(d){
      $scope.$apply(function(){
       $scope.data = JSON.parse(d)["result"];
       for ( header in $scope.data ){
        $scope.availableHeaders.push(header);
       }
       console.log($scope.data)
      });
    }
    });
   });
  </script>
 </head>
 <body ng-controller="PostController">
  <div>
   <table>
    <tr>
     <td ng-repeat="head in headers">
      \{{head}}
     </td>
       </tr>
       <tr ng-repeat="d in data">
        <td ng-repeat="head in headers">
         \{{d[head]}}
        </td>
       </tr>
   </table>
  </div>
 </body>
</html>
```

## The complete code

Here is the code as it should look like at the end.

<script src="https://gist.github.com/GuyMograbi/5736526.js"></script>