<div dir="ltr" style="text-align: left;" trbidi="on"><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">Why?</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">I've been using SVN for about 2 years now.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">And a couple of days ago, I suffered from a merge going bad, and it took me the entire day to get over it.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Each time I updated my branch from trunk, SVN would mark everything as CONFLICT and I found myself going over each file ( over 100 ) and clicking "resolved".</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">I could not tolerate it any more.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">The solution was to merge the folder, but - using tortoise - I told the SVN to record the merge but not perform it. This updated the merged revisions in "mergeinfo", and so it didn't find the need to re-merge files as conflict over and over again.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">However, that spawned some other errors.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">So I decided to get my act together, and finally go for something I wanted a long time ago and use GIT.</span>  

<div class="separator" style="clear: both; text-align: center;">[![](http://1.bp.blogspot.com/-3wyRbHRysxs/Ts1vySkqgYI/AAAAAAAAC9E/6pHxJguDR_o/s320/record_merge.png)](http://1.bp.blogspot.com/-3wyRbHRysxs/Ts1vySkqgYI/AAAAAAAAC9E/6pHxJguDR_o/s1600/record_merge.png)</div>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">All you will need to use GIT with SVN - the basics</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">There are some really basic commands you need to work with git and svn </span>  

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git svn init _URL_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">This will initialize a git repository with an SVN as remote repository on the given URL. </span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git svn fetch</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">This will update your working copy from the remote repository</span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git checkout -b _NEW_BRANCH_NAME_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">This will create a new branch with GIT</span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git checkout _BRANCH_NAME_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Will switch your working branch</span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">_git branch -a_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Will show you all your branches, marking current with *</span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">_git status_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Good to use when you're not sure what to do next. shows you the status and hints what you should do next. </span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">_git add_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Adds a file to git.</span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">_git commit -m "some comment"_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Commits changes</span>

*   _git merge BRANCH_NAME_

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Will merge a branch to current branch</span>

*   _ git svn rebase_

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Fetches but also merges changes to working copy</span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">_git svn dcommit_</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Pushes changes back to SVN</span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git reset --hard HEAD~N</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">N should be a number</span>
*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Will rollback N revisions. Nice command if you need to undo a merge. </span>

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git commit --amend</span>

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Allows you to rewrite the comment. </span>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">The 3 magic commands</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">I realize that for SVN world those look like a lot of commands. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">So you can actually use only 3 : </span>  

*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git svn fetch URL</span> <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">- will checkout the copy</span>
*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git svn rebase</span> <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">- performs update. </span>
*   <span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git svn dcommit</span> <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">- performs commit</span>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Once you feel secure with these you can move on to branches. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">It's silly how easy it is to manage branches with GIT. and then you only need to add checkout and merge to the formula.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Git Lost and Founds</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;"><span class="Apple-style-span" style="font-size: x-large;">Disappointments and pitfalls</span> </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Whatever you do, don't leave a dirty working copy. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">You might see a nifty trick called "git stash". Do not use it!</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">My workspace tends to get messy from time to time as features get backed up with bugs and small questions. I need to switch constantly. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">In SVN I would simply branch on a different location in SVN. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">In GIT, I'd rather use the "checkout -b" method which creates local branches. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">However, to my surprise I discovered that the branches may intertwine. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">For example - adding a file to git is beyond branch scope. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">If you switch to another branch, you still have the added file available, and you can accidentally commit it on a different branch. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">So does "stash" - you can apply it on a different branch. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">Rebasing</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">As you can see, I specified "rebase" as if it was a simple command. However, this command should have a book of its own. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">You can find links below especially for that command. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">My rules of thumb (and I might be mistaken) for beginners is : </span>  

*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Always work on a branch</span>
*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Always rebase top-down ( from remote to master to branch )</span>
*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Always merge down-top ( from branch to master to remote )</span>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: large;">Resolving Conflicts</span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Either way you choose to work, you will get a conflict here and there. </span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">For all those SVN users, you'll be glad to know you can use Meld or TortoiseGIT for that, and get the same experience as you did with SVN. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Link for using Meld can be found on references below. </span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/-btpwdHhjV_E/Ts40Fb-uzII/AAAAAAAAC9Q/LMMHvdnYkXs/s320/tortoiseGIT.png)](http://3.bp.blogspot.com/-btpwdHhjV_E/Ts40Fb-uzII/AAAAAAAAC9Q/LMMHvdnYkXs/s1600/tortoiseGIT.png)</div>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: large;">**Compare Branches**</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Another thing I find TortoiseGIT good for is the "browse references" which is like "browse repository" you have with tortoiseSVN. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">This nifty window will allow you to compare 2 different branches which is good before you merge away.. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/-G9qCUZ6ECiA/Ts5FQe5AOOI/AAAAAAAAC9c/DZ7fEjnZgbM/s320/browseReferences_tortoiseGit.png)](http://3.bp.blogspot.com/-G9qCUZ6ECiA/Ts5FQe5AOOI/AAAAAAAAC9c/DZ7fEjnZgbM/s1600/browseReferences_tortoiseGit.png)</div>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">DCommit</span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">The dcommit command I presented before gives GIT a central repository structure. This means that everyone are checking out from a repository and committing their changes to it. </span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">The correct term in GIT is "pushing" their changes ( instead of committing ) . </span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Pushing is meant for remote repositories, while committing is meant for local repositories. </span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">For a real distributed workflow with GIT you should switch to a PULL method rather than PUSH. </span></div>

<div><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">But I won't add details about that method here. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">I don't like SVN switch, and GIT checkout -b... what can I do?</span></div>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Working on branches can be confusing. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">It seems that some changes cross branches. For example, if you add a file and then switch branch, the added file will appear in other branches. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Only if you commit the added file will you see the proper behavior. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">So branching might cause problems if you are not careful. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">In SVN I found it best to not use "switch" at all. Instead, I made a shelf (which is a branch just for me and my feature) and then reintegrate it. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">The problem with SVN is that you have to make the branch on the remote repository and then checkout. Which makes this entire process tiresome. Not mentioning the "reintegrate" that NEVER WORKS!</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">With git - this turns out to be a great way to work. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Once you cloned your project from SVN, you can now clone your project again, but from GIT to GIT and into another folder. For example</span>  

<div style="text-align: center;"><span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">  
</span></div>

<div style="text-align: center;"><span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">git clone c:\project\myproject c:\dev\myfeature</span></div>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">See the distributed workflow in git book. I promise you won't regret using this workflow. It makes your environment very clean and almost branch free. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Another plus I get using this workflow is with IDEs. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Basically I like to keep a separate window (in intellij) or project (in eclipse) for each version of the project. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Clone allows you to maintain this kind of IDE management while branching/switching does not. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Naming my project according to the purpose of the clone makes the IDE window more readable. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">To make my workspace even cleaner, I make sure to define "remote repositories", fetch and diff before I merge. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Since the command line might be messy and unreadable, I use TortoiseGIT. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">This gets me closest to my SVN experience but without all the troubles that made me leave SVN. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">Troubleshooting</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: large;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: large;">fatal: write error</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">if you get some "fatal: write error", and you are running windows, don't worry. It probably GIT trying to download some big binary file and fails. It usually helps if you close everything and try again. Even try a restart</span><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">.</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;"><span class="Apple-style-span" style="font-size: large;">Modified is shows, but I didn't make any changes</span></span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">At some point I got a modified files list. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">but I didn't make any changes. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Reading about it I [stacktrace thread about crlf](http://stackoverflow.com/questions/2016404/git-status-shows-modifications-git-checkout-file-doesnt-remove-them) saying that git declares possible data corruption with auto-crlf, and switching it off makes everything better. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Use the commnd </span>  

    git config --global core.autocrlf false

<pre style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; border-bottom-width: 0px; border-color: initial; border-left-width: 0px; border-right-width: 0px; border-style: initial; border-top-width: 0px; line-height: 18px; margin-bottom: 10px; max-height: 600px; overflow-x: auto; overflow-y: auto; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; text-align: left; vertical-align: baseline; width: auto;"><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">However, This solution will not affect your windows CMD.   
Sometimes, you will be forced to use your CMD command.   
For example - when using Disc-On-Key to port your project.   
For these cases, I found it useful to use Git-Tortoise. </span></pre>

<pre style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; border-bottom-width: 0px; border-color: initial; border-left-width: 0px; border-right-width: 0px; border-style: initial; border-top-width: 0px; line-height: 18px; margin-bottom: 10px; max-height: 600px; overflow-x: auto; overflow-y: auto; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; text-align: left; vertical-align: baseline; width: auto;"><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;"><span class="Apple-style-span" style="font-size: x-large;">Porting your project between 2 computers that cannot communicate</span></span></pre>

<pre style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; border-bottom-width: 0px; border-color: initial; border-left-width: 0px; border-right-width: 0px; border-style: initial; border-top-width: 0px; line-height: 18px; margin-bottom: 10px; max-height: 600px; overflow-x: auto; overflow-y: auto; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; text-align: left; vertical-align: baseline; width: auto;"><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">If you find yourself in such a scenario, use a Disc-On-Key. ( DOK )   
Clone your project to the DOK using</span> </pre>

<pre style="background-attachment: initial; background-clip: initial; background-image: initial; background-origin: initial; border-bottom-width: 0px; border-color: initial; border-left-width: 0px; border-right-width: 0px; border-style: initial; border-top-width: 0px; line-height: 18px; margin-bottom: 10px; max-height: 600px; overflow-x: auto; overflow-y: auto; padding-bottom: 5px; padding-left: 5px; padding-right: 5px; padding-top: 5px; text-align: left; vertical-align: baseline; width: auto;"><span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">git clone c:\_mypathtotheproject_ onto your DOK.   
Then pull/fetch as described in the [distribution flow in the git book](http://book.git-scm.com/3_distributed_workflows.html)</span></pre>

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">IDE</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Working with Intellij, I found no problem finding my way other than adapting some GIT terms - but that is not an Intellij issue. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">The only thing I found lacking was the "current branch" title. No-where to be found in Intellij. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">You have to run a VCS command to find which branch you are on right now. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">( shortcut key : [ alt + ` ] = alt with back quote) </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">I was a bit surprised to discover support for github built into Intellij. I should check it out sometime. </span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">Conclusion</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">  
</span>  

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">References</span>  

*   [<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">Git Communit Book</span>](http://book.git-scm.com/index.html)
*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">[Tortoise for GIT](http://code.google.com/p/tortoisegit/)</span>
*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">[GIT SVN workflow tutorial](http://andy.delcambre.com/2008/03/04/git-svn-workflow.html)</span>
*   <span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">[Git for computer scientists](http://eagain.net/articles/git-for-computer-scientists/) - Rebase explained</span>
*   <span class=" mogi-reference Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">[Working with Meld](http://blog.wuwon.id.au/2010/09/painless-merge-conflict-resolution-in.html)</span>
*   <span class="mogi-reference Apple-style-span" style="font-family: Arial, Helvetica, sans-serif;">[My Wiki Page on GIT](http://wiki.mograbi.info/git)</span>

</div>