---
title: Baby steps using webpack 
published: 2016-10-15T22:30:00.001-07:00
layout: post.hbs
keywords: webpack
description: Lets review my webpack easy setup and learn how to use webpack in the process. 
---

If you have no idea how to begin with webpack, this is the article for you. 

In this post I want to get you started with a nifty tool you probably heard about called webpack.    
By the end of the post you should have a webpack configuration for your project that knows how to handle

 - 3rd party js
 - html files
 - images
 - typescript
 - livereload on change
 
# So what is webpack and when should I use it? 

By definition webpack is a module bundler, but that doesn't necessarily says much, right?   
The list of libraries that have module bundling features keeps getting longer by the minute.     
Browserify, Rollup and Typescript are just a few in this list.   

But while each of this tools targets a specific use-case, webpack is much more general by defining an abstract interface called `loader` that we will investigate soon.   
And as such, it is a bit hard to define the limits of webpack, so I will not even try.     

I hate to tell you when to use webpack.    
Most interesting projects are ones that used some old technology in a way no one thought about before.    
So I say - if webpack can do this, use it!
 
Before we begin, lets understand what a loader is

# Meet the webpack loader

A webpack loader is simply a function the modifies the contents of a file. 
This is an example of a loader

```
module.exports = function(source) {
  return 'foo';
};
```

This loader will turn all your code to `foo`. Not practical at all, but demonstrates how to write a loader.   
Writing such a loader will produce the following output eventually 

```
function(module, exports) {
	"foo"
}
```

As you can see, it is extremely unuseful. We will write a more useful loader later on.. 

Loaders are the corner stones in webpack.   
And now that you've seen one, lets see how to use them!
 
## Loader Context

As I said, the documentation is quite poor. 
It seems `console.dir` and `Object.keys` do not reveal all as well.     
To see entire context you should go look at NormalModuleMixin.js under webpack.    
I found it after searching the library for `emitWarning` which I know was on the context 


I also recommend reading sources of other loaders as much as possible.
 
 
This is the entire context declaration as I found it 

```
var loaderContext = {
    version: 1,
    context: this.context,
    loaders: loaders,
    loaderIndex: 0,
    resource: this.resource,
    resourcePath: splitQuery(this.resource)[0],
    resourceQuery: this.resource ? splitQuery(this.resource)[1] || null : undefined,
    emitWarning: function(warning) {
        this.warnings.push(new ModuleWarning(this, warning));
    }.bind(this),
    emitError: function(error) {
        this.errors.push(new ModuleError(this, error));
    }.bind(this),
    exec: function(code, filename) {
        if(typeof __webpack_modules__ === "undefined") {
            // TODO: check if in enhanced-require
            var Module = require("module");
            var m = new Module(filename, module);
            m.paths = Module._nodeModulePaths(loaderContext.context);
            m.filename = filename;
            m._compile(code, filename);
            return m.exports;
        } else {
            throw new Error("loaderContext.exec is not supported");
        }
    },
    resolve: function(context, request, callback) {
        resolver.resolve(context, request, callback);
    },
    resolveSync: function(context, request) {
        return resolver.resolveSync(context, request);
    },
    cacheable: function(flag) {
        loaderContextCacheable = flag !== false;
    },
    dependency: function(file) {
        this.fileDependencies.push(file);
    }.bind(this),
    addDependency: function(file) {
        this.fileDependencies.push(file);
    }.bind(this),
    addContextDependency: function(context) {
        this.contextDependencies.push(context);
    }.bind(this),
    clearDependencies: function() {
        this.fileDependencies.length = 0;
        this.contextDependencies.length = 0;
        module.cacheable = true;
    }.bind(this),
    inputValue: undefined,
    value: null,
    options: options,
    debug: options.debug
};
```
 
## Using Webpack 


# References 

 - https://github.com/webpack/webpack/issues/2704
 - https://github.com/webpack/loader-utils



