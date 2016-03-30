---
title:  AngularJS - Using Our Table Paging Directive
published: 2013-07-01T06:06:00.000-07:00
keywords: angular
description: final step of tutorial - start using the directive you wrote.
layout: post.hbs
---


This is the second part of a [serie about AngularJS super table directives](/2013/06/angularjs-smart-table-1.html "Serie About AngularJS Super Table Directive")
where we add "paging" and "search" and "sort" to a table in a highly  
reusable, customizable way.  
So far we have a directive that adds "prev" and "next" buttons.  
This directive handles disable/enable on the button.  

Currently, the table will show all records in our "data".  
To complete the pagination, we need to build our page.  
I decided to implement this part with a filter.  
Technically, you can also do it from within the directive.  
My decision to split the pagination buttons, and filtering out  
the page from the data will enable us to add more features later.  

## Implementing the "paging" filter

The code looks like so:

```
myApp.filter("pagingFilter", function(){  
 return function(input, pageSize, currentPage) {  
         return input ?  input.slice(currentPage * pageSize, currentPage * ( pageSize + 1 )) : [];  
 }  
});  
```

We define a filter by returning a function.  
Our filter expects 3 parameters:

*   input - The data we filter - all filters get this
*   pageSize - the page size
*   currentPage - the number of the current page

## Using this Filter

Using filter in AngularJS is the easiest thing ever.  
Currently we have the line

we need to modify this line toWhich means we filter the data using the paging filter.  
We pass it the "dataPageSize" and "dataCurrentPage" which we defined  
in the previous post.  

## The outcome

The outcome is we see only a single page instead of all the data.  
Our paging filter is ready.  

## Why did I use a filter?

I said before, we could have implemented this logic in the directive.  
The reason I chose to implement a filter instead allows me to have more flexibility such as add another filter in between or reusing the paging filter for other diretives - in which case the name "paging filter" might not be suitable anymore.  

## So how can we get rid of the code duplication?

To get rid of the code duplication you can wrap the paging directive and the paging filter with another directive.  
We will do this after we add the rest of the features.  
In the next post I will show you how to easily add

## changing the page size

Just as an examples to features you can easily add,  
how about changing the page size?  
We can easily add it with the following code

```
<div class="page-size">  
 page size :   <a href="javascript:void(0)" ng-repeat="pageSize in [10, 50, 100]">\{{pageSize}}</a>
</div>
```

and implement a function on the scope like so

```
$scope.setPageSize = function(pageSize){$scope.dataPageSize = pageSize;}     
```

You might be wondering why do we need this function? Why not simply write:

```
 <a href="" ...="" ng-click="dataPageSize = pageSize" ng-repeat="...">..</a>   
```

The answer is that "ng-repeat" creates a new isolated scope and so the "ng-click" will only have affect inside the "a" tag.  
There are scenarios where you will not notice this phenomena however this is not one of them.