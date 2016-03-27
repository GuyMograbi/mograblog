---
title: Resolving play!Framework's test migration problems
published: 2011-07-02T10:11:00.000-07:00
keywords: play!framework
description: this is how you can fix your tests in play!framework 1.2.1
layout: post.hbs
---

I recently upgraded to play 1.2.1.  
As I was running the tests, I got weird exceptions. That contained strings like :  

```
Unsuccessful: create table   

Syntax error in SQL statement "CREATE TABLE ...   

expected "identifier"; SQL statement:   
```

After searching google, I read the thread "[Play 1.2: Syntax error in SQL statement "CREATE TABLE ...](http://groups.google.com/group/play-framework/browse_thread/thread/7db811362e73a81f)" on google group, which reached the conclusion I should use :  

```hibernate.globally_quoted_identifiers=true```

But then, I got some scarier errors like :  

```
JPA error  
A JPA error occurred (Unable to build EntityManagerFactory):  
```

So I reached another thread named "[HowTo : UniqueConstraint and ManyToOne](http://groups.google.com/group/play-framework/browse_thread/thread/20b3ecc0b008a76f)", yet again on google group.  
However, this time, they reached the conclusion "never use hibernate.globally_quoted_identifiers=true "  

Urrrrghhh!!!  

As I started digging I quickly found that play switched the test DB driver from [HSQLDB](http://hsqldb.org/) to [H2](http://www.h2database.com/html/main.html) as you can see in [play-1.2.1 release notes](http://www2.playframework.org/documentation/1.2/releasenotes-1.2#H2asdefaultinmemorydatabase)  

So I finally decided to revert back to HSQLDB, and see what happens. I am glad to report the problem was solved, however - since it was hard to discover the proper way to do this, I decided to post it here.

1.  take hsqldb.jar and place it in your play/framework/lib dir. ( you need it in your classpath ).
2.  make sure your application conf has the following properties

1.  %test.db=mem
2.  %test.db.driver=org.hsqldb.jdbcDriver
3.  %test.db.url=jdbc:hsqldb:mem:playembed

This should do the trick.  
You should look out for the line where play says where it is connecting to, and try to catch where

```Connected to jdbc:h2:mem:play;MODE=MYSQL```

becomes

```Connected to jdbc:hsqldb:mem:playembed```

Then you will know it is fixed.

# The new @DB view

I am glad to report that play added a new view for DB.  
This makes the need for an external client obsolete.  
It is most useful with memory DBs as used in tests.  
I tried it, and I have to say - best DB client GUI I used so far..  
Simply go to : <span style="font-weight:bold">localhost:9000/@db</span>
If you are in test mode, use the URL shown above : jdbc:hsqldb:mem:playembed (or whatever you customized).  
Don't worry - this URL is not available in production mode.  
You can read more about it on the release notes.