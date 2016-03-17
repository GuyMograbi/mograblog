# Installing

[Download the flex SDK](http://www.adobe.com/cfusion/entitlement/index.cfm?e=flex3sdk).  
Run Maven command -- add your artifact details (id,group,version) as needed :  

<pre>mvn archetype:create -DarchetypeArtifactId=maven-archetype-flex -DarchetypeVersion=1.0 -DarchetypeGroupId=dk.jacobve.maven.archetypes  -DgroupId=multiModuleProjectId</pre>

Basically you're "good to go" but ... keep reading  

# To Do

## Configure Plugin

The flex pom.xml is configured with Main.mxml.  

For some reason, I got a wrong value there after project generation. This is a file path (not class name) so simply add path/Main.mxml.  

## Configure XSD

I use Intellij's community edition to learn flex. So in order to write MXML quickly, I find it useful to configure the XSD's location. I am sure the xsd is somewhere in the SDK but I couldn't find it. You can find the XSD in [google code.](http://xsd4mxml.googlecode.com/files/flex3.xsd) So simply add the following to the Application element.  

<pre>xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
  xsi:schemaLocation="http://www.adobe.com/2006/mxml  
  http://xsd4mxml.googlecode.com/files/flex3.xsd"  
</pre>

And then you will be able to tell intellij to fetch it automatically.  

# Integrating with your application

The packaging of the project is swf. So in order to display it on the web, you will need an HTML and an object tag in order to show it.