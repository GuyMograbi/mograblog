---
title: SVN + Apache - Easy ? Lets make it work!
published: 2010-04-10T13:57:00.000-07:00
description: so i decided to setup an SVN with apache on my computer..
keywords: svn, apache
layout: post.pug
shortcodes: true
---

[#alert-info]
life is easier on linux and nginx.. move to ubuntu
[#/alert-info]

Well... I am a bit frustrated..  

It is supposed to be easy - but!!!! it's not!  

All I wanted to do - is to expose my SVN on the web - I currently don't care about permissions, just let me see it work first. Then I will go on to permissions.  

I found several extensive tutorials such as  

*   [http://www.howtoforge.com/apache_subversion_repository_p2](http://www.howtoforge.com/apache_subversion_repository_p2)
*   [http://svn.spears.at/](http://svn.spears.at/)
*   [http://www.codeproject.com/KB/winsdk/SubversionApache.aspx](http://www.codeproject.com/KB/winsdk/SubversionApache.aspx)

All were very long to my taste.. not well constructed at all.. None of them referred to troubleshooting problems I saw along the way. But since that's what I have to work with.. then lets make it work.  

If you're like me, and all you care about it seeing it work - and if you already have Apache Server and SVN installed - there are only 2 more steps you should do.  

*   Copy DLLS and SO files
*   Add several lines to httpd.conf



# Copy DLLs and SO Files

When I finally got everything working I had 2 SO files copied and 2 Dlls copied.  

intl3_svn.dll, libsvn_fs-1.dll - Copied from SVN bin to Apache bin.  

mod_authz_svn.so, mod_dav_svn.so - Copied from SVN **bin** to Apache's **modules**.  

I am not sure at all that the DLLs should be copied - all the articles specify the SO files, but only one specifies the DLL..  

Before you restart the server you should start modifying the httpd.conf.  
For now - lets just load the new modules.  

So add the following  

```
LoadModule dav_svn_module modules/mod_dav_svn.soLoadModule authz_svn_module modules/mod_authz_svn.so
```

Plus - make sure the following line is uncommented  

```
LoadModule dav_module modules/mod_dav.soLoadModule dav_fs_module modules/mod_dav_fs.so
```

** NOTE: again - not sure about the second one, but couldn't hurt.  
Now you should try to restart the Apache Server  

### Troubleshooting

Believe or not, but this will probably be the hardest step you'll face.  
When I restarted the server it failed to restart. Getting "The requested operation has failed!".  

Looking at the logs I saw :  

```
expected signature 41503232 but saw 41503230 - perhaps this is not an Apache module DSO, or was compiled for a different Apache version?
```

At first I said - uh, the version is incorrect. Looking at SVN download they specify which apache version you can integrate with. But which Apache version do I have - I knew 2.2 because the folder path said so.. but SVN specified 2.2.9 and above... hmm...  

To see the full verison run httpd -v in your apache server bin.. mine was 2.2.14.  

So I downloaded version 1.6.4 that specifies it is compatible.. guess what - it's not! but I couldn't know that.. so I thought it wasn't a version issue, maybe something else - BIG MISTAKE, it was a version issue. version 1.6.6 worked fine.  

If you're wondering why I didn't try 1.6.6 to begin with - well, funny story, in the SVN download list, 1.6.4 appears before 1.6.6 - why??? I don't know.  
[http://subversion.tigris.org/servlets/ProjectDocumentList?folderID=8100](http://subversion.tigris.org/servlets/ProjectDocumentList?folderID=8100)  

(Probably changed by the time you read this).  

I found a lot of other crazy suggestions. Tried several, nothing helped. Finally I went back to version and it worked. Thank GOD!!!!  

### Another troubleshooting

Well - when I say - it worked.. it didn't really work that well.  
I also got the error " could not load mod_dav_svn.so into server: The specified procedure could not be found. ". However then I started copying some more DLLs and the problem was solved - since I already told you to copy those DLLs I assume you didn't get it..  

If you still get it - try also copying (overwriting!) the file libapr-1 from SVN to apache. Apache has its own copy, but you will have to overwrite it (use backups of course). I can't really remember if I eventually did it or not - but I read it helped someone..  

# Modifying HTTPD.conf

Well, we already modified load modules. Now it is time we told Apache where the repository is..  

All the places will tell you the same thing (different versions, but basically the same thing).  

```
<Location ~ "/svn/" >
      DAV svn
      SVNListParentPath on
      SVNParentPath d:/path_to_repository
</Location>
  ```

This is correct.  
Some places say that the last slash in "/svn/" is important. However, I didn't find anything about why that is. - but it's free..  

You should also note that I use a slash ('/') and not a backward slash ('\') even though it is windows.  

Did it work?? NO!  

### Troubleshooting

What no one tells you is that if you have a VirtualHost, Apache server will append that location to your default virtual host. (!?)  

I had 2 virtual hosts when I configured Apache, and I saw the following annoying log entry :  

```
proxy: BALANCER: canonicalising URL //tomcat/svn  
proxy: BALANCER (balancer://tomcat) worker (http://127.0.0.1:8080) rewritten to http://127.0.0.1:8080/svn  
```

Technically saying that he will redirect this call to my tomcat.. URGHH!!!!  
This is hardly documented. I didn't find a solution online..  

However - I did solve it on my own.  
Maybe you won't consider it a solution, but it's a solution enough for me.  

I defined a new virtual host :)  

```
#forward requests to apache server
<VirtualHost *>
     ServerName svn.mograbi.co.il
     ServerAlias www.svn.mograbi.co.il
</VirtualHost>
```

nice? What it means - don't redirect calls going to svn.mograbi.co.il.. :)  
And it worked.  

### How did I find out the problem and made sure it works ?

Well - you should know that by the time I wrote this article - I didn't try to run SVN yet.. do I don't actually know it works.  
However - I did see the following :  

[![](http://3.bp.blogspot.com/_J3A8WqpdCX0/S8Dko75O8lI/AAAAAAAAAbc/DKW6GbZ8KuA/s1600/collection_repositories.jpg)](http://3.bp.blogspot.com/_J3A8WqpdCX0/S8Dko75O8lI/AAAAAAAAAbc/DKW6GbZ8KuA/s1600/collection_repositories.jpg)

Which is good enough for me - I am dying to sleep.  

Well the answer is I first deleted the Virtual Hosts.  
According to the configurations I pasted above I should've seen the repository at  

```
http://localhost/svn<
```

It was weird - I at first got 404.. and refreshes and delete of cache didn't work.  
Then I tried  

```
http://localhost/svn/depot
```

Which is the depot project I did while learning rails. And it worked!  
So I suggest you will play around before giving up. Like a stubborn key-lock.  

Once I figured out it was the VirtualHosts that caused the problem - it was just a matter of time to come up with this cute solution.  

And then it all worked.  

# Next Time

Next weekend I will try to checkin/checkout sources and add permissions.  
Cross your fingers!  

The next step is doing the same with GIT, and make GIT and SVN communicate.  
Hopefully at that point I will be an experienced SCV/SCM user.