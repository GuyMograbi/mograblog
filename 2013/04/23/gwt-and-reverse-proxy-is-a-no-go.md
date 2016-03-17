<div dir="ltr" class="mograblog" style="text-align: left;" trbidi="on">

# GWT Behind Reverse Proxy - When Serialization Policy Is Not Found

## Quick Problem Description

Recently I ran into a strange problem when running a GWT project behind [reverse proxy](http://en.wikipedia.org/wiki/Reverse_proxy "Reverse Proxy").  
Here is a full stack trace of the problem

<pre class="prettyprint">  
ERROR: The serialization policy file 'STRANGE_STRING.gwt.rpc' was not found; did you forget to include it in this deployment?  
WARNING: Failed to get the SerializationPolicy '5D067F2D73BCCF64A689D09A6C7C3D1E' for module 'http://localhost/module'; a legacy, 1.3.3 compatible, serialization policy will be used.  You may experience SerializationExceptions as a result.  
ERROR: The serialization policy file '3843CF05B607363D963BC91346CB2896.gwt.rpc' was not found; did you forget to include it in this deployment?  
WARNING: Failed to get the SerializationPolicy '3843CF05B607363D963BC91346CB2896' for module 'http://localhost/module/'; a legacy, 1.3.3 compatible, serialization policy will be used.  You may experience SerializationExceptions as a result.  
:WARN:/:Exception while dispatching incoming RPC call  
com.google.gwt.user.client.rpc.SerializationException: Type 'com.MyType' was not assignable to 'com.google.gwt.user.client.rpc.IsSerializable' and did not have a custom field serializer.For security purposes, this type will not be serialized.: instance = com.MyType@2501e081  
        at com.google.gwt.user.server.rpc.impl.ServerSerializationStreamWriter.serialize(ServerSerializationStreamWriter.java:619)  
        at com.google.gwt.user.client.rpc.impl.AbstractSerializationStreamWriter.writeObject(AbstractSerializationStreamWriter.java:126)  
        at com.google.gwt.user.server.rpc.impl.ServerSerializationStreamWriter$ValueWriter$8.write(ServerSerializationStreamWriter.java:153)  
        at com.google.gwt.user.server.rpc.impl.ServerSerializationStreamWriter.serializeValue(ServerSerializationStreamWriter.java:539)  
        at com.google.gwt.user.server.rpc.RPC.encodeResponse(RPC.java:616)  
        at com.google.gwt.user.server.rpc.RPC.encodeResponseForSuccess(RPC.java:474)  
        at com.google.gwt.user.server.rpc.RPC.invokeAndEncodeResponse(RPC.java:571)  
        at com.google.gwt.user.server.rpc.RemoteServiceServlet.processCall(RemoteServiceServlet.java:208)  
        at com.google.gwt.user.server.rpc.RemoteServiceServlet.processPost(RemoteServiceServlet.java:248)  
        at com.google.gwt.user.server.rpc.AbstractRemoteServiceServlet.doPost(AbstractRemoteServiceServlet.java:62)     
  </pre>

## Quick And Dirty Solution

You should go over all your "implements Serializable" classes and make them implement "IsSerializable" as well.  
**NOTE:** Enums should implement IsSerializable as well!  

So for every enum you add now, you have to make sure it implements "IsSerializable" too.  
This is not nice.  
A nicer solution would be if you make a hierarchy in your servlet.  
Make "MyRemoteServiceServlet" extend GWT's "RemoteServiceServlet".  
Let all you services extends "MyRemoteServiceServlet" instead.  
In "MyRemoteServiceServlet" override the method "doGetSeriazliationPolicy"  
and call the super while passing the correct value for moduleBaseURL  
Finding out the correct value should not be so hard.  
Comment below if you experience problems finding out the correct value, I will specify a "how to" on this.

## Why Do I Need To Modify The Code?

What bugs me most in this issue is that reverse proxies should be transparent.  
This means you should be able to add them independently to what runs behind them.  
If the solution is to modify the code, it means you have to be aware of a reverse proxy scenario.  
This means you need to run tests on it and check for regressions and new features for reverse proxy support.  
This sucks. It is obviously a GWT bug and hence GWT sucks.  
Well, [GWT actually ROCKS](https://code.google.com/p/playn/ "PlayN - cross platofrm game library on top of GWT"), they just made a lame decision about this issue.  
This bug appeared in version 2.4.0, and I know there is version 2.5.0 already out so you may check that one too.  

## Why Use IsSerializable If Serializable Works Too?

According to [GWT's documentation on Serializable](https://developers.google.com/web-toolkit/doc/latest/FAQ_Server#Does_the_GWT_RPC_system_support_the_use_of_java.io.Serializable "GWT documentation") GWT in versions  
prior to 1.4 did not support serializing objects that implement "Serializable", only object that implement  
"IsSerializable". However, the community wanted to reuse code they already had with "Serializable".  
So GWT had a good intention by supporting "Serializable" only they apparently did this poorly.  

It doesn't take long to figure out where the code breaks.  
Looking at "RemoteServiceServlet" which all GWT controllers should extend,  
you can see the following method signature

<pre class="prettyprint">  
 static SerializationPolicy loadSerializationPolicy(HttpServlet servlet,  
      HttpServletRequest request, String moduleBaseURL, String strongName) {  
  </pre>

Which is called from a single place in RemoteServiceServlet.

<pre class="prettyprint">  
  protected SerializationPolicy doGetSerializationPolicy(  
      HttpServletRequest request, String moduleBaseURL, String strongName) {  
    return loadSerializationPolicy(this, request, moduleBaseURL, strongName);  
  }     
  </pre>

The value of "moduleBaseURL" is wrong when it is behind a reverse proxy, and I will explain  
exactly why in just a second.  
Right now, we can something interesting, since this method is protected  
this means we can override this method to resolve the issue as well.  
If we were to create our own "Remote" servlet and let all services extend that one  
like good developers do, we could simply override this method, inject hard coded "moduleBaseURL" and be  
done with it..  
However not all projects work properly, some let all their services extend RemoteServiceServlet directly.  

## Why moduleBaseURL Has A Wrong Value

The reason moduleBaseURL gets the wrong value, is because its value is transfered in the request BODY!.  
The decision to pass such a value in the request body is a poor decision made by GWT.  
Perhaps there are considerations I am not aware of - please comment below if you know of such  
Since it is passed in the body, this means its value is decided on client side.  
Client side URLs are decided by the reverse proxy, and consequently the back-end is affected by the  
reverse proxy as well.  
You cannot configure the reverse proxy to override the request body to fix this issue.  

## Why Is moduleBaseURL So Important?

GWT verifies that objects are serializable before serializing them.  
They do so by defining a SerializationPolicy - which they fail to load when moduleBaseURL is wrong.  
In such scenarios, GWT uses a fallback called "LegacySerializationPolicy" - which was written in version 1.3  
and does not support Serializable interface, but only "IsSerializable".  

## How To Configure A Reverse Proxy

This post is not about reverse proxy as it is about GWT.  
However, if you want to quickly configure Apache for a reverse proxy on your GWT, here is a configuration sample  

<pre class="prettyprint">  
#read more about reverse proxy at:   
# http://www.apachetutor.org/admin/reverseproxies  
NameVirtualHost *:80  
<virtualhost *:80="">  
  ProxyPass /reverseproxy/ http://127.0.0.1:8888/   
  ProxyPassReverse /reverseproxy/ http://127.0.0.1:8888/   
        ProxyPreserveHost on  
        ErrorLog "logs/my-error_log"  
        CustomLog "logs/my-access_log" common  
</virtualhost>  
  </pre>

Now, if you access your GWT webapp by going to "http://localhost:8888/My_Module.html?gwt.codesrc=127.0.0.1"  
the reverse proxy also exposes port 80 with the following URL "http://localhost/reverseproxy"  
You can modify the relative path "reverseproxy" as you see fit just sure Apache and the URL are aligned.  

# Conclusion

GWT has a bug when you run behind a reverse proxy.  
This bug requires a code change to resolve.  
You can simply add "implements IsSerializable" on all your serializable objects (enums included)  
or you can make all your services extend your own RemoteServiceServlet and override  
the "doGetSerializationPolicy" method while passing the correct value for "moduleBaseURL".

</div>