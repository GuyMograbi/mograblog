<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;">

<tbody>

<tr>

<td style="text-align: center;">[![](http://www.thebottomlineisthebottomline.com/images/sorting.gif)](http://www.thebottomlineisthebottomline.com/images/sorting.gif)</td>

</tr>

<tr>

<td class="tr-caption" style="text-align: center;">taken from [.thebottomlineisthebottomline.com](http://www.thebottomlineisthebottomline.com/images/sorting.gif)</td>

</tr>

</tbody>

</table>

Amazed that it is not yet built into browsers, I came across the JavaScript called [sorttable](http://www.kryogenix.org/code/browser/sorttable/). By quickly importing the src and marking your table with class="sortable" you can have your tables sorted.  

It has support in "total" lines - that should remain static, and not be sorted and also have an API you can play with from your code.  

# How do they do it?

You have to use 3/4 JavaScript capabilities  

<a name="more"></a>  

### getElementByTagName

You can quickly get all the tables in your HTML page by running  

<pre>document.getElementsByTagName("table");  
</pre>

### getClassName

Since we mark the sorted tables with classname "sortable", we can know which tables should be sorted simply by using the following function  

<pre>var t = document.getElementsByTagName("table")[0]; // lets take the first table for example  
var cn = t.className  
</pre>

Now, the variable "cn" contains the string written in "class". Since there can be more than a single style in the class, you should split and iterate over results, or using regular expression - something like [this site](http://snipplr.com/view/1696/get-elements-by-class-name/) does. Examples are not missing.  

### Replacing Rows

This will probably be most tedious step of all. You should know about [Table API in JavaScript](http://tutorials.haxansweb.com/javascript/miscellaneous/Add-a-table-row-dynamically-By-david) and there are more than enough tutorials for that.  

This is also the time to remember the sort algorithms you once knew.  
I'd probably prefer to build a small array simulating the table, sort that, and let it output the correct order of rows by index, then iterate one last time ( O(n)) over the table, setting the rows in their new indexes.  

### Enhancements

As I said before, the script also allows you to keep some rows unsorted. For example - the "total" row.  

This is a simple extension. While accessing the table via JavaScript, you can choose which part of the table.  
Each table can support THEAD, TFOOT, and multiple TBODY.  

All you have to do is access the TBODY part, and that's it.  
You can also decide here to support multiple TBODY as well, and configure how to sort them - each TBODY on its own, or all of them together..  

# Example

I have allowed myself to copy a small example from the documentation on to this post.  

<div style="border: 1px solid black;">  
This example is from [sorttable documentation](http://www.kryogenix.org/code/browser/sorttable/)  

<style>/* Sortable tables */ table.sortable thead { background-color:#eee; color:#666666; font-weight: bold; cursor: default; }</style>  

<table class="sortable">

<tbody>

<tr>

<th>Name</th>

<th>Salary</th>

<th>Extension</th>

<th>Start date</th>

<th>Start date (American)</th>

</tr>

<tr>

<td>Bloggs, Fred</td>

<td>$12000.00</td>

<td>1353</td>

<td>18/08/2003</td>

<td>08/18/2003</td>

</tr>

<tr>

<td>Turvey, Kevin</td>

<td>$191200.00</td>

<td>2342</td>

<td>02/05/1979</td>

<td>05/02/1979</td>

</tr>

<tr>

<td>Mbogo, Arnold</td>

<td>$32010.12</td>

<td>2755</td>

<td>09/08/1998</td>

<td>08/09/1998</td>

</tr>

<tr>

<td>Shakespeare, Bill</td>

<td>$122000.00</td>

<td>3211</td>

<td>12/11/1961</td>

<td>11/12/1961</td>

</tr>

<tr>

<td>Shakespeare, Hamnet</td>

<td>$9000</td>

<td>9005</td>

<td>01/01/2002</td>

<td>01/01/2002</td>

</tr>

<tr>

<td>Fitz, Marvin</td>

<td>$3300</td>

<td>5554</td>

<td>22/05/1995</td>

<td>05/22/1995</td>

</tr>

</tbody>

</table>

</div>

Also available at [my site](http://mograbi.co.il/guy_mograbi/jsps/examples/sortTable.jsp)