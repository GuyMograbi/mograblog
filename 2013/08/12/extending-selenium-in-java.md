<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# Extending Selenium In Java- MograblogFieldDecorator and MograblogLocator

<div>

<a href="">Last Time</a> we saw some limitations Selenium has.  
One of those points was that we are bound to "WebElement" and we cannot define  
and use "complex" like "select" and invoke "getOptions" on it.  
Today, our wishes will become true.  
We will need a page to test on.  
I chose the this page.  
So lets add a select box with id "testme" and 2 options  

<a name="more"></a>

<div class="warning">Please do not be confused by the class org.openqa.selenium.support.ui.  
This is just a class that wraps some "helper" functions.  
It does not use abstractions needed to achieve decoupling and well formed design.  
</div>

<select id="testme"><option value="option1">Option1</option> <option value="option2">Option2</option></select>

## Extending Selenium's WebElement

Our extension will use Selenium's FieldDecorator interface which looks like so

<pre class="prettyprint">  
java.lang.Object decorate(java.lang.ClassLoader loader,java.lang.reflect.Field field)  
  </pre>

As you can see, this is a pretty simple interface with only one method.  
You actually already use it, but you use the default implementation.  
The DefaultFieldDecorator simply instantiates a WebElement.  
Actually it does something a bit more complex, but we will go over it later.  

So technically, we can use this interface to implement our own elements.  
We will not instantiate "WebElements", actually we will instantiate a lot of different things.  
Why hold ourselves back? The sky is the limit!

## Defining Our Select Element

Lets define the following classes

<pre class="prettyprint">  
public abstract class MograblogElement {  

    protected WebElement rootElement;  

    protected WebDriver webDriver;  

    public void setRootElement(WebElement rootElement) {  
        this.rootElement = rootElement;  
    }  

    public void setWebDriver(WebDriver webDriver) {  
        this.webDriver = webDriver;  
    }  
}  
  </pre>

<pre class="prettyprint">  
public class MograblogSelect extends MograblogElement {  

    private static Logger logger = LoggerFactory.getLogger(MograblogSelect.class);  

    public WebElement getOption( String str ){  
        try{  
            return rootElement.findElement(By.cssSelector(String.format("option[value=%s]", str)));  
        }catch(Exception e){  
            logger.debug("error while getting option", e);  
        }  
        return null;  
    }  

    public void val(String str) {  
        rootElement.click();  
        WebElement option = getOption(str);  
        if ( option != null ){  
            option.click();  
        }else{  
            throw new RuntimeException( String.format("no such option [%s]" , str) );  
        }  
    }  
}  
  </pre>

<pre class="prettyprint">  
public class MyPage {  

    @FindBy(css="select#testme")  
    public MograblogSelect select;  

    public void changeToOption2(){  
        select.val( "option2" );  
    }  

    public void changeToOption1(){  
        select.val( "option1 ");  

    }  
}  
  </pre>

<pre class="prettyprint">  
public class TestSelectElement {  

    @Test  
    public void shouldHave2Options(){  

        WebDriver firefoxDriver = new FirefoxDriver();  

        firefoxDriver.get("http://www.mograblog.com/2013/07/extending-selenium-in-java.html");  
        MyPage page = new MyPage();  

        PageFactory.initElements( new MograblogFieldDecorator( firefoxDriver, firefoxDriver ), page );  
        page.changeToOption2();  

        try{ // normally we don't need this, but we want to see it change this time, so I added sleep  
            Thread.sleep(3000);  
        }catch(Exception e){}  

    }  
}  </pre>

So far we:

*   Defined an abstract class
*   Defined our Select component
*   Define a page that uses this select component

As you can see, I have a page that uses my new shiny component,  
However, the field is not initialized!  
This is where our FieldDecorator comes in - it is responsible for initializing the field with an instance.  

## Writing MograblogFieldDecorator

To achieve our goals, we need to use CGLib.  
I really like using CGLib for Aspect Oriented Programming.  
It is very useful when I need a good and flexible abstraction.  
Read [more about CGLib on my blog](/search/label/cglib "Posts with CGLib").  

<pre class="prettyprint">  
public class MograblogFieldDecorator implements FieldDecorator {  

    final DefaultFieldDecorator defaultFieldDecorator;  

    final SearchContext searchContext;  
    private final WebDriver webDriver;  

    public MograblogFieldDecorator( SearchContext searchContext, WebDriver webDriver ) {  
        this.searchContext = searchContext;  
        this.webDriver = webDriver;  
        defaultFieldDecorator = new DefaultFieldDecorator( new DefaultElementLocatorFactory( searchContext ) );  
    }  

    public Object getEnhancedObject( Class clzz, MethodInterceptor methodInterceptor  ){  
        Enhancer e = new Enhancer();  
        // We could do a better abstraction here..  
        // We could use a factory to return the Implementing class for each type.  
        // For example, we could define SelectComponent, and map it to MograblogSelectComponent  
        // in the factory.  
        e.setSuperclass(clzz);  
        e.setCallback( methodInterceptor );  
        return e.create();  
    }  

