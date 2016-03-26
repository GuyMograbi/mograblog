---
title: Setting up a selenium/chrome project
published: 2011-11-26T09:40:00.001-08:00
description: setting up a project using selenium and chrome
keywords: selenium, chrome
---

<div dir="ltr" style="text-align: left;" trbidi="on"><span style="font-family: Arial, Helvetica, sans-serif;">  

# Setting up a Selenium Chrome Project

[Selenium](http://seleniumhq.org/) is an automation for GUI testing for Web Applications.  
Once you run the automation, a browser popup up, and you will see user action happen on its screen such as :  

*   Going to a URL
*   Clicking buttons
*   etc...

In order to get it running with Chrome you will need to download chrome driver and selenium. (see link below).  
I am using Maven to run Selenium.  
The basic pom will be :  

<pre class="xml" name="code"><project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://maven.apache.org/POM/4.0.0" xsi:schemalocation="http://maven.apache.org/POM/4.0.0<br />                      http://maven.apache.org/xsd/maven-4.0.0.xsd">  
  <modelversion>4.0.0  

    <groupid>com.incapsula</groupid>  
    <artifactid>selenium-automation</artifactid>  
    <version>1.0.0</version>  
    <dependencies><dependency><groupid>org.seleniumhq.selenium</groupid>  
            <artifactid>selenium-java</artifactid>  
            <version>2.13.0</version></dependency></dependencies>   
</modelversion></project>  
</pre>

Next thing, you need to set the location for the chromedriver. (a download for each download is available, so links below).  
There are several ways to specify the location.  
If you don't set it, you will get a nice error message to remind you.  

<pre>  
Exception in thread "main" java.lang.IllegalStateException: The path to the chromedriver executable must be set by the webdriver.chrome.driver system property; for more information, see http://code.google.com/p/selenium/wiki/ChromeDriver. The latest version can be downloaded from http://code.google.com/p/chromium/downloads/list  
 at com.google.common.base.Preconditions.checkState(Preconditions.java:172)  
 at org.openqa.selenium.chrome.ChromeDriverService.createDefaultService(ChromeDriverService.java:81)  
 at org.openqa.selenium.chrome.ChromeDriver.<init>(ChromeDriver.java:87)  
 at com.incapsula.selenium.SeleniumMain.main(SeleniumMain.java:19)  
 at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)  
 at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)  
 at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)  
 at java.lang.reflect.Method.invoke(Method.java:597)  
 at com.intellij.rt.execution.application.AppMain.main(AppMain.java:115)  
</init></pre>

In my code sample, you will see I set the property in the environment, and then assign it to a property.  
I suggest you place the binaries in "resources" folder as accepted in maven project.  
This way you will save the time and trouble for other developers to find/download it.  
After you take care of that, all you have left is to write your code.  
The smallest snippet of code that will allow you to see something looks something like this  

<pre class="java" name="code">  
import org.openqa.selenium.WebDriver;  
import org.openqa.selenium.chrome.ChromeDriver;  
public class SeleniumMain  
{  

 // download driver from : http://code.google.com/p/chromium/downloads/list  
 // see more on : http://code.google.com/p/selenium/wiki/ChromeDriver  
 public static void main( String[] args )  
 {  
  String webdriver_path = System.getenv( "webdriver.chrome.driver" );  
  System.out.println( "webdriver_path = " + webdriver_path );  

  String property = System.getProperty( "webdriver.chrome.driver" );  
  System.out.println( "property = " + property );  

//  System.setProperty( "webdriver.chrome.driver", webdriver_path );  

  WebDriver driver = new ChromeDriver();  
  driver.get("http://www.google.com");  
 }  
}  
</pre>

# JQuery syntax like selenium code

I've been working with JQuery for quite a while now, and I find the css selector usage to be very useful.  
In order to get something similar working with selenium, you can define some like the following :

<pre name="code" class="java">  
public WebElement $( String cssSelector )  
{  
 return driver.findElement( By.cssSelector( cssSelector ) );  
}  
</pre>

And then you can invoke code like

<pre name="code" class="java">  
$("input#username").sendKeys( "my_username" );  
$("input#password").sendKeys( "my_password" );  
</pre>

You can also wrap "WebElement" to get more JQuery like API ( for example use val() instead of "sendKeys" ).

# References

*   [Download chrome driver page](http://code.google.com/p/chromium/downloads/list)
*   [Download Selenium drivers](http://seleniumhq.org/download/)

</span></div>