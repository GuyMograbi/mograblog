---
title: How fast can you go? - Uploading Video to YouTube with API
published: 2010-06-13T16:05:00.000-07:00
description: lets load a video to youtube
keywords: youtube, api
---

<div class="separator" style="clear: both; text-align: center;">[![](http://tell.fll.purdue.edu/JapanProj/FLClipart/Adjectives/fast.gif)](http://tell.fll.purdue.edu/JapanProj/FLClipart/Adjectives/fast.gif)</div>

Today, I was asked to help with uploading a video to YouTube.  
I said I will look into this when I get home.  

Since I already had an environment - it took me 30 minutes with Troubleshooting - this is a very long time.. However, for some it might seem really quick.  

Lets go over from the start - what you should have in order to get things going really fast.  

<a name="more"></a>  

# Java

I don't like when people use the IDE's Java.  

Best thing to do is to download the JDK, and then define a system variable :  
JAVA_HOME which points to the parent of the JDK bin folder.  
Then add to Path %JDK_HOME%\bin  

Most of the developers I know simply place the JDK under "c:\Program Files\Java".  
I hate that approach.  
When I get a new computer, I create a new folder "c:\dev_env" - and place everything under it.. so in the JDK case, I get the hierarchy :  
c:\dev_env\jdk\jdk_1.6.10 - for example.  
You should note that I am prepared for multiple JDK versions.  

If I do have multiple versions, I can simply change JAVA_HOME to JAVA_1_6_HOME and create a new variable for JDK 1.5 (for example), while switching between them is as easy as modifying the name.  

You should verify you have JDK installed properly by opening a command line and running the command  

<pre>java -version </pre>

It should print the version.  
If this doesn't work well :  

*   make sure you opened a new command line - each change in system variable requires a new command line  

*   make sure you understand the meaning of JAVA_HOME.  
    In the location %JAVA_HOME%\bin you should find the file java.exe and javac.exe.  

# Maven

The process above is similar to almost all the Java frameworks you will work with.  
For example - Maven.  
Maven is probably the most efficient tool when you start developing with Java.  
Download it from [here](http://maven.apache.org/download.html) and take the time to go over tutorials. Feel free to have a peek at [my slide](http://sites.google.com/site/guymograbi/presentations).  

The following instructions are from the Maven Site.  
Define M2_HOME system variable to point to Maven's bin parent folder.  
Define M2 system variable as %M2_HOME%\bin  
Add %M2% to Path.  

make sure everything is installed correctly by running the command  

<pre>mvn -version </pre>

just like with Java.  

Once these two things work it is time to get going with an IDE.  

# IDE

Personally, I like Intellij, and I will use it in the rest of this post.  
However, you are probably using Eclipse.  

You should make sure you know the following :  

*   Tell the IDE to use the external JDK - the one we defined together just a minute ago. This gives you a much better control of the environment  

*   Explore using Maven with your IDE. In Intellij there's nothing to explore - it is built it.. With Eclipse, I believe there's a plugin to install - this plugin is known as the best Maven support in an IDE... I still prefer Intellij.  

Did you notice we are not dealing with google-api yet?? wait for it..  

Now that you installed Maven and Java and an IDE, you should be able to create a new Java project with Maven support.  

HINT :  

<pre>mvn archetype:generate </pre>

use the default menu number (mine is 58) - it points on quickstart..  

<pre>cd <project_name> mvn clean install</project_name></pre>

First run takes a lot of time, because Maven initializes itself.  
The following clean/installs will be quicker.  

Your project should have the following stucture :  

<pre>root  
+---- pom.xml  
+---- src  
+----main  
+----java  
+----resources  
+---test  
+-----java  
+----resources  
</pre>

pom.xml is your bible from now on.. learn it, know it, love it..  
Your IDE should support "open project" + select the pom.xml.  

The reason the IDE supports that is that the POM.xml is the description of the entire project.  

# Nexus

Nexus Maven Repository is your friend.  
The repository allows you to find jars very quickly.  
For example - while running the google youtube code sample, I got a ClassNotFoundexception ... 2 seconds later, I already had the jar in my project, and I was running again. I simply copy-pasted the fully qualified class name to nexus search and it gave me the required jar.  
Clicking the search result, nexus also gives you the code you need to copy-paste into your pom.xml. It can't get any simpler than that. :)  

Sometimes you need to configure Maven with new repositories.  
You do that in the settings.xml file found under M2_HOME. This file is very well documented. So if you have a problem, simply read it.  
It's self-explanatory.  

# Setting the project with a test

Go to your pom.xml, change the junit dependency version to 4.5, instead of 3.8.1\.  
This will allow you to use @Test notation.  

Create a new Class under "src/main/test/..." lets name it  
"YouTubeSample".  

Write the following method  

<pre>@Testpublic void testHelloWorld(){   System.out.println("hello world!");}</pre>

with a mouse right-click you should be able to run only that method..  
This is a very powerful way to run sample codes.  
And you will probably use it along the way.  
We won't use it here any more, but it will be important later on.  

# Google API

In google's [GData Project](http://code.google.com/p/gdata-java-client/downloads/list) You can find gdata-samples.java-version.zip which is a great source for code-samples for their entire API.  

Very quickly you will find gdata\java\sample\youtube - in which you will find YouTubeUploadClient, however I used an older version that only had "YouTubeWriteClient".. I don't think there's a great difference.  

Copy-Paste the content. Change the package name, change the class name - this is a great opportunity to learn the refactor functionality of your IDE. Intellij users - alt+enter is your guardian angel.  

Ok, currently, your code won't compile.  
Find the classes you are missing, and search them in the nexus repository - add each jar you need to your pom.  

This will repeat itself like 3-4 times.  

My Project has some dependencies you won't need since I have code samples other than YouTube, but it will definitely help you when you hesitate between multiple suitable jar results in Nexus  

<pre><dependencies>  
<dependency>  
<groupid>org.apache.httpcomponents</groupid>  
<artifactid>httpclient</artifactid>  
<version>4.0</version>  
</dependency>  
<dependency>  
<groupid>com.google.gdata</groupid>  
<artifactid>gdata-core</artifactid>  
<version>1.0</version>  
</dependency>  
<dependency>  
<groupid>com.google.gdata</groupid>  
<artifactid>gdata-blogger</artifactid>   
<version>2.0</version>  
</dependency>  
<dependency>  
<groupid>com.google.collections</groupid>  
<artifactid>google-collections</artifactid>  
<version>1.0</version>  
</dependency>  
<dependency>  
<groupid>com.google.gdata</groupid>  
<artifactid>gdata-media</artifactid>  
<version>1.0</version>  
</dependency>  
<dependency>  
<groupid>javax.mail</groupid>  
<artifactid>mail</artifactid>  
<version>1.4</version>  
</dependency>  
<dependency>  
<groupid>com.google.gdata</groupid>  
<artifactid>gdata-youtube</artifactid>  
<version>2.0</version>  
</dependency>  
<dependency>  
<groupid>com.google.gdata</groupid>  
<artifactid>gdata-client</artifactid>  
<version>1.0</version>  
</dependency>  
</dependencies>  
</pre>

While you're fixing compilation errors, you should see the test is reading username/passowrd and something called developer-key or application-key or something like that..  

A quick search in google shows I should register my application [here](http://code.google.com/apis/youtube/dashboard). Just give it a name, and it will give you a key. Copy paste them to the code.  

This was my first troubleshooting - I discovered after several minutes, that the account I was using didn't activate YouTube well. Make sure you can login to YouTube with the account you're testing with - otherwise you get "Invalid login credentials" message.  

It seems they have a lack of consistency in the API while constructing the YouTubeService.. This is what worked for me :  

<pre>new YouTubeService(developerKey,developerKey);</pre>

make sure you set the correct credentials later  

<pre>service.setUserCredentials(username, password);</pre>

NOW RUN! In the ClientWriter code sample I got a menu that looked like this  

<pre>Choose one of the following demo options: 1) My Uploads 2) My Playlists 3) My Favorites 4) Comment on a video 5) Upload a new video 6) Add a favorite 7) Print user activity 8) Print my friends' activity 0) Exit</pre>

So I chose "5" of course..  
I prepared a small video in advance.. you can download it at [my google site](http://sites.google.com/site/guymograbi/java/test1.avi?attredirects=0&d=1). It is 300K, so it only takes a couple of seconds to load.  
I gave it the path, later the [Mime type](http://www.w3schools.com/media/media_mimeref.asp) and then a name.  
It looked like this  

<pre>Enter Number (0-8): 5First, type in the path to the movie file:C:\Users\User\Desktop\test1.aviWhat is the MIME type of this file? (ex. 'video/quicktime' for .mov)video/x-msvideoWhat should I call this video?myFirstApiTestVideo uploaded successfully!</pre>

And my video was loaded :)  

Here it is  
<object height="385" width="640"><param name="movie" value="http://www.youtube.com/v/Raze1jCZDPo&amp;hl=en_US&amp;fs=1&amp;color1=0xcc2550&amp;color2=0xe87a9f"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><embed src="http://www.youtube.com/v/Raze1jCZDPo&amp;hl=en_US&amp;fs=1&amp;color1=0xcc2550&amp;color2=0xe87a9f" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="640" height="385"></object>  

# Conclusion

Once your environment is set up properly, the "real work" is easier than you can imagine.