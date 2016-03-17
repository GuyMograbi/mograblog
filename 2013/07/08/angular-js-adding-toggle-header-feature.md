<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# AngularJS - Adding "Toggle Header" Feature

In the previous posts we implemented a simple paging for a table  
using AngularJS directive and filter.  
In this post, we will add a feature that enables us to choose which  
columns we show.  
The template we are using ( [See first post](/2013/06/angularjs-smart-table.html))  
already places the available headers on the scope.  

## Step 1 - Show available headers on the page

First, we need to show the available header on the HTML.  
For that we will add some HTML code to our page  

<pre class="prettyprint">  

<div class="available-headers">  
 <span class="available-header" ng-click="toggleHeader(header)" ng-repeat="header in availableHeaders" style="border:1px solid black; padding:10px; border-radius:10px; line-height:40px;">{{header}}</span>   
</div>

  </pre>

## Implementing "toggleHeader"

Now we need to implement "toggleHeader"  

<pre class="prettyprint">  
$scope.toggleHeader = function( header ){  
 var headerIndex = $scope.headers.indexOf(header);  
 if (  headerIndex >= 0 ){  
  $scope.headers.splice(headerIndex,1);  
 }else{  
  $scope.headers.push(header);  
 }  
};  
  </pre>

In this code we are using the scope variable "headers" which we already  
defined in our template.  

In the next post we will add the ability to search the table.

</div>