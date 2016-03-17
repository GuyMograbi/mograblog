<div class="mograblog" dir="ltr" style="text-align: left;">

# Fail Safe - go.sh Script

<div>

As I am deploying my [Steps Project Manager application](http://steps.mograbi.info) on a Unix host, I came across some failures.  
The application would stop work for some reason - nothing is written to the log.  

Since this is just a hobbie, and not my daily job, and since this application has only 40 users so far,  
hat only 2-3 of them (besides me) actually use it.. I decided on a brute force solution.  

A friend helped me to write a script that runs "forever" and keeps my application up.  

<pre class="prettyprint">  
#!/bin/bash   

while true ; do   
ruby script/server -e production &> res.out    
done   

  </pre>

My session information is saved in a cookie, so I will not lose it.

</div>

</div>