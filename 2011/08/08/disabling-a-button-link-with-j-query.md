<div dir="ltr" style="text-align: left;" trbidi="on">As you probably know, if you want to make a sexy button, you need to implement it with a link.  

Here is [a simple search I did with Google](http://www.google.com/search?sourceid=chrome&ie=UTF-8&q=how+to+make+an+expanding+button), and [an example for it I found right away](http://www.oscaralexander.com/tutorials/how-to-make-sexy-buttons-with-css.html)  

Note - that the post does not explain how to disable/enable the button... And who wants a button that cannot be disabled?  

Disabling a button can be very useful if you want to make sure the form is filled properly. Simply enable it once all the details are ok.  

However, disabling a link is impossible.  
Instead - you need to implement "onclick" with "return false".  

At first, I thought about using [blockUI](http://jquery.malsup.com/block/) - a cool JQuery plugin I recently discovered.  
But it seems it does not block anchors - I could still click the anchors.  

<span class="Apple-style-span" style="font-size: x-large;">Solution step #1</span>  
A really good solution would be to change the opacity to 0.4 and add "onclick" as required.  
This works great.  

And at first I used this technic in a Utils function... cool ain't it?  

However, soon enough, I had to have it as a JQuery prototype function (method).  

<span class="Apple-style-span" style="font-size: x-large;">Solution step #2</span>  
Adding this solution to JQuery was easier than it looks  

<pre class="javascript" name="code">/** Adding "disable" on expand button**/  
$.fn.extend({  

    disableButton:function(){  
            $(this).fadeTo(1,0.3);  
            $(this).click(function(event){event.preventDefault()});  
    },  

    enableButton:function(){  
            $(this).fadeTo(1,1);  
            $(this).attr('onclick','').unbind('click');  
    }  
});  
</pre>

As you can probably see, it's quite easy to add "isButtonDisabled" method to the deal.  

<span class="Apple-style-span" style="font-size: x-large;">Troubleshooting</span>  
What I really wanted was to modify only the Anchor tags.  
So I tried to do something like  

<pre class="javascript" name="code">$.fn.extend(AnchorHTMLElement.prototype, { ... } )  
</pre>

But it didn't work. If anyone has any idea why, please let me know.  
This is also the reason why I have such specific names for the methods, and not just "enable"/"disable"</div>