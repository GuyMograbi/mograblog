---
title: Configuration Module for NodeJS
published: 2013-10-28T02:45:00.000-07:00
description: write your own configuration module in play with couple lines of code
keywords: node, nodejs
layout: post.hbs
---


NodeJS is great but it lacks settings/configuration mechanisms.  
Actually - I understand why it lacks it - configuration nowadays is written in JSON anyway.. so in node you just import it..  
But there are some features you still want/need that do not exist yet.  

## Missing Features

*   Overriding with another JS file  
    This means I want the same syntax to override the configuration. Some libraries suggest command line flags.. I do not like it.
*   Front-end support  
    I want to change configuration in a single place, and I want to be able to configure by front-end as well.
*   Fail to load if a required configuration is missing

## Implementation

```
var publicConfiguration = {
    "title": "Hello World"  
    "errorEmail": "null" // don't send emails if null  

};  

var privateConfiguration = {  
    "port":9040,  
    "adminUsername": undefined,   
    "adminPassword": undefined  
}          

var meConf = null;  
try{  
    meConf = require("../conf/dev/meConf");  
}catch( e ) { console.log("meConf does not exist. ignoring.. ")}  

var publicConfigurationInitialized = false;  
var privateConfigurationInitialized = false;  

function getPublicConfiguration(){  
    if (!publicConfigurationInitialized) {  
        publicConfigurationInitialized = true;  
        if (meConf != null) {  
            for (var i in publicConfiguration) {  
                if (meConf.hasOwnProperty(i)) {  
                    publicConfiguration[i] = meConf[i];  
                }  
            }  
        }  
    }  
    return publicConfiguration;  
}  

function getPrivateConfiguration(){  
    if ( !privateConfigurationInitialized ) {  
        privateConfigurationInitialized = true;  

        var pubConf = getPublicConfiguration();  

        if ( pubConf != null ){  
            for ( var j in pubConf ){  
                privateConfiguration[j] = pubConf[j];  
            }  
        }  
        if ( meConf != null ){  
              for ( var i in meConf ){  
                  privateConfiguration[i] = meConf[i];  
              }  
        }  
    }  
    return privateConfiguration;  

}  

exports.sendPublicConfiguration = function( req, res ){  
    var name = req.param("name") || "conf";  

    res.send( "window." + name + " = " + JSON.stringify(getPublicConfiguration()) + ";");  
};  

var prConf = getPrivateConfiguration();  
if ( prConf != null ){  
    for ( var i in prConf ){  
        if ( prConf[i] === undefined ){  

            throw new Error("undefined configuration [" + i + "]");  
        }  
        exports[i] = prConf[i];  
    }  
}  

return exports;  
```

## Explanations

<dl>

<dt>**sendPublicConfiguration**</dt>

<dd>a route to send the public configuration that can be exposed in the front-end.
You should write something like

```
app.get("/backend/conf", require("conf.js").sendPublicConfiguration);
```

and then you can get the configuration by importing a scriptThe name decides the global variable name that will include the configuration.</dd>

<dt>**undefined**</dt>

<dd>Means a configuration is required</dd>

<dt>**null**</dt>

<dd>Means the configuration is optional</dd>

<dt>**myConf**</dt>

<dd>The overrides file. The code above assumes it is under `app` folder and that meConf is under `conf/dev` folder. You can easily change that so you can pass the overrides path when you require the module.</dd>

<dt>**Overrides logic**</dt>

<dd>Private configuration simply takes all values from public configuration and then uses meConf for overrides.  
Public configuration filters meConf and overrides only keys it already has.  
This way we make sure nothing private is exposed.  
</dd>

</dl>

## Environment Support

Some people find it nice if they can run node with a flag stating if they are running in production or development.  
I am not one of those people.  
However, my code answers their needs as well.  
You can have multiple meConf.js file

```
meConf.production.js  
meConf.development.js  
```

and so on, and import the right one using the environment flag.  

You can also have a single meConf file which has fields for production, development and such and invoke the same logic.

```
meConf = require("../conf/dev/meConf")[environmentFlag];
```

Use it as you see fit.
