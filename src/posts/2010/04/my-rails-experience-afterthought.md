---
title: My Rails Experience - afterthought
published: 2010-04-05T00:17:00.000-07:00
description: so this is what i think about rails
keywords: rails
---

OK. So I went cover to cover for the second time over the [agile web development with rails](http://pragprog.com/titles/rails3/agile-web-development-with-rails-third-edition)  

I really liked the book. I went over it twice - once to see what they have to offer, and the second time - after I was convinced it was worth it, getting my hands dirty.  

You can see the result at [http://rails.mograbi.co.il](http://rails.mograbi.co.il/)  
The sources are currently unavailable - but will be as soon as I get my SVN and GIT configured correctly. (next blog entry?)  

Quoted from the book  

> Rails takes Ruby to the limit, extending it in novel ways that make a programmer’s  
> life easier. This makes our programs shorter and more readable.  
> It also allows us to perform tasks that would normally be done in external  
> configuration files inside the codebase instead. This makes it far easier to see  
> what’s happening.

<a name="more"></a>  

# Mind Blown

Lately I get very excited about stuff. I already blogged about GIT and the decentralized model. Since I come from the Java world - RoR experience was very magical, and they really use the word "magic" throughout the book.  

I advice to everyone to read about meta-programming in ruby before you approach Rails. That will help dissolve some of the magic since Rails heavily relies on it.  

What can I say? I liked everything about it..  

# The MVC Model

RoR really understands the need for a predesigned environment. As a developer I don't want to think where it would be best to place my HTMLs and CSSs and such, I just want to write algorithms. RoR builds the folder hierarchy for you, and it is so extensible that you don't have to think what goes where.  

CSS has a "public/stylesheet" folder.  
Controllers are in "app/controllers", views at "app/views" and models at "app/models".  
Tests are sorted to unit/functional/performance/integration.  

# Fulfills almost everything you can request a framework to do

It seems like it have an answer to everything. And if it doesn't, well at least it is one step closer.  

The most impressive things would be :  

### [Migrations](http://dizzy.co.uk/ruby_on_rails/cheatsheets/rails-migrations)

Migrations are RoR way of versioning your schema, enabling you to develop the schema in a very agile way.  

Combine that with SQL replaced by code and you got a killer design.  

This means that for every schema modification you create a new file - called a migration file.  
If the name of the file is up to the naming convention - rails will fill in the script by itself.  
Each migration has an "up" and "down" function. So that if you wrote it all correctly, you should be able to go back and forth with the current version of the schema.  
The version of the schema is stamped with a time-stamp.  

In earlier versions they had an incremented number for a stamp but I guess they figured out that when multiple developers work together, these numbers will overlap - so they switched to timestamps.  

Instead of writing SQLs and worrying about DB compatibility, you write ruby code.  
** This is in fact the only place they can take it farther. They don't support Foreign Keys for example.. which is a shame. I found myself writing some SQL code by hand, so that makes me bound to specific DB.  
But I guess they will get that one going in no time.  

If I made 4 modifications to the DB, I can always tell rails to rollback to version 2\.  
The migrations are also a great way to document your changes.  
If you rename a column - you ADD a migration. You don't modify the old one in which you create the column. This is great! Why?  

Well - assume for a minute I have another migration to insert test data (! - yet another thing they got right) - If I modify the "create" migration I'd have to go over the "insert data" migration as well. (even if they were in the same file, it causes more places to modify and make environment more error prone).  

Comparing this to Java's Hibernate - although it has a great way to create the schema, it does not support versions and data insertion.  

### [Partials](http://addictedtonew.com/archives/149/a-bit-on-rails-partials/)

Partials are to views what methods are to code - you can call a partial and pass it arguments just like a method.  

It is similar to jsp:include but requires less code. Even less code when you use naming conventions.  

### [Flash](http://rubypond.com/blog/useful-flash-messages-in-rails)

The flash is a very good way to pass messages. Most common use for example is errors while filling a form - and you want to simply go back to the form and display the errors.  

<div class="separator" style="clear: both; text-align: center;">[![](http://1.bp.blogspot.com/_J3A8WqpdCX0/S7mA62ZCkHI/AAAAAAAAAbY/TFOnWXhtrr0/s320/rails-flash.jpg)](http://1.bp.blogspot.com/_J3A8WqpdCX0/S7mA62ZCkHI/AAAAAAAAAbY/TFOnWXhtrr0/s1600-h/rails-flash.jpg)</div>

# Code Generation

Rails create a lot of code for you.  
On the one hand it saves you a lot of trouble, however some might say it requires more modifications when you're not pleased with the defaults.  

You can't eat the cake and keep it whole at the same time.  

The code generated could be reduced with meta-programming (and they actually did that once) - but that would probably be too magical for beginners. So they cleverly decided not too. I assume there's a way to configure the generated code, and I might explore it a bit in the future.  

If I want to create a new persistent object "book" for example.  
This book will have a "title","content" and "about" fields.  
I want it with all CRUD operations, and REST support.  
This is called a scaffold in rails and in some places in rails it is referred to as resource.  
All I have to do is write  

<pre>ruby script/generate scaffold book title:string content:text about:string  
</pre>

It will generate the controller,view and model along with tests, db migration and REST mapping. They will all support "index","delete","create","edit","show" operations.  
Modifying the result from HTML to XML/JSON/ATOM is a piece of cake. XML and JSON can be achieved with almost no code at all (when using default) - ATOM might require some writing.  

Can you ask for more?  

# Javascirpt/Noscript support

I think the thing I liked most of all in rails is that they have a really good way to support Ajax. Almost effortlessly you can use Ajax and still maintain support for noscript browsing. (Which is needed especially for robots such as search engines).  

# I18N

I never liked JSTL's FMT.. don't know why. I always wrote the implementation myself.  
Rails however have a better solution. (Still needs improvement but I liked it so far).  

The [YAML file format](http://www.yaml.org/start.html) is a better use than property file. It helps me maintain name-spacing for my properties a lot better.  

And finally - there's a great support for date/currency/number format built in.  

There is still things missing in that area - if you ask me.  

*   RTL/LTR support - some languages are RTL. I never saw I18N support for this
*   Male/Female - some languages need a different string when written for a male or a female

In English you can get along without it. So I guess this is why support in I18N is lacking. Adding male/female support to RoR would probably be very easy (I already know how my YAMLs would look like), but the RTL LTR is tricky.  

Which raises up a nice question. So far RoR wrote a builder to almost every format : html/atom/xml/sql.. and the list goes on. CSS however was neglected as far as I can see, in almost every platform.  

How I would love to write something like  

<pre>blog-entry-content {  
   direction : <%=I18n.dir%>  
}  
</pre>

I guess this is the next thing to check out.  

# A unified structure

The last thing I will mention here - certainly NOT the last thing to say - is that rails gives me a "one ring to rule them all". In Java, I was concerned with integrations all the time.  

In order to get an environment in Java going you need to download a lot of things. (JDK, Maven/Ant, Tomcat, Hibernate, JAXB, JDBC Drivers, DWR, Struts, Spring... etc..)  

I guess the most important word above is "Spring" - simply because "Spring" is a solution to a problem that shouldn't really exist to begin with. In Rails - those problems are simply not there.  

Imagine to yourself Spring/JDK/Maven all bundled in a single package. All you will need to do is download JDK, define somehow you want hibernate in a single word and it will download and configure everything.  
In rails it looks like this  

<pre>gem install mysql   
rails my_app --database=mysql  
</pre>

The operation is easy to remember and painless. The "gem install" is required only for the first time.  

RoR is strong, agile and (code/configuration)-minimized framework. And you know what - it hasn't reached version 2 yet! imagine how version 3 will look like?  

# Conclusion

RoR is magical. You would have to learn a lot no matter where you come from, but mainly you would have to learn to "let go and let rails take care of things".  

I finally feel like I can write applications at home at my own free time for my own use, and still have the time to spend in the sun, and the money in my pocket to have some fun.  

# What's next

Well.. Tomorrow I am starting a new Job. I will be a Flex developer for some time to come. So I have to wrap up things I started with Flex. This will include  

*   Using web services to get/send XMLs
*   Using the XML data sources to build charts
*   Using the Flex builder
*   Transitions

This part is integrated with Rails - so you will have 2 GUIs for the depot application. It is really easy with Rails since Rails has a built in support for REST. So I'm kind of lucky to learn these two at the same time.  

And to finish it all up - I want to finish the GIT/SVN blog I started. The new place uses SVN, and I will probably want to use GIT on my computer.  

Then, I will probably blog a lot for a while - there's a lot to be said about Rails/Flex and GIT.  

For example - I want to learn how to add RJS libraries in Rails. (Rails/Ruby Javascript) - in order to encapsulate my text editor.  
I want to write an audio/video player in flex.  
I want to make all my sources available in GIT/SVN to all of you to see. (I currently have a maven repository but I get the feeling it won't work so well with rails).  
I will probably write a new project while doing these. (Thought about project-management application).  

The next things I want to go over some basic things I never took the time for. - See the [blog post](http://mograblog.blogspot.com/2010/03/upcoming-articles-teaser.html) about it - and add to that JQuery and Spring.  

Then I would have to decide between .NET/PHP... tough call.. what do you think?