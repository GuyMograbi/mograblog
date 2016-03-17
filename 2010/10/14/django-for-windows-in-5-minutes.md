This is a getting started post with Django.  
I gathered instructions from several resources to this Windows specific tutorial.  
By the end of the post you will have your first Django app running.  

# Steps

*   Install python  
*   Make sure python is in your path  
*   verify by running "python -h"  
*   Download Django  
*   Extract it to some folder  
*   Run "setup.py install" - distributes the modules and libraries to python path  
*   Add "django\bin" folder to your path  
*   Verify all steps with command "django-admin.py help"  
*   Create an "app" folder to contain the applications you will write - similar to rails_app in rails  
*   Start a new django app with the command "django-admin.py startproject mysite"  
*   Do not use names like "Django" and "test" for your project. Treat them as keywords.  
*   Start the server by running : "python manage.py runserver" in your "mysite" folder  
*   If everything worked well you should see a "it worked!" page  
*   Configure Database in file "settings.py" - follow documentation in file  
*   For DB beginners - Django recommends to simply write sqlite3 in the settings.py as it requires no other configuration/installation  
    <quote>  
    If you're new to databases, we recommend simply using SQLite (by setting ENGINE to 'django.db.backends.sqlite3'). SQLite is included as part of Python 2.5 and later, so you won't need to install anything else.  
    </quote>  

*   For mysql - use "create database _name_" to create the database  
*   download compiled version of mysqldb model for your python version. This will be your hardest step ever! getting mysql to work with python is known as a nightmare - so make sure you get the correct download. Settle for nothing else but a file called "MySQL-python-1.2.3.win32-py2.7.exe" - where the windows version (win32) should match yours, and py2.7 - the python version - should also match yours. Otherwise the installer won't find python in the registry.  
    I spent 5 hours trying to manually install this - see troubleshooting below - and still couldn't do it.. too many files missing (header files) and versions incompatibility  
*   run command "python manage.py syncdb" - this will verify you create the database and update the database with tables needed for full django functionality - and it will create a super user  

If you reached this point, you're good to go.  
The next step for you is to read the [Django Book from chapter 3](http://www.djangobook.com/en/2.0/chapter03/)  

Below you will find troubleshooting and some rails / django comparison.  

# Django VS. Rails

## Applications and Projects

I came across a section the [official django tutorial](http://docs.djangoproject.com/en/dev/intro/tutorial01/#creating-models) that explains a basic difference between Rails' application to Django application.  

When you create a project in Django - and setting the DB and what not - you actually get a start point to multiple applications - whereas in Rails you need to redefine everything for each application.  

## No Controllers in Django - the MTV model VS. MVC model

Another thing I came across while reading the django book is the different of MVC model and MTV model.  
Rails/Play developers may know the MVC model - Model View Controller.  
In Django the model is MTV : Model Template View.  

Template in Django is a View in Rails/Play.  
View in Django is a Controller in Rails/Play.  

Reading this certainly untied a knot in my head..  
The first time, it seemed to me like the Views class is redundant, and when I finished the django "first application" tutorial, I was angry I couldn't find the part about Controllers, and assumed they mish-mashed the controllers with the views - which is ugly.  
So learning about the MTV model certainly straightened things out for me.  

## Template in Django does not support Python

In Rails the templates support all Ruby statements.  
In Java, JSP support all Java code.  

However, it seems in Django, the templates do not support all python statements.  
You can read all about it in [chapter 4 of django book](http://www.djangobook.com/en/2.0/chapter04/)  

# Troubelshooting

If you are trying to execute a django command but get  

<pre>ImportError: No module named django.core </pre>

This means you have python installed and you extracted django, but you did not run "setup.py install" - a script in django home directory.  
This action copies the required libraries and modules to python path.  

# Installing mysql module for python

I rate this mission as : impossible for the everyday developer on windows.  
Here are several of the problems I got along the way :  
*   _mysql.c:34:24: fatal error: config-win.h: No such file or directory  
*   serverKey = _winreg.OpenKey(_winreg.HKEY_LOCAL_MACHINE, options['registry_key'])  
    WindowsError: [Error 2] The system cannot find the file specified  
*   error: Unable to find vcvarsall.bat  

Save yourself the headache -  
Search for a "download compiled python 2.7 mysql for windows"  
change the query to your python version.  
Do not stop until you find a file named  
"MySQL-python-1.2.3.win32-py2.7.exe"  

again - version might be different.  

Do not go on the mission of installing it by yourself, it is simply a nightmare.