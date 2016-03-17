<div dir="ltr" style="text-align: left;" trbidi="on">I just resolved some error I've been dealing for quite a while.  

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">The Context</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">In the last few days I've been trying to set up my sites on a VPS, hosted on [a2hosting.com](http://a2hosting.com/). </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">So far I have to say I am very impressed. But I will write another post for that. </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">The OS chosen was CentOS, and so I had to learn how to set things on CentOS. </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">It wasn't hard at all. There's a lot of documentation. </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">I've set a LAMP bundle called [lampstack by bitnami](http://bitnami.org/stack/lampstack) - in which you get mysql ( which is the M in LAMP )</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">Later I installed [RoR environment](http://rubyonrails.org/) and with it I guess mysql was installed again.  </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">The Problem</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">When I tried to run the rails server, I had problems connecting to mysql. </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">I ran the command "mysql" to check what is going on, but got the following message </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">ERROR 2002 (HY000): Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">After some digging around, I discovered the malformed file was "/etc/my.cnf". </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">  
</span>  
<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">The Solution</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">At first I tried to modify the file as I saw fit. </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">However, the solution is much more simpler than that.. </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">All you have to do it copy the file </span>  
<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">/opt/lampstack-5.3.6-0/mysql/my.cnf</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">to </span>  
<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">/etc/my.cnf</span>  
<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;">  
</span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">That took care of things. </span>  
<span class="Apple-style-span" style="font-family: Times, 'Times New Roman', serif;">Now, I could connect to mysql properly. </span></div>