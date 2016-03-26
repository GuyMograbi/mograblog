---
title: Redis
published: 2010-06-21T13:10:00.000-07:00
description: meet redis
keywords: redis
---

[![](http://code.google.com/p/redis/logo?cct=1238151630)](http://code.google.com/p/redis/logo?cct=1238151630)  
At first, it is most easy to think about [Redis](http://code.google.com/p/redis/) like a fancy HashMap masked as a database. But as you go along, you see it is more than that. [try it yourself](http://try.redis-db.com/)  

Unfortunately, Redis can only be installed on unix machines. There's no windows installation.  

<a name="more"></a>  

# plugins

There are many clients in many [supported language](http://code.google.com/p/redis/#Supported_languages)  

# RubyGem

In order to get the gem you should install GIT and ruby first.  
Then run the command  

<pre>git clone http://github.com/ezmobius/redis-rb.git  
cd redis-rb/  
rake gem  
gem install pkg\redis-2.0.0.gem  
</pre>

Now that the plugin is installed, you can start using it like this  

<pre>require "rubygems";require "redis"  
r=  Redis.new(:host=>"localhost")  
r.get "myKey"  
</pre>

The most useful commands you'd probably use a lot would be  

<pre>r.type key  
</pre>

That tells you what is the type of the value, and  

<pre>r.keys k*  
</pre>

Which returns a list of all keys matching the regular expression.  

# When to Redis

[When to Redis](http://www.paperplanes.de/2009/10/29/when_to_redis.html) is a good article that will give you some idea about when you should use Redis.  
To name a few : Worker Queue and Cache.  
Recommended reading.  

# References

*   [Cheat Sheet](http://masonoise.files.wordpress.com/2010/03/redis-cheatsheet-v1.pdf)  

*   [Online Tutorial](http://try.redis-db.com/)  

*   [When to Redis](http://www.paperplanes.de/2009/10/29/when_to_redis.html)