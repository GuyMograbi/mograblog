---
title: 3 tools to increase your Java productivity 
published: 2016-10-1T22:30:00.001-07:00
layout: post.pug
keywords: java,nodejs,mavenmon, jitpack, jabba
description: mavenmon, jitpack and jabba will help you write better and faster java code 
---


In the last few months I have been taking part in a big Java project.    
After several years in the nodejs community, which I love, I find myself obsessing over 
having the same tools I had in nodejs for my java environment.
 
Tools like `nodemon`, `nvm` and `npm` help boost nodejs development and made my life easier.      
So now I am always on the look out for similar tools in Java.    

![cover - Coffee Mug With Mograblog Logo](images/java-productivity-tools-cover.jpg)

# [JitPack](https://jitpack.io/) 

JitPack helps you reference Java libraries straight from GitHub.   
Which means no more cumbersome process to publish your jar files.    
No need to maintain a repository of your own.    
And even better no need to maintain a continuous integration/deployment.    

Simply add JitPack as a repository in your project, use your github account as your groupId and the repository name as artifactId and you're good to go.
        
I'd still love to see something similar to this but with compilation on the client side.   
Which means the sources are downloaded to your machine and then compiled for your project.      
While this idea sounds counterintuitive, I think it will show lots of benefits.    
One of those benefits is that everything is debuggable - just like in node.    
If I have a problem with some 3rd-party, I can simply debug it and modify its sources.  

In Java I need the sources, and even if I have them I usually cannot change the source - it is definitely not easy. 
But if the dependency mechanism will assume building the sources is always required, then there'd be no problem. 

# [mavenmon](https://github.com/coder-on-deck/mavenmon) 

Written by yours truly, this is a Maven nodemon implementation.    
Mavenmon detects code changes and recompiles your library.   

It is pretty slim and basic, but allows customization and reasonable behavior out of the box.     

# [Jabba](https://github.com/shyiko/jabba)

Jabba is a Java Version Manager inspired by nvm. (the name jvm is already taken :) )     
It allows your to easily switch between Java versions.    
  
While I am not sure if it has something similar to nvm's `.nvmrc` file support - which allows you to commit the desired version alongside your project -      
I know I can always replicate it easily using command like this `` jabba use `cat .jabbarc` `` to get a similar behavior. 


# Wishful thinking - npm as Java Package Manager - the missing tool. 

The last item in this post is one that does not exist (yet?), but I wish it did.    

I think maven should be replaced by or upgraded to a more modern package management.   
npm is my personal favorite and it seems to me that you can easily bridge between npm and maven.    
This kind of bridge will allow you to use npm as your package manager and enjoy all of npm's great features. 

One of those is the semantic versioning support (specifically [node-semver](https://github.com/npm/node-semver)), which I feel is the thing I miss most.   
While the `SNAPSHOT` method was ground breaking at the day, I really feel like semver can be very useful in Maven.    
I would love to be able to write `~3.2.1` or `^3.2.1` in my maven dependencies and automatically get patch and minor versions.     

Another way to implement semver in Maven is to replace the dependency resolver, but for me this is just one of npm's great features that we can use.    
 
 
# From experience
 
So the project I am working on right now will not allow me to use tools like JitPack and I still don't have a need for Jabba at work,   
but at home, when I write small pieces of code, I find these tools very helpful.    

For example I can easily publish my [selenium extension](https://github.com/GuyMograbi/mograblog-selenium-extension) even years after I wrote it.   
 
There is still a lot of work that can be done to improve a developer's life in the Java ecosystem, but these 3 items are a very good start.   
