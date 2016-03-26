---
title: "Quickly resolving RuntimeException: No join columns"
published: 2013-04-15T13:28:00.000-07:00
description: here is what you can do when you run into "no join columns" error
keywords: playframework
---

<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# Quickly Resolving RuntimeException: No join columns

So it is late at night, and I am working over the weekend again..  
Creating a OneToOne relationship with EBean and exporting schema to create schema upgrade script  
when all of a sudden, I get an exception I have never seen before.  
Since it took me a couple of minutes to figure it out - maybe too late at night? - I decided to post  
the problem and the solution.

The stack trace I got is pasted below.  
The solution is that I was missing primary key on one of my models.  
Make sure you have primary keys, and everything should be fine.  

Please note that in Play!Framework 2.0, it is not enough to extend Model,  
you must declare a primary key by yourself.  

<pre class="prettyprint">  
@Id   
public Long id;  
</pre>

<pre>  
play.core.ActionInvoker$anonfun$receive$1$anon$1: Execution exception [[RuntimeException: No join columns for models.Widget.icon]]  
        at play.core.ActionInvoker$anonfun$receive$1.apply(Invoker.scala:134) [play_2.9.1.jar:2.0.4]  
        at play.core.ActionInvoker$anonfun$receive$1.apply(Invoker.scala:115) [play_2.9.1.jar:2.0.4]  
        at akka.actor.Actor$class.apply(Actor.scala:318) [akka-actor.jar:2.0.2]  
        at play.core.ActionInvoker.apply(Invoker.scala:113) [play_2.9.1.jar:2.0.4]  
        at akka.actor.ActorCell.invoke(ActorCell.scala:626) [akka-actor.jar:2.0.2]  
        at akka.dispatch.Mailbox.processMailbox(Mailbox.scala:197) [akka-actor.jar:2.0.2]  
        at akka.dispatch.Mailbox.run(Mailbox.scala:179) [akka-actor.jar:2.0.2]  
        at akka.dispatch.ForkJoinExecutorConfigurator$MailboxExecutionTask.exec(AbstractDispatcher.scala:516) [akka-actor.jar:2.0.2]  
        at akka.jsr166y.ForkJoinTask.doExec(ForkJoinTask.java:259) [akka-actor.jar:2.0.2]  
        at akka.jsr166y.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:975) [akka-actor.jar:2.0.2]  
        at akka.jsr166y.ForkJoinPool.runWorker(ForkJoinPool.java:1479) [akka-actor.jar:2.0.2]  
        at akka.jsr166y.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:104) [akka-actor.jar:2.0.2]  
Caused by: java.lang.RuntimeException: No join columns for models.Widget.icon  
        at com.avaje.ebeaninternal.server.ddl.CreateTableColumnVisitor.visitOneImported(CreateTableColumnVisitor.java:99) ~[ebean.jar:na]  
        at com.avaje.ebeaninternal.server.ddl.VisitorUtil.visit(VisitorUtil.java:109) ~[ebean.jar:na]  
        at com.avaje.ebeaninternal.server.ddl.VisitorUtil.visit(VisitorUtil.java:73) ~[ebean.jar:na]  
        at com.avaje.ebeaninternal.server.ddl.VisitorUtil.visitBean(VisitorUtil.java:62) ~[ebean.jar:na]  
        at com.avaje.ebeaninternal.server.ddl.VisitorUtil.visit(VisitorUtil.java:36) ~[ebean.jar:na]  
        at com.avaje.ebeaninternal.server.ddl.VisitorUtil.visit(VisitorUtil.java:22) ~[ebean.jar:na]  
        at com.avaje.ebeaninternal.server.ddl.DdlGenerator.generateCreateDdl(DdlGenerator.java:148) ~[ebean.jar:na]  
</pre>

</div>