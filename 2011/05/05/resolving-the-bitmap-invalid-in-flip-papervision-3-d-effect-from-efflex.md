<div dir="ltr" style="text-align: left;" trbidi="on">

<div class="separator" style="clear: both; text-align: center;">[![](http://2.bp.blogspot.com/-s1hVLZ_HV5A/TcLFXbL5t9I/AAAAAAAAA0o/8NTJDym6dsA/s320/paper_flip.png)](http://2.bp.blogspot.com/-s1hVLZ_HV5A/TcLFXbL5t9I/AAAAAAAAA0o/8NTJDym6dsA/s1600/paper_flip.png)</div>

# <span class="Apple-style-span" style="font-size: x-large; font-weight: normal;">  
</span>

# <span class="Apple-style-span" style="font-size: x-large; font-weight: normal;">Background</span>

<div>[Efflex](http://www.efflex.org/) is a library in flex for cool 3d effect. </div>

<div>A while ago, I got a task at work, to add a "flip" effect. </div>

<div>You can see it now in [Incapsula](https://my.incapsula.com/). Just sign in, add a site, go into this added site, and choose "settings". (soon  more posts on Incapsula, I will show the effect and add it here). </div>

<div>about 6 months ago, we so some instabilities in the effect. The settings page would sometime load empty. </div>

<div>( image soon )</div>

<div>Today, I resolved the issue, after downloading Efflex's code. </div>

<div><span class="Apple-style-span" style="font-size: x-large;">The StackTrace</span></div>

<div>  

<pre>ArgumentError: Error #2015: **Invalid BitmapData**.  
 at flash.display::BitmapData/ctor()  
 at flash.display::BitmapData()  
 at **org.efflex.mx.viewStackEffects.effectClasses::ViewStackTweenEffectInstance**/takeSnapShot()[C:\dev_env\Projects_SVN\Incapsula\branches\accel\console\src\org\efflex\mx\viewStackEffects\effectClasses\ViewStackTweenEffectInstance.as:333]  
 at org.efflex.mx.viewStackEffects.effectClasses::Papervision3DEffectInstance/takeSnapShot()[C:\dev_env\Projects_SVN\Incapsula\branches\accel\console\src\org\efflex\mx\viewStackEffects\effectClasses\Papervision3DEffectInstance.as:159]  
 at org.efflex.mx.viewStackEffects.effectClasses::ViewStackTweenEffectInstance/play()[C:\dev_env\Projects_SVN\Incapsula\branches\accel\console\src\org\efflex\mx\viewStackEffects\effectClasses\ViewStackTweenEffectInstance.as:240]  
 at mx.effects::EffectInstance/startEffect()  
 at org.efflex.mx.viewStackEffects.effectClasses::ViewStackTweenEffectInstance/startEffect()[C:\dev_env\Projects_SVN\Incapsula\branches\accel\console\src\org\efflex\mx\viewStackEffects\effectClasses\ViewStackTweenEffectInstance.as:228]  
 at mx.effects::Effect/play()  
 at com.incapsula.console.effects::FlipWrapper/play()[C:\dev_env\Projects_SVN\Incapsula\branches\accel\console\src\com\incapsula\console\effects\FlipWrapper.as:31]  
 at mx.effects::EffectManager$/createAndPlayEffect()  
 at mx.effects::EffectManager$/http://www.adobe.com/2006/flex/mx/internal::eventHandler()  
 at flash.events::EventDispatcher/dispatchEventFunction()  
 at flash.events::EventDispatcher/dispatchEvent()  
 at mx.core::UIComponent/dispatchEvent()  
 at mx.core::UIComponent/setVisible()  
 at mx.containers::ViewStack/commitSelectedIndex()  
 at mx.containers::ViewStack/commitProperties()  
 at mx.core::UIComponent/validateProperties()  
 at mx.managers::LayoutManager/validateProperties()  
 at mx.managers::LayoutManager/doPhasedInstantiation()  
 at mx.managers::LayoutManager/doPhasedInstantiationCallback()  
</pre>

<span class="Apple-style-span" style="font-size: x-large;">Resolution</span>  
You can see in the stacktrace that I downloaded the source as the files point to c:\ dir.  
As I added debug prints, I discovered the following [line of code](http://code.google.com/p/efflex/source/browse/trunk/org/efflex/mx/viewStackEffects/effectClasses/ViewStackTweenEffectInstance.as?r=48&spec=svn48#322)  

<pre>snapShot = new BitmapData( contentWidth, contentHeight, transparent, bitmapColor );</pre>

I also discovered that the "contentWidth" was always 0 when I got the error. And then the problem became clear to me : there's no valid bitmap with width = 0 !!!  

Following the source of "contentWidth" I discovered it was taken from the "width" property of my "ViewStack". And a quick look showed me we initialize the width with : "100%" on the viewstack.  

Changing the 100% to the actual width (which is my case was 741) , the problem was resolved!</div>

</div>