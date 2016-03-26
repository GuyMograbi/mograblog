---
title: Rails Quicky - path , xxx_path function is undefined
published: 2010-04-03T01:52:00.000-07:00
keywords: rails
description: how to resolve xxx_path function is undefined
---

As I am going over the rails book - I reached the I18N section.  
This section required me to upgrade from 2.0.2 to 2.2 or above.  
I upgraded to 2.3.4 - while the book uses version 2.3.4\.  

(It seems I18N is supported better starting 2.2).  

As I did that - I started getting weird errors about 'cache_template_extensions' undefined. And I read other blogs, but couldn't overcome it..  

So I decided to start afresh and copy the files to the new project.  
It seems that copying the entire files cause the same error. So I decided to copy only the "app" folder and see how hard that can be.. It is not a nice experience but exhilarating in a way - since I get to get behind the curtains of the wizard which is rails.  

Rails keep on saying 'magic' all along the book. The problem is that when things get wrong, there are no fairies around to fix it.  
<a name="more"></a>  

# Migration Guide

There's a [good migration guide](http://cakebaker.42dh.com/2009/05/07/migration-from-rails-22-to-23/) that I found very useful.  

# Other problems not caused by migrations

## Nil Sessions

First of all - I got a nil exception on each line I had something like  

<pre>session[:param] ... </pre>

By default - this should be working. However - I modified the sessions to be in the database - but I didn't copy that modification which is in environment.rb in 2.0.2 and under initializers in 2.3.4 (see migration guide).  
So it seems the session was nil.. weird.  

## xxx_path undefined

The weirdest thing I came across was the error 'undefined method xxx_path'.  

The auto-generated files given to me by rails have function calls like  
edit_user_path - in order to generate a call to action 'edit' on the 'user controller'. That method doesn't really exist - and if you're wondering about how that works you should check out [this tutorial](http://rubylearning.com/satishtalim/ruby_method_missing.html) and read more about meta-programming for ruby.  

I finally discovered the solution was in routes.rb. In order to use those helper methods, I had to map their route. So I simply added them as resource which is a way to add all REST options at once.  

<pre>map.resources :users</pre>

Luckily - that solved me another problem regarding the ATOM builder that compailed xxx_url is undefined.  

# Problem with testing

Another thing you might find wrong in the new environment is the tests.  
You might get an error  

<pre>undefined method `use_transactional_fixtures='  
</pre>

A quick search in Google will bring you to [this site](http://www.themomorohoax.com/2008/12/17/rails-2-3-tests) that tells you to modify the "test_helper.rb" classname to "ActiveSupport::TestCase"  

That solved it to me.  

# Conclusion

The upgrade wasn't that hard at all and the experience was very informative.