# Getting Annoyed with Blogger

Its starting to be too much for me. Really..  
All I want to do is write technical posts on Blogger but I keep bumping to silly problems.  

The most repeated problem is the support for "pre" tags. Especially in cases where I want to copy-paste XML content into my post.  

It is virtually impossible.  

The problem lies in the fact that HTML is XML, and if it does not recognize the tag, it simply hides it.. So the following code example  

<pre><name>My Name</name>   
</pre>

will simply show "My Name" string.  

In order to show the XML tags, you need to manually escape the < character. Using the  
<  
escape sequence.  
Which is annoying by itself.  
But I got a nice workaround for it - I simply copy paste the XML content to [my own text editor](http://www.mograbi.co.il/guy_mograbi/jsps/examples/textEditor.jsp). You might need to play around with it before you can get it working fine, but I promise you it is worth the trouble if you have a big XML sequence to copy-paste. For example MAVEN configuration! Or spring file.  

Well, today I noticed something new and really annoying in blogger.  
Usually, the "Compose" tab gave me a pretty good preview of the output HTML.  
So when I copied XML content, I always used the "Compose" tab to make sure the copy-paste went well. But today I noticed that  

<div class="separator" style="clear: both; text-align: center;">[![](http://2.bp.blogspot.com/_J3A8WqpdCX0/TR-EIgTNsBI/AAAAAAAAAro/4Kjr-E5Nn1E/s320/no_preview.png)](http://2.bp.blogspot.com/_J3A8WqpdCX0/TR-EIgTNsBI/AAAAAAAAAro/4Kjr-E5Nn1E/s1600/no_preview.png)</div>

# Isn't there a better Editor???

So I searched for a better editor. You would think that Google would have a better HTML editor for blogger. Google - the creator of Google Docs. But NO!  

Recently I had a really [good experience with BlogPress on my IPOD](http://blog.mograbi.info/2010/12/first-blog-with-ipod-touch.html).  
I really liked their editing, and especially how they handle pictures.  

Did you notice that blogger always adds the image to the top of the post? And wrapped with tons of picasa code - what's up with that??  
The most logic thing would be to append it to the bottom ( the current editing location ), and let everything else be configurable...  

So I search for BlogPress on the internet, and I got really disappointed to see that it is only an application for mobile devices.  

# Still missing features

The features I am lacking most in blogger are :  
*   Built in support for code highlights  
*   Easy links to other posts - If I want to link to a previous article of mine, it is hell!and even worse, it is not a domain change friendly method  

I am still amazed how much effort they put into they layout mechanism but leave the editor such at such a low level.  

# A few good words

As someone who wrote [a WYSIWYG editor](http://www.mograbi.co.il/guy_mograbi/jsps/examples/textEditor.jsp) I have to say, it's hard for me to know how exactly they keep the code so clean..  

I can only assume that the "Edit HTML" is not the direct HTML interpretation of the "Compose" view. In between they probably have a JS to handle spaces and line breaks.  

I will try to put the same mechanism in my own editor, and see if I have any good result.  
Maybe I will getting something good enough to replace blogger's editor?