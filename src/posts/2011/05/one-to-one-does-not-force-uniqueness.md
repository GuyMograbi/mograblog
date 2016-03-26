---
title: "@OneToOne - does not force uniqueness!"
published: 2011-05-15T00:59:00.000-07:00
description: oneToOne is not what you thought. read more to avoid a pitfall.
keywords: jpa
---

<div dir="ltr" style="text-align: left;" trbidi="on">

<div dir="ltr" style="text-align: left;" trbidi="on">

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/-cG2Az3vl3Ww/Tc-HystcseI/AAAAAAAAA1I/GGt9u-DTS2Y/s1600/db_icon.png)](http://3.bp.blogspot.com/-cG2Az3vl3Ww/Tc-HystcseI/AAAAAAAAA1I/GGt9u-DTS2Y/s1600/db_icon.png)</div>

I just discovered something. I have code with @OneToOne mapped to the DB.  

For example  

<pre>class A{  
   @OneToOne(mappedBy="a")  
   public B b;  
}  

class B{  
   @OneToOne  
   public A a;  
}  
</pre>

However, I am able to create multiple "B" objects, pointing all to same A record.  
The application fails on "select" to the A record. Hibernate throws exception :  

<div style="background-color: #fcd2da; padding:5px">

<pre><span class="Apple-style-span">**JPAQueryException** occured : Error while executing query **from models.A**: org.hibernate.HibernateException: More than one row with the given identifier was found: 1, for class: models.B</span></pre>

</div>

</div>

pretty straight forward and quite justified if you ask me.  
If you do a schema dump (or export) , you won't get "unique" constraints anywhere!  
It seems as if the responsibility for uniqueness is up to the developer in this case. Amazing!!  

The solution is quite simple.  
There are several ways to add the unique constraint.  
In this case, we will want the FK to be unique on the entire table.  

So simply add the following annotation where the "@OneToOne" is specified.  

<pre>Class B  
{  
@Column(unique = true)  
@OneToOne  
A a;  
}  
</pre>

I don't need to add this to class A, since class uses @OneToOne with "mappedBy" - so it basically takes the definitions from B.  

You can also add a @UniqueConstraint on the @Entity as follows :  

<pre>@Table( uniqueConstraints = { @UniqueConstraint(columnNames = {"a_id"})})</pre>

<pre>class B ... </pre>

There's no need to add the same on class "A" as the foreign key will reside in table B - as specified by the "mappedBy".  

You can find a play!framework application the reproduces this quite easily. simply checkout my read version from my google project : [http://mograblog-sample-code.googlecode.com/svn/trunk/test_unique_fk](http://mograblog-sample-code.googlecode.com/svn/trunk/test_unique_fk)  

</div>