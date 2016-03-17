<div class="separator" style="clear: both; text-align: center;">[![](http://rubyonrails.org/images/rails.png)](http://rubyonrails.org/images/rails.png)</div>

While fussing around with Rails, I tried to find the documentation but couldn't find it. The reason is that you have to generate it.  

# Generating the documentation

In order to generate the documentation you will need to create a dummy application and then "freeze" the Rails version.  

Freezing causes a copy of Rails source to the application. This means that when we generate the documentation - it will also go over Rails files as well..  

The commands are these :  

<pre>rail temp  
cd temp  
rake rails:freeze:gems  
rake doc:rails  
</pre>

It took my computer about 80 seconds.  

Since the process is that simple - I have to wonder why don't they do this automatically in the release and publish this online? Is it the size? It's just 6 MB.. Well, never mind.  

# My copy of the documentation

I decided to copy-paste the output of the commands to my site. You can visit it at [http://mograbi.co.il/guy_mograbi/rails_api/2.0.2/index.html](http://mograbi.co.il/guy_mograbi/rails_api/2.0.2/index.html)  

The version I am using is : 2.0.2\. Since the version appears in the URL you can rest assure I will maintain old/new versions.