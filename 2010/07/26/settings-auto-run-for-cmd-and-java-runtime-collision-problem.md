<div class="separator" style="clear: both; text-align: center;">[![](http://www.iconspedia.com/uploads/1250639072811966051.png)](http://www.iconspedia.com/uploads/1250639072811966051.png)</div>

A few days ago I wanted to change the folder my command processor opens at.  
So I ran into [this](http://www.computing.net/answers/windows-xp/changing-cmd-prompt-directory/139132.html) article.  
Which basically says the following :  

*   Open Regedit  

*   Navigate to "HKEY_CURRENT_USER\Software\Microsoft\Command Processor" - You can search (ctrl+f)for "command processor"  

*   In the right hand panel, modify Autorun. If there is no Autorun present right click , New ==> String Value  

*   Call it Autorun and type “cd\” if you want to set it to C: (provided Windows in installed on C drive). Say to want it to be C:\togo, type cd\togo.  

And then I discovered a problem.  

# Problem when running Runtime.execute in Java

I was surprised to discover that this settings cause a problem in Java Code that open new Runtime and executes a command.  

<pre>Runtime rt = Runtime.getRuntime();  
rt.exec("cmd /c dir");  
</pre>

It turns out the folder I am diring is the folder set at AutoRun.  
For example if I am running the java code from "c:\myJavaCode\test\forBlogPost" but my Auto-Run is set to "c:\autorun" , then I will dir "c:\autorun" - and it is quite obvious when you think about it.  

The solution is to add "/D" to the command which will make is  

<pre>cmd /D /c  dir  
</pre>

the /D option ignores AutoRun scripts.  

I wrote the following code for you to copy paste  

<pre class="java" name="code">@Test  
    public void tempTest() throws IOException {  
        Runtime r = Runtime.getRuntime();  
        Process process = r.exec("cmd /D /c  dir");  
        BufferedReader reader = new BufferedReader(new    InputStreamReader(process.getInputStream()));  
        String line;  
        while ((line = reader.readLine()) != null){  
            System.out.println("line = " + line);  
        }  
    }  
</pre>

You can read more about cmd options by running "cmd /?" and I also found [this](http://ss64.com/nt/cmd.html) nicely edited page for you.  

# Best Practice

From now on, whenever you will run a process that runs a command, there is a dilemma whether to ignore AutoRun or not..  

In these situations I always like to implement BOTH(!), so I read a system variable or a property file that can disable it.  

Since this command is for windows, and you probably want to support other OS as well, it is a good idea to export the entire command to a property file all together.  

# References

*   [Source](http://www.computing.net/answers/windows-xp/changing-cmd-prompt-directory/139132.html)  

*   [cmd Reference page](http://ss64.com/nt/cmd.html)