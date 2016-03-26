---
title: "When Play Framework 2.X Sass plugin says 'Sass compiler: ruby.exe: No such file or directory -- project_root/sass (LoadError)'"
published: 2013-10-21T00:51:00.000-07:00
description: troubleshoot sass compiler in playframework
keywords: sass, playframework
layout: post.hbs
---


# The Problem

Running Play!Framework (I am using 2.0.4) with Sass plugin throws a `LoadError` message.  

```
Sass compiler: ruby.exe: No such file or directory -- project_root/sass (LoadError)
```

## About Sass Plugin

[Jlitola's Play!Framework SASS plugin](https://github.com/jlitola/play-sass) is a nifty piece of code that enables SASS in your Play!Framework project.  
It requires that Ruby and SASS would be already installed on your computer.  
The SASS gem creates to files in your `RUBY_HOME\bin` folder.  
The first is `sass.bat` (for windows) and the other is `sass` which is the gem implementation in Ruby. This is a Ruby file.  

## Proper Folder Structure in Play Project

This plugin expects you to have `scss` files under your

```
app/assets
```

directory, and it will copy them under

```
public
```

directory.  
I write my scss files under

```
app/assets/styles
```

and so the plugin outputs them under

```
public/styles
```


I can then link them in my HTML with the path

```
/public/styles
```

## What does the error mean?

It seems that Ruby is trying to find the SASS gem file in your project's root folder.  
People might think it is looking for a folder since the error says

```
No such file or directory
```

and it is easier to create a directory - is it not?  

## A Work-Around

A quick work around would be to copy that `sass` file to your project's root folder.  
This does not resolve the problem that Ruby is looking for that file there instead of under Ruby's bin directory, but it will enable you to work on your project.

## Reference

*   [My Question in Stackoverflow](http://stackoverflow.com/q/19091096/1068746 "My Question in Stackoverflow")
*   [A Question about this in Google Groups - scroll down to see my answers](https://groups.google.com/d/msg/play-framework/j1npLLQlj1o/POOlePhJv1QJ "Google Groups Question")

