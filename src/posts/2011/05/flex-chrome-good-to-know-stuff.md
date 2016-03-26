---
title: Flex + Chrome = good to know stuff
published: 2011-05-03T04:11:00.000-07:00
description: things you should know about chrome when working with flex
keywords: flex, chrome

---

<div dir="ltr" style="text-align: left;" trbidi="on">

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/-bJ2s9abO3rI/TcLJ8-TOCNI/AAAAAAAAA0w/gwl__kPvhW4/s1600/chrome_flex.png)](http://3.bp.blogspot.com/-bJ2s9abO3rI/TcLJ8-TOCNI/AAAAAAAAA0w/gwl__kPvhW4/s1600/chrome_flex.png)</div>

I've been working with Flex for some time now, but yesterday I was amazed to discover how hard it was to debug flex when working with Chrome.  

With Firefox, everything is nice, you simply install the [FlashBug](https://addons.mozilla.org/en-us/firefox/addon/flashbug/) addon to [FireBug](http://getfirebug.com/) and you're good to go. (That is assuming you are NOT using firefox 4  ).  

However, yesterday I had a bug in Flex, that for some reason reproduced steadily only on Chrome.  
Even though Flex should behave the same on all browsers, there are [some incompatibilities](http://frankieloscavio.blogspot.com/2008/09/google-chrome-and-flex-deep-linking.html).  

The first thing I tried to do was to see the log.  
Took me seconds to find an [adobe page explaining about log](http://livedocs.adobe.com/flex/3/html/help.html?content=logging_04.html) location.  
However - the log was EMPTY!  

I suddenly realized that Chrome is not running my "debugger" version of Flex (which is required for log).  
After a bit of digging, I discovered Chrome comes with a FlashPlayer built-in, overriding the System's FlashPlayer. Following [instructions](http://www.timo-ernst.net/2010/04/chrome-flash-debugger-not-connecting-to-flexflash-builder/) I was able to disable the built-in plugin. enabling the debug option with Chrome.  

Now, I can connect with debugger, and have log prints when running the Flex with Chrome.  
I like my development environment much better now since Chrome is lighter, and faster.  

The instruction are pretty simple :  

*   go to : [chrome://plugins](chrome://plugins/)
*   click on "details". 
*   find the two flash plugins. 
*   disable the first one, and make sure the second points to the right plugin. 

<div>That's all. </div>

<span class="Apple-style-span" style="font-size: x-large;">References</span>  

*   [Instructions](http://www.timo-ernst.net/2010/04/chrome-flash-debugger-not-connecting-to-flexflash-builder/)

</div>