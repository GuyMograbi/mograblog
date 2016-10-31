---
title: Eclipse Ignores Maven Settings
published: 2012-12-25T00:00:00.000-08:00
description: another reason why i hate eclipse
keywords: eclipse
layout: post.pug
---

I defined a custom local repository for Maven, but eclipse simply ignored it.
You can define local repository location easily by modifying `M2_HOME/conf/settings.xml.`  
This resulted in a strange behavior. The commands were successful when running from command line but failed on missing artifacts from Eclipse.  
Eclipse complained about missing artifacts, but when I check, I saw they were there.  

Another strange side-effect I noticed was that Eclipse thought my Maven repository was in a different location.  
It seems that eclipse save Maven repository location in a variable called "M2_REPO".  
You can see it by going to "Window ==> Preferences ==> Java ==> Build Path ==> Classpath Variables".  
The annoying thing is that Maven sets this variable as "non modifiable".

While I read a lot of threads about this issue, [everyone suggested something crazy like running a Maven plugin that modified M2_REPO variable.](http://www.mkyong.com/maven/how-to-configure-m2_repo-variable-in-eclipse-ide/ "mkyong suggests to run maven plugin to modify m2_repo") The command looks something like:

<pre>mvn -Declipse.workspace= <path-to-eclipse-workspace>eclipse:add-maven-repo</path-to-eclipse-workspace></pre>

You can read all about it in the [official Maven Eclipse plugin site](http://maven.apache.org/guides/mini/guide-ide-eclipse.html "Official Maven Eclipse Plugin Site").  
However this will resolve this single problem.  
I wanted a solution that will synchronize Maven with all my changes for Maven settings.

### The Solution

The answer is quite simple.  
It seems that Eclipse comes with an embedded Maven version.  
This is extremely bad.  
You can easily modify this by going to `Window ==> Preferences ==> Maven ==> Installtion` and tell Eclipe to not use the embedded version and instead define an external installtion.

[![](http://2.bp.blogspot.com/-ggf38JweP7Y/UMxSo9ugEVI/AAAAAAAAVLM/I4L5cL1-F7Y/s320/eclipse_maven_settings.png)](http://2.bp.blogspot.com/-ggf38JweP7Y/UMxSo9ugEVI/AAAAAAAAVLM/I4L5cL1-F7Y/s1600/eclipse_maven_settings.png)

