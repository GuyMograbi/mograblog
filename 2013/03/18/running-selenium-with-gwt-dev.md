<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# Running Selenium With GWT Dev

For those who are still stuck with GWT,  
if you have Selenium tests, you should get your tests to run on GWT dev mode.  
It will save you the GWT compile time (which can be minutes!)  
and make your GWT bug fix process faster (by minutes!).  
The code I will show here is relevant for Chrome and Firefox.  

# Chrome

<pre class="prettyprint">  
ChromeOptions options = new ChromeOptions();  
options.addExtensions( getResourceLocation( gwtChromeDevCrx ) );  
DesiredCapabilities desired = DesiredCapabilities.chrome();  
desired.setCapability( "chrome.switches", Arrays.asList( "--start-maximized" ) );  
desired.setCapability( ChromeOptions.CAPABILITY, options ); // add the gwt dev plugin  

ChromeDriverService chromeService = new ChromeDriverService.Builder().usingAnyFreePort().usingDriverExecutable( getResourceLocation( chromeDriverPath ) ).build();  
logger.info( "Starting Chrome Driver Server..." );  
chromeService.start();  
webDriver = new RemoteWebDriver( chromeService.getUrl(), desired );  
 </pre>

In the code above, you can see I am add an extension to ChromeOptions and  
later I add the chrome options to the desired capabilities.  

## Downloading The GWT Dev Chrome Extensions

I had problems downloading the chrome extension (crx file) for get dev.  
For that, I browsed the chrome store and found the GWT extension.  

<div style="font-family: 'Courier New', 'Lucida Console'; ">https://chrome.google.com/webstore/detail/gwt-developer-plugin/<span style="color:red">jpjpnpmbddbjkfaccnmhnkdgjideieim</span>?hl=en</div>

Then I copied the item ID. (marked in red)  
Then I opened the following URL in firefox

<div style="font-family: 'Courier New','Lucida Console';">https://clients2.google.com/service/update2/crx?response=redirect&x=id%3D<span style="color:red">jpjpnpmbddbjkfaccnmhnkdgjideieim</span>%26uc</div>

Now all is left is to store it somewhere and set the gwtChromeDevCrx to point to it.

# Firefox

<pre class="prettyprint">  
FirefoxProfile profile = new FirefoxProfile();  
profile.addExtension( getResourceLocation( gwtFirefoxDevXpi ) );  
webDriver = new FirefoxDriver( profile );  
 </pre>

As you can see, initializing Firefox is easier.  
The Firefox plugin (xpi file) is available for download at google code.  
[GWT Dev Plugin Download At Google Code](https://code.google.com/p/google-web-toolkit/downloads/list?can=2&q=xpi "GWT Dev Plugin Download At Google Code")  
Store it somewhere and make gwtFirefoxDevXpi point to it.  

# Troubleshooting

I had 2 problems while writing this code.  
Both were resolved by upgrades.  

## unable to initialize chrome ['tab_index' missing or invalid (WARNING: The server did not provide any stacktrace information)

When you try to run with Chrome and GWT dev mode, you might get this error.  
Simply [upgrade your chrome driver](https://code.google.com/p/chromedriver/downloads/list "Download Chrome Driver").  

## LdrLoadDll: Blocking load of 'babyfox.dll'

Actually I am not sure if this is the error. Might be just an info print.  
The entire stack is something like this

<pre>  
org.openqa.selenium.firefox.NotConnectedException: Unable to connect to host 127.0.0.1 on port 7055 after 45000 ms. Firefox console output:  
*** LOG addons.manager: Application has been upgraded  
*** LOG addons.xpi: startup  
*** LOG addons.xpi: Skipping unavailable install location app-system-local  
*** LOG addons.xpi: Skipping unavailable install location app-system-share  
*** LOG addons.xpi: Ignoring file entry whose name is not a valid add-on ID: C:\Users\userId\AppData\Local\Temp\anonymous2657623847203509192webdriver-profile\extensions\webdriver-staging  
*** LOG addons.xpi: checkForChanges  
*** LOG addons.xpi-utils: Opening database  
*** LOG addons.xpi-utils: Creating database schema  
*** LOG addons.xpi: New add-on fxdriver@googlecode.com installed in app-profile  
*** Blocklist::_loadBlocklistFromFile: blocklist is disabled  
*** LOG addons.xpi: New add-on {82AF8DCA-6DE9-405D-BD5E-43525BDAD38A} installed in app-global  
*** LOG addons.xpi: New add-on {972ce4c6-7e08-4474-a285-3208198ce6fd} installed in app-global  
*** LOG addons.xpi: New add-on {BBDA0591-3099-440a-AA10-41764D9DB4DB} installed in winreg-app-global  
*** LOG addons.xpi: Updating database with changes to installed add-ons  
*** LOG addons.xpi-utils: Updating add-on states  
*** LOG addons.xpi-utils: Writing add-ons list  
*** LOG addons.manager: shutdown  
*** LOG addons.xpi: shutdown  
*** LOG addons.xpi-utils: shutdown  
*** LOG addons.xpi-utils: Database closed  
*** LOG addons.xpi: startup  
*** LOG addons.xpi: Skipping unavailable install location app-system-local  
*** LOG addons.xpi: Skipping unavailable install location app-system-share  
*** LOG addons.xpi: Ignoring file entry whose name is not a valid add-on ID: C:\Users\userId\AppData\Local\Temp\anonymous2657623847203509192webdriver-profile\extensions\webdriver-staging  
*** LOG addons.xpi: checkForChanges  
*** LOG addons.xpi: No changes found  
LdrLoadDll: Blocking load of 'babyfox.dll' -- see http://www.mozilla.com/en-US/blocklist/  

 at org.openqa.selenium.firefox.internal.NewProfileExtensionConnection.start(NewProfileExtensionConnection.java:106)  
 at org.openqa.selenium.firefox.FirefoxDriver.startClient(FirefoxDriver.java:244)  
 at org.openqa.selenium.remote.RemoteWebDriver.<init>(RemoteWebDriver.java:110)  
 at org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:188)  
 at org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:183)  
 at org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:179)  
 at org.openqa.selenium.firefox.FirefoxDriver.<init>(FirefoxDriver.java:92)</init> </init></init></init></init></pre>

This is a Firefox vs. Selenium bug.  
To fix this, upgrade your selenium.  
Since every environment has a different FF version,  
I suggest you simply create Maven profiles. Something like this:

<pre>  
 <profile><id>firefox_19</id> <properties> <selenium.version>2.30.0</selenium.version> </properties></profile>   
 <profile><id>firefox_17</id> <properties> <selenium.version>2.28.0</selenium.version> </properties></profile>     
  </pre>

</div>