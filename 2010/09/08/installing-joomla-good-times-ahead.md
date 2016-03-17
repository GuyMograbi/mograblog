<div class="mograblog">

## Setting up your Joomla environment

After making my life easier by learning Rails, I decided it was time to learn Joomla.  
First thing was to install it..  
now if your environment is clean - no problem, you download WAMP or XAMPP or some other AMP and you're more or less good to go.  
But when you already have Apache and MySQL installed, you get a bit unsure - and you should, because there's no documentation.  
Finally, when you're me, and you run into every possible pitfall, you should be very concerned.  

# Download Joomla Pitfall

First pitfall is when you download Joomla.  
Look for a link with "Full Package" and not "Path".  
In order to be 100% percent sure you got the correct zip, try to see if you have the file "installation/index.php" - if you don't, you should find another download.  
[I downloaded Joomla from here](http://www.joomla.org/download.html "Download Joomle Here") and I chose "Full Package".  
I still don't know how to upgrade Joomla, but from what I read so far, it will be something like downloading the zip, and then uploading it to the site I choose, using the existing Joomla administration API. (But I might be wrong.. wait for my post about upgrading pitfalls :) )  

## Install PHP Pitfall

PHP will do most of the work for you, if you only know how to tell it.  
For windows - when you install PHP, you must enable MySQL support. By default it will not be enabled.  
If you don't enable it - don't worry, you can always run installation again, and there's not even a need to uninstall first.  
Enabling PHP with MySQL support will automatically configure Apache for you, and PHP.  
PHP is configured with php.ini file.  
If you want to make sure configuration went fine, open that file and look for MySQL.  
if you find php_msql.dll - don't be confused, it's not that. msql is another database.  
The ini file should have the following text  

<pre>  
[PHP_MYSQL]  
extension=php_mysql.dll  
  </pre>

If you see that, than your PHP is configured correctly.  

## Configure Apache

Technically, the PHP installation should've taken care of everything. BUT, sometimes it won't...  
In my case it didn't.  
Once PHP is installed - you should be checking if you can restart Apache.  
If something doesn't load correctly, make sure that the php_mysql.dll is loaded, and if that doesn't happen, try loading "libmysql.dll" as well.  
All in all you should have something like this in httpd.conf (or some other conf embedded)  

<pre>  
#BEGIN PHP INSTALLER EDITS - REMOVE ONLY ON UNINSTALL  
PHPIniDir "D:/dev_env/PHP/"  
LoadModule php5_module "D:/dev_env/PHP/php5apache2_2.dll"  
LoadModule php5_module "D:/dev_env/PHP/libmysql.dll"  
LoadModule php5_module "D:/dev_env/PHP/php_mysql.dll"  
#END PHP INSTALLER EDITS - REMOVE ONLY ON UNINSTALL  
  </pre>

The location will be varied according to you installation.  

## Something with Apache still doesn't work smoothly?

In windows you might get file permissions problems.  
The easiest and most recommended way is to move the folder htdocs (sometimes called "www").  
That is the folder that apache approaches to get static files.  
In order to tell apache to move it, you should modify 2 locations in httpd.conf. simply look for the phrase "htdocs" (or "www"). You should find it around "DocumentRoot" and "

## Some tests you can perform along the way

Basically there are 2 steps..  

1.  1\. Install PHP
2.  2\. Configure PHP with Apache.

I don't even count the "extract Joomla zip".. come on..  
So if the shi%^& hits the fans, and you don't know what's wrong any more, here are some small tests you should do  

### Test Apache Configuration to htdocs

First go to http://localhost/  
You should see the infamous "it works!".  
If you don't, then something is wrong if you DocumentRoot or Document mapping.  
Since I have default redirection to www.mograbi.info I had to write a custom redirection to Joomla like this :  

<pre>  
<virtualhost *:80="">  
  ServerName joomla.mograbi.info  
  ServerAlias www.joomla.mograbi.info   
</virtualhost>  
  </pre>

This small piece of code simply tells apache "don't use the default Virtual Server" - and that makes it fallback to htdocs - which is the default of all defaults.. :)  

### Make sure PHP is working

Now that you know your htdocs is configured correctly, you might want to test that the PHP configuration is ok.  
You can write a simple piece of PHP code like this  

<pre>  

  <title>PHP Test</title>  

  Hello World'; ?>   

</pre>

This will print a stylish table of all the PHP installation properties.  
If you don't see that - I recommend you simply rerun the PHP installation again. It's very friendly.  

### Make sure the Mysql extension for PHP is installed correctly

Once you made sure php is running smoothly, you can test if php-mysql is configured by adding this code to the code above  

<pre>', '<yourwebuserpassword>'); ?></yourwebuserpassword></pre>

If mysql is not configured correctly, you'll get nothing, but if it is installed you will get something like "Resource id #2" - where "2" can be another number.  

# Know when you're going the wrong way

Sometimes, when we try to fix a problem, we tend to go to a wrong way. We take note of something unimportant in the exception thrown.  
If you get some about 'The MySQL adapter "mysql" is not available' - this means your PHP is not configured to use mysql or that Apache is not loading the module. Rerun the PHP installation, and make sure you enable Mysql.  
If you get `"Error 101 (net::ERR_CONNECTION_RESET): Unknown error."` - this simply means you're going to the wrong page.  
Try going to `"installation/index.php"` - even though XAMPP and WAMP may auto-redirect you to that page, your manually configured Apache might not. So enter that manually.  
If you don't see either of those messages - try using Chrome. Firefox sometimes says something general like "unable to connect" and does not specify.  

# session.save_path

After you started the installation from the web GUI joomla supplies, you might get an error about "session.save_path".  
Go to your php.ini file, and find that string.  
It should point to a folder. Make sure that folder is not READ ONLY.  
I simply redirected it to "D:/dev_env/temp" - as I liked my dev_env folder.. :)  

# index.php as default in Apache

At first I didn't think it was such a problem - but turns out it is..  
If you direct your browser to a folder with index.php, but Apache gives you a file-list instead, you should fix it.  
Simply go to httpd.conf, find DirectoryIndex, and add `"index.php"`.  
the items are "space separated items". so you should add a space followed by "index.php".  

# Conclusion

I look forward to using Joomla.  
It is just a ~6-7MB download, and seems like a real fun.  
So far I have learned a lot - and I've yet to use Joomla :) .  
For example - I learned that PHP for Python is like Rails for Ruby.  
Installation is probably the hardest thing in Joomla - I've spent about 5 hours to find many pieces of forums that had advices until I got it right.  
But after I did it once, I am positive the next time will be less than 2 minutes..  
Another fun thing I thought about - I will install Joomla on my server, and then I can develop my site from my laptop - which is really weak.  
I still don't know about how to SVN my source in Joomla.. I guess I'll learn in the next couple of days :).

</div>