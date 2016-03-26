---
title: Python Hands on - The Pickle Problem
published: 2011-05-30T03:47:00.000-07:00
description: using pickle in python
keywords: python, pickle
---

<div dir="ltr" style="text-align: left;" trbidi="on">

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/-igKVD-8DeZI/TeN1pX4VLdI/AAAAAAAAA1w/K7i4vz7Joa0/s1600/python-logo-glassy_ori.png)](http://3.bp.blogspot.com/-igKVD-8DeZI/TeN1pX4VLdI/AAAAAAAAA1w/K7i4vz7Joa0/s1600/python-logo-glassy_ori.png)</div>

I recently learned how to write to a file in Python, and among it how to use Object Serialization library called "pickle".  

According to [Documentation](http://docs.python.org/tutorial/inputoutput.html#the-pickle-module) it should be quite easy  

<pre>pickle.dump(x, f)  
x = pickle.load(f)  
</pre>

What the documentation does not tell you is that you need to open the file with a "binary" flag.  
So some of you might get  

<pre>write() argument 1 must be str, not bytes  
</pre>

All you need to do is add  

<pre>f = open("myFile","wb")  
</pre>

The "b" character, tells python to open the file in a binary mode.  
Same for reading! So if you are getting  

<pre>read() from the underlying stream did notreturn bytes  
</pre>

make sure you did  

<pre>f = open("myFile","rb")  
</pre>

If some of you are getting  

<pre>TypeError: file must have a 'write' attribute  
</pre>

This means you sent the argument in a wrong order. Note the signature of "dump"  

<pre>def dump(obj, file, protocol=None, *, fix_imports=True):</pre>

Make sure that you first send the object, then the file.</div>