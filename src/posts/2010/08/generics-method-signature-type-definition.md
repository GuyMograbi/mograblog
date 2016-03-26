---
title: Generics - method signature type definition
published: 2010-08-03T02:09:00.000-07:00
description: defining a generic on a method signature
keywords: generics, java
---

On my [previous post](http://mograblog.blogspot.com/2010/02/generics-did-you-know.html) I introduce some advanced things about generics, when I discovered I forgot a very important feature.  

As specified before, you can declare a generic type on a method declaration.  

<pre class="java" name="code">public <t> T newInstance(Class <t>clzz, String name) throws IllegalAccessException, InstantiationException  
    {  
       return (T) Spring.getBean( "myBean" );  
    }</t></t></pre>

disregarding for a moment the ugly cast. (in this case you better use Class#cast function).  
as you can see, I don't really need "clzz" there. I use it only to define T.  
However you can also do without it"Class <t>clzz".  

You can also write the following function definition  

<pre class="java" name="code">public <t> T newInstance(String name) throws IllegalAccessException, InstantiationException  
    {  
       return (T) Spring.getBean( "myBean" );  
    }  
</t></pre>

and call it like this  

<pre class="java" name="code">public void test() throws InstantiationException, IllegalAccessException  
    {  
        String str = this.<string>newInstance( "guy" );  
    }  
</string></pre>

In this specific case, you don't really need to specify <t>since it is "inferred" and so the compiler will tell you  

<pre>Explicit type arguments can be inferred  
</pre>

however when you get to inheritance and scenarios which are more complex than this one, it will no longer be inferred.  

NOTE : This was tested on JDK 1.6\. I am unsure about 1.5 compatibility.  

# Compiler Support Issue

Some of you might try this and get the following message :  

<pre>type parameters of <t>  T cannot be determined; no unique maximal instance exists for type variable T with upper bounds, java.lang.Object  
</t></pre>

Intellij users will run into this the fastest..  

It seems this is compiler dependend.  

Java has several compilers :  

*   [Javac](http://en.wikipedia.org/wiki/Javac)  

*   [Jikes](http://jikes.sourceforge.net/)  

*   Eclipse  

probably more, but these are the compilers intellij supports.  
Each with its own advantages.  

However - it seems that when working on Intellij, you get JavaC as default compiler, but that compiler cannot handle the syntax shown above!! - you can reproduce the problem from command line.  

To resolve this, all you need to do is tell intellij to use Eclipse Compiler.  
Settings ==> Compiler ==> Java Compiler ==> Use compiler : Eclipse  

<div class="separator" style="clear: both; text-align: center;">[![](http://2.bp.blogspot.com/_J3A8WqpdCX0/TF_0ipfILkI/AAAAAAAAAmA/d6OeFx_9PY8/s320/eclipse_compiler_setting.png)](http://2.bp.blogspot.com/_J3A8WqpdCX0/TF_0ipfILkI/AAAAAAAAAmA/d6OeFx_9PY8/s1600/eclipse_compiler_setting.png)</div>

And the error will go away.  
HOWEVER - NOTE - Once you use the eclipse compiler, you should insert the target/source attributes to command line :  
like this :  

<pre>-target 1.6 -source 1.6  
</pre>

or whatever version you use.  

There's also [a comment in a "YouTrack" thread by intellij](http://youtrack.jetbrains.net/issue/IDEA-52447#comment=27-139287) that explains this while suggesting a different solution.  

# Configuring Eclipse Compiler in a Maven Project

If you are compiling with Maven, you should define the eclipse compiler as such  

<pre class="xml" name="code"><plugin>  
    <artifactid>maven-compiler-plugin</artifactid>  
    <configuration>        <compilerid>eclipse</compilerid>   
        <source>1.6  
        <target>1.6</target>  

   </configuration>   
    <dependencies>        <dependency>            <groupid>org.codehaus.plexus</groupid>  
            <artifactid>plexus-compiler-eclipse</artifactid>  
            <version>1.8</version>  
       </dependency>   
   </dependencies>   
</plugin>  

</pre>

You can also [read about configuring other compiler](http://maven.apache.org/plugins/maven-compiler-plugin/non-javac-compilers.html)</t></t>