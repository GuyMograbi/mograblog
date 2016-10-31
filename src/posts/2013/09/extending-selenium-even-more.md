---
title: Extending Selenium Even More
published: 2013-09-25T01:40:00.000-07:00
keywords: java, selenium, reflection
description: lets extend selenium a bit more.
layout: post.pug
---

My last post was about how we can easily correct the faults in Selenium's Page Model
by constructing smarter components that can expose better API than WebElement.  
We got rid of the impotency of the WebElement class by writing our own Decorator and Locator  
and thus allowing ourselves to define Components that wrap WebElement in the most natural way you can think.  
As an example, we showed a better way to implement a Select rather than exposing some utility function as proposed by Selenium.  

However, currently we can only have a single layer of wrapping, which means one components cannot have another.  
Using our Select example from before, we cannot reuse this component to construct a shuttle component.  
The shuttle component as showed below is pretty simple - it has 2 select elements and buttons that move one option to another.  



<div id="shuttle">
    <select class="available-options" size="3">
        <option value="option1">option1</option>
        <option value="option2">option2</option>
    </select>
    <button class="enable-options" style="position:absolute;">enable >></button>
    <button class="disable-options"><< disable</button>
    <select class="enabled-options" size="3"></select>
</div>

<script>$(function(){
    $(document).on("click","#shuttle .enable-options",
        function(){
            console.log("enabling");
            $("#shuttle .available-options option:selected")
                .remove()
                .appendTo($("#shuttle .enabled-options")); })
     $(document).on("click", "#shuttle .disable-options", function(){ $("#shuttle .enabled-options option:selected").remove().appendTo($("#shuttle .available-options")); }) })
</script>


# Our Spec

So basically, we would like a class to look something like the following

```
public class MograblogShuttle extends MograblogElement{  

    @FindBy( css = ".available-options" )  
    public MograblogSelect available;  

    @FindBy( css = ".enabled-options" )  
    public MograblogSelect enabled;  

    @FindBy( css = ".enable-options")  
    public WebElement enable;  

    @FindBy( css = ".disable-options")  
    public WebElement disable;  

    public void enable( String val ){  
        available.val( val );  
        enable.click();  
    }  

    public void disable( String val ){  
        enabled.val( val );  
        disable.click();  
    }  

}  
```

Are you finally convinced that extending Selenium is worth your while?  
Can you imagine this code with only WebElements to work with? How about utility functions?  

# Allowing Infinite Layers of Wrapping

If you look at the code from the previous post you will see that the Decorator is the best place to add this new functionality.  
When I first wrote this implementation, I chose to write a `load` function in `MograblogElement` and add it there  
so you can choose the one easier for you.  

Implementing it in the decorator looks like this

```
 // allow infinite layers of wrapping - initialize components with PageFactory.  
    private void initializeElement( Field field, MograblogElement enhancedObject ) {  
        field.setAccessible(true);  
        logger.debug("loading field :  " + field.getName());  
        try {  
            // NOTE : use the getter function so that CGLIB will intercept it and inject the root element.  
            PageFactory.initElements(new MograblogFieldDecorator( enhancedObject.getRootElement(), webDriver), enhancedObject);  
        } catch (RuntimeException e) {  
            String msg = String.format("problems loading field [%s]", field.getClass().getName() + "#" + field.getName());  
            logger.info(msg, e);  
            throw new RuntimeException(msg, e);  
        }  
    }     
```

We call this method from our `decorate` method which now looks like this (new line is highlighted)

```
@Override  
public Object decorate( ClassLoader loader, Field field ) {  
    if ( MograblogElement.class.isAssignableFrom( field.getType() )  && field.isAnnotationPresent( FindBy.class )) {  
        final MograblogElement enhancedObject =  (MograblogElement) getEnhancedObject( field.getType(), getElementHandler( field ) );  

        <span style="background:yellow">initializeElement( field, enhancedObject );</span>  

        return enhancedObject;  

    }else{  
        return defaultFieldDecorator.decorate( loader, field );  
    }  
}  

```

## Testing Ourselves

So far we have seen how the Component/Page approach we adapted helped us make Selenium developer friendly.  
We wrote a shuttle component in seconds and, most importantly, we used abstractions. If the "select" component is to be changed in the future, we would only have to modify its implementation as its API should remain the same  
Plus, we can reuse the shuttle and select components in all pages.  

Bigger projects should use a higher level of abstractions. Instead of writing a class `MograblogSelect`, it should be an interface, and its implementation  
should be decided by an dependency injection framework. (for example spring).

Writing the test becomes easy even with big components in hand.  
The following code doesn't really test anything (no assert statements) but it goes to show you how easy it should be.  

```
@Test  
public void shouldEnableDisableElements(){  
    WebDriver firefoxDriver = new FirefoxDriver();  

    firefoxDriver.get("http://www.mograblog.com/2013/09/extending-selenium-even-more.html"); // enter the post's URL here.   
    ShuttlePage page = new ShuttlePage();  

    PageFactory.initElements(new MograblogFieldDecorator(firefoxDriver, firefoxDriver), page);  
    page.enable( "option1", "option2");  

    try{ // normally we don't need this, but we want to see it change this time, so I added sleep  
        Thread.sleep(3000);  
    }catch(Exception e){}  

}  
```
