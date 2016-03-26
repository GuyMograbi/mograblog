---
title: Adding IFrame Support To Our Selenium Framework
published: 2013-09-30T06:26:00.000-07:00
description: make iframe handling seamless in selenium
keywords: selenium, java
layout: post.hbs
---


So far we have written a nifty selenium extension library that allows you to treat the pages as if they were built by components rather than the primitive WebElement.  
This brought your page design and development closer to your Selenium test code.  
It also allows you a high abstraction and re-usability of your test code which is always good.  

So we have components, and pages.  
But what about IFrames?  
Frames are basically pages.  
So technically, if we taught Selenium to embed components, teaching Selenium about iframes means teaching it embed pages.  
However, IFrames get a special treatment.  

## How to use IFrame with Selenium - the unpleasant way

In this post I will assume I have a page represented by the class `MyPage` and a frame represented by `FramePage`.  
MyPage HTML looks like so:

```

  This is my page  
  <iframe src="framepage.html"></iframe>  

```

and FramePage HTML looks like so:

```

  This is framepage

```

If I were to write a test without the framework, it would look like so

```
WebDriver firefoxDriver = new FirefoxDriver();  
WebElement myFrame = firefoxDriver.findElement(By.cssSelector("iframe"));  
firefoxDriver.switchTo().frame( myFrame );  
String frameText = myFrame.findElement(By.cssSelector("body")).getText();  
Assert.assertTrue(frameText.contains("framepage"));  
firefoxDriver.switchTo().defaultContent(); // get out of the frame  
```

## Down Sides

There are a lot of bad things in the code above,  
but allow me to concentrate on a particular one that annoys me.  
The test knows how the HTML page looks like..  
If I change the page, I have to change the test.  
There is simply no abstraction, and no re-usability.  
So again, we face a major problem with Selenium's primitive API.  
And that's a shame because Selenium is a great library.  
But are in a position where we can easily improve this.  

## My Wishlist

This is how I want the test code to look like

```
WebDriver firefoxDriver = new FirefoxDriver();  
MyPage myPage = new MyPage();  
PageFactory.initElements(new MograblogFieldDecorator(firefoxDriver, firefoxDriver), myPage);  
Assert.assertTrue(myPage.framePage.getText().contains("framepage")); // when I am done, I am out of the frame  
```

This is about 2/3 of the amount of code used previously.  
I have an abstraction to `MyPage` which is aware of `FramePage` and I don't need to get in/out of the frame.  

## Lets start with something easy

I will first show you how to implement this for a single IFrame, and then (next post) I will show you how to do this for infinite number of embedded IFrames.  

## Introducing @SwitchTo annotation

First lets build our pages class

```
public class FramePage extends MograblogElement{  
    public String getText(){  
        return webDriver.findElement(By.cssSelector("body")).getText();  
    }  
}  

public class MyPage {  
    @SwitchTo  
    @FindBy( css="iframe" )  
    public FramePage framePage;  
}  

@Target(ElementType.FIELD)  
@Retention(RetentionPolicy.RUNTIME)  
public @interface SwitchTo {  
}  
```

As you can see we added an annotation to mark that this is a new iframe.  
However, regarding abstraction, it could have been in the same page. (the naming would be wrong then, wouldn't they? it's no longer framePage.)  

Now, all we need to do, is to tell selenium to switch to the iframe.  
We will use our decorator and enhancer to achieve this.  
Our `intercept` method will look like so (new lines are highlighted)

```
@Override  
public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {  
    if ( method.isAnnotationPresent( NoEnhancement.class )){  
        return  methodProxy.invokeSuper(o, objects);  
    }  

    logger.debug("[{}] intercepted method [{}] on object [{}]", field, method, o);  
    if (o instanceof MograblogElement) {  
            MograblogElement comp = (MograblogElement) o;  

            WebElement element = locateElement();  

            <span style="highlight">if ( field.isAnnotationPresent( SwitchTo.class )){  
                webDriver.switchTo().frame( element );  
                comp.setRootElement( webDriver.findElement(By.cssSelector("body")));  
            }else{</span>  
                comp.setRootElement(element);  
            <span>}</span>  

            comp.setWebDriver(webDriver);  

        try {  
            return methodProxy.invokeSuper(o, objects);  
        } catch (InvocationTargetException e) {  
            throw e.getCause();  
        } <span class="highlight">finally{  

            if ( field.isAnnotationPresent( SwitchTo.class )){  
                webDriver.switchTo().defaultContent();  
            }  
        }</span>  

    } else if (o instanceof WebElement ) {// only handle first displayed  
        WebElement displayedElement = locateElement();  

        if (displayedElement != null) {  
            logger.info("found first displayed. invoking method");  
            return method.invoke(displayedElement, objects);  
        } else {  
            logger.info("unable to detect first displayed");  
        }  
    }  

    return null;  

}  
```

As you can see, our enhancer switches to the frame before it invokes the `methodProxy` and switches back afterwards.  
As you can also see, when it "switches back", it simply goes to the "defaultContent" which is the top window.  
This is actually bad because it means we do not support embedded iframes (an iframe within another iframe).  
Selenium does not provide a "go back" feature. We will need to add it later.  
The only thing left to take care of is our initialization which happens in the decorator.  
This is how it will look like

```
// allow infinite layers of wrapping - initialize components with PageFactory.  
private void initializeElement( Field field, MograblogElement enhancedObject ) {  
    field.setAccessible(true);  
    logger.debug("loading field :  " + field.getName());  
    try {  
        // NOTE : use the getter function so that CGLIB will intercept it and inject the root element.  
        <span class="highlight">if ( field.isAnnotationPresent( SwitchTo.class )){  
            WebElement rootElement = enhancedObject.getRootElement();  
            webDriver.switchTo().frame(getElementHandler(field).getSwitchTo());  
            PageFactory.initElements(new MograblogFieldDecorator( rootElement , webDriver), enhancedObject);  
            webDriver.switchTo().defaultContent();  
        }else{</span>  
            PageFactory.initElements(new MograblogFieldDecorator( enhancedObject.getRootElement(), webDriver), enhancedObject);  
        <span class="highlight">}</span>  
    } catch (RuntimeException e) {  
        String msg = String.format("problems loading field [%s]", field.getClass().getName() + "#" + field.getName());  
        logger.info(msg, e);  
        throw new RuntimeException(msg, e);  
    }  
}   
```

As you can see, I added a function `getSwitchTo` on the handler. It simply returns `getElement`.

## Next Time...

In my next post, I will extend this solution to support multiple iframes embedded one inside the other.
