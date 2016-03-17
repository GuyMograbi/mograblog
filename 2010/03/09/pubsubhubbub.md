[![](http://4.bp.blogspot.com/_J3A8WqpdCX0/S5XweDzcoLI/AAAAAAAAAMI/A759-DuO6T0/s320/bigfeed.gif)](http://4.bp.blogspot.com/_J3A8WqpdCX0/S5XweDzcoLI/AAAAAAAAAMI/A759-DuO6T0/s1600-h/bigfeed.gif)  
While reading about Google Buzz I stumbled upon this nice thing called pubsubhubbub which basically stands for "publish and subscribe hub".  

It's basically the same concept of streaming but implemented for publish/subscribe mechanisms like ATOM feeds.  

<object height="295" width="480"><param name="movie" value="http://www.youtube.com/v/B5kHx0rGkec&amp;hl=en_US&amp;fs=1&amp;color1=0xcc2550&amp;color2=0xe87a9f"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><embed src="http://www.youtube.com/v/B5kHx0rGkec&amp;hl=en_US&amp;fs=1&amp;color1=0xcc2550&amp;color2=0xe87a9f" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="295"></object>  

There's also a presentation available :  
<iframe frameborder="0" height="451" src="http://docs.google.com/present/embed?id=ajd8t6gk4mh2_34dvbpchfs&amp;size=m" width="555"></iframe>  

For a more technical video that shows you how to set a hub locally check out this video  
<object height="344" width="425"><param name="movie" value="http://www.youtube.com/v/5obK-l8JwSY&amp;hl=en_US&amp;fs=1&amp;color1=0x402061&amp;color2=0x9461ca&amp;hd=1"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><embed src="http://www.youtube.com/v/5obK-l8JwSY&amp;hl=en_US&amp;fs=1&amp;color1=0x402061&amp;color2=0x9461ca&amp;hd=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="425" height="344"></object>  

# How to get Started

It pretty easy. Simply go to [http://pubsubhubbub.appspot.com/](http://pubsubhubbub.appspot.com/) and subscribe manually.  

You can also try the following implementations  
[http://code.google.com/p/pubsubhubbub/wiki/Hubs](http://code.google.com/p/pubsubhubbub/wiki/Hubs)  

# Hub and XFN

You can specify your hub like this :  

<pre><link rel="hub" href="http://pubsubhubbub.appspot.com/"></pre>

You should note the "rel" attribute which specifies hub.  

This will allow you to automatically register a hub if you want to.  

# Future Me

In the future I will set up my own hub and implement a demo page to show how it works.