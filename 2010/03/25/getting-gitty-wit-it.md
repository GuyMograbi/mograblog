<table cellpadding="0" cellspacing="0" class="tr-caption-container" style="float: left; margin-right: 1em; text-align: left;">

<tbody>

<tr>

<td style="text-align: center;">[![](http://2.bp.blogspot.com/_J3A8WqpdCX0/S6tr9rASb_I/AAAAAAAAAak/8zB73itGPSY/s320/git.png)](http://2.bp.blogspot.com/_J3A8WqpdCX0/S6tr9rASb_I/AAAAAAAAAak/8zB73itGPSY/s1600-h/git.png)</td>

</tr>

<tr>

<td class="tr-caption" style="text-align: center;">Git is the superman of SCMs  

</td>

</tr>

</tbody>

</table>

Are you ready for a mind-blower today?  

Today's entry will be about [GIT - A Fast Version Control System](http://git-scm.com/)  

I don't like all those basic explanations on concepts and such, but you can't git without understanding the mind-blowing affect of decentralization.  

So I will dedicate this article to the concepts behind the decentralized model, and in the next article I will go down to technical details about SVN and GIT.  

<a name="more"></a>  

# Centralized VS. Decentralized Model

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/_J3A8WqpdCX0/S6tuFc3v9cI/AAAAAAAAAas/traY-Y3p2No/s320/compare_models.png)](http://3.bp.blogspot.com/_J3A8WqpdCX0/S6tuFc3v9cI/AAAAAAAAAas/traY-Y3p2No/s1600-h/compare_models.png)</div>

The centralized model is pretty easy to grasp - you have a single location where everyone are committing their code to and pulling it out from. This single location is a called the repository. In order to communicate with it, you use a client (the little squares in the image). This model is great, easy to use and "organized" in many ways. However it has some obvious defects.  

A simple one would be - if the repository's computer crashes or simply the load that computer has will damage the entire development.  

A more complex example would be - lets say that John and Jane are working on the same feature together. They will eventually need to perform some kind of integration. In a centralized model - in order to perform any kind of collaboration - you need to go through the repository. This, unavoidably, affects the entire team. Affecting the entire team before the feature was fully tested is dangerous.  

In a decentralized model, every client is also a repository.  
This is where you should pause and say "WHAT!?". (boom.. the mind just popped).  

# Every client is a repository

Once you're over the shock, it's time to start asking my favorite question - how does it work?  
I mean, there are so many questions to answer - such as :  

*   Where should I check out from?
*   Where should I commit my changes to?
*   So - when I set up the auto-build, to which repository do I point it to?

In order to answer these fine questions, lets see how a single man should work in using the decentralized model.  

# Single Person Flow

So I have a project I wrote and committed to my repository. Now I have a new feature I would like to write.  

Currently I have a single branch to my project - the master branch. I don't want to write my feature on this branch for the same reason I have 2 different tomcat instances for development and deployment of my site. So I create a new branch "new_feature". Note that I don't need to give it a good name (I give lousy names to my branches). And the reason is that this is MY repository and I can do whatever I want with it.  

So I write my code on the "new_feature" branch and I am checking in all the changes.  
Suddenly, I discover a critical bug on the master branch. So I quickly modify the code on the master branch and commit it..  
Being the lazy programmer that I am - I don't synchronize "new_feature" with the commit I did to the "master" branch. (imagine you have 10 new features, each in a different branch). So I finish writing my new feature, and it is committed to the "new_feature" branch. Now it is time to merge the master branch with the "new_feature" branch, thus actually "deploying" my new feature.  

In order to do this carefully, I first merge them locally, and after I check everything is ok - I commit the merge to the master branch. the "new_feature" branch can now be removed.  

If it helps you, think about developing a site. When I develop my site, I first test on a "tests tomcat" and only when it is done I deploy to the tomcat I use for my site. In rails, for example, it comes built-in..  

# Two People Flow

Working on my project alone can be great, but collaboration is even better.  
So now Jane has a great feature to add to my project.  

Since Jane is also a repository, she won't checkout my project. She should "clone" my entire repository. So now we have 2 repositories with the same master branch.  

Jane can detach from the network, and work on her feature. Committing the changes to her repository just like we saw before.  

While she is working, I am committing changes of my own. When Jane wants to get updates from my repository - she executes a checkout.  
This might be confusing, since "checkout" in centralized model is somehow similar to "clone" in the decentralized model. However this is just a bad name for the operation. Think of is as "sync" instead of "checkout".  

The "sync" operation updates Jane's repository with changes from my repository, and merges it with her code. Once Jane is ready she has 2 options.  

1.  She can ask me to pull her changes
2.  She can push her changes

It depends on the complexity of the merge and the permissions she has.  
Either way - the outcome is a unified version. Note that we have 2 repositories with the same master AGAIN!  

# N People Flow

So for a single person, and 2 people it was quite easy. But now we have a lot of people working on the same module. (yes, we are working on a small module. Since my project got really big it had to be done).  

Each module is kept in a different repository.  

Jane and John can now collaborate without interfering the entire team. (just like we've seen in the 2 people flow).  

And when they want to commit, they update with my repository, and push their changes when their done.  

The automated build points to my master branch since everyone are synchronizing with it. And I don't mind - since I always work on some clone and never on the master branch.  

If I do mind.. I can simply clone my repository locally - have 2 different repositories with the same project.  

If my computer crashes - since there are a lot of people that synchronize with me daily, we can simply changes all pointers to that computer and make it the origin. Hack, we can even have a "dummy computer" that all it does is serve as the origin for the project. (kind of like the centralized model).  

If John travels abroad and wants to share the sources with other people - they can simply clone his repository - even if the connection to my computer is bad. And so on..  

# Team Leader Flow

The image becomes cooler when you think as a team leader. Lets say I want to monitor my team's progress. In the centralized model I would have to bother them and waste their time - and they will keep telling me "it's not finished yet".  

I've been on both ends - and it's never a happy situation to either side.  

In the decentralized model I can simply pull my Team's master branches and review their progress on my free time on my computer. (For example - I can simply diff their master branch with mine and see their changes immediately).  

# Conclusion

It is beautiful and scary at the same time. Even though you have a "single point of reference" in the decentralized model (the origin) - it is too virtual to comprehend.  

It is hard to understand what this model can offer. In the example above you might accidentally think it is exactly like the centralized model (simply place me at the center) and you might even say it is quite "nasty" not to have a remote repository on a dedicated computer.  

Be that is it may, the decentralized model is revolutionary and it makes the entire Source Control Management experience better.