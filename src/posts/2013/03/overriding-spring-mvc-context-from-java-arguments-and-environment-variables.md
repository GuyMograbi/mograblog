---
title: Overriding Spring MVC Context From Java Arguments And Environment Variables
published: 2013-03-25T07:51:00.000-07:00
description: help make spring mvc responsive for the environment
keywords: spring, java
layout: post.hbs
---

Recently I added spring MVC to an existing project using Jetty.
Like all projects, I wanted this one to support DEV mode and PROD mode.  
It is a Spring best practice to keep 2 context files (at least).  
One file for Spring MVC controllers and stuff,  
and the other for beans that can be used outside Spring MVC and reusable everywhere.  

The Spring MVC context is by default named "web-context.xml"  
I call the other context "prod-context.xml" or "dev-context.xml" according to environment  
The default context should be "prod-context.xml".  
In order to support PROD and DEV modes, I had to expose some way to specify which context to load.  
What I really wanted is to modify my web.xml to use some variable.  
However, that seemed impossible.  

Later, I tried injecting variables to the context.xml "import" tag.  
Something like

```
<import resource="classpath:#{systemProperty.myContext}" />
```

But apparently, I cannot do this either.

# Overwriting ContextLoaderListener customizeContext

It seems that Spring prepared themselves to this scenario.  
Reading the [Spring documentation](http://static.springsource.org/spring/docs/2.5.x/api/org/springframework/web/context/ContextLoader.html#customizeContext(javax.servlet.ServletContext, org.springframework.web.context.ConfigurableWebApplicationContext) "Spring Documentation"), you can see ContextLoaderListener#customizeContext method is just for this purpose  

```
The default implementation is empty but can be overridden in subclasses to customize the application context.
```

So this is how the code should look like :

```
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.ConfigurableWebApplicationContext;
import org.springframework.web.context.ContextLoaderListener;

import javax.servlet.ServletContext;
import java.util.LinkedList;
import java.util.List;

public class SmartContextLoader extends ContextLoaderListener {

    private static Logger logger = LoggerFactory.getLogger( SmartContextLoader.class );

    @Override
    protected void customizeContext( ServletContext servletContext, ConfigurableWebApplicationContext applicationContext ) {
        logger.info( "initializing smart context loader.");
        String property = System.getProperty( "app.context", System.getenv( "app.context" ) ); // default to cloudify
        property = property == null ? "default-context.xml" : property;
        List<String> locations = new LinkedList<String>(  );
        locations.add( "WEB-INF/web-context.xml" ); // got no idea why... but I need this!
        CollectionUtils.addAll( locations, property.split( ";" ) ); //allow multiples
        logger.info( "using the following locations [{}]", locations );
        applicationContext.setConfigLocations( locations.toArray( new String[CollectionUtils.size( locations )] ) );

    }
}
```

