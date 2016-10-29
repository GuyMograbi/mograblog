---
title: javax.persistence.PersistenceException org.hibernate.PropertyAccessException could not get a field value by reflection getter
published: 2010-09-28T03:10:00.001-07:00
description: hibernate exception resolved easily
keywords: hibernate
layout: post.pug
---


I have worked with hibernate now for 6 years. and yet..

Today I got this exception :

```
javax.persistence.PersistenceException: org.hibernate.PropertyAccessException: could not get a field value by reflection getter of my.pkg.ClassName  
```

which was caused by

```
 Can not set java.lang.Long field ... to java.lang.Long  
```

sounds strange and unclear, but the solution is pretty simple

## The Problem

The problem is in the query.  
The query I was trying to execute was something like :  

```
Select * from A a where a.b = :b_val
```

B is another entity with an id.  
When I tried to set the value for "b_val" I did the following :  

```
B b = getB();  
Query q = getQuery();   
q.setParameter("b_val", b.id);   
```

However, this is wrong. What I should be doing is :  

```
q.setParameter("b_val", b);
```

And that is because Hibernate handles the foreign key, extracts the ID from "b" and takes it on from there.  
But sometimes, as in this case, you don't have the Object "b" but only the ID. So how do you override hibernate in this scenario?

## The Solution

In case you only have the ID, you should modify the query as so:  

```
Select * from A a where a.b.id = :b_val
```

note how I specify "id" after "a.b".  
This will generate the results you were after</div>