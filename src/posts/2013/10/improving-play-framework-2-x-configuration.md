---
title: Improving Play!Framework 2.x Configuration 
published: 2013-10-14T14:19:00.000-07:00
description: lets make playframework more configurable
keywords: playframework
layout: post.hbs
shortcodes: true
---


Play!Framework 1.0 had a nasty configuration mechanism.  
To make a long story short - it was a properties file.  
Play!Framework 2.0 came out, and even though the configuration section  
got some big improvements, there are still things that annoy me.  
In this post I will show you what annoys me and how to resolve it.  

[#alert-info]
This post refers to Play!Framework 2.0.4.
Play!Framework 2.X is still growing and changing, so this might not be relevant for the latest version.  
However, the general concept is very useful and can be applied to almost every software.
[#/alert-info]

## The Pros

Play!Framework uses typesafe configuration library.  
Basically this library, written in scala - so we will see some scala object conversion soon  
lets you write in `HOCON` syntax which is a combination of key-value and JSON-like syntax.
It also allows you to import other configuration files and override values.  

## The Cons

With all the nice features,  
the API play provides is pretty disappointing.  
For example, this is how you get a boolean

```
Play.current().configuration().getBoolean("isNiceApi");
```

There are several things I do not like in this API

*   It requires hard-coded strings - and no, final static String with CAPITAL_LETTERS is even uglier..
*   `Play.current().configuration()` is simply ugly and too coupled to Play.
*   `getBoolean` is better than `(Boolean)Play.conf.get("key")` but still ugly

Ugly in computers means that the more you use it, the more you work..  

## Fast Way To Go Around Ugly API - Wrappers

If you do not wrap this API, you either have a really small application (which is no excuse)  
or you are a novice developer.  
( Or you are an evil developer, but then you would not be reading this blog.. )  
So, lets say we have a configuration that includes

*   Timeout
*   Support Email
*   New Feature On/Off

A wrapper would look like this Pseudo-Code

```
public class ConfWrapper{  

    public Configuration getConf(){  
        return Play.current().application().configuration()  
    }  

    public long getTimeout(){  
        return getConf().getLong("timeout");  
    }  

    public String getSupportEmail(){  
        return getConf().getString("supportEmail");  
    }  

    public boolean isNewFeatureOn(){  
        return getConf().getBoolean("newFeatureOn");  
    }  

}              
```

This is nice, but not practical.  

## Why Wrapper Is Not Practical?

*   You work hard
*   I access `Play.current().application().configuration()` every time instead of caching values
*   No default value support - Number 1 problem in my opinion

You could work harder to get the above features..  
But let me show you a very simple solution to get it all and more..

## Wish List

I want the code to look like this

```
public class ApplicationConf{  
    public long timeout = 10000; // 10 seconds  
    public String supportEmail = "support@example.com";  
    public boolean newFeatureOn = true;  
}          
```

This is not a joke - this class will include the values from the properties file once we are done.  
This is my design :)  
and that's it!!! Can you believe it? Well, you should not because we will have another line of code when Play application starts  
Lets see how it is done.

## Implementing Our Design

To implement our design, all we need is to initialize our configuration class.  
Lets call that class `ConfigurationInitializer` (brilliant!)

```
public class ConfigurationInitializer {  

    private static Logger logger = LoggerFactory.getLogger(ConfigurationInitializer.class);  
    private final Application application;  

    public ConfigurationInitializer(Application application) {  
        this.application = application;  
    }  

    public <t> T populate( T confObj ){  
        try{  
        Set <field>allFields = ReflectionUtils.getAllFields(confObj.getClass(), Predicates.alwaysTrue());  
        for ( Field f : allFields ){  
            logger.info( "initializing [{}#{}]", confObj.getClass().getSimpleName(), f.getName());  
            if (application.configuration().keys().contains(f.getName())) {  

                if (Boolean.class.isAssignableFrom(f.getType())) {  
                    f.set( confObj, application.configuration().getBoolean(f.getName() ));  
                } else if (String.class.isAssignableFrom(f.getType())) {  
                    f.set( confObj, application.configuration().getString(f.getName() ));  
                } else if (Long.class.isAssignableFrom(f.getType())) {  
                    f.set( confObj, application.configuration().getMilliseconds(f.getName() ));  
                }  
            }  
        }  
        return confObj;  
        }catch(Exception e){  
            logger.error("unable to populate configuration",e);  
            throw new RuntimeException("unable to populate configuration",e);  
        }  
    }  
}
```

## This is pretty Naive

The above implementation is pretty naive but(!) still much better than a wrapper  
The only thing left is to execute this code.  
If you add a class named `Global` to Play!Framework (under the app folder, no package)  
Play provides global hooks you can use to initialize this configuration.

```
public class Global extends GlobalSettings {  
    private static Logger logger = LoggerFactory.getLogger(Global.class);  
    @Override  
    public void onStart(Application application) {  
        logger.info("loading configuration");  
        ApplicationConfiguration conf = new ConfigurationInitializer( application ).populate( new ApplicationConfiguration() );  
        logger.info(Json.stringify(Json.toJson(conf)));  

        super.onStart(application);  
    }  
}  
```

The above code currently prints the configuration to the console.  
To override the values in the object, all you need to do is have keys that match the fields' name.  
For example

```
timeout=5000  
supportEmail=noreplay@example.com  
newFeatureOn=false          
```

Now, all you need to do is save some reference this configuration object which will be reachable to you.  
You can use a static field, a singleton pattern.  
I use Spring - which is basically the singleton pattern.  

## What Now?

Next post I will show you how to write the code above in a better more modular/generic way  
and we will add some small stuff to make this algorithm much more configurable and powerful.  
For example:

*   Support nested configuration objects
*   Support lists!!! - Did you know Play!Framework 2.0.4 does not support list in configuration even though typesafe does?
*   Override the configuration key

</div>