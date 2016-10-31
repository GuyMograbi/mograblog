---
title: Being Your Own REST Client
published: 2013-02-05T22:56:00.000-08:00
description: things to note with rest api that you write and consume
keywords: rest
layout: post.pug
---

REST and API are two words that got stuck together.  
Using REST between your client and server is one things.  
Exposing an API - be it REST or not - is a different thing.  
Thinking these are the same thing is a mistake I see a lot lately.  

First of all, JavaScript APi clients is a new thing. CORS is finally here, allowing JavaScript REST clients to be reusable.  
Thank god! I can finally write a JavaScript REST client, and it will be reusable!  
Well, do not hurry please.  

Being your own REST API client, under the same domain, is not a good idea as it does not reflect the real API use case.  
There are a lot of things you will be missing out on.  
Technically - API provider is a different product than a consumer.  
The correct way to implement it is by actually writing 2 different products.  
If you are writing a site, and you think it is cool to use REST between back-end and front-end  
you will run into pitfalls.  

However, there are ways to get closer without banging your head against the wall.  
For example, lets see how to write 2 controllers in Play!Framework 2.x .  
The first controller is the provider and the second controller is the consumer's back-end.  
The consumer's controller will call the provider's controller.  

# How will this look like in Play 2.0

```
========================  
PROVIDER  
========================  

public class Provider {   
 @Security.Authenticated( value = ProviderAuthenticator.class )  
    public static Result listItems( String authToken ){  
        return ok("this is from provider : " + authToken );  
    }  

     public static class ProviderAuthenticator extends Security.Authenticator {  

        public ProviderAuthenticator() {  
            super();      
        }  

        @Override  
        public String getUsername(Http.Context ctx) {  
            String[] tokens = null;  
            if ( "POST".equalsIgnoreCase(request().method())){  
                tokens = ctx.request().body().asFormUrlEncoded().get("token");  
            }  
            else { // "GET"  
                tokens = ctx.request().queryString().get("token");  
            }  

            return tokens == null || tokens.length ==0 ? null : tokens[0];  
        }  

        @Override  
        public Result onUnauthorized(Http.Context ctx) {  
            return super.onUnauthorized(ctx);     
        }  
    }  
}  

=======================  
Consumer  
=======================  

public class Consumer {   
    @Security.Authenticated( value = ConsumerAuthenticator.class )  
    public static Result myConsumer(){  
        return myProvider(session().get("token"));  
    }  

    public static class ConsumerAuthenticator extends Security.Authenticator {  

       public ConsumerAuthenticator() {  
           super();     
       }  

       @Override  
       public String getUsername(Http.Context ctx) {  
           return ctx.session().get("token");  
       }  

       @Override  
       public Result onUnauthorized(Http.Context ctx) {  
           return super.onUnauthorized(ctx);     
       }  
   }  
}   

========================================  
THIS IS HOW THE AJAX CALL WOULD LOOK LIKE  
========================================  
< script > $.ajax({url:'/dashboard/listItems'})    

=========================================  
THIS IS HOW THE ROUTES FILE WOULD LOOK LIKE  
=========================================  

# Consumer  
GET  /dashboard/items  controllers.Consumer.listItems  

# Provider - REST  
GET  /api/items    controllers.Provider.listItems( authToken:String )  

```

## Conclusions

REST and API are 2 totally different things.  
Understand what each means and how to use them.  
Make sure you really need it before you use it.  
Do not be lightheaded with the decision of whether to use it or not,  
this decision can complex the entire development process and open security holes in your website.  
When in doubt, you probably do not need to expose an API, however you should still  
use REST like mapping between front-end and back-end.
