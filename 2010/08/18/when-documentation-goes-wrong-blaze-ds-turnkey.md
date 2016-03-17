Trying to learn BlazeDS, I am unable to get past the installing documentation stage.  
So here are rules as to "what not to do when documenting".   

# Downloading

Each page I found that detailed the turnkey download (as containing tomcat etc..) didn't have a link, or had a broken link.  

For example - [Google's first result for searching blazeds-turnkey](http://opensource.adobe.com/wiki/display/blazeds/Release+Builds).  

Why do I have to download 40MB tomcat for a lame war? was it too hard to write another packaging ant target??  

# Bad naming

if you have an examples file/folder, don't call it examples.. call it artifactname-examples.  

looking into blazeds content - we have samples.war.. I am NOT going to place this in my tomcat.. I will rename this to blazeds-samples. is it so hard?  
technically it shouldn't bother anyone, unless references to this - meaning, if someone had an image for example referencing to /samples/myimage.gif - then the link will be broken due to rename. However, since this specific case is "samples" - no one should be pointing to it.  
if it was "core.war" I'd probably won't change it even though I want to - since it is likely there are references to core from other wars (see next item on this list).  

# Multiple Wars

Why 3 WARS?  
Am I obligated to have 3 WARS from now on just to use blazeds?  
NO! So why 3 WARS? really..  

Samples, should be as simple as possible. - at least "turnkey" that claims to be a "getting started" session. 3 WARS is not "getting started"..  

# Database Connection

The only "example" tutorial I can think of that needs a DB connection, is a DB component like Hibernate. All other "examples" in the world should be simple enough to use "HashMap".  

BazeDS - Did you write a new ORM model layer? no? than why do I have to "start samples db" before I look at the examples?  

# Bad Code

Last, but not least.. after you finally got the examples running.. you should NEVER get an exception, unless it is demonstrating an example.  
Do whatever you need to avoid it, however, if an exception happens, show it to the user so it will be clear to him the example is not working.  

A request URL will look like this.  

<div style="font-family: " courier="" new",courier,monospace;"="">http://my_host/my_context/rest_of_path</div>

If you are referring to a resource in the same context and host, you should start the reference with a simple "/". however, if you for some reason need to fill in the context and the host, you can always extract that information from the request details. (lots of documentation for this, so I won't elaborate)  

This way - if someone cleverly renamed your WAR, you code will keep on working.  

Unlike the blazeDS samples war that threw his hidden error to firebug console :  

http://localhost:8080/samples/messagebroker/amfpolling   404 no found  

Which clearly happened due to my WAR rename.   

# Conclusion

When writing a "getting started" examples documentation  :  

*   keep it as simple as possible both code-wise and installation-wise. 
*   try to stick to the basics and not do redundant samples like DB connection (unless your module has no meaning without a DB like Hibernate).
*   Write good and clear code - this is a sample(!) so it should be too complex a code to write it safe. 

*   This includes giving meaningful names to files/folder/classes/function etc.. 

*   Make sure the client understand what happens - especially if the example went wrong. Again, this should be a simple code, so this should be so hard to implement. 
*   If possible - make source visible from within the example. 

*   The best thing would be to allow the user to modify the source at run-time, but for some cases, like blazeDS it is impossible. However a good example is www3.schoool's "try-it-yourself" examples. take a look in this [border-collapse try it yourself](http://www.w3schools.com/css/tryit.asp?filename=trycss_table_border-collapse)