<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# AngularJS - Searching The Table

So far we have pagination, and the ability to select the table headers.  
We can also change the page size.  
Today, we will add "search" to the table.  
So far we implemented everything on the client side - which means we get all the data and we manipulate it.  
When dealing with a lot of data, you will prefer to move this to the server side - just like the pagination.  

## Adding an input

First we need to add an input field.  

<pre>  

<div class="search-bar">  
 <label>Search</label><input ng-model="searchText">  
</div>

  </pre>

## Filtering the data

Remember how we used a filter before to extract the displayed page?  
Now, we will chain filters to add a search. The search filter will come first, and the paging filter will come second.  
The search filter comes built in with AngularJS  
So this will be quite easy.  
The "tr" code line now will look like so:

## The outcome

Once you added the code above, you can type something to the search input, and see the table data changes.

## Oh oh! we have a bug!

Our pagination directive had a "showing a-b from c" legend.  
However, now this legend is incorrect since we are not showing all the data,  
the value for "c" should be calculated after we filtered the searchText.  
As usual there is a simple way to resolve this and a complex way to resolve this.  
<span style="font-weight:bold">There is a really easy solution for this, but you will not find it anywhere else.</span> The solution looks like so

<pre>  
   <paging data="tableData = ( data | filter:searchText )" <br="">current-page="dataCurrentPage"   
                                   page-size="dataPageSize">  
    ...   

         ...</paging>   
  </pre>

It does the following:

*   Filter data and save the result into "tableData" at the parentScope level
*   Inject the result into the directive's scope "data" field.
*   Reuse the "tableData" variable in the table row iteration

If you read about it, you might see a lot of people advising you to use "$compile", but it is not necessary.

## Wait! Another bug!

We have data with many columns. Out of these columns, we show only 2 by default, and we allow users to control which header we show and which we are not. The "searchText" however will use all the columns for filtering.  
I chose not to fix this issue - as I would want people to filter according to a hidden column, but you might not like it.  
If you're looking for something simple - you can predefine the columns the user can search on and change the input. See example on [AngularJS documentation](http://docs.angularjs.org/api/ng.filter:filter)

<pre>  
Any: <input ng-model="search.$">   

Name only <input ng-model="search.name">  

Phone only <input ng-model="search.phone">  

  </pre>

If you're looking for something more complex - for example search only on visible headers - you will need to write your own filter. However, you can delegate AngularJS filter in your implementation.

<pre>$filter('filter')(array, expression)</pre>

</div>