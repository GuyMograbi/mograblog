<div class="separator" style="clear: both; text-align: center;">[![](http://1.bp.blogspot.com/_J3A8WqpdCX0/S69fN8i_IfI/AAAAAAAAAiE/Ch8Cm8MOJdI/s1600/flex_debug.bmp)](http://1.bp.blogspot.com/_J3A8WqpdCX0/S69fN8i_IfI/AAAAAAAAAiE/Ch8Cm8MOJdI/s1600/flex_debug.bmp)</div>

So you are writing code, and now you want to run it.It is then you discover you forgot to select MXML Application and instead you chose MXML Component, which means you can not run it.  

Solution after the jump  
<a name="more"></a>  

To fix this, open a file called ".actionScriptProperties"  
find the tag "applications" and add another entry "application" under it with the path to your file.  

It will look something like  

<pre><application path="testers/VisitsTester.mxml">  
</application></pre>