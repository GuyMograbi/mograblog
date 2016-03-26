---
title: Play 2.0 DB migrations shell script
published: 2012-12-18T12:52:00.000-08:00
description: update your schema easily and safely
keywords: play!framework
---

<div dir="ltr" class="mograblog" style="text-align: left;" trbidi="on">

# Play 2.0 DB Migrations Shell Script

<div>

I recently joined a Play!Framework 2.X project.  
After 2 years developing with Play!Framework 1.X, it is certainly a big difference.  
One of the things I miss most is the nice [migrate module](http://www.playframework.org/modules/migrate "Play!Framework 1.x migrate module").  
2.x has something called evolutions, which might be as powerful, but I really didn't like it  
So I decided to write my own simple migrate module.  
Since I didn't have the motivation to learn how to write a module for Play 2, I decided to implement it with a simple Shell script.

## Database Migrate Module

A Database migration module is something I got familiar with while learning RoR.  
Basically, it has the ability to:

*   Creating your DB schema
*   * Upgrade your DB schema from version x to version y
*   Downgrading your DB schema from version y to version x
*   * It auto detects the current version
*   It auto detects the latest version
*   * Manage schema version

You usually use the features marked with asterisks. (*).  
You can do well without the rest.  
Detecting the latest version is nice, and even though you don't really need it,  
you can easily support it or something close to it. ( for example, assume you have 100 version upgrade if not told otherwise... )  

## My Implementation

<pre name="code" class="bash">  
# get all sysconf variables we have for play  

. /etc/sysconfig/play_app  

UPGRADE_TO=$1  

if [ "$UPGRADE_TO" = "" ];then  
        echo "ERROR : missing argument version"  
        echo "usage db_migrate version"  
        exit 1  
fi  

# echo "upgrading to $UPGRADE_TO"  

DB_VERSION=`mysql -u $DB_USER -p$DB_PASSWORD $DB -e "select version from patchlevel" --skip-column-names --raw `  
echo "current DB version is $DB_VERSION"  
if [ $DB_VERSION -ge $UPGRADE_TO ]; then  
        echo "DB version is bigger. will not run migrate scripts"  
        exit 0  
else  
        DB_VERSION=` expr $DB_VERSION + 1 `  
        for i in `seq $DB_VERSION $UPGRADE_TO`  
        do  
                CURR_FILE="$APP_ROOT/conf/evolutions/default/$i.sql"  
                if [ -f $CURR_FILE ]; then  
                        echo "          migrating $CURR_FILE"  
                        `mysql -u $DB_USER -p$DB_PASSWORD $DB  < $CURR_FILE`  
                        RETVAL=$?  
                        if [ "$RETVAL" -ge "0" ]; then  
                                echo "failed migrating $i with error $RETVAL"  
                                exit 1  
                        fi  
                else  
                        echo "missing file $CURR_FILE"  
                        exit 1  
                fi  
        done  
fi  

echo "done migrating"  

   </pre>

This script is pretty straight forward.  
The only input is the new version we want to have.  
It reads configuration from `/etc/sysconfig/play_app` file,  
and uses it to find out the current DB version.  
Then it loops from the current version to the desired version, while running each migration file in between.  
It fails on first failure and exists.  

The script assumes naming Play & Evolutions folder structure and filename conventions.  
As I mentioned above, if target DB version is not specified you can easily add support for it.  
While the "correct" why to do it is probably sort all the files by name and extract the version part, you can also easily add a small loop that goes over each version and checks if a file exists, thus finding the latest DB schema upgrade.  
I found this is unnecessary for me at the moment.

The script also assumes a MYSQL database - easily modified though for your own needs - that has the following table

<pre>  
CREATE TABLE `patchlevel` (  
  `version` bigint(20) NOT NULL DEFAULT '0',  
  PRIMARY KEY (`version`)  
)  
</pre>

## Evolutions

Every DB version control has SQL files that write the upgrade and downgrade.  
Each such file has a name that indicates its correlating DB version.  
For example, Evolutions use numbers to indicate the DB version and a filename with `N.sql` as pattern where N is the version number.  
Each such file contains both the upgrade and the downgrade code, and Evolutions detect which is which by commenting "!- Ups" before the upgrade code and "!- Downs " before the downgrade code. I decided to keep using the same convention but keep only the upgrade code.  
As I said - you don't usually use the downgrade feature.  

## Configuration

Unlike Evolutions, I don't have the luxury of using existing configuration.  
You will have to add configuration in order to use my script.  
However, every self respecting developer will have additional scripts with configuration, so it's a reasonable assumption.  

UNIX systems have a unique way to specify configurations.  
I will write more about this in a different post but for now, lets say you write a file named play_app placed in /etc/sysconfig  
You need to modify "play_app" with the name of your application.  
This file looks something like

<pre>  
DB_USER=my_user  
DB_PASSWORD=my_password  
APP_ROOT=/var/play_apps/my_app  
</pre>

and all the scripts that want to use this configuration simply have to run

<pre> . /etc/sysconfig/play_app </pre>

This is a good method since it is highly reusable.  
You can even use it in system V init files.  
You can also add it to you profile initialization. (.bashrc, .cshrc).  
The first dot in the command above means to run it in the current shell, this is the trick for keeping the variables declared. Otherwise, like in block scope, these definition will be lost once play_app script exists.</div>

</div>