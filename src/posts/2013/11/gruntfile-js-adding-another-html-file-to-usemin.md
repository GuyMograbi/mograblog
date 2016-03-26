---
title: Gruntfile.js - adding another HTML file to usemin
published: 2013-11-04T22:34:00.000-08:00
description: how to use usemin and grunt
keywords: grunt, usemin
layout: post.hbs
---

Recently I started using node and with it yo, grunt and bower. It is nice to get a quick kickstart. But now when I have to add/modify something in the build process, I get stumped a lot.

You usually have a single base html file called `index.html`  
and then you have Angular with ng-view to change content  
thus generating a Single Page Application.  

However, I always find it necessary to have error pages which are self contained,  
which means `index.html` is not involved.  

While yo's generators take care of `index.html`, your error page does not load correctly.  
The reason for this is the `usemin` task in grunt which turn your  
`href` attributes to point to the minified version of the file.  
For example, if `index.html` has the following in the header

```
<link rel="stylesheet" href="styles/main.css">
<link rel="stylesheet" href="styles/page1.css">  
```

grunt usemin will turn it into this

```
<link rel="stylesheet" href="styles/1b62fe48.main.css">
```

note that page1 is not included in the output, and that is because the new `main.css`  
contains them both.  

So the question is what should I do if I have index2.html.  
How would I get it to work here too.  

## Solution

The trick is to look at useminPrepare which by default looks like so  

```
useminPrepare: {
    html: '<%= yeoman.app %>/index.html',  
    options: {  
        dest: '<%= yeoman.dist %>'  
    }  
},    
```

If you modify the HTML field to include some other file, that file will be picked to the build process too.  
You do that by simply turning that field into an array like so:

```
useminPrepare: {
    html: ['<%= yeoman.app %>/index.html','<%= yeoman.app %>/index2.html'],  
    options: {  
        dest: '<%= yeoman.dist %>'  
    }  
},    
```

Assuming your `index2.html` has something similar to `index.html`

```
<link rel="stylesheet" href="styles/main2.css">  
<link rel="stylesheet" href="styles/page2.css">  
```

it will get picked up and processed accordingly.  
