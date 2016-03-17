<div class="mograblog">

Recently I am occupied by automations.  
I want to upgrade and troubleshoot as automatically as possible.  
If my backend needs a reboot for some odd reason, I want it to be available from some CI tool.  

To accomplish this I have 2 options:

*   Since a lot of CI tools have server and agents, I can install an agent on my remote machine and execute commands on that agent.
*   Use SSH to execute remote commands

The first option is not really relevant in most places and... well basically is not recommended for many reasons. (security anyone?)

Using SSH is a good solution but will require some work if you are using Windows.  
Windows or not is sometimes not up to you.  

# Our use case

For this post, lets assume I want to restart a service called "myservice". The command I need to run is

<pre>service myservice restart</pre>

<div class="warning">This post does not explain the reason why it works simply because I do not know.  
However, it does describe problems I encountered and solutions I found.  
If anyone can please contribute a better insight as to why, it will be greatly appreciated.  
</div>

# Using Unix

If you use unix, your life are simple, simply configure your SSH at

<pre>/etc/ssh/ssh_config</pre>

and write something like so

<pre>ssh myhost -t "service myservice restart"</pre>

Make sure you use the -t flag to enable pty. read below for more information.

# Using Windows

You can do something similar in windows, however you will need to approve the host on the first time and only then it will work.  
Since SSH is not available on windows, you should use something like plink instead.  
Again - make sure you use -t flag to enable pty. read below for more information.  
I could not make it work on windows no matter what I did. This is why I used NodeJS.  

# I Use NodeJS

Since I don't like unix specific solutions or windows specific solutions I have embraced NodeJS.  
[NodeJS has an SSH library](https://github.com/mscdex/ssh2 "NodeJS SSH Library") that should work fine on unix and windows.  
It has great documentation and you won't find it hard to use. It also prints output very well  
Make sure you transfer

<pre>{pty: true}</pre>

on the `exec` options. read below for more information

# Enabling PTY is important

For all the tools I mentioned above it seems important to turn PTY on.  
When PTY is off (by default) the automation will sometimes get stuck.  
When I manually ssh and run a restart I get output that looks like so

<pre>  
$ service myservice restart  

  stopping myservice               [OK]  

  starting myservice               [OK]  

  </pre>

When I use PTY, I get the same output.  
However without PTY I do not see the lines above, instead - I see the output of my "start" implementation.  
In my case - I am running nodejs server, so I see the log prints I wrote in server.js.

# I strongly recommend Using NodeJS

NodeJS is a great tool for automations simply because you can commit your dependencies along with your scripts.  
In my case, I have an "upgrade.js" script that uses SSH. For that, I need ssh2 library.  
I use `npm install ssh2` and I commit everything to some SVN.  
Then, my CI tool checks out this SVN location, and runs the script.  
Other than installing nodeJS on the agent's machine I don't need anything else.  
If I need another library from npm, I simply commit it and I do not need to modify the agent's machine again.

</div>