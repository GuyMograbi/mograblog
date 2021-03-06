---
title: Setting Logback with Play!Framework 2.0
published: 2013-03-11T06:58:00.000-07:00
description: setting logback with playframework
keywords: logback, playframework
layout: post.pug
---

Last time I wrote about [how to setup a Maven Project with SLF4J using Logback](/2013/03/slf4j-with-logback-in-maven-project.html "how to setup a Maven Project with SLF4J using Logback").
In this post I will explain how to do the same for Play!Framework 2.0.  

## Steps to add Logback and SLF4J - DO NOT DO ANYTHING, it is already there

Well, the thing with Play!Framework is that you usually don't need to do anything, as most of it is already there.  
So it SLF4J and Logback.  
However...  
There are a lot of troubleshooting.  

## Settings a logger.xml

In this post I will show how to set up Logback in Play!Framework 2.0 using a logger.xml file.  
All Play has to say about it is in the `application.conf` file, a line specifying

```
# You can also configure logback (http://logback.qos.ch/), by providing a logger.xml file in the conf directory .
```

To get things going, all you need to do is place a logger.xml file under `conf` folder.
A basic logger.xml file looks like so (we will see soon that for Play!Framework this is not enough):

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
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>

    <root level="info" additivity="false">
        <appender-ref ref="STDOUT"/>
        <appender-ref ref="FILE"/>
    </root>


</configuration>
```

# Troubleshooting

## No log prints in windows

In Play!Framework 2.0.4, for some reason, windows did not get the log prints.  
To resolve this you need to add an explicitly declare the logger.xml location like so :

```
play -Dlogger.file=conf/logger.xml run
```

Note that if you want to debug, you will have to write the following

```
play debug -Dlogger.file=conf/logger.xml run
```

important to place it before the -D flag.

# Still no log prints - OR - Log level is incorrect

Looking in `application.conf` you will see the following properties

```
logger=INFO
logger.application=DEBUG
logger.play=INFO
```

Or something of that sort..  
Since you will configure your logger from `logger.xml` file, you need to switch these off.

```
logger=OFF  
logger.application=OFF  
logger.play=OFF  
```

And then redefine this in your logger.xml like so

```xml
<logger name="application" level="info" additivity="false">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
</logger>

<logger name="play" level="INFO" additivity="false">
    <appender-ref ref="STDOUT"/>
    <appender-ref ref="FILE"/>
</logger>
```

Now, you should see the prints appear only once which is just as you would expect.  
