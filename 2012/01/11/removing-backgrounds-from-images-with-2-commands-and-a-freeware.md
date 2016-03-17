<div dir="ltr" style="text-align: left;" trbidi="on">I had a problem.. I bought an image from [istackphoto.com](http://www.istockphoto.com/) and I had to use it.  
Seems the image was in [EPS](http://en.wikipedia.org/wiki/Encapsulated_PostScript) format and had 17MB !!  

So I had an enormous EPS file that I needed to convert to a transparent PNG.  
Oh, and I must use freewares.  

GIMP was no help at all. Neither was Inkscape and a bunch of other applications I downloaded.  

A strange thing kept appearing - I got the image opened at some point.. but it had a black background instead of white and the colors were weird.  
I later discovered this was the "negation" of the image - or more correctly, I had to negate the image with white background in order to set the colors right again.  

My computer got stuck like a million times due to the size of the file.  
I read about 30 blogs/forums and so on until I ran into a nifty tool call [imagemagick](http://www.imagemagick.org/script/index.php).  

This tool provides some pretty useful commands you can run on your computer. (supports windows too).  
For example

<pre> convert guy.png -negate guy.png</pre>

which pretty much sorted the colors right away.. :)  

In order to remove the background I used the following command

<pre>  
convert guy.eps -resize 256x256 -alpha copy -negate guy.png  
</pre>

The "negate" flag came to me after a while.  
I had to read a bunch of articles : [mask 1](http://www.imagemagick.org/Usage/compose/#mask_trans)[mask 2](http://www.digitalphotoguides.com/remove-photo-background.html)[mask 3](http://www.imagemagick.org/discourse-server/viewtopic.php?f=10&t=8711) Now that's it! I have the image in transparent background. I still have some work to do on it since some places where there should be white, it is now transparent. But that's kids play for me.  

I hope I saved you some pretty nasty frustrations.</div>