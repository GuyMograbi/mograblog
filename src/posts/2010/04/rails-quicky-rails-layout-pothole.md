---
title: Rails Quicky - Rails Layout Pothole
published: 2010-04-20T05:21:00.000-07:00
description: don't repeat my mistakes with rails layout. read this post.
keywords: rails
---

<div class="separator" style="clear: both; text-align: center;">[![](http://4.bp.blogspot.com/_J3A8WqpdCX0/S82ZwITYVxI/AAAAAAAAAbg/n8Q8shzX4nY/s1600/rails_pothole.png)](http://4.bp.blogspot.com/_J3A8WqpdCX0/S82ZwITYVxI/AAAAAAAAAbg/n8Q8shzX4nY/s1600/rails_pothole.png)</div>

So I am working on a small project to exercise my new Rails brain muscles. And just as I start to feel good, I run into a problem.  

# Defining a layout

In rails you can very easily define a layout. This layout - if named after a controller - makes all views of that controller invoke the layout.  
Only if the layout has "yield" in it will you see the actual view you wanted.  
The exact syntax is :  

<pre><%= yield :layout %> </pre>

# My Problem

Well, I wrote a controller "manager" with a layout.  
Now, I want to make that layout over all the application.  
This means - if I invoke an action of another controller, I want the layout to remain the same. This is a reasonable demand, and is actually explained in the book.  

What you need to do is write  

<pre>layout "layout_name"</pre>

in my case it will be  

<pre>layout "manager"</pre>

in the ApplicationController.** _But it didn't work!_**  

# The Pothole

My new controller was a scaffold. A scaffold has an auto-generated layout.  
So if my scaffold is "project", I will have "project.html.erb" in the layouts folder.  

It seems that as long you don't delete the controller's layout, it will not use the manually defined layout.  

In my case - Rails will keep using "project.html.erb" and not "manager.html.erb" even though I defined

<pre>layout "manager" </pre>

. Once I deleted the project.html.erb, everything worked fine.