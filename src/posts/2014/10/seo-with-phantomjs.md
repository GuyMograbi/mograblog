---
title: seo with phantomjs
published: 2014-10-01T02:04:00.000-07:00
description: make your angular website be seo friendly.
keywords: angular, seo, phantomjs
layout: post.hbs
---

### angularjs, seo, nginx, phantomjs, facebook share, node and sitemaps - in 60 minutes or less

when i was asked about how to make an angular site seo friendly, i was shocked to discover that
even though googlebot is supposed to support javascript, angular apps still have placeholders  
where values should be, making your search result display as `\{{title}}.`

really? 2014 is almost over, and we have to deal with prerendering still? omg..


as i was getting dizzy with the thought of having some jade template engine in my beautiful mean stack code,
i decided to risk everything and write a solution with phantomjs.  
you will not believe how simple it is  

i was then shocked again to discover that there are services doing just that, and they charge a lot of money!
i was unimpressed by services like [prerender.io](https://prerender.io/ "prerender")  
and what they offer. escpecially when i knew i was going to have a lot of pages soon.

and besides, why pay when it is so darn easy?

## sharing in facebook doesn't work too, so who cares about google crawler?

even if google has javascript support, i want to be able to share my pages on facebook and other social networks..  
so i need a better solution.  

in the next couple of articles i will talk in depth about how to add seo support for single page applications.  

*   [about phantomjs](/posts/2014/10/seo-wtih-phantomjs-part-1.html) - where i exaplain about phantom and show how to use it outside and inside of node server
*   [single page application crawling](/posts/2014/10/seo-with-phantomjs-part-2.html) - where i explain a bit about how crawlers work and thus how the solution works
*   [hooking it all together](/posts/2014/10/seo-with-phantomjs-part-3.html) - where we show how to generate sitemap at runtime and serve the prerendered version of the page