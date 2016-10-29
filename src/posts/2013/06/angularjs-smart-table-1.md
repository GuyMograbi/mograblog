---
title: AngularJS - Table Paging Directive
published: 2013-06-24T13:49:00.000-07:00
keywords: angular, javascript
description: you can write a paging directive in a couple of minutes.
layout: post.pug
shortcodes: true
---


In this post and the next one I will show you how to write
a directive that adds paging to your table using AngularJS.  
Thanks to AngularJS great structure, all code is reusable and activated  
as easily as adding a class!  


[#alert-info]
DISCLAIMER: I am not an AngularJS expert. All my examples can probably  
be easily improved. However this is a great tutorial to learn advanced  
AngularJS programming as it gathers the knowledge of different threads  
while adding my own.
[#/alert-info]

## Spec

For this step we will simply require a directive that adds some HTML  
on the page and will set the grounds for the other features.  
This directive should have:

*   Show next/prev page buttons - I leave adding links to directly to a page for you as a challenge
*   Enable/Disable these buttons accordingly
*   Show record X - Y synopsis.

In the following post we will use this directive's data  
to filter out the single page from the data list.  

# Creating The "Paging" Directive

Using our [template for this post serie](/2013/06/angular-js-sort-filter-and-paging-a-table-directive.html#postTemplate) we declare the smart table directive in
our JavaScript section like so

```
myApp.directive("paging", function(){  

        return {  
            // define a template with back/prev buttons, using functions I will define  
            // on the scope  
            template:'<div><button ng-disabled="!hasPrevious()" ng-click="onPrev()"> Previous </button> \{{start()}} - \{{end()}} out of \{{size()}} <button ng-disabled="!hasNext()" ng-click="onNext()"> Next </button><div ng-transclude=""></div> </div>',
            // Lets allow this tag to be defined as an "Attribute","Element" or "Class".  
            restrict:'AEC',   
            transclude:true, // transclude means we allow the tag to have a body  
            // next we define the scope   
            // the "=" sign means these scope variables will be available  
            // from the parent scope. For "currentPage" we will use   
            // attribute "current-page='myCurrentPage'" - where "myCurrentPage"  
            // is the variable on the parent scope. This means we can programatically  
            // change the value from the parent scope. Isn't this great?  
            // This also means multiple tables will be able to share the same  
            // paging.   
            scope:{   
                'currentPage':'=',  
                'pageSize':'=',  
                'data':'='  

            },  
            link:function($scope, element, attrs){  

             // size of entire data  
                $scope.size = function(){  
                    return $scope.data.length;  
                };  

                // end of the page  
                $scope.end = function(){  
                    return $scope.start() + $scope.pageSize;  
                };  

                // start of page  
                $scope.start = function(){  
                    return $scope.currentPage * $scope.pageSize;  
                };  

                // number of page - default to 0  
                $scope.page = function(){  
                    return !!$scope.size() ? ( $scope.currentPage + 1 ) : 0;  
                };  

                // do we have another page?  
                $scope.hasNext = function(){  
                    return $scope.page() < ( $scope.size() /  $scope.pageSize )  ;  
                };  

                // what to do if "next" button is pressed.  
                $scope.onNext = function(){  
                    $scope.currentPage = parseInt($scope.currentPage) + 1;  
                };  

                // do we have a previous page?  
                $scope.hasPrevious = function(){  
                    return !!$scope.currentPage;  
                } ;  

                // what to do if "prev" button is clicked  
                $scope.onPrev = function(){  
                    $scope.currentPage=$scope.currentPage-1;  
                };  

                // define default values for scope variables.   
                try{  
                    if ( angular.isDefined($scope.data) ){  
                        $scope.data = [];  
                    }  
                    if ( angular.isDefined($scope.currentPage) ){  
                        $scope.currentPage = 0;  
                    }  
                    if ( angular.isDefined($scope.pageSize) ) {  
                        $scope.pageSize = 10;  
                    }  
                }catch(e){ console.log(e);}  
            }  

        }  

});    
```

The outcome of the code above includes:

*   A new directive that is available by attribute, element or class name called "paging". See "restrict:AEC".
*   We add next/prev buttons for paging with X-Y summary.
*   We expose and use methods such as "hasPrevious" to decide we have a previous page
*   We use the methods to enable/disable the prev/next buttons
*   We allow embedded code within the directive by using "ng-transclude" and stating "transclude:true".
*   We require 3 scope variables to be wired : for data, currentPage and pageSize
*   The last item also means that by simply defining "$scope.pageSize=5" on the controller scope  
    You actually define to begin at page 5.

## Using Our New Directive

To use our new directive, all we need to do is modify the HTML like so:

```
<paging table-data="data" current-page="dataCurrentPage" page-size="dataPageSize">...
    <table> </table>
</paging>
```

In this example, I decided to use the directive as an element.  
I left the rest of the HTML as it was within the new "paging" tag.  

## What We Have So Far

If you run the code right now, you will see the next/prev buttons.  
If you click them, you see the summary is modified.  
However, the table remains the same.  
In the next post, we will add a filter called "pagingFilter" that will slice a page from the data.  
