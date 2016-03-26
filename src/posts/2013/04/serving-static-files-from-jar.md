---
title: Serving Static Files From JAR
published: 2013-04-01T03:32:00.000-07:00
description: how to serve static resources from a jar
keywords: webapp, static, jar
---

<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# Serving Static Files From JAR

If you have a lot of static files (images, JS, css) in your WAR,  
Or maybe you have static files that are shared between different projects  
you might want to pack those resources into a JAR and serve them from there.  

## Make Sure Your Class Files Are Packaged

First of all, if you are looking to reduce the number of files in your WAR  
You should check if your ".class" files are packaged into a JAR.  
You can easily achieve this by configuring the Maven WAR Plugin

<pre class="prettyprint">  
<plugin>  
 <groupid>org.apache.maven.plugins</groupid>  
 <artifactid>maven-war-plugin</artifactid>  
 <version>2.3</version>  
 <configuration><archiveclasses>true</archiveclasses></configuration>   
</plugin>  
  </pre>

## Package Your Static Resources

Lets assume that you have the following directories

<pre class="prettyprint">  
src  
 |  
 +---main  
       |  
       +----java  
       |  
       +----resources  
       |  
       +----webapp  
              |  
              +-----public  
              |        |  
              |        +-----images  
              |        |  
              |        +-----javascripts  
              |        |  
              |        +-----pages   
              |        |  
              |        +-----stylesheets         
              |  
              +-----WEB-INF  
              |  
              +-----META-INF  
              .  
              .  
              .  
</pre>

In this structure, your static resources are under folder "webapp/public".  
In order to package them, simply move the "public" folder under "resources".  
Next, you will have to define a servlet to server them.  

## Configuring Servlets

Assuming you already have Spring MVC (if not, it's not a problem to set it up quickly)  
All you need to do, is add the following to the web-context.xml  

However, since I use annotations, I ran into some problems.  
The first exception was

<pre>Does your handler implement a supported interface like Controller?</pre>

I quickly resolved this by using

<pre class="prettyprint"><mvc:annotation-driven></mvc:annotation-driven></pre>

instead of

<pre class="prettyprint"><context:annotation-config></context:annotation-config></pre>

It turns out that using "resources" tag, shuts down an important annotation configuration in Spring.  

Once I added the "annotation-driven" tag, I got

<pre>Error creating bean with name 'org.springframework.validation.beanvalidation.LocalValidatorFactoryBean</pre>

Unfortunately, I was unable to resolve this nicely.  
I was forced to add hibernate-validation JAR to my project.  

<pre class="prettyprint">  
<dependency>  
 <groupid>org.hibernate</groupid>  
 <artifactid>hibernate-validator</artifactid>  
 <version>4.0.0.GA</version>  
</dependency>     
  </pre>

## Last But Not Least - Configure Web.xml

This is my web.xml - yours might be a bit different, depends on how you use Spring MVC.

<pre class="prettyprint">  
<servlet>  
    <servlet-name>Spring</servlet-name>  
    <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>   
    <init-param><param-name>contextConfigLocation</param-name>  
        <param-value>/WEB-INF/web-context.xml</param-value></init-param>   
    <load-on-startup>1</load-on-startup>  
</servlet>     
<servlet-mapping>  
    <servlet-name>Spring</servlet-name>  
    <url-pattern>*.do</url-pattern>  
</servlet-mapping>  
<servlet-mapping>  
        <servlet-name>Spring</servlet-name>  
        <url-pattern>public/*</url-pattern>  
</servlet-mapping>     
  </pre>

Please note I have 2 servlet-mappings. It seems to work just fine.

# Troubleshooting

When I configured spring MVC, I kept getting "404".  
I felt the need to debug the servlet. But which servlet?  
To figure this out, you need to read the spring mvc XSD!

<pre class="prettyprint">  
<xsd:annotation>  
  <xsd:documentation<br>source="java:org.springframework.web.servlet.resource.ResourceHttpRequestHandler">Configures a handler for serving static resources such as images, js, and, css files with cache headers optimized for efficient   
loading in a web browser. Allows resources to be served out of any path that is reachable via Spring's Resource handling.  
  ]]></xsd:documentation<br> </xsd:annotation>     
  </pre>

So I added break points on the class :

<pre>  
   org.springframework.web.servlet.resource.ResourceHttpRequestHandler  
  </pre>

Which worked just fine.  
The code is written well.  
It was very easy for me to understand the flow and my errors.  

## A Word About Resource Mapping

I want to talk about the resources mapping in web-context.xml a minute.  

First of all, if I were to serve the content from outside the jar the mapping would simply be  
So the different between packaging and not packaging is whether it is in the classpath or not.  
Another important thing to note is that I specify "public" twice. Once in "mapping" and again in "location".  
I do this because the "public" prefix is stripped from the URI due to "mapping".  
By adding it to location I am actually returning the prefix to the URI  
So if I have a resource under

<pre>my.jar!/public/images/logo.png</pre>

which I ask for by writing  

<pre>![](/public/imags/logo.png)</pre>

after "mapping" it, spring will have "images/logo.png".  
If I were to write the location as "classpath:/guy/" - spring would look for it under

<pre>my.jar!/guy/images/logo/png</pre>

By specifying "classpath:/public/" I am actually fixing the prefix back to public.</div>