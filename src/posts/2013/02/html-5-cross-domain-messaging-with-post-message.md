---
title: HTML5 - cross domain messaging with postMessage
published: 2013-02-12T08:20:00.000-08:00
description:  postmessage rocks - this is why
keywords: postmessage, javascript
---

<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# HTML5 - cross domain messaging with postMessage

<div>

`postMessage` an HTML5 modification that was added to JavaScript in order to allow  
passing messages across domains.  
Now it is easy to send and receive messages to and from an `iframe`  
and define a messages whitelist keeping your frame safe from evil messages.  

# Ben Alman's JQuery postMessage plugin

In this post I will explore [Ben Alman's postMessage JQuery plugin](http://benalman.com/projects/jquery-postmessage-plugin/).  
I recommend using this plugin as it uses hash tags as fallback for browsers that don't support  
the postMessage function.  
Lets see a simple example of how to use this plugin  

The following [code sample for using postMessage](https://gist.github.com/4684027 "code sample for using postMessage") is also available as a gist on github.  

## Sender Code

<pre class="prettyprint">  

    <meta charset="UTF-8">  
    <title>Post Message Example</title>  

<script type="text/javascript"><br />    console.log("posting message");<br />    var origin = "http://localhost:9000";<br />    var message = "hello world!";<br />    $.postMessage(  message , origin , parent );<br /></script>  

  </pre>

## Receiver Code

<pre class="prettyprint">  

    <meta charset="UTF-8">  
    <title>Post Message Example</title>  

<iframe src="/assets/pages/postMessage/post.html"></iframe>  
<script type="text/javascript"><br />    console.log("adding receive message handler");<br />    var origin = "http://localhost:9000"<br />    $.receiveMessage( function(e){<br />                alert(e.data);<br />            }, origin );<br /></script>  

  </pre>

# Gist walk through

If you try to run this example, after you setup the environment you should open "recieve.html".  
This HTML file embeds an iframe pointing to "post.html"  
Once post.html loads it sends a message to the parent - in our case, receive.html  
receive.html listens on the "postMessage" event, alerting the data.  

Please note the use of "origin" in the gist.  
Since I am showing a demo from localhost to localhost, I can use "document.origin",  
however, the value should be the "target_url" - which is the host.  
If you have an IFrame with a URL you can simply use the "src" value.  
Ben Alman's plugin will convert it to the host name.  

In my next post I will talk about how to use Ben Alman's plugin to [handle different messages  
from different origins](/2013/02/postMessage-plugin-part2.html "handle multiple messages from multiple origins using postMessage plugin").  

</div>

</div>