<style>pre{ background: #CECECE; padding:20px; border-radius:10px; } code {background: black; color:white;}</style>  

try running the following query on a MYSQL instance running on windows  

<pre>CREATE TABLE `GUY` (  

  `id` bigint(20) NOT NULL AUTO_INCREMENT,  

  PRIMARY KEY (`id`)  

) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;  

</pre>

You get a table named "guy" (lower case) instead of "GUY". (upper case)  
As it turns out, mysql in windows in case insensitive as opposed to Unix.  

You might resort to changing the schema or adjusting your code, but it seems there is a solution to the problem.  
After reading [MySql documentation](http://dev.mysql.com/doc/refman/5.0/en/identifier-case-sensitivity.html), I found the following  

<pre>How table and database names are stored on disk and used in MySQL is affected by the lower_case_table_names system variable, which you can set when starting mysqld. lower_case_table_names can take the values shown in the following table. On Unix, the default value of lower_case_table_names is 0\. On Windows the default value is 1\. On Mac OS X, the default value is 2.  
</pre>

And below that is a table that elaborates on each value.  

They don't recommend using "0" value for windows, if you are using MyISAM engine, however I always use InnoDB, so in my case I simply set that parameter to 0\.  

# How to set lower_case_table_names in Windows

Since I am using a service to run mysql, I had to figure out how to modify the properties for the service.  
When I tried right clicking "properties" and add "start parameters" I discovered those parameters are deleted every time, which meant I had to reenter them manually.  

You can achieve the same by changing the file "my.ini" found by default at `c:\Program Files\Mysql\Mysql-version\my.ini`  

This file needs Administration permissions to edit it ==> So you might want to start notepad++ as admin (right click , run as admin) and then open the file from within notepad++.  

simply add the line  

<pre>lower-case-table-names=0  
</pre>

Now restart the service and rerun the query. Make sure the table name is "GUY" and not "guy".  

# Deprecation ALERT!!!

If it doesn't work for you, try to replace lower-case-table-names=0 with  

<pre>--character-set-server=0  
</pre>

# References

*   [Mysql Documentation](http://dev.mysql.com/doc/refman/5.0/en/identifier-case-sensitivity.html)