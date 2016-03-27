---
title: HTML5 - cross domain messaging with postMessage
published: 2013-02-12T08:20:00.000-08:00
description:  postmessage rocks - this is why
keywords: postmessage, javascript
layout: post.hbs
---


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

```
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>Post Message Example</title>
    <script src="/assets/javascripts/jquery.min.js"> </script><!-- jquery -->
    <script src="/assets/javascripts/jquery.ba-postmessage.min.js"> </script><!-- plugin -->
</head>
<body>

<script type="text/javascript">
    console.log("posting message");
    var origin = "http://localhost:9000";
    var message = "hello world!";
    $.postMessage(  message , origin , parent );
</script>
</body>
</html>
```

## Receiver Code

```
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>Post Message Example</title>
    <script src="/assets/javascripts/jquery.min.js"> </script><!-- jquery -->
    <script src="/assets/javascripts/jquery.ba-postmessage.min.js"> </script><!-- plugin -->
</head>
<body>

<iframe src="/assets/pages/postMessage/post.html"></iframe>
<script type="text/javascript">
    console.log("adding receive message handler");
    var origin = "http://localhost:9000"
    $.receiveMessage( function(e){
                alert(e.data);
            }, origin );
</script>
</body>
</html>
```

# Gist walkthrough

If you try to run this example, after you setup the environment you should open `receive.html`
This HTML file embeds an iframe pointing to `post.html`
Once post.html loads it sends a message to the parent - in our case, receive.html  
receive.html listens on the `postMessage` event, alerting the data.

Please note the use of `origin` in the gist.
Since I am showing a demo from localhost to localhost, I can use `document.origin`,
however, the value should be the `target_url` - which is the host.
If you have an IFrame with a URL you can simply use the `src` value.
Ben Alman's plugin will convert it to the host name.  

In my next post I will talk about how to use Ben Alman's plugin to [handle different messages  
from different origins](/posts/2013/02/postMessage-plugin-part2.html "handle multiple messages from multiple origins using postMessage plugin").
