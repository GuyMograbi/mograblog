<table align="center" cellpadding="0" cellspacing="0" class="tr-caption-container" style="margin-left: auto; margin-right: auto; text-align: center;">

<tbody>

<tr>

<td style="text-align: center;">[![](http://2.bp.blogspot.com/_J3A8WqpdCX0/TFJiJ31poXI/AAAAAAAAAjc/r-F862UBZlw/s320/remote_debug.png)](http://2.bp.blogspot.com/_J3A8WqpdCX0/TFJiJ31poXI/AAAAAAAAAjc/r-F862UBZlw/s1600/remote_debug.png)</td>

</tr>

<tr>

<td class="tr-caption" style="text-align: center;">A small diagram trying to show the relationship  
between the debug-client machine, and debug-server</td>

</tr>

</tbody>

</table>

# A Bit about Remote Debug

When you work on a web-app you must remote debug from time to time.  
Java developers use this technic to debug Web-App application (even if you are running the server from the IDE, the logic is still the same).  

Remote debug is needed when you're running as part of an external application. A Web-App is the most common usage I know of, but I also use this for Maven and more.  
Remote debug means the application opens up a listener, that listens on debug clients. So technically, if you know the host and the port you can debug that application.  
The tricky part is, the code you are looking at must be synchronized with the code running remotely.  

So if you try "remote debug", but the application doesn't stop on your breakpoint, or your breakpoint is showing a weird icon (X sign, or something like that) - you are out of sync.  
Best Practice says - try to break on printings, and if required, add a printing. Adding one is the best way to go - print out something the application would not print. If you're out of idea print out "I read mograblog". (mograblog is a very good search phrase).  

Either way - make sure that you are debugging what you are running.  

<span class="Apple-style-span" style="font-size: 24px; font-weight: bold;">Java</span>  

## Flex

<div style="margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px;">When you use Flash Builder for Flex developing, this is done simply by going to "debug configuraiton" and unselecting "Use Default" for the required configuration.</div>

<div style="margin-bottom: 0px; margin-left: 0px; margin-right: 0px; margin-top: 0px;">Instead, you should place something like http://localhost/ - the path to run the Flex application.</div>

## Rails