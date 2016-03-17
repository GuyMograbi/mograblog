<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# Integration Between Maven And Eclipse Sucks

<div>

Even though I don't support working from the IDE, I have to give support to developers that do.  
For example, when I assimilate Maven into the project, I must make sure all workspaces adjust accordingly.  
Even though Maven has support for ".project" file auto-generation, there are still so many problems along the way that I have to sit down with each and help resolve all the issues.  
In the last project, I assimilated Maven into a GWT project.  
This project has dependencies of GWT module type.  
These dependencies are simple jars, however, GWT compiler needs their sources in order to use them later on.  
All in all I came across 7 different problems. I will show you how I resolved 4 problems  
The other problems are related to GWT not synchronizing with Maven.  
It is important to note, I did not come across any problems while working with Intellij. Intellij's approach is to enable console commands from the IDE, while Eclipse's approach is to hide Maven in the background. This is the main reason why Intellij introduces less problems.

Here is a list of all the problems I resolved. Note that I gathered 2 problems into 1 post.

*   [Maven Ignores My Maven Settings](/2012/12/eclipse-ignores-maven-settings.html "Maven Ignores My Maven Settings")
*   [Missing Artifacts ( 2 in the price of 1 )](/2013/01/troubleshooting-missing-artifact-in.html "Missing Artifacts")
*   [Maven Update Causes "Unsupported IClasspathEntry kind=4"](http://stackoverflow.com/questions/10564684/how-to-fix-error-updating-maven-project-unsupported-iclasspathentry-kind-4 "stack overflow thread about iclasspathentry kind 4") - A link to stackoverflow. I cannot write something better than the solution they give there.

## Why I Love Intellij

Numerous problems like these in Eclipse are the reason why I love Intellij so much.  
It's not that you don't experience problems with Intellij, you do, but it is quite rare.  
Intellij came up with a simple yet powerful solution for the entire Maven integration.  
Intellij presents a simple view for all Maven goals and phases.  
If you want to invoke a plugin, you should do it via the Maven configuration.  
So technically Intellij simply provides a cool GUI for console commands.  
Combined with the "profiles" feature in Maven, you can easily run Maven commands specific for development  
Most common use case is the "skipTests" flag.  
When you develop, you usually run install without tests for a while, and after a while you can run all the tests.  

Intellij's take on Maven aligns to my [Workspace Best Practice](/2012/12/proper-workspace-1.html "Workspace Best Practice Part 1") paradigm that says you should not do everything from the IDE as the IDE usually has different configuration than production.  
Sure I invoke the command from Intellij, but in Intellij's case, it executes exactly as it would on the command line, with minimum IDE interference.

To be fair, Intellij does not lack problems.  
To share a few, it always adds "resources" folder to the project's source roots. This is a bit annoying as in some scenarios it requires files at "resources" to be compiled. Resources does not contain code, hence it is note logical to mark it as such.  
I have a Java project with some groovy resources that contain illegal groovy code. Strange, I admit, but necessary. Every time I modify the Maven dependencies, I start getting compilation errors. I would like to know how to tell Intellij to ignore Groovy files in certain projects.

</div>

</div>