---
title: Troubleshooting Missing Artifact in Eclipse Maven Repository - 
published: 2013-01-01T02:42:00.000-08:00
description: another reason why i hate eclipse and how to solve it
keywords: eclipse
layout: post.pug
---


I found 2 reasons that cause this error in Eclipse.  

*   Maven Repository Index Does Not Refresh
*   Disable Workspace Resolution While Project In Workspace

I have a solution for both.  

## Maven Repository Index Does Not Refresh

I don't have a way to reproduce the problem, but the symptoms are quite clear.  

*   Eclipse claim that the artifact is missing, but when you go to your local repository  
    you see the JAR is there.
*   When you open Maven Repository View, and you browse do the artifact it is indeed missing

It seems that Maven's view of the repository does not match its real state.

### The Solution

The solution for this is quite simple. On the repository view ( Window ==> View ==> Other ==> Maven Repository )  
you should focus on the unsynched repository ( mine was the local repository )  
and then right click and choose "reindex"  
If reindex is disabled, it means you are not standing on the repository node, but on some other node.  

It is unclear to me at all why Eclipse would have a feature for exploring Maven repository.  
If Maven does not have

[![](http://4.bp.blogspot.com/-nD2xn81cO0E/UMxUXbDcNXI/AAAAAAAAVLc/JRj_cSTJfbM/s320/eclipse_maven_repository.png)](http://4.bp.blogspot.com/-nD2xn81cO0E/UMxUXbDcNXI/AAAAAAAAVLc/JRj_cSTJfbM/s1600/eclipse_maven_repository.png)

## Disable workspace Resolution While Project In Workspace

To reproduce this you need to projects : projectA and projectB.  
Both project use Maven.  
projectA should have a dependency on projectB.  
Set up an Eclipse workspace with both projects.  
Right click on projectA and go to "Maven ==> Disable Workspace Resolution"  
Clean / Update / Rebuild projects.  
You get a "Missing Artifact" error message.  

It seems to me that this is a bug in Eclipse's integration with Maven.  
If both projects are open in the workspace, Eclipse forces you to use Integration Resolution.  
To resolve this you must resort to closing the project you are not working on.  

[![](http://4.bp.blogspot.com/--B3p3BBEQEg/UMxV_RVIVmI/AAAAAAAAVLo/QpiqMbhKUOk/s320/maven_enable_workspace_resolution.png)](http://4.bp.blogspot.com/--B3p3BBEQEg/UMxV_RVIVmI/AAAAAAAAVLo/QpiqMbhKUOk/s1600/maven_enable_workspace_resolution.png)

