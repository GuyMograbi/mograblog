---
title: AngularJS - Adding "Toggle Header" Feature
published: 2013-07-08T06:39:00.000-07:00
description: lets add 'toggle' for column sorting
keywords: angular, javascript
layout: post.pug
---


In the previous posts we implemented a simple paging for a table  
using AngularJS directive and filter.  
In this post, we will add a feature that enables us to choose which  
columns we show.  
The template we are using ( [See first post](/2013/06/angularjs-smart-table-1.html))
already places the available headers on the scope.  

## Step 1 - Show available headers on the page

First, we need to show the available header on the HTML.  
For that we will add some HTML code to our page  

```

<div class="available-headers">  
 <span class="available-header" ng-click="toggleHeader(header)" ng-repeat="header in availableHeaders" style="border:1px solid black; padding:10px; border-radius:10px; line-height:40px;">{{header}}</span>   
</div>

```

## Implementing "toggleHeader"

Now we need to implement "toggleHeader"  

```
$scope.toggleHeader = function( header ){  
 var headerIndex = $scope.headers.indexOf(header);  
 if (  headerIndex >= 0 ){  
  $scope.headers.splice(headerIndex,1);  
 }else{  
  $scope.headers.push(header);  
 }  
};  
```

In this code we are using the scope variable "headers" which we already  
defined in our template.  

In the next post we will add the ability to search the table.