    @Override  
    public Object decorate( ClassLoader loader, Field field ) {  
        if ( MograblogElement.class.isAssignableFrom( field.getType() )  && field.isAnnotationPresent( FindBy.class )) {  
            return getEnhancedObject( field.getType(), getElementHandler( field ) );  
        }else{  
            return defaultFieldDecorator.decorate( loader, field );  
        }  
    }  

    private MograblogLocator.ElementHandler getElementHandler( Field field ) {  
        return new MograblogLocator.ElementHandler( field, getLocator( field ), webDriver );  
    }  

    private ElementLocator getLocator( Field field ) {  
        return new DefaultElementLocatorFactory( searchContext ).createLocator( field );  
    }  

}    
  </pre>

The MograblogFieldDecorator is called for every field in the Page object.  
In this algorithm, we detect classes of type MograblogElement and we create MograblogHandler (see below) which will do all the magic.  
This MograblogHandler is actually a CGLib enhancer and you can see that we instantiate it at "getEnhacedObject".  
If the field it not a MograblogElement, we simply invoke the DefaultFieldDecorator - which is the class Selenium invokes by default.  

## Writing The MograblogLocator.ElementHandler

So far we simply initialized the fields.  
Now lets see the implementation for MograblogLocator.ElementHandler

<pre class="prettyprint">  
public class MograblogLocator {  

    public static class ElementHandler implements MethodInterceptor {  
        private static Logger logger = LoggerFactory.getLogger(ElementHandler.class);  

        private final ElementLocator locator;  
        private WebDriver webDriver = null;  
        private Field field;  

        private static Set <string>ignoredMethods = new HashSet<string>() {  
            {  
                add("toString");  
                add("hashCode");  
            }  
        };  

        public ElementHandler(Field field, ElementLocator locator, WebDriver webDriver) {  
            this.locator = locator;  
            this.webDriver = webDriver;  
            this.field = field;  
            logger.debug("created handler for [{}]", field);  
        }  

        private WebElement locateElement() {  
            return locator.findElement();  
        }  

        @Override  
        public Object intercept(Object o, Method method, Object[] objects, MethodProxy methodProxy) throws Throwable {  

            if (ignoredMethods.contains(method.getName())) {  
                return methodProxy.invokeSuper(o, objects);  
            }  
            logger.debug("[{}] intercepted method [{}] on object [{}]", field, method, o);  
            if (o instanceof MograblogElement) {  
                if (!method.getName().equals("setRootElement") &apm;& !method.getName().equals("setWebDriver")) {  
                    MograblogElement comp = (MograblogElement) o;  

                    WebElement element = locateElement();  

                    comp.setRootElement(element);  
                    comp.setWebDriver(webDriver);  
                }  

                try {  
                    return methodProxy.invokeSuper(o, objects);  
                } catch (InvocationTargetException e) {  
                    throw e.getCause();  
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

        @Override  
        public String toString() {  
            return "ElementHandler{" +  
                    "field=" + field +  
                    '}';  
        }  
    }  
}</string></string></pre>

This code is the enhanced object implementation.  
It catches all method invocations and makes sure to initialize the object with the right rootElement and webDriver.  
That's all it does actually. The rest is log prints and default fallbacks.  

## Benefits

This post shows a nice usage of CGLib that enables developers to define complex HTML components.  
Lets say that I decided to wrap the "select" element with some JQuery plugin - then my Select component implementation would change,  
but nothing else will.  
Another nice thing you can easily do - and I will show you how in the next posts -  
is add yet another layer of complexity.  
For example - the Shuttle component will use 2 Select components.  
So you get an uber-complex component :)  

## Why Would I Want Complex Components? My Code Is Complex Enough

The idea is to put most of the weight on the components, thus leaving the rest of the test code clean.  
This allows developers the chance to develop and Selenium component alongside the HTML Component,  
Relieving the QA developers the need to dissect them and giving them an intuitive API instead.  
QA developers should not deal with WebElement API - They should deal with Component API.  
This way makes sure there's a good separation between UI developers and QA developers.  

## Get The Code

The code is available at [my github repository for Mograblog - Selenium Extensions.](https://github.com/GuyMograbi/mograblog-selenium-extension "Github - Mograblog Selenium Extensions")  
Please note, Every Firefox version, requires a different selenium dependency.  
When I wrote this post, I used Firefox version 21.  
The corresponding selenium dependency version was 2.32.0.  
You should update the pom.xml in case you have a different Firefox version.  

## What is this - FirstDisplayed - Log Print?

In the next post, I will show you how you can easily get this extension to work harder for you.  
So the @FirstDisplayed enables you to handle dynamic content on the page easily.  
For example - lets assume you have #section1 and #section2 on the page but only one of them is displayed at any given moment.  
This annotation will help you.  

## But Wait! What About Abstractions?

My implementation can be more abstract.  
The abstraction part is crucial in the code snippet that instantiates the class.  
If you are interested in a better abstraction that I got, all you need to do  
is inject the FieldDecorator with a factory, and call the factory instead where we  
instantiate our component.  
I placed comments in the code above for you.  

</div>

</div>