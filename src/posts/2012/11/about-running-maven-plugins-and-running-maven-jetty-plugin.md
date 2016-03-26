---
title: About Running Maven Plugins and Running Maven Jetty Plugin
published: 2012-11-21T09:07:00.001-08:00
description: some notes you should know when running jetty plugin with maven
keywords: maven, jetty
---

<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# About Running Maven Plugins and Running Maven Jetty Plugin

When I followed tutorials and guides for using [Maven Jetty Plugin](http://docs.codehaus.org/display/JETTY/Maven+Jetty+Plugin)  
I kept seeing the same instructions saying:

<pre>  
mvn jetty:run  
  </pre>

But when I tried it, I kept getting failures.  
So I investigated and here is what I found.  

### Executing A Maven Plugin

When you run a Maven plugin you may use the following pattern

<pre>  
mvn groupId:artifactId:version:goal  
  </pre>

However, this is quite long and exhausting. So Maven came up with a method to shorten the command.  
As an example, we will have a look at the Jetty Maven Plugin.  
The full command for running it with version: 7.2.0.v20101020 is:

<pre>  
mvn org.mortbay.jetty:jetty-maven-plugin:7.2.0.v20101020:run  
  </pre>

### Plugin Groups

The Plugin Groups is a settings configuration.  
Without this, you won't be able to shorten the command.  
If you go to your settings.xml file (under `%M2_HOME%/conf`)  
search for pluginGroups section and you can specify a pluginGroup by adding:

<pre>  
<plugingroup>org.mortbay.jetty</plugingroup>  
  </pre>

You might think that by adding this line, you can simply get rid of the groupId section in the plugin execution.  
Apparently, you cannot.  
First of all - if you want to specify the version, you must specify the groupId as well.  
If you do not specify the groupId, you must not specify the version.  
You can control the version by specifying details in the POM like so:

<pre>  
<build>  
    <plugins><plugin><groupid>org.mortbay.jetty</groupid>  
            <artifactid>jetty-maven-plugin</artifactid>  
            <version>7.2.0.v20101020}</version></plugin></plugins>   
</build>  
   </pre>

If the plugin's artifaceId has one of the following patterns:

*   maven-${prefix}-plugin - for plugins from the Apache Maven project
*   ${prefix}-maven-plugin - for plugins from other sources

you cannot specify the entire artifaceId.  
Instead you need to specify only the "prefix" part.  
Since the Jetty Maven Plugin suites the second pattern, we need to replace the artifactId with simply "jetty".  
Once you remove the groupId, version and switch artifactId to "jetty" you get the famous command:

<pre>  
Mvn jetty:run  
   </pre>

The pluginGroups section support the following values by default:

*   org.apache.maven.plugins
*   org.codehaus.mojo

so if you set your groupId to once of these, you won't need to modify the settings.

### Feature Or Bug?

Seems to me that the expected behavior would be :

*   If you define a pluginGroup - you can just neglect the groupId but still specify the version
*   If you specify the groupId, but not the version, it should use the defined version in the POM. (it does not, it takes the latest)
*   The artifactId patterns should be optional always! - They are not. Once you define pluginGroup you cannot specify the full artifactId

### References

<il>[Plugin Prefix Resolution](http://maven.apache.org/guides/introduction/introduction-to-plugin-prefix-mapping.html) - This document does not make it clear that pluginGroup is required.</il>

</div>