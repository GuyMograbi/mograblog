---
title: Open Files From Console With Sublime
published: 2012-11-20T07:52:00.000-08:00
description: shorten sublime command for easy command line use
keywords: sublime
---

<div dir="ltr" class="mograblog" style="text-align: left;" trbidi="on">

# Introduction

[Sublime Text Editor](http://www.sublimetext.com/) is a great new text editor.  
Its motto is "The Text Editor You'll Fall In Love With" and indeed I did.  
I have been a notepad++ user for a long time, but I think I will make the switch.  
I find it so useful, I am even writing this very post in sublime.  
Later I will copy-paste the content to Blogger.  
Wouldn't it be great to have [an add-on to sublime](http://sublimetext.info/docs/en/extensibility/plugins.html) though that would work with Blogger?

One thing I think you have to know before starting to use Sublime is the shortcut <kbd>CTRL+SHIFT+P</kbd> which simply opens the command palette.  
When you start off you get a nice set of commands in the palette  
However, I could not find a command to install more plugins  
For that, I had to [install Package Control](http://wbond.net/sublime_packages/package_control/installation) first.  
After that, it is a piece of cake. I has a nice integration with [Github](https://github.com/) too.  
By the way - spell check is not in the command palette. To toggle spell check you need to press <kbd>F6</kbd>.  

One last thing I had to do was to make Sublime available from command line.  
I just could not do without the option to type

<pre>sublime guy.txt</pre>

and get the Sublime open with this file.  
Since I work in Windows, it was not as easy as one might think.  
I added the "Sublime Text Editor" to my Path system variable.  
But the command said "sublime_text" and I just couldn't bring myself to write this every time.  
I activated the console as Administrator.  
I went to the Sublime installation folder and wrote

<pre>  
   echo sublime_text %* > s.bat  
  </pre>

This allowed me to write

<pre>  
   s guy.txt  
  </pre>

</div>