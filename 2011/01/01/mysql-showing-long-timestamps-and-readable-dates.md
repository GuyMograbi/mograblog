A while ago I had to find a certain date in the database, but the date column was defined as LONG.  
I discovered you can easily turn a LONG to a date, using the following syntax :  

<pre class="sql" name="code">select startTime, FROM_UNIXTIME(startTime / 1000) , UNIX_TIMESTAMP() from LiveSessionDetails limit 1;  
</pre>

NOTE that you have to divide the LONG value by a 1000 otherwise you get a blank value.