---
title: AngularJS - Adding Sort
published: 2013-07-22T07:12:00.000-07:00
description: lets add sort on a table
keywords: angular, javascript
layout: post.pug
---


So far we have a table where we can select the columns, search the content and pagination where we select the page size.  
Believe it or not, but the entire code (HTML+CSS+JS) is no longer than 200 lines - without using plugins!

In this post we will add sorting to the table.  
Just like the other features, if we had a big amount of data, we would prefer doing this on the server side.  
However in this post, I will implement it entirely on the client side.  

## Adding Sort

We want to apply sort when the user clicks on a header.

```

<td ng-click="orderTableBy(head)" ng-repeat="head in headers">
 \{{head}}
</td>

```

The "orderTableBy" should look like so

```
$scope.orderTableBy = function(header){  
    if ( $scope.orderHeader == header && $scope.orderDirection == false){  
        $scope.orderHeader = null; // clear sort.  
    }  
    else if ( $scope.orderHeader == header ){  
        $scope.orderDirection = false;  
    }else{  
      $scope.orderHeader = header;  
        $scope.orderDirection = true;  
    }  
};     
```

Note that it is important to use "orderDirection == false" and not "!orderDirection" - as using the negate operator on null will turn it to "false" and we would like to treat null differently.  

Currently - this code will reside in the controller. Later we should consider wrapping it with a directive.  
As you can see - our implementation also handles the direction!  
Now it is time to use this data when we construct the table body.  
Just like with the text search, this also comes built in with AngularJS.  

```
 <paging data="tableData = ( data | orderBy:orderHeader:orderDirection | filter:searchText  )" current-page="dataCurrentPage" page-size="dataPageSize"></paging>
 ```

You can run the code and click a header to see the sort.

## Adding an indication in the UI

So we are sorting the data, but the user does not know it.  
Adding an indication is more a CSS job than AngularJS.  
However we still need AngularJS to specify class names.  
This is a CSS to start from

```css
table tr:first-child td.sortBy:after{  
 display:block;  
 content:"";  
 height:0;  
 width:0;  
 border:10px solid transparent;  
}  
table tr:first-child td.desc:after{  
 border-color: black transparent transparent transparent;   
}  

table tr:first-child td.asc:after{  
 border-color: transparent transparent black transparent;   
}     
```

And this is how the header cells looks like with class names defined.

```
<td
 ng-class="{
   'sortBy' : head == orderHeader,
   'asc':head == orderHeader && orderDirection == true,
   'desc':head == orderHeader && orderDirection == false
   }"
 ng-click="orderTableBy(head)"
 ng-repeat="head in headers">
  \{{head}}
</td>

```

