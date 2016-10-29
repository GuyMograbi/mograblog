---
title: Adding IFrame Support To Our Selenium Framework - Part 2
published: 2013-10-07T04:52:00.000-07:00
description: make iframe handling seamless in selenium
keywords: selenium, java
layout: post.pug
shortcodes: true
---


This is another post in our "Selenium Extension Library" serie.
In this post we will fix our IFrame support so that we support IFrames that are in other IFrames.
Previously we:

*   Introduced "Components" that are basically smart WebElements
*   Allowed components to embed one another
*   Add IFrame support - but for only a single level



## Problem and Wishlist

Our major problem is that Selenium/Web-Driver's API only supports 2 methods

*   `switchTo.frame` (enter)- which goes into an iframe
*   `switchTo.defaultContent` (leaveAll)- leaves all iframes and goes back to top window

And what we are missing is

*   `switchTo.parent` (exit)- leaves current iframe and goes back to parent iframe

The names in the (brackets) are simpler names I chose for our scenarios.  
I will use these names in my new API.

## Implementation

The way I chose to implement this is to write `SwitchManager` with the following api

*   `enter( List<WebElement> framePath )`
*   `enter(WebElement frame)`
*   `exit()`
*   `List<WebElement> getCurrentPath()`

And the data set I chose is a FIFO.  
Since I am using Java, I used `java.util.Stack`  
The important thing to note about it is that iteration is according to order of insertion.  
This means we will not have any problems iterating the Stack.

[#alert-info]The code you are about to see does not use interfaces and abstractions
in some foolish(?) hope this will help you stay focused on the target.  
In the following post I will use this code as an example where you should use frameworks like Spring  
or Guice to perform Dependency Injection (DI) and use interfaces.  
[#/alert-info]

## Our Test

The test is simple, we will have iframe2 inside iframe1, and we will get the text in iframe2.  
We aim to reach the following code

```java
WebDriver firefoxDriver = new FirefoxDriver();  
firefoxDriver.get(myUrl);  
MyPage myPage = new MyPage();  
SwitchManager switchManager = new SwitchManager().setWebDriver(firefoxDriver);  
PageFactory.initElements(new MograblogFieldDecorator(firefoxDriver, firefoxDriver).setSwitchManager( switchManager ), myPage);  
FramePage2 framePage2 = myPage.framePage1.framePage2;  
System.out.println("myPage.framePage.getText() = " + framePage2.getText());  
```

Please note the code above does not actually test anything as there are no assertions.  

## Algorithm

The idea in our implementation will be to drill down all required iframes before each method,  
and leaving all iframes when the method exists.  
This is the same idea we used for a single layer, we only had to add the entire frame path each time.  

## SwitchManager code

```java
public class SwitchManager {  

    private static Logger logger = LoggerFactory.getLogger(SwitchManager.class);  

    private Stack <WebElement>switchStack = new Stack<WebElement>();

    private WebDriver webDriver;  

    public void enter(WebElement e) {  
        switchStack.push(e);  
        enterStack();  
    }  

    private void enterStack( ){  
        webDriver.switchTo().defaultContent();  

        Set <WebElement>memory = new HashSet<WebElement>();

        for (WebElement webElement : switchStack) {  
            if ( !memory.contains(webElement)){  
                memory.add(webElement);  
                try{  
                    webDriver.switchTo().frame( webElement );  
                }catch(Exception e){  
                    logger.error("nable to switch to element",e);  
                }  
            }  
        }  
    }  

    public SwitchManager enter(List<WebElement> handler) {
        switchStack.clear();  
        switchStack.addAll(handler);  
        enterStack();  
        return this;  
    }  

    public SwitchManager goToDefaultContent(){  
        webDriver.switchTo().defaultContent();  
        return this;  
    }  

    public void exit() {  
        switchStack.pop();  
        webDriver.switchTo().defaultContent();  
        enterStack();  
    }  

    public List<WebElement>getCurrentPath() {
        return new LinkedList<WebElement>(switchStack);
    }  

    public SwitchManager setWebDriver(WebDriver webDriver) {  
        this.webDriver = webDriver;  
        return this;  
    }  
}
```

Please note the `enterStack` algorithm.  
It does not assume that framePath is friendly.  
It might have WebElements repeating themselves.  
This is useful in case we want to `enter` an iframe and not leave straightaway.

## Using the SwitchManager

The places we should look for are the same places we changed before:

*   MethodInterceptor, MograblogLocator.ElementHandler - responsible for invoking each method and to switch iframes before and after
*   MograblogFieldDecorator - responsible for initializing everything

## Changing the Decorator

```java
// allow infinite layers of wrapping - initialize components with PageFactory.  
private void initializeElement( Field field, MograblogElement enhancedObject ) {  
    field.setAccessible(true);  
    logger.debug("loading field :  " + field.getName());  
    try {  
        // NOTE : use the getter function so that CGLIB will intercept it and inject the root element.  
        if ( field.isAnnotationPresent( SwitchTo.class )){  
            WebElement rootElement = enhancedObject.getRootElement();  

           switchManager.enter( getElementHandler(field).getSwitchTo() );

            PageFactory.initElements(new MograblogFieldDecorator( rootElement , webDriver).setSwitchManager(switchManager), enhancedObject);  

            switchManager.exit();
        }else{  
            PageFactory.initElements(new MograblogFieldDecorator( enhancedObject.getRootElement(), webDriver).setSwitchManager( switchManager ), enhancedObject);
        }  
    } catch (RuntimeException e) {  
        String msg = String.format("problems loading field [%s]", field.getClass().getName() + "#" + field.getName());  
        logger.info(msg, e);  
        throw new RuntimeException(msg, e);  
    }  
}   
```

## Changing the Decorator

```java
private boolean isSwitchTo = false;  
private SwitchManager switchManager;  

private List<WebElement> framePath;

public ElementHandler(Field field, ElementLocator locator, WebDriver webDriver) {  
    this.locator = locator;  
    this.webDriver = webDriver;  
    this.field = field;  
    this.isSwitchTo = field.isAnnotationPresent( SwitchTo.class );
    logger.debug("created handler for [{}]", field);  
}  

private WebElement locateElement() {  
    if ( isSwitchTo ){
        switchManager.enter(framePath);  
    }
    return locator.findElement();  
}   

public ElementHandler setSwitchManager( SwitchManager switchManager ){
    this.switchManager = switchManager;  
    framePath = switchManager.getCurrentPath();  
    return this;  
}

public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {  
    if ( method.isAnnotationPresent( NoEnhancement.class )){  
        return  methodProxy.invokeSuper(o, objects);  
    }  

    logger.debug("[{}] intercepted method [{}] on object [{}]", field, method, o);  
    if (o instanceof MograblogElement) {  
            MograblogElement comp = (MograblogElement) o;  

            WebElement element = locateElement();  

            if ( isSwitchTo ){  
                switchManager.enter( element );
                comp.setRootElement( webDriver.findElement(By.cssSelector("body")));  
            }else{  
                comp.setRootElement(element);  
            }  

            comp.setWebDriver(webDriver);  

        try {  
            return methodProxy.invokeSuper(o, objects);  
        } catch (InvocationTargetException e) {  
            throw e.getCause();  
        } finally{  

            if ( isSwitchTo ){  
                switchManager.exit();
            }
        }  

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

## Conclusions

Last time we taught Selenium to switch to an iframe on every method call.  
This solution did not work if that iframe had another iframe in it.  
In this post we added support for that scenario and more.  
We now support infinite number of iframes hierarchy.  
It is time we move to something else, so next time we will  
we will talk about making play!framework configuration user friendly.