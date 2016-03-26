---
title: YARP - const_missing is dependencies
published: 2010-07-03T01:03:00.000-07:00
description: yet another rails pitfall - const_missing
keywords: rails
---

<table class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;" align="center" cellpadding="0" cellspacing="0">

<tbody>

<tr>

<td style="text-align: center;">[![](http://3.bp.blogspot.com/_J3A8WqpdCX0/S82ZwITYVxI/AAAAAAAAAiE/pGk-YNcy4I8/s1600/rails_pothole.png)](http://3.bp.blogspot.com/_J3A8WqpdCX0/S82ZwITYVxI/AAAAAAAAAiE/pGk-YNcy4I8/s1600/rails_pothole.png)</td>

</tr>

<tr>

<td class="tr-caption" style="text-align: center;">YARP - Yet Another Rails Pitfall</td>

</tr>

</tbody>

</table>

I am living on the edge, working with rails 2.3.4.. As I am moving to production, I decided to integrate with "[exception_notification](http://github.com/rails/exception_notification)" gem. (or plugin?) , and that's after looking at [Ryan's RailsCasts](http://railscasts.com/episodes/104-exception-notifications) that I love.  

Even though Ryan recommends the exception_logger, for starters I preferred the notification instead.  

At first - I followed [these instructions](http://engtech.wordpress.com/2008/02/06/rails-guide-exception-notifier-plugin/) or something similar to those.  

And it worked fine.. But then, as I committed to SVN, I noticed I have a lot of exception_noti*.rb files marked as "not-versioned" - and I couldn't find the exception_notification when I did gem list .. weird..  

Well, if you note those instructions, they say  

<pre>ruby script/plugin install exception_notification</pre>

and not  

<pre>gem install exception_notifiction</pre>

huh!? is there a difference?  

So I tried installing the gem instead. I like running  

<pre>rake gems:install </pre>

and see everything happening automatically, and I dislike having code I did not write in the SVN.. BUT - that didn't work! I got  

<pre>`const_missing': uninitialized constant Rails::Initializer::ExceptionNotifier</pre>

or other versions of this exception..  
darn! What is that?  

Well, as I dug around, it seems what I had was loading order problems. The environment is loaded before the gems, and - practically - there are no exceptions except for rails of course.  

so I reverted back the plugin configuration, and it sorted everything out.  
Another "nice" thing with plugins is that you don't need to install them on each new environment. You just checkout and go..