---
title: How to make postMessage support multi origins and multi messages
published: 2013-02-19T14:43:00.002-08:00
description: make postmessage even better
keywords: postmessage, javascript
layout: post.hbs
---

In my [previous post I talked about HTML5 - cross domain messaging with postMessage](/2013/02/html-5-cross-domain-messaging-with-post-message.html "HTML5 - cross domain messaging with postMessage"). I showed how to use a JQuery plugin written by Ben Alman that wraps this method and falls back on hash tags
in the URL for older browsers.  
In this post I will talk about how to improve the usage in this plugin to support multiple messages  
from different origins.  

# The Problem

If you add another call to `$.receiveMessage` you will get some unwanted  
behavior as you will override the previous call instead of adding another handler to the event.  
I've seen people coming across the issue of handling multiple messages:

*   [Reference #1](http://stackoverflow.com/q/8479911/1068746 "stackoverflow question about multiple messages with postMessage")
*   [Reference #2](http://stackoverflow.com/questions/11253517/postmessage-multiple-postmessage-events-functions-callbacks "stackoverflow question about multiple messages with postMessage")

There is also the issue of multiple origins.  
Some resources will tell you to use an asterisk ("*") or some regular expression but  
it seems that Ben Alman's plugin has a nicer, more JQuery/JavaScript solution,  
and I wanted to share it with you.  
If you try to use asterisks with the plugin, it will not work.  

# Adding support to multiple messages and multiple origins

Looking and Ben Alman's code you can see the code for filtering origins

```
$.receiveMessage = ... {   
 ...  
  if ( ( typeof source_origin === 'string' && e.origin !== source_origin )  
  || ( $.isFunction( source_origin ) && source_origin( e.origin ) === FALSE ) ) {  
  ...  
 }  
 ...  
}  
```

As you can see, the plugin checks if "source_origin" is a function. If so,  
it invokes the function giving it the origin.  
The good thing about this code is that it is so flexible, I can do whatever I want.  
For example, if I pass "function( origin ) { return true; }" to the "receiveMessage" function,  
I will receive all the messages.  
This way I can add support for as many origins as I'd like.

# Multiple origins and multiple messages

Here is my code that allows handling multiple origins and multiple messages using Ben Alman's Plugin.

```
$(function () {  
    var callbacks = {};  
    callbacks["origin1"] = {};  
    callbacks["origin1"]["message1"] = function (e) {  
        console.log(["message1 from origin1", JSON.parse(e.data) ]);  
        alert("this is message1 from origin1 with data" + e.data );  
    };  
    callbacks["origin1"]["message2"] = function(e){  
        console.log(["message2 from origin1", JSON.parse(e.data) ]);  
        alert("this is message2 from origin1 with data" + e.data );  
    };  

    callbacks["origin2"] = {};  
    callbacks["origin2"]["message1"] = function(e){  
        console.log(["message2 from origin2", JSON.parse(e.data) ]);  
        alert("this is message2 from origin2 with data" + e.data );  
    };  

    // and so on and on..  

    $.receiveMessage(function (e) {  
                try {  
                    var msg = JSON.parse(e.data);  
                    callbacks[e.origin][msg.name](e);  
                } catch (exc) {  
                    console.log(["problem invoking callback for ", e, exc, callbacks])  
                }  
            },  
            function (origin) {  
                return true;  
            }  
    ); // support for different domains  
})      
```

I first declare a JSON of callbacks.  
I map from origins to a map of message handlers.  
I base this code on the assumption messages have the following structure  

```
var myMessage = { "name" : "message1", moreInfo: "moreValues" };
```

end then are sent with something like this :

```
$.postMessage( JSON.stringify( myMessage ), myUrl , parent );
```

# Why can't I simply call $.receiveMessage twice?

It seems that Ben Alman decided to be clever and allow only a single callback to the event.  
Reading the code, the important line you should look at is :

```
rm_callback && p_receiveMessage();  
```

This is a clever one-liner that does the same as

```
if ( rm_callback ) { p_receieveMessage(); }   
```

When you call p_receieveMessage with no arguments, you will reach the line that remove the event listener

```
window[ callback ? addEventListener : 'removeEventListener' ]( 'message', rm_callback, FALSE );  
```

since callback is null/undefined, you will get the string 'removeEventListener' which will do just that - remove the listener.

So technically, you can also modify the plugin that Ben wrote and remove the clever line

```
rm_callback && p_receiveMessage();  
```

You might wish to implement this solution instead.  
This solution suites better if you want to assign listeners from different partials in the same template.  
This will simulate a behavior closer to pure JavaScript.  
You can still remove listeners by simply calling p_receiveMessage with no arguments.  

Personally, I'd rather retrigger the message event on the body.

```
$("body").trigger("message", message );  
```

And then I am not dependent on implementations.</div>

