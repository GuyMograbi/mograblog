---
title: Anonymous classes, Final - Java and Javascript
published: 2010-03-17T10:28:00.000-07:00
keywords: java
description: the curious case of the misunderstood final keyword in java
layout: post.pug
---

final is a very intuitive keyword, and even though I use it a lot, I never really took the time to ponder about it. Today is a good day for pondering.. .  

# Why do we need it

What would you expect to see on screen when running the following **JavaScript**?  

```
var value = "hello";
var myFunc = function(){alert(value);}  
value = "world";  
myFunc();  
```

Even though the function was declared before I assigned the "world" value, the function was evaluated only after the assignment.  

In Java, they decided to handle this by forcing us to declare the variable as final.  
For example :  

```
public void demo(){

        final String filterValue = "guy";  
        File folder = new File(".");  

        folder.listFiles(new FilenameFilter() {  
            @Override  
            public boolean accept(File dir, String name) {  
                return name.indexOf(filterValue) >= 0;  
            }  
        });  

    }  

```

Note that the variable "filterValue" had to be declared final.  
So, the idea is simply to avoid ambiguity.  

# Final and Const

It is unavoidable to be a bit confused. It seems that final on an Object is meant only for the reference. Thus, I am allowed to do the following:  

```
public void demo2(){
        final MyObj obj = new MyObj();  
        obj.field = "hello world";  
    }  
```

While the object changes, the reference does not.  
This also covers the case - which I found most confusing at the time - of sending "obj" to another function.  

You are able to write code like this  

```
    public void demo2(){  
        final MyObj obj = new MyObj();  
        obj.field = "hello world";  
        demo3(obj);  
        System.out.println("obj.field = " + obj.field);  

    }  

    public void demo3(MyObj obj){  
        obj = new MyObj();  
        obj.field = "hello again";  

    }  
```

Some might think that demo3 should declare MyObj final, just like const in c++.  
However - this is not the case. The reason is - of course - that when demo3 returns, the assignment we did cancels either way and we get "hello world" back in demo2\.  

So you will be surprised to discover you can write  

```
public void bookMe(final Book book){
        // ... do something here  
    }  
```

Well... this is surprising - because as I said before - there's no real need to forbid book assigment since it cancels anyway.. so why do we need it ??? Well, we don't. We can add this in order to discover bugs in runtime (assigning book now will cause compiler to fail) and we can use it if we want to pass the argument to an anonymous class (without assigning it to another variable first).  

# Conclusion

*   For inner classes - the final is an ambiguity solver
*   You can pass final variables to methods that don't declare final
*   There's no real need to add "final" to method signatures