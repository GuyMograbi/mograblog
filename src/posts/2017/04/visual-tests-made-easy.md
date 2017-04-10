---
title: Visual Tests Made Easy
published: 2017-04-01T22:30:00.001-07:00
layout: post.pug
keywords: nodejs, test, visual, gemini
description: Don't settle on unit test. Add visual tests to your project in a couple of minutes!
---
   
   
Testing your code is one of any project's corner stone.   
When it is an easy task, you are more likely to see it happening.   

If you used some boilerplate to kick start your project it is even likely you got a unit test setup with it.    

Overall, functional testing is pretty much covered.    

In this post, I'd like to share with you another kind of testing made easy.    
I will talk about testing your website visually as well.    
I will mention some tools and focus on one that I've used recently. 

# CSS should also be tested

You don't have to write a responsive UI to suffer from CSS issues in your project.    

CSS has some qualities that make it more likely to break, such as it being mostly global and interpreted differently between 
devices and browsers. 

The good news are that recently a lot of tools spawned that make testing your website style relatively easy!    

# Some basic concepts before we begin

In functional tests we define the expected behavior of our code and compare the actual result to the expected one.   
In some frameworks the code expresses it so well that it looks like this 


```
expect( sum(1,1) ).toBe(2)
```

As you can see, it is very easy to express the desired functional side of the code, and then assert the actual behavior. 


In visual testing, expressing the expected behavior and comparing to it is a bit more tricky. 
To express the desired look of your website you have a set of images - your baseline - in the screen size and resolution that you want.   
Then you take another screenshot of actual behavior and compare it to the baseline. 

The comparison to the baseline is usually done by comparing bits.   
But this method should be handled gently as different browsers and different devices will generate different results.   

The most common solution to solve this topic is by defining sensitivity to noise - tolerance.   
This basically means you are ok if the screenshot is a bit different (say 20% different), but not more than that.    

This is not an ideal solution but it may give you the desired results.   

Another approach is comparing small parts of the screen - for example just a single button, or just one components on the page.    
The smaller the area you test, the less noise you should get.    
The downside is that you are missing out on the entire page layout test, which is very important obviously.    

Other issues you may face is with animations and moving parts in the page.    

# Honorable Mentions 

Before I focus on a specific tool, I would like to mention some tools that I've used before and liked very much.    
You should definitely check them out too. 

## Applitools

