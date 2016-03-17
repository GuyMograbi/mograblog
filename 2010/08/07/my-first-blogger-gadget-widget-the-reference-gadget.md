[![](http://t2.gstatic.com/images?q=tbn:ANd9GcR_L27BJMmvEUHTUA8iyzZ2lo4_ZohQuHUi1mrM4SctFb8zu10&t=1&usg=__cpyE_6WG2xeqb5odppqAYQUlmgA=)](http://t2.gstatic.com/images?q=tbn:ANd9GcR_L27BJMmvEUHTUA8iyzZ2lo4_ZohQuHUi1mrM4SctFb8zu10&t=1&usg=__cpyE_6WG2xeqb5odppqAYQUlmgA=)  

I follow [blogger](http://mograblog.blogspot.com/search/label/blogger) closely, and I enjoy everything I see.  
However, from time to time I feel something is missing.  

It's time I began being more active.  

# This post is not about Blogger Hacks

## What is a blogger "hack"

A hack in blogger is a piece of code you can place in the "template" of the blog, and that will generate the source you want. For example - you can write JavaScript in the template to generate "Table Of Contents" div.  
This method is used when you need to modify the content of the post - since the "document" referred to in JavaScript is the same "document" of the post, it is usually an easier and quicker way than a gadget to achieve your goal.  

I don't think the word "hack" but that's the most commonly used phrase in this case.  

## This post is about Gadgets  

A gadget will add information to your post, but will not modify it.  
You can still add Table of Contents but it will not look and feel as part of the post.  

A gadget uses the blogger API to achieve its goal and is not considered a hack in any way.  
However it is considered harder than a hack since it requires you to learn the Blogger's API and use it in JavaScript. You cannot use the commands you know in JavaScript since the gadget's "document" and the post's document is different.  

This is however not the case if the data the gadgets is showing is unrelated to the post. (Advertisement for example).  

# The Reference Gadget

I try to maintain a "references" section in each post I have links in. (Like this one).  
However.. I believe this should be automated, and it annoyed me there's no such gadget.  

## Writing Your First Blogger Gadgets

The first thing you will notice trying to write your first gadget is that there's a lot of documentation, but its quality is so low.. it's disturbing.  
It's organized and everything, but the information you need is missing.  

That's probably because you reached [Blogger Developer Network](http://code.blogger.com/) or [Google Gadget Developer Guide](http://code.google.com/apis/gadgets/index.html) which both seem great, but they are the wrong documentations for this case.  

Surprisingly enough, these are the first result you get when searching "blogger widget api".  
What you should be looking for is ["blogger gadget api"](http://code.google.com/apis/blogger/docs/gadgets/gadgets_for_blogger.html). - the difference is between widget and gadget.  
Quoting [an article about the difference between gadgets and widgets](http://webtrends.about.com/od/widgets/a/widgetgadget.htm) :  

> _The easiest way to explain it is that a gadget is any widget that is not a widget. Sound confusing? A widget is a piece of reusable code that you can plug into virtually any website. A gadget acts just like a widget, often fulfilling the same purpose, but it is proprietary. It only works on a certain website or a specific set of websites._

## Getting Started

You start with the following template  

<pre class="xml" name="code">  
<module>  
 <moduleprefs title="References" <br="">author="Guy Mograbi"  
               author_email="guy.mograbi@gmail.com"  
               description="Takes links and shows them as list"  
              title_url="http://www.mograbi.co.il" ></moduleprefs>   
  <content type="html">Hello world!  
    ]]></content>   
</module>  
</pre>

Just modify author, author_email and so on. (you can also add "screenshot" and "thumbnail" - but I am guessing you'll be doing that once you have an image of your gadget :) )  

## Running the gadget

### Need to make the XML accessible somehow

Don't wait for this step, once you have the XML above accessible somewhere online you should load it to your blog (or some fake temporary blog you have).  
I tried following the [test tutorial](http://code.google.com/apis/blogger/docs/gadgets/gadgets_for_blogger.html#TestingGadget) in documentation, but it failed for me. I found it quicker to test it on an actual blog.  

You can host your file on Google Code or Github.  
For example - [mine is available on Google Code](https://blogger-reference-gadget.googlecode.com/svn/trunk/references_gadget.xml "My gadget on google code")  
Don't try the [Google Gadget Editor](http://code.google.com/apis/gadgets/docs/tools.html#GGE) since it is full of bugs. (and I am using chrome, so its not a compatibility issue).  

Best practice says to use some online files repository, where you can write an XML file and save it online - however there's no such thing (STARTUP!)  
**Update: Actually, now you can finally edit files online in Github and Google Code**  

### Add the gadget to a blog

Pick a blog you don't care to make inaccessible for some time (expect javascript errors).  
Click "design" ==> "add gadget" ==> "add your own".  
Give the URL to the XML which should now be accessible online.  

View your blog - you should see "hello world!".  
Everything went smoothly for me to this point. (after a lot of research I summarized above) - so there's no troubleshooting, only "best practice" advice.  

## Writing Gadget Functionality

Now that you have the gadget up and running, with a good work process, it's finally time to start coding.  

### Disabling Gadget's Cache

Try to modify your XML in any way - for example, modify the "Hello World" string and hit refresh in your blog. Did it change?  
I expect the answer to be NO and the reason for that is that blogger caches the Gadget's XML.  

In order to disable the cache, you will need to modify the template of the blog (hack).  

Add the following lines before  

<pre class="html" name="code">  
<script type="text/javascript">google.friendconnect.container.setNoCache(1);</script>  
</pre>

This code was taken from [Blogger's Documentation about testing](http://code.google.com/apis/gadgets/docs/publish.html#Testing)  

### Getting info From Blogger

As I mentioned before - if all you want is to show data unrelated to the post, simply write your HTML and JavaScript, there's nothing new for you to learn here.  
However, since I want to gather all the links in the post and display them as a list of links, I will need the content of the post.  

This requires me to get the content of the post by using Blogger's API.  
Reading in [Blogger's data api documentation](http://code.google.com/apis/blogger/docs/gadgets/gadgets_for_blogger.html#BlogData) I decided to write code that looks like this  

<pre class="html" name="code">  

  <script><br /><br /> function $(id){ return document.getElementById(id);}<br /> <br /> function write_references(){ <br />  var ref_div = $('references_mogi_gadget');<br />  if (ref_div == null){<br />   ref_div = document.createElement('div');<br />   document.body.appendChild(ref_div);<br />  }<br />  <br />  as = document.getElementsByTagName('a');<br />  for each (a in as){<br />   <br />   if ( a.className && a.className.indexOf('mogi-reference') >=0) {<br />   <br />    var li = document.createElement('li');<br />    <br />    var newa = document.createElement('a');<br />    // I don't know why but JSON strips the http: part..<br />    <br />    newa.href=a.href;<br />    newa.target = 'top';<br />    newa.innerHTML = a.innerHTML;<br />    li.appendChild(newa);<br />    ref_div.appendChild(li);<br />   <br />   }<br />  } <br /> }<br /> <br />  function onLoadFeed(data){<br />  var content = data.data.entry.content.$t;<br />  <br />  $('hidden_div').innerHTML = content;<br />  write_references();<br />   }<br />   <br /> // Get the feed data<br />       blog = new google.Blog(function() {<br />         blog.getCurrentPostJson(onLoadFeed);<br />       }, window.name);<br /> <br /><br /></script>  

</pre>

#### Lets break it down

The first thing to run is "fetch post content" code  

<pre class="javascript" name="code">// Get the feed data  
       blog = new google.Blog(function() {  
         blog.getCurrentPostJson(onLoadFeed);  
       }, window.name);  
</pre>

I give the constructor a function - which is invoked by the end of the constructor. (as seen in documentation).  

Then, we get to "onLoadFeed"  

<pre>function onLoadFeed(data){  
  var content = data.data.entry.content.$t;  

  $('hidden_div').innerHTML = content;  
  write_references();  
   }  
</pre>

What I basically do is pour the content of the reply to a hidden div. The reason I do that is because I want to handle JavaScript code, and not start parsing HTML code..  

Then I run an algorithm that finds all links with class="mogi-reference" and put them nicely in a list. this is the "write_references" function which is pure JavaScript - no blogger api specifics..  

This is my first draft.. but running it, I get the result I wanted.  
All I have left is to match the style of the gadget to the style of the blog and add customizations etc..  

# Future Features

More features I can add easily are :  
*   add a small description of the link by adding attribute to anchor tag  

*   add "group" attribute to anchor tags, and group the links to different lists  

This will give all my viewers an easy "references" box which I won't have to make manually anymore.  

# The Gadget gets Cached Data!!!!

As I was testing my gadget, I accidentally had a problem with the blog's content. So I modified it, but it didn't change in the gadget!!! denying me to test with proper data.  

This is how I learned that gadgets get cached data. This might be a problem.  
I found posts that claim to solve the problem. nothing worked.  
Eventually, after a couple of minutes, the cache refreshed, and I continued, but you should be aware of this. If you insist on not waiting - simply create a new post.  

Here is an image showing that the gadget is out of sync with the post.  
According to my code, I am taking the entire anchor tag, with its inner HTML, so the text for the link should be the same, but it's not.  

<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;">

<tbody>

<tr>

<td style="text-align: center;">[![](http://2.bp.blogspot.com/_J3A8WqpdCX0/TFxlTMUHlPI/AAAAAAAAAlY/iNIjsVBfvW8/s320/gadget.png)](http://2.bp.blogspot.com/_J3A8WqpdCX0/TFxlTMUHlPI/AAAAAAAAAlY/iNIjsVBfvW8/s1600/gadget.png)</td>

</tr>

<tr>

<td class="tr-caption" style="text-align: center;">The text in the gadget saying "My Site" should match the link in the post saying "Google"  
but it's not since it is using a cached version of the post. </td>

</tr>

</tbody>

</table>

# Applying the Style

The style part is quite easy, all you have to do is get the style from blogger api, and apply it in the correct places.  
Just read the [documentations](http://code.google.com/apis/blogger/docs/gadgets/gadgets_for_blogger.html#BestUIPractices)  

<pre class="html" name="code"><moduleprefs ...="">  
          ...   
 <require feature="opensocial-0.8">  
 <optional feature="skins">....</optional> </require></moduleprefs>  

...   
<script><br /> $('myBody').style.borderColor = gadgets.skins.getProperty('BORDER_COLOR');<br /> $('myBody').style.backgroundColor = gadgets.skins.getProperty('CONTENT_BG_COLOR');<br /> $('myBody').style.color = gadgets.skins.getProperty('CONTENT_TEXT_COLOR');<br /> $('myBody').style.font = gadgets.skins.getProperty('FONT_FACE');<br />/// use $('linkId').style.color = gadgets.skins.getProperty('CONTENT_LINK_COLOR');<br />// on every "a" tag. <br /></script>  

     ....   

</pre>

This should pretty much cover everything..  

# Best Practice I Learned

I learned that firebug or writing "debugger" in the JavaScript code is not useful. I couldn't find a proper way to debug the code.  
So I had to resort to alerts.. thank god this gadget was pretty easy.  

# Where to get my Gadget?

All the info you need is at [google code project](http://code.google.com/p/blogger-reference-gadget)