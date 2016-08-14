---
title: Contribute a micro library to java with jit today!
draft: true
published: false
layout: post.hbs
keywords: java jit
description: Contributing open source in java is suprt easy with jit.  
---

After a looot of reading.. This is what I came up with to make java acts a little more like nodejs require method. 


# Assumption before I begin

The assumption I make is based on how node_modules behave. So lets have a look at it first: 

## Fact: how it is in npm

The `node_modules` folder looks like so

    node_modules
              +----  dep_1
              +----  dep_2

each `dep_x` is a folder representing a single dependency.    

the `package.json` can declare a `main` file that will be used if we simple `require('dep_1')`


## Assuming the following on Java

Each dependency we have in our maven `pom.xml` represents a single dependency as well. In Java, this is correct if one of the following applies: 
 
- a dependency is a single jar containing all its dependencies. 
- a dependency is implemented in the same way I am suggesting right here(will be explained again at the bottom)

So lets assume our code has a `java_modules` library with the following structure: 

    java_modules
             +---- dep_1.jar
             +---- dep_2.jar

where each `dep_x.jar` contains all its dependencies inside and is never dependent on `dep_y.jar`

# Lets talk about a specific use-case

So lets assume dep_1 and dep_2 has some class called `guymograbi.MyMessage` with method `getMessage` that returns a string. 

    package guymograbi;

    public class MyMessage {
    
        public String getMessage(){
            return "message from dep_1";
        }
    
    }

# And now for the code

## Option 1 - all reflection all the way

So given the assumption above, we can now write the following code require class `MyMessage` from dependency `dep_1` and invoke function `getMessage`



     public String runGetMessageFromDep1() throws MalformedURLException, ClassNotFoundException, IllegalAccessException, InstantiationException, NoSuchMethodException, InvocationTargetException {
        URL url = new File("java_modules/dep_1.jar").toURI().toURL();
        URLClassLoader urlClassLoader = new URLClassLoader(new URL[]{url});
        Object o = urlClassLoader.loadClass("guymograbi.MyMessage").newInstance();
        return (String) o.getClass().getMethod("getMessage").invoke(o);
    }

This code can be made generic enough to suite for all our needs..   
However! this is not nice because it does not: 

 - benefit from java strong typing. 
 - will not produce nice stack traces
 - simply not the java way.. 

# One more assumption to make it all fit

Then, I considered `typescript` and how it behaves in `nodejs`.   
For `typescript` to work well in `nodejs` you have the `definitions` available somewhere. 

In Java - this simply means an API is exposed. 

So now, lets assume each dependency we have also exposes a separate `api.jar`. so that if I want to use `MyMessage` there is an `IMyMessage` class somewhere exposing its interface, and `MyMessage` is implementing that interface. 

The api will be in the main classpath, so I can reference it. I will only separate the implementation's classpath. 

Then, I found out that java actually supports this built in(!) since java 6! with something called `ServiceLoader`. 

## How to use it

So ServiceLoader assumes each interface has a declared implementation. In our example it is : 

   resource/META-INF/services
                          +---- guymograbi.IMyMessage
 
and the file's content is the implementation classname - `guymograbi.MyMessage`. 

This is actually an assumption I would like to avoid.. we will see how soon. 

And now the code will now look like this


    // .. create class loader like before
    ServiceLoader<IMyMessage> load = ServiceLoader.load(IMyMessage.class, urlClassLoader);
    for (IMyMessage t : load) {
        return t;
    }
    throw new RuntimeException("could not find implementation to IMyMessage"); 