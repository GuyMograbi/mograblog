---
title: HTTP Basic Authentication - Thank you PlayFramework!
published: 2011-06-07T05:51:00.000-07:00
description: understand how basic authentication works
keywords: authentication
---

<div dir="ltr" style="text-align: left;" trbidi="on">Finally, one of my mysteries is resolved.  

Do you know how it is when you need a basic authentication in a browser?  
You get this weird default popup asking for user/password.  
You've probably seen it by now, but just in case you haven't you can click [here](http://httpstat.us/401) to see it in action.  
And if that link does not work, it looks something like :  

<div class="separator" style="clear: both; text-align: center;">[![](http://4.bp.blogspot.com/-oh3l0sfbOjY/Te4dAdz7LGI/AAAAAAAAA2Q/jRrXTa7UHMs/s320/prompt-basic-authentication.png)](http://4.bp.blogspot.com/-oh3l0sfbOjY/Te4dAdz7LGI/AAAAAAAAA2Q/jRrXTa7UHMs/s1600/prompt-basic-authentication.png)</div>

I always wondered how you can tell the browser to prompt this dialog.  
Today I found out thanks to [play!framework](http://www.playframework.org/)  

Looking at the "Controller" code, you will find the method "unauthorized" that you can use like this ( action "index" in Controller "Application") :  

<pre name="code" class="java">  public static void index() {  
      String password = request.password;  

 if ( password == null )  
 {  
            unauthorized( "My Realm" );  
 }  
         render();   
   }  
</pre>

This will cause the prompt to appear, and the string "My Realm" will be used in the prompt.  
Digging a little bit in the play!Framework code, you will find the following code :  

<pre name="code" class="java">public class Unauthorized extends Result {  

    String realm;  

    public Unauthorized(String realm) {  
        super(realm);  
        this.realm = realm;  
    }  

    public void apply(Request request, Response response) {  
        response.status = 401;  
        response.setHeader("WWW-Authenticate", "Basic realm=\"" + realm + "\"");  
    }  
}  
</pre>

Which means - in order to get the browser to show the basic authentication, you need to return "401" - and add "Basic Realm" to the header as shown above.  
The browser will detect this, prompt User/Password and will make the same request. Only this time adding the "username/password" to the request for you to read.  

</div>