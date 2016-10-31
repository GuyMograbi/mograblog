---
title: Mysql - showing Long timestamps and readable Dates
published: 2011-01-01T09:28:00.000-08:00
keywords: mysql
description: This is how you can have a readable date in a mysql query
layout: post.pug
---

A while ago I had to find a certain date in the database, but the date column was defined as LONG.  
I discovered you can easily turn a LONG to a date, using the following syntax :  

```sql
select startTime, FROM_UNIXTIME(startTime / 1000) , UNIX_TIMESTAMP() from LiveSessionDetails limit 1;
```

NOTE that you have to divide the LONG value by a 1000 otherwise you get a blank value.