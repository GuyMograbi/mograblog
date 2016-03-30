---
title: Using postMessage for JavaScript API clients
published: 2013-03-08T04:46:00.001-08:00
description: see what postmessage can do and why you should use it
keywords: postmessage, javascript
layout: post.hbs
---


In a previous post [Being Your Own Rest Client](/2013/02/being-your-own-rest-client.html "Being Your Own Rest Client")
I explained how REST and API are 2 different things  
and using REST API from your front-end is not really recommended  
Lately I have been using postMessage to create JavaScript API clients.  
I know that CORS is already here and this is the way to go,  
but I find something so appealing in postMessage that I just can't let it go.  
For example, with postMessage, the API provider can use cookies!  
This seems very powerful to me.  
Using postMessage also forces the API to be in a DOM environment.  
I wonder which cool usages this will bring with it.  

# Lets Write A Small API Using postMessage

The scenario here is that you have a JavaScript client, and you would like to let people reuse it.  
In order to use postMessage we will need 2 wrappers around the JavaScript client:

*   An HTML wrapper that simply imports your JavaScript client, intercepts messages and maps them to the client function*   A JS wrapper that will expose the same API as the original JavaScript client, but replaces the logic with  
    A postMessage

The term 'client' might be a bit confusing. So lets realign the definition.

*   The original "client" is now the provider/server as it will be server by the your server into the IFrame*   The HTML wrapper is also part of the provider/server*   The new JS wrapper is actually the reused JS client - so lets call it consumer/clientTo demonstrate this, I made the following pictures  
[![](http://2.bp.blogspot.com/-xUIW4kuhdSE/UTndT-EX88I/AAAAAAAAVO4/GF2y-ba8aZ4/s320/architecture_overview.png)](http://2.bp.blogspot.com/-xUIW4kuhdSE/UTndT-EX88I/AAAAAAAAVO4/GF2y-ba8aZ4/s1600/architecture_overview.png)[![](http://2.bp.blogspot.com/-eJRxoayuLB4/UTndU1Ou6BI/AAAAAAAAVPA/ohGweweosHo/s320/gmail-demo.png)](http://2.bp.blogspot.com/-eJRxoayuLB4/UTndU1Ou6BI/AAAAAAAAVPA/ohGweweosHo/s1600/gmail-demo.png)

# The API We Will Write and a User Story

So lets imagine we wrote a service that handles tasks, and GMail wants to integrate with us! yey!  
The user story is:

User logged in to GMail
User got an email - it is their mother telling them to remember to buy shoes  
The user want to add this as a task to your service so they right click the email and select "add to tasks" from a popup menu  


You might be surprised how a simple scenario like this is hard to implement well.  
Important to note in the user story is that the user right-clicked the email, and never left the GMail UI.  
The user is oblivious to the fact an external service was used and they never have to leave the GMail inbox section.  
The only time where the user is aware of an external service is when they grant permissions to GMail to access this external service.  
This permissions procedure should end with GMail having an API key they can use.  
Since the user has to login to GMail, it is okay if GMail uses our JavaScript client, and the API key is already protected.  
Eventually the user gets the same Look & Feel if we were to use Server-To-Server integration instead of postMessage.  
This kind of seamless integration is not so obvious when using only JavaScript.  

For example: GMail has a "calendar" plug-in. However this uses an iframe or a back-end which is not as good as we are offering here.  

# Lets write the client

This is our "task-api-js-client.js" file we expose to our customers

```

var TaskDetails =  function(){  

 var title;  
 var content;  

 this.setTitle = function( _title ){ title = _title; return this; };  
 this.setContent = function(_content){ content = _content; return this;};  

 this.getTitle = function( ){ return title; };  
 this.getContent = function( ){ return content; }  

};  

var TaskApiClient =  function( apiKey ){  
 // assuming consumer called this onload..  
 var iframe = document.createElement('iframe');  
 iframe.style.display = "none";  
 iframe.src = "//ourservice.com/provider.html"; // this is the HTML. the HTML will import the JavaScript.  
 document.body.appendChild(iframe); // now we are ready to communicate with our service  

 this.addTask = function( taskDetails ){  
  iframe.contentWindow.postMessage(JSON.stringify({ 'name' : 'addTask',  
            'task' : {  
                'title' : taskDetails.getTitle() ,  
                'content' : taskDetails.getContent}}),  
            "http://ourservice.com");  
 }  
};  
```

As you can see, the consumer side client is pretty thin. all it does is postMessages.  
Now lets see the client on the provider side - here we can assume JQuery exists as this code runs in our IFrame.

```
function receieveMessage( msg ) {  
 var message = JSON.parse(msg.data);  
 if ( message.name == "addTask"){  
  $.ajax({ /**.. ajax call to addTask **/ })  
 }  
}  

window.addEventListener("message", receiveMessage, false);  
```

And that is it!

# Difficulty - How to Implement an API That Returns a Result?

Since postMessage is asynchronous, getting result require a callback.  
For the consumer, this is much like using Ajax.  
Implementing a global callback for each message is easy.  
In order to produce parallel callbacks, you will need to implement some kind of ID mechanism  
Just to be clear, in Ajax you can do

```
$.ajax({ url:'/myAjax', success:function(){ console.log("me 1");}})  
$.ajax({ url:'/myAjax', success:function(){ console.log("me 2");}})  
```

However, in order to do this with postMessage, you will need to implement this yourself.  
postMessage can support, almost out of the box, a single callback per received "message type".  
Although "message type" is not built into postMessage, it is best practice to use messages  
containing meta-data such as message type.  

# A Word About Extensibility

What I like about postMessage combined with this method is that it is easy to extend.  
Unlike Ajax - where you need to modify the options sent on the method, with postMessage  
You can simply bind "receiveMessage" anywhere in your code, and receive the message.  
