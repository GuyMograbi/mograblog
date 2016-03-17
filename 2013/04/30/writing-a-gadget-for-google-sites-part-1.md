<style>.mograblog p { width : 500px } .mograblog img.right { clear:right; float:right; margin-left:1em; margin-bottom:1em }</style>

<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# Writing a gadget for google sites - Part 1

![Google Project and Google Developers API logo](https://lh4.googleusercontent.com/-iyp7MYnGMpg/UHOte6ehDXI/AAAAAAAAVIM/UQj2V4JaDSQ/s144/google-logos.png "Google Project and Google Developers API logo")

In the next couple of posts I will explore Google Gadgets and how to write them.  
In this post I will show a simple example of how to write an elementary Google Gadget,  
and in the next posts we will take it to some more advanced levels.  

Lately I've been using google sites a lot.  
It's a really good tool to set up wikis.  
I use it to make my tutoring lesson plans. It is so easy because it is available and editable everywhere.  
So if I am in the middle of the lesson and I discover a mistake, I can simply fix it right away  
Today I found the need to add a new gadget to google sites. This gadget will show a question with a "show answer" link that if you click it an answer is displayed to the question.  
You can see an example at my [gadget JSFiddle POC](http://jsfiddle.net/rAuem/ "Gadget JSFiddle POC")  

Writing a gadget to google sites is quite easy, but it takes a lot of time digging all the info you need, and even though google's documentation looks great, it is still missing a lot of important information and you usually need to read 3-4 pages to get what you need.  
Assuming that all you need is HTML (which can include CSS and JS and so on..) then you are in luck.  
The basic format for any gadget is

<pre class="prettyprint">  

<module>  
  <moduleprefs title="My Gadget">  
  <content type="html"><style>.my-text{color:red}</style>   

<div class="my-text"> You can write anything here </div>

  <script>alert('hello');</script>  
    ]]></content>   
</moduleprefs></module>  
</pre>

As you can see, all you need is to define a tag called "Content" with an attribute "type=html", and then write the HTML code inside a CDATA.  
Note that I did not specify the ,, tags.  
The reason for this is that Google gadgets are embedded into an IFrame's body.  
You CAN add these tags - and Google will handle them just fine, but they are optioanl  
In fact, the IFrame generated in Google sites and the generated HTML from the gadget XML I showed you above look like so:

<pre class="prettyprint">  

<iframe title="My Gadget" width="100%" height="200" scrolling="no" frameborder="0" id="1430389399" name="1430389399" allowtransparency="true" class="igm" src="//...?url=gadgetUrl&amp;parent=The embedding site"></iframe>  

  A lot of google stuff. bunch of scripts and styles.  

<div class="my-text"> You can write anything here </div>

  <script>alert('hello');</script>  

  Some more Google stuff    

</pre>

Next to be covered on this topic is :

*   Adding configuration to your widget
*   Using JQuery in your widget
*   My more/less Gadget Implementation
*   Google gadget and newlines issue

### References

*   [Google Code Playground](https://code.google.com/apis/ajax/playground/#jqueryui "Google Code Playground")
*   [Google Hosted Libraries](https://developers.google.com/speed/libraries/devguide#jquery "Google Hosted Libraries")

*   [Google Site More Gadget](http://code.google.com/p/google-sites-more-gadget/ "google-sites-more-gadget")
*   [Google Gadgets API - Getting Started](https://developers.google.com/gadgets/docs/gs "Google Gadgets API - Getting Started")
*   [Example for HTML configuration](http://www.gstatic.com/sites-gadgets/embed/embed.xml "Example for HTML configuration")

</div>