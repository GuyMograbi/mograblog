As I am writing new posts rapidly, I keep running into an annoying behavior.  

Code syntax may include the character '<' and '>' however these character are also used in HTML.  

When I first started combining HTML and code, I was convinced

<pre> tags will solve the problem but they didn't. So the solution is to convert manually all < character to < string. This process is known as "escaping", and for HTML it is called [HTML escaping](http://www.theukwebdesigncompany.com/articles/entity-escape-characters.php). It exists to all languages since each language has reserved words and characters.   

The most common is the "quotes" which have the backslash as an escape character, in order to enable developers to include the character " inside a string. For example if I want to write :   
The name of the book was "Mogi on Rails"  
I will write the following string  

<pre>"The name of the book was \"Mogi on Rails\""  
</pre>

Note that this causes '\' (backslash) character to be a reserved character as well, which requires another escaping. so if I wanted to escape the string above another level I would write   

<pre>"\"The name of the book was \\\"Mogi on Rails\\\"\""  
</pre>

And this keeps on and on. This is on my top 10 bug causes in an application.  

Today, I noticed a disturbing behavior in blogger draft.   

take the following code that was written correctly but unescaped:   

<pre class="java" name="code">List <string>strings;</string></pre>

If the disturbing behavior still occurs you should see an appended string which looks like this   

however I did not write it. Moreover, blogger modifies the string   

<pre>String  
</pre>

to lower case... if you already see it lowered, know I wrote it like this   

<pre>String  
</pre>

To make things clearer, or in case the disturbing behavior does not occur any more I added an image that compares the string as I wrote it with how it displayed in draft.  

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/_J3A8WqpdCX0/TFfiZxbt5_I/AAAAAAAAAkc/GDKss9gr4a4/s1600/blogger_disturbing_behaviour.png)](http://3.bp.blogspot.com/_J3A8WqpdCX0/TFfiZxbt5_I/AAAAAAAAAkc/GDKss9gr4a4/s1600/blogger_disturbing_behaviour.png)</div>

# Why CDATA causes blogger errors? 

Another expected behavior is when you try an obvious solution like adding [CDATA tags](http://en.wikipedia.org/wiki/CDATA)  

However that causes an even more annoying error   

<pre>Your HTML cannot be accepted: Tag is broken: ![CDATA[  
</pre>

Come on!   

# Using Compose Mode 

Funny enough the "best" solution is to use the Compose mode, which is a Rich Text Editor mode - that takes care of escaping for you - however, as ironic as it might seem, the audience that needs it the most, usually don't like Rich text editors, so they don't use it.   

We either manually escape character, or we can temporarily switch to "Compose" and paste the code, then go back to "Edit HTML" mode.</pre>