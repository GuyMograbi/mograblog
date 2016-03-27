---
title: My list of useful Intellij Live Templates
published: 2012-02-14T06:03:00.000-08:00
keywords: intellij
description: some live templates i found useful
layout: post.hbs
---

  
I like Intellij's "live templates" feature and I try to use it as much as possible.  
Here some live templates I just can't do without.  

<dl>
<dt>cdata</dt>
<dd>
`<![CDATA[ $TEXT$ ]]> $END$` <br/>
assign to XML context.
</dd>



<dt>debugger</dt>
<dd>
`debugger; /**nocommit**/` <br/>
assign to Javascript. the "nocommit" is a precommit hook I have that makes sure it won't be committed.
</dd>



<dt>logger</dt>
<dd>
`private final static Logger logger = logger.getlogget($CLZZ$.class);` <br/>
CLZZ is an Expression "className()" and I skip it if defined. ( This way there's usually nothing to edit ).
Assign it to Java code.
</dd>


<dt>method</dt>
<dd>

`$METHOD$`<br/>
METHOD is the expression "methodName()" and skipped if defined.
Assign it to Java String. It is helpful to add the method name in log prints.
</dd>

<dt>single</dt>
<dd>
`$ACCESS$ static final $CLASS$ instance = new $CLASS$();`<br/>
ACCESS has a default value of 'public', and CLASS is "className()". (not skipped if defined).
Assign it to Java code.
</dd>
</dl>

