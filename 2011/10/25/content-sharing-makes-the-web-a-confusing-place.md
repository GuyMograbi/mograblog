<div dir="ltr" style="text-align: left;" trbidi="on">

<div class="separator" style="clear: both; text-align: left;">Today I opened my blogger, and went over the "News from Blogger" section and noticed 2 similar entries. </div>

<div class="separator" style="clear: both; text-align: center;">[![](http://2.bp.blogspot.com/-3BMiGpGXTAw/TqbTDxNdhKI/AAAAAAAABA4/-gPrmJaIjdI/s640/double_posting.png)](http://2.bp.blogspot.com/-3BMiGpGXTAw/TqbTDxNdhKI/AAAAAAAABA4/-gPrmJaIjdI/s1600/double_posting.png)</div>

This reminds me some critic I read a few years back while experimenting with Maven documentation.  
This is yet another [ search repetitions or search pollution](http://some%20more%20specific%20use%20cases%20are%20described%20in%20the%20examples%20given%20below/) case.  

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">Pollution caused by Feed Sharing</span>  

While amazed me that this time the culprit is Google, this makes me wonder the integrity of feed sharing.  
Picture a newspaper's feed with the same article over and over again, simply duplicated because you are registered for several different newspapers.  

The whole idea of the feed is to get info from different sources. But if 2 sources share that information, you automatically get a duplication in your feed.  
Looking at it differently, if you are a feed owner, you want to enrich it by sharing content from another popular source.  

Which means that my feed should be dependent on the subscriber.  
If the subscriber is subscribed to feed A and B, but these feeds share content, each feed should not publish the shared content, otherwise the subscriber gets duplicate feed entries.  

This won't resolve the repetition in the search results. Searching for some substring in the published item, you will find the original and the shares.  

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">Pollution caused by Templates</span>  

This is a simpler case to crack. I know the maven example for it.  
Maven offers templates for documentation, however, if not modified you get a repetition in search result.  Much like the feed item shares.  

However easier to understand, I think this problem might be tougher to resolve.  
I wonder if this could be easily resolved by adding a "Meta tag" to the template with an ID to the template.  
For example, the maven templates should have something like :  

<span class="Apple-style-span" style="font-family: 'Courier New', Courier, monospace;"><meta name="template_ID" content="maven_doc_template"></span>  

This will enable Google to aggregate these results and minor the repetition by showing "show more results like this" link which is used when there are many results from same source.  

This solution can also resolve the problems in the feed duplication without the need to have a dependency on the subscriber. A feed reader should not show 2 items with the same template ID, and the template ID should be different for every item, but the same between shares.  

<span class="Apple-style-span" style="font-family: Arial, Helvetica, sans-serif; font-size: x-large;">Conclusion</span>  
<span class="Apple-style-span" style="font-family: inherit;">  
</span>  
<span class="Apple-style-span" style="font-family: inherit;">The goal, as it seems, is to ID the repetition in some way. </span>  
<span class="Apple-style-span" style="font-family: inherit;">adding a template ID might be good, but you cannot enforce it, w</span>hile making feed-subscriber dependency might be a security issue, so we can't use that either.  

I think, template ID would be nice if added. It can automatically resolve feed item duplication as this is not a user side dependent solution.  
It will also resolve new Maven documentations repetition assuming Maven will generate the meta-tag and the editor won't delete them.  
However it will not resolve the existing documentations, and you are unable to enforce the meta-tag.  

Comment on what you think about this topic.  

</div>