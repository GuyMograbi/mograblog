<div class="separator" style="clear: both; text-align: center;">[![](http://www.playframework.org/images/play.png)](http://www.playframework.org/images/play.png)</div>

WOW! do I have a bug for you!  
A while back I started a new job, and the project I am currently working on uses [Play Framework!](http://www.playframework.org/) - which is a Rails like implementation in Java.  
Since I already knew Rails, Play came very natural to me. However, I came across an error that only a month and a half later I found the cause to - purely by accident.. I forgot a breakpoint and I was debugging something entirely unrelated, when suddenly it popped right in front of me.  

# The Error

I got the following error  

<pre name="code" class="java">Oops: IllegalArgumentException  
An unexpected error occured caused by exception IllegalArgumentException: argument type mismatch  
>  
play.exceptions.UnexpectedException: Unexpected Error  
        at play.mvc.ActionInvoker.invoke(ActionInvoker.java:300)  
        at Invocation.HTTP Request(Play!)  
Caused by: java.lang.IllegalArgumentException: argument type mismatch  
        at play.utils.Java.invokeStatic(Java.java:129)  
        at play.mvc.ActionInvoker.invoke(ActionInvoker.java:163)  
        ... 1 more  

</pre>

It doesn't get any more general that that. If you don't see anything on the browser, always look in the console.  

What naturally occurred to me was "argument type mismatch ==> I have a problem with url mapping to a function signature". Well, not at all.. At some point I found a pattern, which can only mean that a certain flow can cause this. Once I accidentally found that flow, problem was quickly solved.  

# The Solution

It turns out that if you wrap the correct code correctly with try/catch you can finally see the causing exception, which says this :  

<pre>java.lang.IllegalAccessException: Class play.classloading.enhancers.PropertiesEnhancer$FieldAccessor can not access a member of class com.name.XXX$1 with modifiers "public"  
</pre>

the com.name.XXX is a fake class name.  
The important part of the message is $1 and "can not access a member with modifier public"..  

Every 6 years young kid knows that you can access a public field. So what is the problem?  

## Reproducing

The problem is with a code that looks like this in play  

<pre name="code" class="java">....  

MyDoer doer  = new MyDoer;  

public static void myFunc(){  

      doer.doSomething(new IResultListener(){  
                   public String result;  
                   @Override   
                   public void handleResult(String str){  
                          result = str;  
                    }  

             }  

}  

...  

</pre>

Where doer can do whatever it likes...  
The "public String result" is not accessible for some really odd reason.  
This is of course a bug in Play Framework.  

## Code Modifications

In order to get rid of this error, all you should do is make that anonymous class a "named class" or not-anonymous class.  

# Afterthought

As I am writing this post, I wrote the sample code above.. it seems that if you handle your exceptions correctly, you will see the error as it happens.  

Here is the picture of the error that I saw in reproduction :  

<div class="separator" style="clear: both; text-align: center;">[![](http://1.bp.blogspot.com/_J3A8WqpdCX0/TGL7v6N5isI/AAAAAAAAAmc/K_0KJtKxUmw/s320/bug_play_frmwrk.png)](http://1.bp.blogspot.com/_J3A8WqpdCX0/TGL7v6N5isI/AAAAAAAAAmc/K_0KJtKxUmw/s1600/bug_play_frmwrk.png)</div>

## This lead me to think.. hmmm.. we have another bug!!!

Obviously, if the simplest reproduction gives me an exception and my application gets another exception, there's another problem with my application.  

Remember, the original exception was :  

<pre>Caused by: java.lang.IllegalArgumentException: argument type mismatch  
</pre>

Since I solved the previous bug, I had to reproduce this one in another way.  
Thank god for my persistence with reproducing, because the problem popped right away.  

At first I tried to write  

<pre>throw new RuntimeException("myException");  
</pre>

however this did not reproduce the problem.  
Now remember the exception I found today said  

<pre>java.lang.IllegalAccessException</pre>

So I tried writing  

<pre>throw new IllegalAccessException("myException");  
</pre>

because this HAD to reproduce the problem.. no other option is available.  
BUT THEN! the IDE told me I have a compilation error (good sign) because IllegalAccessException is not a RuntimeException!!!!!!  

And this is the answer I was looking for.  
Someone wrote a function expecting a RuntimeException but instead got an Exception (or to be more specific IllegalAccessException) which does not extend RuntimeException.  

Since I know play and the source so far, I had a lucky guess.  
You can write a [@Catch function](http://www.playframework.org/@api/play/mvc/Catch.html) - that catches all the errors in the application.  

I found the following signature  

<pre name="code" class="java"> @Catch(value={Exception.class})  
    protected static void incapCatch( RuntimeException e )  
</pre>

Which is EXACTLY what I was looking for!!!  
All I had to do is modify this code to  

<pre name="code" class="java"> @Catch(value={Exception.class})  
    protected static void myCatch(Exception e )  
</pre>

and problem was solved.  

# Critical Bugs

The bug I found was critical for 2 reasons :  
*   **<u>It belonged to an error reporting flow</u>**  

    The problem in these scenarios is that you never really know where the problem really is. An error printing mechanism must never have a bug otherwise it will be hard to resolve.  

*   **<u>This is a general framework reflection error</u>**  
    a reflection error is really hard to solve when it's not your code , and doesn't contain the information. Impossible to pin point. This is clearly Play!Frameworks problem, and I will let them know about it  
*   **<u>This is a fundamental bug</u>**  
    This happens to the best of the best at some point. Once you see Exception.class in an annotation written next to a RuntimeException signature, you can identify this bug. Hack, this can even be a question in your Java beginners course. However.. mistakes happen. But the more fundamental, the wider its scope, and the more effect it will have on your application.  

# Importance of Reproducing

I could not have discovered all these bugs and solutions if I did not insist on reproducing them first. Reproducing a bug tells you :  
*   You understand the problem  
*   You understand the solution  
*   You know what to expect when something goes wrong  
*   You know what to expect when something goes right  

And it can't get any better than that.