---
title: Implementing Base Templates In Play 2.0 Without Passing Arguments
published: 2013-01-15T20:08:00.000-08:00
keywords: play!framework
description: define easy templates in play2.0
---

<div dir="ltr" class="mograblog" style="text-align: left;" trbidi="on">I just migrated from Java+Play1.0 to Java+Play2.0 and the templates are the hardest part so far, and the best way I found to implement a base template (for title, head etc..) is by using the Http.Context. There is a very nice syntax you can achieve with tags.

<pre>  
views  
  |  
  \--- tags  
         |  
         \------context  
                  |  
                  \-----get.scala.html  
                  \-----set.scala.html  
</pre>

where get.scala.html is :

<pre>  
@(key:String)  
@{play.mvc.Http.Context.current().args.get(key)}  
</pre>

and set.scala.html is:

<pre>  
@(key:String,value:AnyRef)  
@{play.mvc.Http.Context.current().args.put(key,value)}  
</pre>

means you can write the following in any template

<pre>  
@import tags._  
@contest.set("myKey","myValue")  
@context.get("myKey")  
</pre>

So it is very readable and nice. This is the way I chose to go. stian - good advice. Proves it is important to scroll down to see all answers. :)

# Passing HTML variables

I haven't figured out yet how to pass Html variables.

<pre>  
@(title:String,content:Html)  
</pre>

however, I know how to pass them as block.

<pre>  
@(title:String)(content:Html)  
</pre>

so you might want to replace set.scala.html with

<pre>  
@(key:String)(value:AnyRef)  
@{play.mvc.Http.Context.current().args.put(key,value)}  
</pre>

this way you can pass Html blocks like so

<pre>  
@context.set("head"){   
     <meta description="something here">   
     @callSomeFun(withParameter)  
}  
</pre>

# Side-Effect With My "Set" Implementation

A common use-case it template inheritance in Play. You have a base_template.html and then you have page_template.html that extends base_template.html. base_template.html might look something like

<pre>  

        <title> @context.get("title")</title>  

       @context.get("body")  

</pre>

while page template might look something like

<pre>  
@context.set("body){  
    some page common context here..   
    @context.get("body")  
}  
@base_template()  
</pre>

and then you have a page (lets assume login_page.html) that looks like

<pre>  
@context.set("title"){login}  
@context.set("body"){  
    login stuff..  
}  

@page_template()  
</pre>

The important thing to note here is that you set "body" twice. Once in "login_page.html" and then in "page_template.html". It seems that this triggers a side-effect, as long as you implement set.scala.html like I suggested above.

<pre>  
@{play.mvc.Http.Context.current().put(key,value)}  
</pre>

as the page would show "login stuff..." twice because put returns the value that pops out the second time we put same key. (see put signature in java docs). scala provides a better way to modify the map

<pre>  
@{play.mvc.Http.Context.current().args(key)=value}  
</pre>

which does not cause this side effect.  
</div>