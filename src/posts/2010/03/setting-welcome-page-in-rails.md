---
title: Setting welcome page in Rails
published: 2010-03-08T22:43:00.000-08:00
keywords: rails
description: This is how you can set up a welcome page in rails
layout: post.hbs
---

In Java/Tomcat I have a web.xml to define a "welcome-page" which usually points to some index.jsp. This means that if my root URL is http://www.mograbi.co.il/guy_mograbi
it will show the page http://www.mograbi.co.il/guy_mograbi/index.jsp .  

In Rails it works like this :  

*   Under your application root folder you will find the folder "public". In which you will see an "index.html" file - that default to "Rails Welcome" that looks like the IFrame I show below
*   In folder "config" you will see the file "routes.rb" that is very important - I will dedicate a whole entry only on this file. You can define the welcome page like as such :  

```
map.root :controller => "categories"
```

 (for example). Read more about it [here](http://api.rubyonrails.org/classes/ActionController/Routing.html)