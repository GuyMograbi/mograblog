I got a mission at work - to make our SWF file smaller..  

Getting rid of the "obvious" stuff like "Embedded Images" and so on - we managed to remove about 200K. but still our application was about 1.7M(!) and we were inspired to bring it down to 500K.  

So after that we turned to look on our 3rd-parties, as we have heard about RSL.  
We are using [FlexSpy](http://code.google.com/p/fxspy/) for development (like a firebug for flex - I highly recommend this).  
When you look at flexSpy.swf, you see about 800K.  
So immediately we thought that FlexSpy adds about 800K to our compiled swf. Turns out this is untrue.  
To test this, you should create a blank project that alerts "hello world!".  
When you run it, note the the SWF is already 70K.  

Now add flex spy..  
Simply write somewhere  

<pre>FlexSpy.show();  
</pre>

make sure to import the class and place the library in your path (libs folder for FBuilder).  

Rerun this and see that the SWF is not only 160K.  
So FlexSpy's SWF is 800K, but only adds about 90K to your project.  

This is probably due to common code - like the flex framework. (which is known to add a lot).  
The solution to common code is usually [RSL.](http://livedocs.adobe.com/flex/3/html/help.html?content=rsl_09.html) Which does exactly that - externalizes shared code. The benefit is of course that common code remains cached, while the application downloads (if modified) - hence the client downloads only the parts that were modified ==> optimizing the download.  

# The first thing you should do, before RSL

However, I "discovered" that before RSL you should switch "debug" to false on the compiler arguments. simply add  

<pre>-debug=false  
</pre>

We had about 1.7M output, and this reduced it to 900K. (800K reduction).  

## Side Effects

As a side effect, the debug=false caused a malfunction to the application.  
After a couple of hours of research we discovered that some of the MetaData was gone.  
It was not so obvious for us that debug=false causes this.  

The solution was simple - add the following to compiler arguments  

<pre>-keep-as3-metadata+=OurAnnotationName  
</pre>

The "+=" means we are simply adding to default settings, so no harm there.  
Also - don't be alarmed by "as3", we use flex4\.  

Once we added "OurAnnotationName" to the compiler arguments, the metadata was available again.