[applitools](https://applitools.com/) is a service with a lot of benefits. 

 - It is easy to setup. It probably has an integrates with a tool you're already using. 
 - It has a very clever algorithm that can do "layout comparison" instead of "bits comparison". Thus avoiding the problem I mentioned above. 
 - You can define sections to ignore while comparing - which is awesome if you have an animated image or something. 
 
And a lot of other cool features. 

![applitools](/style/images/2017/04/applitools.gif)


## ResembleJS

[resemblejs](https://huddle.github.io/Resemble.js/) is an image comparison library.    

A lot of visual testing tools I've seen so far used it or a similar library for the comparison step of the process. 

If you're looking for flexibility and like implementing things yourself, you should definitely check this out

![resemblejs](/style/images/2017/04/resemblejs.png)

# Gemini to the rescue!

Today I want to focus with you with a cool library I found and really like.    

It is pretty simple to setup, add screen resolutions to it etc.    

Gemini basically handles most of the hassle for me and lets me concentrate on the test.   
I don't have to work hard to: 

 - Generate the test report and see failures. 
 - Organize the files to folders by resolution, test name etc. 
 - Define a new suit of tests for specific resolution/devices. 

One of the things I like most about gemini is the way it sorts the files to folder.    
In a single glance I can view all the pages in the site on all resolutions.    

This makes life much easier when we write a new page. 
 
Lets see how to set it up and use it. 

# Setting up Gemini

The documentation is pretty simple and shows the following usage (modified a bit for my own style)

 - Run these commands to install `gemini` and `selenium-standalone`

```
npm install -S gemini
npm install -S selenium-standalone
```

 - Next add the following in `package.json` `postinstall` script

```
"postinstall" : "selenium-standalone install"
```

   Make sure to run it with `npm run postinstall`

 - Add configuration for gemini in file `.gemini.js` at project root
  
```  
module.exports = {
    rootUrl: 'http://yandex.ru',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',

    browsers: {
        chrome: {
            desiredCapabilities: {
                browserName: 'chrome'
            }
        }
    }
};
```

 - Add a test in `gemini/example.spec.js`
 
```
gemini.suite('yandex-search', (suite) => {
    suite.setUrl('/')
        .setCaptureElements('.home-logo')
        .capture('plain');
});
```

 - run selenium with command `./node_modules/.bin/selenium-standalone start`
 - create a baseline image by opening another tab and running gemini `./node_modules/.bin/gemini update`
 - you should now see an image under `gemini/screens` folder.
 - now run a test against that baseline by running `./node_modules/.bin/gemini test --reporter html --reporter flat`
 
You can see that in this case, the example captures just a small part of the page.   

You can catch the entire body by simply replacing `.home-logo` to `body`   

You can also configure gemini to capture the entire page and composite the image in case elements are outside the viewport. 


 
# Let's take it up a notch

One of the main reasons I like gemini so much is because it easily lets you add more browsers and resolutions.    
Lets write a small script to allow more resolutions.

 ```javascript
const capabilities = [{browserName: 'chrome'}];
const _ = require('lodash');
const sizes = _.map({
    xxs: 320,
    xs: 450,
    sm: 600,
    md: 768,
    lg: 840,
    xl: 1024,
    xxl: 1366
}, (value, key) => {
    return {id: key, value: value};
});

// chrome all resolutions
const browsers = {};

_.each(sizes, (size) => {
    _.each(capabilities, (capability) => {
        browsers[`${capability.browserName}-${size.id}`] = {
            windowSize: `${size.value}x1080`,
            desiredCapabilities: _.clone(capability)
        };
    });
});

module.exports = {
    rootUrl: 'http://yandex.ru',
    gridUrl: 'http://127.0.0.1:4444/wd/hub',
    browsers
};
 ```

If you run the `update` command now to generate the baselines, you will see a bunch of windows popping up, all on different resolutions.   
The fact that gemini runs it in parallel is nice because you don't waste more time when you add more resolutions/browsers.
 
## There's more

The Gemini documentation is very good and covers a lot of things.    
This post covers just a small collection of their features. 

If there's anything you need, you will find it in the documentation, and if not you can always open an issue and they 
will respond. 

# Some more tips and tricks

## How to solve the comparison noise issue?

Talking with the project members they expressed their desire to have 0 tolerance in comparison.    
That meant that even a single pixel difference will cause the test to fail.   

That is the main reason why I did not use applitools - as it assumes a single set of baselines to everyone, 
and reaching that kind of tolerance in that approach is virtually impossible. 

The solution we came up with is that you will generate the baseline each time!    

If I want to test on a different machine, I'd first generate the baseline on that machine using our master branch, and then 
run the test on the new code branch. 


## What to do when the webdriver is not suitable

Sometimes you might see that all the images are blank.   
This might be because the webdriver is not updated with the browser (happens when chrome has a new version for example). 

In this case it is very likely the webdriver exists, but selenium-standalone library is not updated yet.   

You can easily override the version by defining it in a file (webdriver.config): 

```javascript
module.exports = {
  drivers: {
    chrome: {
      version: '2.28',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com'
    }
  }
};
```

and then feed this configuration file like so: 

```bash
selenium-standalone install --config=webdriver.config
selenium-standalone start --config=webdriver.config
```

## Use phantom directly

With phantom you don't need selenium. You can simply run it in webdriver mode

```bash
phantomjs --webdriver=PORT
```

# Conclusion

I don't know about you, but for me, visual testing will become part of the my project basics.   

Whether you'll decide to use Gemini or some other tool please comment below and share about your experience. 