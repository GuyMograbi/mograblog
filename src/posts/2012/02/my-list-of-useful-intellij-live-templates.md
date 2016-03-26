---
title: My list of useful Intellij Live Templates
published: 2012-02-14T06:03:00.000-08:00
keywords: intellij
description: some live templates i found useful
---

  
I like Intellij's "live templates" feature and I try to use it as much as possible.  
Here some live templates I just can't do without.  

<style>.live_templates dt { font-weight:bold; padding-top:20px; } .live_templates dd { background-color:#CECECE; padding:10px; }</style>

<div class="live_templates">

<dt>cdata</dt>

<dd>

<pre> $END$</pre>

</dd>

assign to XML context.  

<dt>debugger</dt>

<dd>

<pre>debugger; /**nocommit**/ </pre>

</dd>

assign to Javascript. the "nocommit" is a precommit hook I have that makes sure it won't be committed.  

<dt>logger</dt>

<dd>

<pre>private final static Logger logger = logger.getlogget($CLZZ$.class);</pre>

</dd>

CLZZ is an Expression "className()" and I skip it if defined. ( This way there's usually nothing to edit ).  
Assign it to Java code.  

<dt>method</dt>

<dd>

<pre>$METHOD$</pre>

</dd>

METHOD is the expression "methodName()" and skipped if defined.  
Assign it to Java String. It is helpful to add the method name in log prints.  

<dt>single</dt>

<dd>

<pre>$ACCESS$ static final $CLASS$ instance = new $CLASS$();</pre>

</dd>

ACCESS has a default value of 'public', and CLASS is "className()". (not skipped if defined).  
Assign it to Java code.</div>