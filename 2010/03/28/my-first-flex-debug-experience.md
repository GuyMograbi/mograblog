<div class="separator" style="clear: both; text-align: center;">[![](http://1.bp.blogspot.com/_J3A8WqpdCX0/S69fN8i_IfI/AAAAAAAAAa8/CnO-JtoKHsE/s1600/flex_debug.bmp)](http://1.bp.blogspot.com/_J3A8WqpdCX0/S69fN8i_IfI/AAAAAAAAAa8/CnO-JtoKHsE/s1600-h/flex_debug.bmp)</div>

I am learning Flex among other things today, and I came across an interesting difficulty.  

<a name="more"></a>  

# Reading XML

The book I am reading suggests the following example.  
Given an XML file of the form :  

<pre><books>  
<stock>  
....  
</stock>  
<stock>  
....  
</stock>  
...  
</books>  
</pre>

I should write the following main  

<pre> <mx:application xmlns:mx="http://www.adobe.com/2006/mxml" <br="">layout="absolute" creationComplete="bookData.send()">  
 <mx:httpservice id="bookData" url="book.xml">  
 <mx:datagrid x="56" y="250" width="950" dataprovider="<br">     "{bookData.lastResult.books.stock}"/>  
</mx:datagrid></mx:httpservice></mx:application>  
</pre>

While placing the SWF file and the XML file in the same directory.  

So I gave it a go, and I got an empty TABLE. (Not even column names).  
The book said - if something goes wrong you should see an error popup. But I didn't see one, so I assumed everything is ok.  

Since I had no idea what is wrong, I installed the flex builder - hoping to debug it easily. Once I hit the "debug" I got "debugger not found, click here to install" message. So I installed it - and voila(!) once the debugger was installed - I got an error popup saying  

<pre> Only local-with-filesystem and trusted local SWF files may access local resources  
</pre>

Aha! A quick search in Google will tell you to switch "use-network" to "false", and indeed my POM had "true" for that value, and I changed it to false - but that didn't help.. So I investigate a bit farther and [this](http://livedocs.adobe.com/flex/3/html/help.html?content=security2_03.html) is what I found.  

A great page that shows you the security levels available in Flex. I immediately copy pasted the source required in order to see the security level I am running in, and found out it was "local-with-network" even though I specifically told the plugin "false" on "use-network" property.  

It seems that the plugin

<pre>net.israfil.mojo:maven-flex2-plugin</pre>

doesn't use this property as expected. (maybe in newer versions this bug was fixed).  
Fortunately, this plugin allows extra properties definition. So I did the following :  

<pre><extraparameters>  
 <parameter><name>use-network=false</name></parameter>  
</extraparameters>  
</pre>

and that did the trick. Now my flex tutorial was working properly.  

# Conclusion

*   In flex - the error pops-up only when the debugger is installed
*   Setting false to plugin

    <pre>net.israfil.mojo:maven-flex2-plugin</pre>

    "use-network" property does not operate as expected - but it is fixable

# References

*   [](http://sites.google.com/site/guymograbi/flex)My Wiki for flex
*   [A great page for security in Flex explanation](http://livedocs.adobe.com/flex/3/html/help.html?content=security2_03.html)