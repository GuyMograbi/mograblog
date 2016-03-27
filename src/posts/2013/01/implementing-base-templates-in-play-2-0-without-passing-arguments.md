---
title: Implementing Base Templates In Play 2.0 Without Passing Arguments
published: 2013-01-15T20:08:00.000-08:00
keywords: play!framework
description: define easy templates in play2.0
layout: post.hbs
---

I just migrated from Java+Play1.0 to Java+Play2.0 and the templates are the hardest part so far, and the best way I found to implement a base template (for title, head etc..) is by using the Http.Context. There is a very nice syntax you can achieve with tags.

```
views  
  |  
  \--- tags  
         |  
         \------context  
                  |  
                  \-----get.scala.html  
                  \-----set.scala.html  
```

where get.scala.html is :

```
@(key:String)  
@{play.mvc.Http.Context.current().args.get(key)}  
```

and set.scala.html is:

```
@(key:String,value:AnyRef)  
@{play.mvc.Http.Context.current().args.put(key,value)}  
```

means you can write the following in any template

```
@import tags._  
@contest.set("myKey","myValue")  
@context.get("myKey")  
```

So it is very readable and nice. This is the way I chose to go. stian - good advice. Proves it is important to scroll down to see all answers. :)

# Passing HTML variables

I haven't figured out yet how to pass Html variables.

```
@(title:String,content:Html)  
```

however, I know how to pass them as block.

```
@(title:String)(content:Html)  
```

so you might want to replace set.scala.html with

```
@(key:String)(value:AnyRef)  
@{play.mvc.Http.Context.current().args.put(key,value)}  
````

this way you can pass Html blocks like so

```
@context.set("head"){   
     <meta description="something here">   
     @callSomeFun(withParameter)  
}  
```

# Side-Effect With My "Set" Implementation

A common use-case it template inheritance in Play. You have a base_template.html and then you have page_template.html that extends base_template.html. base_template.html might look something like

```
<html>
    <head>
        <title> @context.get("title")</title>
    </head>
    <body>
       @context.get("body")
    </body>
</html>
```

while page template might look something like

```
@context.set("body){  
    some page common context here..   
    @context.get("body")  
}  
@base_template()  
```

and then you have a page (lets assume login_page.html) that looks like

```
@context.set("title"){login}  
@context.set("body"){  
    login stuff..
}

@page_template()  
```

The important thing to note here is that you set "body" twice. Once in "login_page.html" and then in "page_template.html". It seems that this triggers a side-effect, as long as you implement set.scala.html like I suggested above.

```
@{play.mvc.Http.Context.current().put(key,value)}  
```

as the page would show "login stuff..." twice because put returns the value that pops out the second time we put same key. (see put signature in java docs). scala provides a better way to modify the map

```
@{play.mvc.Http.Context.current().args(key)=value}  
```

which does not cause this side effect.