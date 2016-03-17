[![](http://4.bp.blogspot.com/_J3A8WqpdCX0/S1AAfZlwtHI/AAAAAAAAAG0/vOnQsayEyiQ/s320/tomcat_maven_project_logo.png)](http://4.bp.blogspot.com/_J3A8WqpdCX0/S1AAfZlwtHI/AAAAAAAAAG0/vOnQsayEyiQ/s1600-h/tomcat_maven_project_logo.png)  
It's sometimes easier to dive into an existing project since everything is set up for you and all that is left is the fun part - coding.  
A lot of developers don't even care about the basics and the infrastructure.  

In this blog I summarize a few good things you will want to do with a webapp project in Maven, that is running under Tomcat.  
This article assumes you already downloaded Tomcat, and generate a webapp project with maven.  

<a name="more"></a>  

## SAX Parser exception

When I started my Tomcat, I got an exception (without doing anything).  
The exception wrote :  

<pre>Jan 13, 2010 5:03:11 PM org.apache.tomcat.util.digester.Digester fatalError  
SEVERE: Parse Fatal Error at line 1 column 2: Content is not allowed in prolog.  
org.xml.sax.SAXParseException: Content is not allowed in prolog.  
at com.sun.org.apache.xerces.internal.util.ErrorHandlerWrapper.createSAXParseException(ErrorHandlerWrapper.java:195)  
</pre>

and somewhere below I saw a reference to host-manager.xml.  
When I opened this file there was no xml inside, but Java code.  
I couldn't really find solutions online, and decided to simply rename the file to something else than XML suffix. It made the problem go away.  

## Changing the default welcome page

When you go to http://localhost:8080 you reach a Tomcat homepage. That's not really nice. What you want to do is go to webapps/ROOT and change the index.jsp.  

I prefer to go into WEB-INF and modify the web.xml, adding to it :  

<pre><welcome-file-list>  
    <welcome-file>my_homepage.jsp</welcome-file>   
</welcome-file-list>  
</pre>

And then I simply write my_hompage. which is always the same for me :  

<pre>Available locations here are :  

<div>

<div>

<div><%!</div>

<div>public String show(String webapp, HttpServletRequest request) {</div>

<div>String location = request.getRequestURL().toString() + webapp;</div>

<div>return "["+webapp+"](\""+)";</div>

<div>}</div>

<div>%></div>

<div>Available locations here are :  
</div>

<div><%=show("app1", request)%>  
</div>

<div><%=show("app2", request)%>  
</div>

<div><%=show("app3", request)%>  
</div>

</div>

</div>

</pre>

All you need to do is change app1,app2,app3 to some real context paths you have in your Tomcat and spice this page with some CSS.  

If you have only one webapp, you can simply redirect.  

## Deploying the application

When I click install, I want my WAR to reach the local Tomcat.  
It seems that Tomcat wrote a nice HTTP API for such things.  
But before you can use it, go to conf/tomcat-users.xml.  

If there's no user with manager role, add something like the following  

And now try the following address :  

<pre>http://localhost:8080/manager/list  
</pre>

When you are prompted for user/pass simply type the _admin admin_, or whichever name/pass you wrote in tomcat-users.xml file.  

This will show you a list of all running applications. In my case it showed me the following :  

<pre>OK - Listed applications for virtual host localhost  
/:running:0:ROOT  
/manager:running:0:D:/dev_env/tomcat-5.5/server/webapps/manager  
/webdav:running:0:webdav  
/servlets-examples:running:0:servlets-examples  
/guy_mograbi:running:0:guy_mograbi  
/tomcat-docs:running:0:tomcat-docs  
/jsp-examples:running:0:jsp-examples  
/balancer:running:0:balancer  
</pre>

So in just the same way, you can deploy a war.  

Add the following to your pom.xml  

<pre>

<div>

<div>    <groupid>org.codehaus.mojo</groupid></div>

<div>    <artifactid>tomcat-maven-plugin</artifactid></div>

<div>    <configuration></configuration></div>

<div>        <path>/guy_mograbi</path></div>

<div>        <username>admin</username></div>

<div>        <password>admin</password></div>

<div>        <update>true</update></div>

<div>        <charset>UTF-8</charset></div>

<div>            <goals></goals></div>

<div>                <goal>deploy-only</goal></div>

<div>            <phase>install</phase></div>

</div>

</pre>

What we see here is :  

*   Invocation of maven-tomcat-plugin with goal deploy-only
*   path - the context of your application. By default it is the artifactId, in my case I had to override it, however you might want to use the default
*   admin/username - like in tomcat-users.xml.
*   charset - just to be on the safe side, I decided to add UTF-8\. My site supports many languages. However I did not check if this is really necessary
*   execution happens on _install_ phase

I left the "list" goal there for you to try. The output should be the same as when you tried it in the browser.  

## I18N support

I think it is always wise to have multi-language support, even if you don't use it.  

I always do the following just to make sure things will go smoothly :  

*   In my jsps I make sure the following line is in the header  

*   In conf/server.xml I make sure that Connector on port 8080 has the attribute  

    <pre>URIEncoding="UTF-8"</pre>

    . Some of you might prefer  

    <pre>useBodyEncodingURI="true"</pre>

    although I recommend the first one.
*   Put all your resources in property bundles - use the folder src/main/native2ascii. Use the ResourceBundle to read them. - IDEs also have a nice support so it's a good way to go. However, in order to make it work, you will need to use the native2ascii plugin like this :  

    <pre>

    <div>    <groupid>org.codehaus.mojo</groupid></div>

    <div>    <artifactid>native2ascii-maven-plugin</artifactid></div>

    <div>    <version>1.0-alpha-1</version></div>

    <div>            <goals></goals></div>

    <div>                <goal>native2ascii</goal></div>

    <div>            <configuration></configuration></div>

    <div>                <dest>src/main/resources/i18n/Resources</dest></div>

    <div>                <encoding>UTF8</encoding></div>

    <div>            <phase>process-resources</phase></div>

    </pre>

The only thing you might want to change is the "dest" property.  

## That's all

Ok, now you're good to go. Have fun coding.