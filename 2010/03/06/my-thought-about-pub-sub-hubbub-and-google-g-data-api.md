<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/_J3A8WqpdCX0/S5K1YQlhsZI/AAAAAAAAALs/GWv9UFP-5Tc/s1600/thoguhts.png)](http://3.bp.blogspot.com/_J3A8WqpdCX0/S5K1YQlhsZI/AAAAAAAAALs/GWv9UFP-5Tc/s1600-h/thoguhts.png)</div>

So many things to learn, so many things to do.. From time to time, the right thing to do is to sit back and ponder. Today I would like to ponder about [pubhubsubbub](http://code.google.com/p/pubsubhubbub/) and [GData API Client Libraries](http://code.google.com/apis/gdata/docs/client-libraries.html)  

If you don't know what these things are, you should read about them first. (I also have blogposts about them).  

<a name="more"></a>  

# PubHubSubbub

PubSubHubbub?? Couldn't find a normal name?  

It's a great idea, and I loved it. The web is becoming more about streams as the day goes on. it's all about the user experience. Since I am going to talk about GData-API in just a second, I would like to note I didn't find it there. There is a "hubbub" client library for java but you'd have to search and update it separately.  

I loved the thought of downloading a hub so I can run it locally, and I loved the screens that come along with it for development. Actually - the entire dev environment is simply great. Google did a great job about that.  

So.. the idea is that each feed has a hub. I assume that you can publish to multiple hubs - although this was not specified anywhere yet. Why would I want to do that? Well, simply to reach as many people as I want, plus, I am being cautious since I am unsure about what happens if the hub server crashes.  

What really happens if the hub crashes ? Will I be missing events? Or is there a recovery mechanism? I don'y know yet..  

Can a hub subscribe to another hub? Logically I see no reason why not. But what will happen if subA publishes to subB and I am subscribed to both? Will I get events twice? darn.. So every application I maintain needs to handle this right?? How can I identify events uniquely?? is it even possible?? I don't know yet..  

Can I add attachments? what does it even mean "adding attachments to a feed"? It seems possible.. Even though I don't quite understand what it means yet, it doesn't surprise me that it exists.  

So a streaming feed with attachments.. sounds familiar? Isn't this the same as a "wave" (maybe even better?)? hmm...  
It seems we are going back and forth with the same idea over and over again, but each time modifying a little variable. It is amazing how these "little" variables can affect so much.  
The wave has user control, while the pubsub protocol does not - I cann't control who sees my feed.  

What about security?? Who is even responsible for it? Unlike any other streaming mechanism (wave, buzz etc.. - what about tweeter?) the hub is not centralized.. in terms of security, it means we are all responsible! You should trust no one.  

So I'm thinking about all the cool things I am going to do with this. I am definitely going to have a sub locally.. just for the fun of it. And then, it came to me that implementing a chat is not that hard! Not only is it easy, but even better than implementation you have today. Why better?  

The hub is a not centralized (yeah, seems to be the main feature). up until today you had to be part of some network to chat with others. With this nifty thing, the feeds are the users you can chat with, so if you are publishing, you are chatting and you don't need to "register" but instead you simply subscribe. Unlike normal chatting - you cannot chat 1 on 1 since you publish to the web and not specific users. Nevertheless, I am certain some servers will try to add this layer in order to make it possible.  

If you ask me - forcing chats to be open are the better approach. Talking by default as if anyone can "hear" you is nicer.  

So there are a lot of questions to answer, and I am sure more will come as I go along this path.  

# GData API

The other day I said to myself - today is the day. So I go to downloads only to find that it doesn't work. :( I was forced to wait until some bug was fixed and I can download again. It seems [other people had the same problem.](http://groups.google.com/group/google-help-dataapi/browse_thread/thread/0fff27ad19849210)  

Why don't they place this in a maven repository? This is exactly why this thing was invented.  
Since there's no limitation to publish it, I placed it in my repository. You are welcomed to visit my [thirdparty repository](http://www.mograbi.co.il/nexus).  
However, I didn't fix the dependencies. Once I included blogger's jar in my project, I discovered I had to include Google's collection jar and some other jar. Those jars are in a Maven Repository by now - so no problem there. But it is a bit scary to think that I don't have all dependencies - you can never know when Google's code will a new Class that requires some dependencies you don't have. This is yet another thing Maven is supposed to solve.  

I will not be surprised to find out Google are about to release their own implementation of a repository. I hope that their repository will support ALL technologies - it seems odd to me that ruby's gems and Maven's artifacts have different infrastructures to move around.  

I love a lot of thing Google does. They are the standard as far as I am concerned. I read snippets of code from Google whenever I get the chance. Luckily enough, GData comes with code samples.  

Their API is generic and modular. I liked it. There were things, however, that I thought it was a bit too much. For example - the blogger api sample - specifies the URLs in the sample class.. what up with that? This is a copy-paste from their code  

<pre> private static final String FEED_URI_BASE = "http://www.blogger.com/feeds";  private static final String POSTS_FEED_URI_SUFFIX = "/posts/default";  private static final String COMMENTS_FEED_URI_SUFFIX = "/comments/default";  private static final String METAFEED_URL = "http://www.blogger.com/feeds/default/blogs";</pre>

I assume everyone will define these constants.. why not place them in the api class instead?  
Better yet - use a template. This is from the code again.  

<pre> new URL(feedUri + POSTS_FEED_URI_SUFFIX);and  feedUri + "/" + postId + COMMENTS_FEED_URI_SUFFIX;</pre>

As a dedicated developer, it disturbs me to see such code. Wouldn't it be better if I wrote it like this  

<pre>// 0 - feedURI// 1 - postId"{0}/{1}/comments/default"; </pre>

it would be even better if there was some injection language (and I am sure there is one) that will make it look like this  

<pre>public String getCommentsURL(String feedUri,long postId){   return format("#{feedUri}/#{postId}/comments/default");}</pre>

looks a bit like ruby doesn't it?  

So I think there's a place to improve here (however insignificant it may be.).  

By the way, if we are talking about blogger - check out the ["blogger in draft"](http://draft.blogger.com/home). It's amazing what they are doing there.  

# Conclusion

It's exciting times to be a developer. This post, like many others I suppose, referenced Google even though it talked about concepts rather than implementations.  

Google seems to be rushing ahead, leaving the entire world a few steps backwards. I hope they keep doing that because the faster they go, the better for everyone.  

Is there anyone out there successfully keeping up with them? I can tell you, it's fun just trying. Every thing I read about gives me several more things to read about and a lot of questions. I am surprised I even find the time to blog about it :).