---
title: playframework - Showing HTML in textarea
published: 2013-01-29T14:36:00.000-08:00
description: make html to display in textarea with playframework
keywords: playframework, html, textarea
layout: post.pug
---


Every now and then you get to show HTML in a textarea.  
A common usage for this would be to copy some HTML code you should embed in your site  

In order to show the HTML properly, you need to escape it first.  
So your code should look something like

```
<textarea><div>my div</div></textarea>
```

I write HTML in 4 environments.  

*   [Chrome](https://www.google.com/intl/en/chrome/browser/ "Chrome")
*   [Sublime Text Editor](http://www.sublimetext.com/ "Sublime Text Editor")
*   [Play 1.x](http://www.playframework.org/ "Play 1.x")
*   [Play 2.x](http://www.playframework.org/ "Play 2.x")

Each of which has a nifty way to help you escape HTML.

**Chrome** has an extension called [HTML Escape Helper](https://chrome.google.com/webstore/detail/html-escape-helper/jbecnlhnhpflhdghljloofiahhdidngj "HTML Escape Helper").  
Once you install it, all you need to do it copy paste HTML into the extension,  
and then the helper will automatically escape the HTML and place the output in your clipboard.  

**Sublime Text Editor** has a nice package called [Sublime String Encode](https://github.com/colinta/SublimeStringEncode "Sublime String Encode").  
This extension adds the command "StringEncode:HTML Entitize" that escapes the selected HTML.  
To see how you can [install extensions in your Sublime Text Editor](/2013/01/ste-installing-extensions.html "Install Extensions In Sublime Text Editor") read my post.

**Play 1.x** offers the function "raw()" to escape HTML.  
You simply write something like

```
${"<div>my div</div>".raw()}
 ```

and you get what you want.

Play 2.x is a bit trickier to understand, especially for those coming from play 1.x.  
Fortunately, the outcome is similar.  
You simply write

```
@Html("<div>my div</div>").toString()
```

What play 2.x offers that play 1.x does not is the ability to escape tag output.  
Perhaps scala templates in play 1.x allowed this as well, I don't know. Anyway, this was not supported in play 1.x default template engine.  
Since in play 2.x, tags are just scala functions, you can do just the same

```
@views.html.my.template(args).toString()
```


And you get pretty much the same result.

# Troubleshooting

Sometimes, you get weird indentation in the text area caused by newlines and spaces.  
If you see these, you should be aware that like "pre" tags, textarea keeps all newlines and spaces.  
Usually, you would start a new line after you opened a tag.  
The content within a tag is usually indented.  
These newlines and spaces are not visible once the HTML is rendered.  
However, in "textarea" and "pre" tags, you should not do so, as the newlines and spaces are kept.  

I sometimes find it most useful to write a small JavaScript function,  
using JQuery, to remove leading and trailing spaces from these tags.  
This script looks something like this:

```
$("pre").each(function(index,item){ try{$(item).html($(item).html().trim())} catch(e){ console.log(e)} });
```

This at least allows me to create a newline.  
Indentation is easily remove using `shift + tab`