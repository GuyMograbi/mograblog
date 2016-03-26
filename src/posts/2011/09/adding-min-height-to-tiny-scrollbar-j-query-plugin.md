---
title: Adding min-height to TinyScrollbar JQuery plugin
published: 2011-09-21T02:35:00.001-07:00
description: fixing an issue with tiny scrollbar plugin
keywords: jquery, tinyscrollbar
---

<div dir="ltr" style="text-align: left;" trbidi="on">Today I added "minHeight" feature a JQuery plugin a became quite fond of..  
This plugin is called [Tiny Scrollbar](http://www.baijs.nl/tinyscrollbar/), and for this post you will need to have a look at [the source](http://www.baijs.nl/tinyscrollbar/js/jquery.tinyscrollbar.js), as I am going to modify it just a bit, while adding a powerful feature.  

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">The Problem</span>  
Before I added the feature, in some cases, you would get a really small scroll bar.  
To fix this issue, I decided to patch the plugin with a configuration parameter I called "minsizethumb"  

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/-PvxOmKLe3kI/Tr_wFcVbXnI/AAAAAAAAC8g/iBxgOlPJrGY/s1600/tinyscrollbar_really_tiny.png)](http://3.bp.blogspot.com/-PvxOmKLe3kI/Tr_wFcVbXnI/AAAAAAAAC8g/iBxgOlPJrGY/s1600/tinyscrollbar_really_tiny.png)</div>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">The Changes</span>  
There are really small changes to make in order to add this feature  
First of all, you need to add a configuration parameter.  
In JQuery, this is quite easy. You should look for an object right at the top of the plugin.  
This object is usually called "options".  

In tiny scrollbar it looks like this :  

<pre class="javascript" name="code">options: {  
 axis: 'y', // vertical or horizontal scrollbar? ( x || y ).  
 wheel: 40,  //how many pixels must the mouswheel scroll at a time.  
 scroll: true, //enable or disable the mousewheel;  
 size: 'auto', //set the size of the scrollbar to auto or a fixed number.  
 sizethumb: 'auto' //set the size of the thumb to auto or a fixed number.  
 **<u>minsizethumb: -1  // set a minimum size for the thumb.. combine with sizethumb='auto'</u>**  
 }  
</pre>

<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">See line 7 for the change I made.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">It is important to initialize the new option with some default value.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Adding the new option has no real effect on the plugin. You must refer to it somewhere.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">I added a line referring to this option in the "update" method.</span>  
<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace; font-size: x-small;">  
</span>  

<pre class="javascript" name="code">this.update = function(sScroll){  
   oViewport[options.axis] = oViewport.obj[0]['offset'+ sSize];  
   oContent[options.axis] = oContent.obj[0]['scroll'+ sSize];  
   oContent.ratio = oViewport[options.axis] / oContent[options.axis];  
   oScrollbar.obj.toggleClass('disable', oContent.ratio >= 1);  
   oTrack[options.axis] = options.size == 'auto' ? oViewport[options.axis] : options.size;  

   oThumb[options.axis] = Math.min(oTrack[options.axis], Math.max(0, ( options.sizethumb == 'auto' ? (oTrack[options.axis] * oContent.ratio) : options.sizethumb )));  
            if ( options.minsizethumb > 0 &&  oThumb[options.axis] < options.minsizethumb )  
            { // set a minimum height for the bar  
                oThumb[options.axis] = options.minsizethumb;  
            }  
   oScrollbar.ratio = options.sizethumb == 'auto' ? (oContent[options.axis] / oTrack[options.axis]) : (oContent[options.axis] - oViewport[options.axis]) / (oTrack[options.axis] - oThumb[options.axis]);  
   iScroll = (sScroll == 'relative' && oContent.ratio <= 1) ? Math.min((oContent[options.axis] - oViewport[options.axis]), Math.max(0, iScroll)) : 0;  
   iScroll = (sScroll == 'bottom' && oContent.ratio <= 1) ? (oContent[options.axis] - oViewport[options.axis]) : isNaN(parseInt(sScroll)) ? iScroll : parseInt(sScroll);  
   setSize();  
  };  
</pre>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">The lines I added were</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  

<pre class="javascript" name="code">   if ( options.minsizethumb > 0 &&  oThumb[options.axis] < options.minsizethumb )  
            { // set a minimum height for the bar  
                oThumb[options.axis] = options.minsizethumb;  
            }  
</pre>

<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;"></span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">They check if this option is specified, and if it should be applied. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">If so, it applies it on the plugin. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">And this is it!</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">2 lines, and there you have it.. a new feature.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Amazing!!</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">This will promise you that the scroll has some minimum height so the users will always be able to drag the scroll bar with the mouse. </span></div>