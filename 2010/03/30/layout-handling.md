I just got an Email from Blogger/Draft about [the new Blogger/Draft layout manager](http://bloggerindraft.blogspot.com/2010/03/blogger-template-designer.html).  
The new manager has a cool layout, and a better look and feel. However, as you can see I preferred keeping my own crummy layout. The reason is simple - I like a very wide body. This is the widest I could achieve.  

<a name="more"></a>  

# The new layout manager

<object width="640" height="385"><param name="movie" value="http://www.youtube.com/v/r6haqZoivBQ&amp;hl=en_US&amp;fs=1&amp;color1=0xcc2550&amp;color2=0xe87a9f"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><embed src="http://www.youtube.com/v/r6haqZoivBQ&amp;hl=en_US&amp;fs=1&amp;color1=0xcc2550&amp;color2=0xe87a9f" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385"></object>  

So I got interested about how to do a layout manager ?  
I know it is possible to modify the style from JavaScript - but it seemed too tedious to me - so I guessed you can modify the style-sheet instead. And indeed I found it (Thanks to quirks mode again.. Great site).  

Lets assume I have the following style  

<pre>.guy{  
color:red;  
}  
</pre>

I can modify it from JavaScript with this line :  

<pre>document.styleSheets[0].cssRules[0].style.color="blue";  
</pre>

NOTE : I tested only on FF.  

It is a bit ugly that you have to use index numbers instead of selector.  
However - you can check the selector and manually filter the correct ones.  

Moreover - you can identify the styleSheet using the URL used to import it.  

There are a lot of other things you can do - you should check it out, it's quite cool - for example - change the selector!  

So now - it seems quite easy to create a new layout manager. For example - import many different layout, and enable/disable them according to user selection - and you get a generic modular dynamic designer to your site.  

Soon at mogi's code :)  

# References

*   [Quirks Mode Tutorial](http://www.quirksmode.org/dom/changess.html)
*   [New layout manager article](http://bloggerindraft.blogspot.com/2010/03/blogger-template-designer.html)