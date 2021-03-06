---
title: SLF4J with Logback in a Maven Project
published: 2013-03-05T01:09:00.000-08:00
description: setting up slf4jw ith logback
keywords: slf4j, logback, maven, java
layout: post.pug
---

I recently started migrating my projects to SLF4J.
SLF4J is a single API for all logger implementations.  
There are at least 3 implementations I know about:

*   [Log4J](http://logging.apache.org/log4j/1.2/ "log4j")
*   [Java Logging Utils](http://docs.oracle.com/javase/1.4.2/docs/api/java/util/logging/package-summary.html "Java Utils Logging")
*   [Logback - the new Log4J](http://logback.qos.ch/ "Logback")

## Why use SLF4J?

When you write a Java library which will be used by unknown consumer, logging is always a problem.  
You might choose using implementation A, while the consumer uses implementation B.  
And there are those who use `System.out`.. :(
SLF4J will resolve this issue.  
When you use SLF4J you let the consumer decide which logging implementation they want.  

## Nice API

SLF4J offers an API that was dearly missing in precious implementations.  
While being very similar to LOG4J using

```
logger.info("...");  
logger.debug("...");  
```

It has a built in formatting for strings using the `{}` placeholders.

## Original Configuration

Even though SLF4J wraps the API, it leaves the configuration as it was.  
This means that if you have a project using LOG4J, you can start using SLF4J right away, without modifying your configuration.  
On the other hand, it means that if you decide to modify the underlying implementation, you would have to rewrite configuration.  

## Get rid of level checks inside your code

Using SLF4J , like Logback and logging utils, makes the need to check log level redundant  
Once you had to write code like

```
logger.isDebugEnabled() { logger.debug(" myArg=[" + myArg + "]"); }     
```

The need for log level is required since string concatenation had bad performance.  
SLF4J uses a form of String formatting like so

```
logger.debug("myArg={}", myArg)  
```

and so there is no string concatenation.  
With this method, SLF4J can check the log level before formatting the String.

## How to print formatted string and exception?

Looking at the API it is not clear how to use

```
logger.error
```

to print a formatted string and an exception with stacktrace.  
You can always use the following

```
logger.error(String.format("this is my %s", arg), e);
```

But as [Ceki answer in stackoverflow on how to log formatted message and exception in SLF4J](http://stackoverflow.com/a/6374166) states, it is possible with the SLF4J  
API, you simply need to pass the exception as the last argument.  

```
logger.error("this is my {}", arg, e);
```

Sometimes, you will need to cast the varargs to Object[]  

```
logger.error("this is my {}", new Object[]{ arg, e});
```

## Settings SLF4J with Logback in a Maven Project

Setting up SLF4J with Logback is quite easy.  
Similar to [Log4J settings](/2010/08/setting-up-log4j-in-maven-project.html "setting up LOG4J with Maven") we will use the resource folder here well.  
This time we will use a file named "logger.xml" which looks something like this at the root of our resources folder.  

```
<configuration>

    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- encoders are assigned the type
     ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <file>logFile.log</file>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <!-- daily rollover -->
            <fileNamePattern>logFile.%d{yyyy-MM-dd}.log</fileNamePattern>

            <!-- keep 1 days' worth of history -->
            <maxHistory>5</maxHistory>
        </rollingPolicy>

        <encoder>
            <pattern>%d{HH:mm:ss.SSS}  %-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="info" additivity="false">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </root>


</configuration>
```

You maven dependencies should look like this

```
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-api</artifactId>
    <version>1.6.6</version>
</dependency>

<dependency>
    <groupId>ch.qos.logback</groupId>
    <artifactId>logback-classic</artifactId>
    <version>1.0.9</version>
</dependency>
```

In you Java you should have the following code

```
private static Logger logger = LoggerFactory.getLogger( MyClass.class );
```

With the following imports

```
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
```

# Troubleshooting

The most famous problem with SLF4J is when you have multiple implementations available.  
In this case, it seems [there's no way to force SLF4J to use a certain implementation](http://stackoverflow.com/a/11434477/1068746 "stackoverflow question - slf4j multiple implementations") Instead you need to clean you classpath.  
In Maven, this means you need to exclude transitive dependencies ( those dependencies that originate from other dependencies ).  
So for example, if you depend on "project-X" which brings LOG4J with it, you should write the following

```
<dependency>
    <groupId>project.x</groupId>
    <artifactId>project-x</artifactId>
    <version>X.X.X</version>
    <exclusions>
        <exclusion>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
        </exclusion>
    </exclusions>
</dependency>
```

If you need to find out which dependency brings LOG4J with it, simply use "mvn dependency:tree" command to help you.  
Go to the folder with the POM, and run this command. You should get output looking like this  

```
[INFO] --- maven-dependency-plugin:2.1:tree (default-cli) @ cloudify-repository ---  
[INFO] my.project:my-project:jar:1.0-SNAPSHOT  
[INFO] +- org.springframework:spring-context:jar:3.1.3.RELEASE:test  
[INFO] |  +- org.springframework:spring-aop:jar:3.1.3.RELEASE:test  
[INFO] |  |  \- aopalliance:aopalliance:jar:1.0:test  
[INFO] |  +- org.springframework:spring-beans:jar:3.1.3.RELEASE:test  
[INFO] |  +- org.springframework:spring-core:jar:3.1.3.RELEASE:test  
[INFO] |  |  \- commons-logging:commons-logging:jar:1.1.1:test  
[INFO] |  +- org.springframework:spring-expression:jar:3.1.3.RELEASE:test  
[INFO] |  \- org.springframework:spring-asm:jar:3.1.3.RELEASE:test  
[INFO] +- org.sonatype.sisu:sisu-inject-bean:jar:2.1.1:test  
[INFO] |  \- org.sonatype.sisu:sisu-guice:jar:no_aop:2.9.4:test  
[INFO] +- junit:junit:jar:4.8.2:test  
[INFO] +- org.slf4j:slf4j-api:jar:1.6.6:compile  
[INFO] +- ch.qos.logback:logback-classic:jar:1.0.9:compile  
[INFO] |  \- ch.qos.logback:logback-core:jar:1.0.9:compile  
[INFO] \- org.eclipse.jgit:org.eclipse.jgit:jar:2.2.0.201212191850-r:compile  
[INFO]    \- com.jcraft:jsch:jar:0.1.44-1:compile     
```