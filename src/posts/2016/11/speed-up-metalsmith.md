---
title: Speeding up metalsmith with incremental builds
published: 2016-11-7T22:30:00.001-07:00
layout: post.pug
keywords: nodemon, mograblog, metalsmith
description: See how I took my metalsmith build from 7 seconds to less that 500ms !
---



I love metalsmith. Since I transitioned to it I write more on my blog.    
The only thing that annoyed me is that it became a bit slow.     
I found myself waiting several seconds between changes.    
So yesterday I decided to do something about it and I reached to a 500ms build on change.    
I'd like to share with you what I did. 

If you are here, but you are unfamiliar with metalsmith, you should go ahead and read [my previous post on the topic](/2016/07/move-your-blog-from-blogger-to-metalsmith-today.html). 

# Use metalsmith-timer to find the bottleneck

First I had to see what was causing the delay.   
I use [metalsmith-timer](https://www.npmjs.com/package/metalsmith-timer) to see why the build is taking too long

To add it to your project you need to do the following

 - Run `npm install -S metalsmith-timer`
 - add to your script `var timer = require('metalsmith-timer');`
 - Add `.use(timer(...label...))` between plugin invocations
 - Modify `npm` `build` script to include `DEBUG=metalsmith-timer`
 ```
 "build": "DEBUG=metalsmith-timer node metalsmith.js",
 ```
 
This will generate a very nice output like this 

```
  metalsmith-timer init +0ms
  metalsmith-timer drafts +1ms
  metalsmith-timer addFilePath +0ms
  metalsmith-timer collections +8ms
  metalsmith-timer ensure-frontmatter +9ms
  metalsmith-timer keyword +0ms
  metalsmith-timer shortcodes +3ms
  metalsmith-timer markdown +57ms
  metalsmith-timer headings-identifier +193ms
  metalsmith-timer excerpts +69ms
  metalsmith-timer move-up +7ms
  metalsmith-timer handlebars +7s
  metalsmith-timer sass +32ms
  metalsmith-timer rss-all +7ms
  metalsmith-timer rss-javascript +3ms
  metalsmith-timer sitemap +30ms
  metalsmith-timer copy +2ms

```


So as you can see I have quite a lot of steps.    
But the one I need to focus on to speed up my process was `handlebars`.   
The way for me to reduce the amount of time spent on handlebars was to only process the modified files. 

At first I tried using [metalsmith-updated](https://www.npmjs.com/package/metalsmith-updated) which has a very simple setup and gives good result.   
The handlebars task was not taking 7 seconds anymore.   
But now I had another task to calculated updated files, which took about a second.. and I knew I can do better, and I had to go for it.. 

# In comes chokidar

The reason why `metalsmith-updated` was taking too long is because it had to check on each file if it is modified.   
But.. that's exactly what `watch` is doing.   
 
So far I've been using [metalsmith-start](https://github.com/rstacruz/metalsmith-start) to trigger rebuilds on change.   
But the way it is implemented, it is doing full builds each time.   

So I decided to implement it myself using one of my most favorite libraries ever [chokidar](https://github.com/paulmillr/chokidar).   
You probably know [nodemon](https://github.com/remy/nodemon) - which uses chokidar as well.. 
   
Chokidar will trigger an event whenever a file changed.  
 
 
```

var app = new Metalsmith ... 


... 

     // lets filter all unmodified files..
     // we only reference markdown files, because they are the bottleneck

  .use((pages) => { // remove all pages but what we need
    if (modifiedFiles !== null && modifiedFiles !== false) {
      console.log('modified files are', modifiedFiles)
      _.each(pages, (page, filepath) => {
        if (modifiedFiles.indexOf(filepath) < 0 &&
          filepath.indexOf('.md') > 0 &&
          filepath.indexOf('index.md') < 0) {
          delete pages[filepath]
        }
      })
    }
  })


...

function buildApp () { // execute the metalsmith build. report problems and reset watcher if exists
  app.build((err) => {
    if (err) throw err
    if ( modifiedFiles !== null ){
      modifiedFiles = []
    }
  })
}

buildApp(); // first build. 
if (process.env.WATCH) { // register to file changes and trigger build on change.
  var chokidar = require('chokidar')
  var triggerBuild = () => {
    modifiedFiles = _(modifiedFiles)
      .map((f) => { // metalsmith expects paths to be relative to src folder
        return path.relative(path.join(__dirname, 'src'), f)
      }).value()
    if (modifiedFiles.length > 0) { // don't trigger build if nothing changed and watching
      buildApp()
    }
  }

  var watcher = chokidar.watch(['src', 'layouts', 'partials', 'plugins'])
  var triggerBuildDebounced = _.debounce(triggerBuild, 100) // use debounce if many changes occurred. 
  watcher.on('change', (file) => { // register modified files, they will be referenced during the build
    if (modifiedFiles === null) { 
      modifiedFiles = []
    }
    modifiedFiles.push(file)
    triggerBuildDebounced()
  })
}
```   

The snippet above is the general idea. You register to changes, remember the modifications and during the build modify metalsmith to only include the modified files.
 
## What is left? 

So now that we are processing only the modified files, some tasks may start to fail.    
For example [metalsmith-rss](https://github.com/MoOx/metalsmith-rss) throws exception if it cannot find pages that match its criteria.   

You can quickly modified it to execute only if relevant.    
In this example, I will generate an RSS feed for my JavaScript articles only if the collection is not empty.    

```
 .use(function (pages, metalsmith, done) {
    const metadata = metalsmith.metadata()

    if (!!metadata.collections && metadata.collections.javascriptArticles && metadata.collections.javascriptArticles.length > 0) {
      rss({
        collection: 'javascriptArticles',
        destination: 'javascript-rss.xml',
        feedOptions: {
          title: 'Mograblog',
          site_url: 'http://www.mograblog.com'
        }
      })(pages, metalsmith, done)
    } else {
      done()
    }
  })
```
   
And that's it.. 

## Serving the files 

`metalsmith-start` used to also serve the files.   
To replace it use `lite-server` and tell it that metlamisth's destination folder is its base directory. 

## Conclusion and taking the next step
 
This idea can be extended easily by wrapping the chokidar code to a reusable function that executes metalsmith's build directly.   
We can also expose a plugin to metalsmith that filters pages. 

The effort was only a couple of hours and the result is awesome.    
It would probably take me less time if I followed a post like this one.   

Speeding up the cycle between applying a change and seeing the results enables me to try out more options.   
If I had to wait 8 seconds between each CSS change, I'd avoid making such changes, but now I don't have to. 

Using `metalsmith-timer` really helped me monitor my progress and keep me focused.    
Without it, I could not have made the choice to only filter out markdown files and make my life easier as I wouldn't have known the saas plugin is really quick.    

Don't forget to leave comments and share if you liked the post. 
