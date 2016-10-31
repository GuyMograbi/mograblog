---
title: Why the Hack am I Getting OptimisticLockException?
published: 2013-05-20
description: see how i resolved this exception quickly
keywords: optimisticlockexception, ebean, playframework
layout: post.pug
---


For a while now I've been trying to figure out an exception I got using EBean and Play!Framework.
I know what OptimisticLockException, and I know why it usually happens, but nothing matched my scenario.  
Today I had an enlightenment and I managed to resolve the exception. Thought I'd share.  


The following example is based on code I inherited from another developer.
I tried to give a relevant example as possible.  


## The Problem

I am using playFramework 2 which uses EBean by default as an ORM.
I have 2 classes with @OneToOne relation  


```

@Entity  
class Book extends Model{  
 @OneToOne( cascade = DELETE )  
 public class BookWriter bookWriter;  

 @Version  
 public long version = 0;  

}  

@Entity  
class BookWriter extends Model{  
    @OneToOne(mappedBy  = "book" )  
 public class Book book;  

 public class Writer writer; // also mapped, but not important for the story.  
}  

```

As you can see, I have an instance of BookWriter connecting between each book and its writer.
I also added a "version" on the book so I'd get a lock exception if 2 people are overriding one another.  
If I delete the book, I also want to delete the BookWriter - however not the writer itself.  
If it is not obvious by now, I will never explicitly delete a BookWriter.  
I will always delete the Book, and let the ORM cascade the deletion to preserve consistency.  
So deleting a book looks like so:

```
Book b=  Book.find(...).delete();     
```

Surprising enough, this code throws OptimisticLockException that looks like this

```
javax.persistence.OptimisticLockException: Data has changed. updated [0] rows sql[delete from book_writer where id=?] bind[null]  
```

The exception is thrown every time - which means this is not a race condition.  
It even reproduced when a single thread handled the book.  
So why would it throw this exception?

## The Solution

The solution is quite simple once you notice it.
The foreign key is on the Book, and not the BookWriter.  
The foreign key location is decided by the "mappedBy" attribute on the @OneToOne annotation.  
Since BookWriter.book has "mappedBy" on it - this means that Book.bookWriter is the foreign key.  


When EBean deletes the Book, first it goes to delete the BookWriter.
Since it deletes the BookWriter - it updates the foreign key on the Book.  
Then it tries to delete the Book, but notices something changed.  


Stupid right?
You can easily resolve this by placing the foreign key on the BookWriter.  
This way there's nothing to update after its deletion.  


To achieve this, you simply need to remove the "mappedBy" from BookWriter.book and add "mappedBy='book' " on Book.bookWriter.
You also have to modify the schema if you are not using automated tools for this.  


