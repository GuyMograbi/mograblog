---
title: Serving Static Files From JAR
published: 2013-04-01
description: how to serve static resources from a jar
keywords: webapp, static, jar
layout: post.hbs
---

If you have a lot of static files (images, JS, css) in your WAR,  
Or maybe you have static files that are shared between different projects  
you might want to pack those resources into a JAR and serve them from there.  

## Make Sure Your Class Files Are Packaged

First of all, if you are looking to reduce the number of files in your WAR  
You should check if your ".class" files are packaged into a JAR.  
You can easily achieve this by configuring the Maven WAR Plugin

```
<plugin>  
 <groupid>org.apache.maven.plugins</groupid>  
 <artifactid>maven-war-plugin</artifactid>  
 <version>2.3</version>  
 <configuration><archiveclasses>true</archiveclasses></configuration>   
</plugin>  
```

## Package Your Static Resources

Lets assume that you have the following directories

```
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
```

In this structure, your static resources are under folder "webapp/public".  
In order to package them, simply move the "public" folder under "resources".  
Next, you will have to define a servlet to server them.  

## Configuring Servlets

Assuming you already have Spring MVC (if not, it's not a problem to set it up quickly)  
All you need to do, is add the following to the web-context.xml

```
<mvc:resources mapping="/public/**"  location="classpath:/public/" />
```

However, since I use annotations, I ran into some problems.  
The first exception was

```
Does your handler implement a supported interface like Controller?
```

I quickly resolved this by using

```
<mvc:annotation-driven/>
```

instead of

```
<context:annotation-config/>
```

It turns out that using "resources" tag, shuts down an important annotation configuration in Spring.  

Once I added the "annotation-driven" tag, I got

```
Error creating bean with name org.springframework.validation.beanvalidation.LocalValidatorFactoryBean
```

Unfortunately, I was unable to resolve this nicely.  
I was forced to add hibernate-validation JAR to my project.  

```
<dependency>  
 <groupid>org.hibernate</groupid>  
 <artifactid>hibernate-validator</artifactid>  
 <version>4.0.0.GA</version>  
</dependency>     
```

## Last But Not Least - Configure Web.xml

This is my web.xml - yours might be a bit different, depends on how you use Spring MVC.

```
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
```

Please note I have 2 servlet-mappings. It seems to work just fine.

# Troubleshooting

When I configured spring MVC, I kept getting "404".  
I felt the need to debug the servlet. But which servlet?  
To figure this out, you need to read the spring mvc XSD!

```
<xsd:annotation>
  <xsd:documentation
   source="java:org.springframework.web.servlet.resource.ResourceHttpRequestHandler"><![CDATA[
Configures a handler for serving static resources such as images, js, and, css files with cache headers optimized for efficient
loading in a web browser. Allows resources to be served out of any path that is reachable via Spring's Resource handling.
  ]]></xsd:documentation>
 </xsd:annotation>
```

So I added break points on the class :

```
org.springframework.web.servlet.resource.ResourceHttpRequestHandler
```

Which worked just fine.  
The code is written well.  
It was very easy for me to understand the flow and my errors.  

## A Word About Resource Mapping

I want to talk about the resources mapping in web-context.xml a minute.  

```
<mvc:resources mapping="/public/**"  location="classpath:/public/" />
```

First of all, if I were to serve the content from outside the jar the mapping would simply be

```
<mvc:resources mapping="/public/**"  location="/public/" />
```

So the different between packaging and not packaging is whether it is in the classpath or not.  
Another important thing to note is that I specify "public" twice. Once in "mapping" and again in "location".  
I do this because the "public" prefix is stripped from the URI due to "mapping".  
By adding it to location I am actually returning the prefix to the URI  
So if I have a resource under

```
my.jar!/public/images/logo.png
```

which I ask for by writing  

```
<img src="/public/imags/logo.png"/>
```


after "mapping" it, spring will have "images/logo.png".  
If I were to write the location as "classpath:/guy/" - spring would look for it under

```
my.jar!/guy/images/logo.png
```

By specifying `classpath:/public/` I am actually fixing the prefix back to public.