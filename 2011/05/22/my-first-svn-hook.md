<div dir="ltr" style="text-align: left;" trbidi="on">

<div dir="ltr" style="text-align: left;" trbidi="on">

<div class="separator" style="clear: both; text-align: center;">[![](http://4.bp.blogspot.com/-RgF9X8l-D5Q/TdickZ_M-yI/AAAAAAAAA1Y/4lkGF3Q_YZE/s1600/hook-icon.png)](http://4.bp.blogspot.com/-RgF9X8l-D5Q/TdickZ_M-yI/AAAAAAAAA1Y/4lkGF3Q_YZE/s1600/hook-icon.png)</div>

</div>

Finally, I got a chance to write my first SVN hook.  
Seems to be very easy and useful.  

# My Goal

My first hook relates to the [migrate](http://www.playframework.org/modules/migrate) plugin in [play!framework](http://www.playframework.org/).  

For those of you who use rails, you might know this plugin/module/gem already.  
It helps you version your DB schema.  
Each file has the following pattern :  

<pre><version>.(up/down).someName.sql  

    1.up.addingTableUser.sql  
    1.down.addingTableUser.sql  

    2.up.addingNumberOfLoginsToUser.sql  
    2.down.addingNumberOfLoginsToUser.sql  
</version></pre>

As you can see - the version is a number that increments each time. When you work in a team - you will get a lot of clashes between versions.  

The version of this module I was using (which is quite old by now), had a bug. If you had the combination of "up" or "down" in the name of the version, it would fail. So for example :  

<pre>7.down.addingLabelToGroup.sql  
</pre>

would fail, as the word "Group" has the combination UP in it..  

There are 2 things I needed to resolve with my pre-commit hook :  

*   make sure the version does not clash
*   make sure the name does not have the combination "up" or "down"

# Writing the Hook

In unix it's quite easy to write the hook in any language you want as long as the [Shebang](http://en.wikipedia.org/wiki/Shebang_(Unix)) line is there.  

I decided to write my hook in Python.  

## The svnlook Command

It seems that the SVN comes with a simple command called [svnlook](http://svnbook.red-bean.com/en/1.5/svn.ref.svnlook.html) that gives you all the API you need to write a hook.  
You execute it in a command line (from code, as a different Process) - and you parse the output.  
I found the commands :  
[](http://svnbook.red-bean.com/en/1.5/svn.ref.svnlook.c.changed.html)  

<pre>[svnlook changed REPOS_PATH](http://svnbook.red-bean.com/en/1.5/svn.ref.svnlook.c.changed.html)</pre>

and  
[](http://svnbook.red-bean.com/en/1.5/svn.ref.svnlook.c.tree.html)  

<pre>[svnlook tree REPOS_PATH [PATH_IN_REPOS]](http://svnbook.red-bean.com/en/1.5/svn.ref.svnlook.c.tree.html)</pre>

most useful.  

## Where to Start From

After you read the API a bit, and you have an idea about how to write the hook, you start by reading the command line arguments.  
The first one holds the "REPOSITORY_PATH" and the second one holds the "TRANSACTION_ID".  

The TRANSACTION_ID - exists only while committing, which makes it harder on development. I replaced the flag "-t" for transaction with the flag "-r" for revision while developing, because it is easier to run the script.  

In Python, you will usually have the following code :  

<pre class="python" name="code">#!/usr/bin/env python  

import sys  
import os  

if __name__ == '__main__':  
        if ( len(sys.argv) ) < 3:  
                sys.stderr.write("Usage: %s REPOS TXN\n"%(sys.argv[0]))  
        else:  
                repository_location = sys.argv[1]  
                transaction_id = sys.argv[2]  
                main(repository_location, transaction_id)  

sys.exit(0)  
</pre>

where "main" is the function you should implement. I implemented it like this :  

<pre class="python" name="code">def main(rep_location, tx_id):  
        added_migrate_files = get_added_migrate_files(rep_location, tx_id )  
        for  migrate_file in added_migrate_files:  
                check_added_migrate_file(migrate_file, rep_location)  
</pre>

ass you can see - I first get all the new files that are added, and filter out only those who match the "migrate" files pattern. Then, I iterate over them, and check each one. Lets see how I implemented them  

<pre class="python" name="code">def get_added_migrate_files(rep_location, tx_id):  
        changes = os.popen('svnlook changed ' + rep_location + ' -t ' + tx_id ).read().split('\n')  
        print('found changes : ' + ",".join(changes) )  
        res = []  
        for  change in changes :  
                lchange = change.lower()  
                print('checking if [' + lchange + '] starts with a %s'%(lchange.startswith('a')))  
                if ( lchange.startswith('a') and migrate_path in lchange ):  
                        print('looking at change : ' + lchange)  
                        res.append(lchange.split(migrate_path)[1])  
        return res  
</pre>

In order to get the added files, I execute with "os.popen" the "svnlook changed" command. I read the output from the process with "read()" and split the result to get separate lines. For each line I check if it represents an addition. In subversion, an addition is noted by a capital "A" at the beginning, but since I am working with "lower()" I compare it with "a" instead. The "migrate_path" is the relative path in repository where the migrate scripts' folder resides. I decided to refer to a single path. It might not be your choice, but I preferred to be safe than sorry. So when I run "lchange.split(migrate_path)[1]" - I am actually extracting the name of the migrate script file. this function returns all the names of added migrate files. Now lets have a look at how I check if they are valid  

<pre class="python" name="code">def check_added_migrate_file(added_migrate_file, rep_location):  
        migrate_file_parts = added_migrate_file.split(".")  
        print('checking migrate file : ' + added_migrate_file )  
        migrate_version = migrate_file_parts[0] + "." + migrate_file_parts[1] # a version is a combination of number and up/down  
        print('migrate_version : ' + migrate_version)  
        migrate_file_name = added_migrate_file  
        lower_name = migrate_file_parts[2].lower()  
        print('name : ' + lower_name )  
        tree = os.popen('svnlook tree ' + rep_location + ' ' + migrate_path,'r').read().split('\n')  
        for tree_file in tree:  
                filename = tree_file.strip()  
                if ( filename.startswith(migrate_version) ):  
                        sys.stderr.write("migrate file with version = " + migrate_version + "already exists!")  
                        sys.exit(1)  
        if ( "up" in lower_name.lower() ):  
                sys.stderr.write("file " + migrate_file_name + " contains the sequece 'up' (case insensitive). need to remove it")  
                sys.exit(1)  
        if ( "down" in lower_name.lower() ):  
                sys.stderr.write("file " + migrate_file_name + " contains the sequence 'down' (case insensitive). need to remove it")  
                sys.exit(1)  

</pre>

This algorithm looks complicated but it's quite simple. The main thing to note here is that I am running the "svnlook tree" command. giving me the existing migrate scripts in the repository. Once I have them I simply compare the version to the added files with 2 loops. (I don't care about performance here). I also verify that a file name does not contain the sequence "up" and "down". As a new python developer, I was amused to discover it is accomplished with the "in" keyword.  

# Important Things to Note

*   I keep writing to stderr. These messages will appear later in SVN output incase the commit fails
*   debugging a hook is hard. Even though I print to stdout, you have to wrap the "pre-commit" with a script that outputs the stdout to a file in order to be able and debug it.
*   while developing, I simply replaced the "-t" flag with "-r" - allowing me to run the hook from command line, giving it revision numbers instead of transactions. A transaction id only exists during an actual commit.  

*   In my installation, pre-commit hooks did not run by default. I had to go to my repository manually, and under a folder named "hooks" I had to rename a file named "pre-commit.tmp1" to "pre-commit" (in unix).  
    Then I had to add a line of code in "pre-commit" to add my new hook to the flow.  

*   I had some problems with permissions. So make sure you give permissions to execute your hook.  

# Great Tip for Debugging

I suggest you change "pre-commit" script, to return "1" instead of "0" while you develop a new hook.  

This way - the commit will always fail, and you can easily repeat it.  

For example - my hook takes affect on "added files". So if the commit succeeds, I need to create new files, add them to SVN and then commit = 3 operation.  
However, when I fail the commit each time, all I have to do is commit again = 1 operation.  
Saves a lot of time.  

# Wrapping Pre-Commit for Debugging

This is pretty simple, but not a lot of people know how to do it.  

<pre class="bash" name="code">#!/bin/sh  
/svn_rep_path/hooks/pre-commit-run $* > /svn_rep_path/hooks/my.log  
exit 1  
</pre>

The trick here is to use "$*" in order to pass all command line arguments to the real script. "pre-commit-run" here Once you're done, you should be able to commit wrong files and get errors. I use [tortoise SVN](http://tortoisesvn.net/) so I got this :  

<div class="separator" style="clear: both; text-align: center;">[![](http://3.bp.blogspot.com/-l4rvd1nwha8/TdkAO5zFmhI/AAAAAAAAA1g/Iyp5Nu9DQl4/s320/hook_result.png)](http://3.bp.blogspot.com/-l4rvd1nwha8/TdkAO5zFmhI/AAAAAAAAA1g/Iyp5Nu9DQl4/s1600/hook_result.png)</div>

</div>