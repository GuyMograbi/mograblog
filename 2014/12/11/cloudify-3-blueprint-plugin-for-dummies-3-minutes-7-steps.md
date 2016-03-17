<div dir="ltr" style="text-align: left;" trbidi="on" class="mograblog">

<div class="info">[cloudify 3](http://getcloudify.org "Cloudify 3") is out for a while now, and it is creating a lot of buzz.  
I decided to give it a go and write my first blueprint and plugin.  
Cloudify has a [great documentation](http://getcloudify.org/guide/3.1/quickstart.html "Cloudify Documentation") but I found their "quick start" to qualify for TL;DR classification.  
So I decided to my version, and to make it for "dummy" level users such as myself.  

In this post you will create everything from scratch, please note that cloudify also has [a plugin template](https://github.com/cloudify-cosmo/cloudify-plugin-template) which they recommend to use. But then again, how will you learn without getting your hands dirty?</div>

<div class="warning">This post assumes you have a cloudify manager available!  
If you don't - know that it might not be an easy task. Some people get it working under 10 minutes, and some (like me) take over 2 hours.  
The Cloudify team said they will have a "try it now" version for the manager - so you will have one available within a single click.  
Currently, the best way to get one working is to get their [vagrant resources](http://getcloudify.org/downloads/get_cloudify_3x.html "cloudify vagrant") and run it.  
</div>

# So how do I write a plugin + blueprint under 3 minutes?

### Step 1 - start your project

When I start my project I like to do the following:

*   create a folder
*   run `git init`
*   add `.gitignore` file with `.idea` and `.cloudify` in it
*   add `LICENSE` file to it
*   add a `setup.py` file ([content below](#setup_content)). Cloudify uses pip to install your plugin
*   create a directory for your sources, and write an `__init__.py` file in it. This file has only 1 line `__author__ = 'guym'`.

The `setup.py` looks something like this:

<pre class="prettyprint">  
__author__ = 'guym'  

from setuptools import setup  

setup(  
    zip_safe=True,  
    name='cloudify-mogi-plugin',  
    version='1.0',  
    author='guym',  
    author_email='guym@gigaspaces.com',  
    packages=[  
        'lib'  
    ],  
    license='LICENSE',  
    description='Playground plugins',  
    install_requires=[  
    ]  
)  
  </pre>

### Step 2 - Write your plugin

Writing your plugin is easy. Simply add a python file under your sources directory.  
A plugin file is simply python. Define a function in it - later we will map it to the blueprint.  

<pre class="prettyprint">  
from cloudify import ctx  
from cloudify.decorators import operation  

@operation  
def create( **kwargs ):  
    ctx.logger.info('ECHO PLUGIN: create running')  
  </pre>

Congratulations - you wrote your plugin! Lets define it

<div class="warning">Now is the time to commit your code!  
Cloudify uses URLs to get your plugin and install it, so you need some online repository to host.  
I use github.  
</div>

### Step 3 - Define your plugin

add `plugin.yaml` file. This is the definition file for your plugin  
The file is very simple:

<pre class="prettyprint">  
##############################################  
#               MY PLUGINS                   #  
##############################################  

plugins:  
  mogi:  
    executor: central_deployment_agent  
    source: https://github.com/guy-mograbi-at-gigaspaces/cloudify3-plugins/archive/master.zip  
 </pre>

You need to change the URL to your git repository.

### Step 4 - test you did everything right by running pip install

Lets test that you defined everything well by running the command

<pre>  
virtualenv test-plugin  
source test-plugin/bin/activate  
pip install https://github.com/guy-mograbi-at-gigaspaces/cloudify3-plugins/archive/master.zip  
  </pre>

You will need to change the URL to match your scenario.

<div class="info">You are now ready to start using your plugin.  
Cloudify Team suggests a different way than I do to accomplish this, but I found this one better for me as a beginner.  
</div>

### Step 5 - Write a small blueprint that uses your plugin

*   Create a folder for the blueprint
*   Create file `blueprint.yaml`

The blueprint.yaml file will look something like this

<pre>  
tosca_definitions_version: cloudify_dsl_1_0  

imports:  
  - http://www.getcloudify.org/spec/cloudify/3.1/types.yaml  
  - https://raw.githubusercontent.com/guy-mograbi-at-gigaspaces/cloudify3-plugins/master/plugin.yaml  

node_templates:  
  mock:  
    type: mogi.Echo  
node_types:  
  mogi.Echo:  
    derived_from: cloudify.nodes.Root  
    interfaces:  
      cloudify.interfaces.lifecycle:  
        create:  
          implementation: mogi.lib.echo.create     
  </pre>

<div class="info">You can move the "node_types" part to your plugin's yaml file if you wish, and then deliver a plugin with some node types that use it.  
</div>

You will need to change the "import" URL to your yaml file.

### Step 6 - upload, deploy, execute

<div>I assume you know this part.  
If you don't you will need to go to the blueprint's directory and do the following:

*   Install cloudify CLI
*   Run `cfy init` in your blueprint's directory  

*   run `cfy use -t MANAGER_IP` to connect to your manager
*   run `cfy upload -b myblueprint blueprint.yaml` to upload the blueprint
*   run `cfy deployments create -d mydeployment -b myblueprint` to create a deployment from your blueprint
*   run `cfy executions start -d mydeployment -w install` to install your deployment

</div>

### Step 7 - validate success

<div>Assuming all went well, you should see the log print `ECHO PLUGIN: create running` in the console.  
Yey! it worked!</div>

## Conclusion

<div>The new cloudify3 project looks exciting. We were able to add a plugin to it fairly quickly.  
Since a plugin is python code - the options are endless.  
</div>

</div>