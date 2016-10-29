---
title: Selenium Page Model Limitations
published: 2013-05-13
description: selenium is nice and all, but it is quite limited.
keywords: selenium
layout: post.pug
---


In this post I will talk about an annoying limitation Selenium presents,
and in the next posts I will show how to enhance Selenium to support my wish list.

## Page Model

The Page Model relies heavily on the Page Factory.  
The idea is that you define a Page class like so

```
public class LoginPage{  
 @FindBy( css = "form input[name=username]")  
 WebElement username;  

 @FindBy( css = "form input[name=password]")  
 WebElement password;  

 @FindBy( css = "form .submit")  
 WebElement submit;  

 public login(username, password){  
  this.username.sendKeys(username);  
  this.password.sendKeys(password);  
  this.submit.click();  
 }  
}  
```

As you can see, I do not initialize the fields.  
This happens by calling PageFactory.  
Assuming you got your webDriver properly, the code will look like so:

```
LoginPage loginPage = new LoginPage();     
PageFactory.initElements(  webDriver  , loginPage );  
loginPage.login("my_username","my_secret_password");  
```

This is all nice and pretty, but as you can see, I am limited to "WebElement".  
In real life, the UI is divided to components, but Selenium does not support defining components.  

## The Benefit of Components

When I say components, I simply mean repeating HTML structure, which in turn may be used with repeating  
CSS styling and repeating JS binding.  
A simple example for a component you all know is an HTML form.  
Some applications disable/enable the "save" button, depending if the form is dirty or not.  
Angular uses the term "pristine" instead - which means exactly the opposite.  
If the form is pristine, the save button is disabled.  

However, form components might do a lot more than that.  
A common use for such a component (before angularJS) would be to synchronize the JS model and the form input fields  
While AngularJS saves this effort on the front-end, Selenium code still has to work hard.  
They need to define a field for each input field, and then write "sendKeys" on each one..  

If I could only define a "Form" component in Selenium in such a way that I won't have to change PageFactory initialization, then my code might look like this

```
public class LoginPage{  
 @FindBy("form#login_form")  
 private Form loginForm;   

 public void login( username, password ){  
  loginForm.set("username",username);  
  loginForm.set("password",password);  
  loginForm.submit();  
 }  
}  
```

I can even wrap this form in a nicer API easily ( and with AOP it is even easier )  

```
public class LoginForm extends Form{  
 public void setUsername( username ) { super.set("username",username); return this; }  
 public void setPassword( password ) { super.set("password",password); return this; }   
}  

public class LoginPage{  
 @FindBy("form#login_form")  
 private LoginForm loginForm;  

 public void login( username, password ){  
  loginForm.username(username).password(password).submit();  
 }  
}  
```

## Components Are a Higher Level API To My Page

HTML pages might changes often, and when they do, the selenium tests usually break.  
Imagine you decide to use a JQuery plugin instead of "select" tag.  
If you do this, all the Selenium tests that use "select" tag in pages will break.  
However, if you define a component for Select, all you need to do is change the implementation of this component.  

```

public class Select{  
 public void val( String option ) { .. implementation here .. }  
}  

public class PageWithSelect{  
 @FindBy("#select_something")  
 Select selectSomething;  

 public void selectOption(String option){  
  selectSomething.val( option );  
 }  
}  
```

## More Ideas For Components

*   Table with sorting and search
*   Paginated content
*   [Shuttles](http://docs.jboss.org/richfaces/latest_3_3_X/en/devguide/html/rich_listShuttle.html "shuttle")
*   Tabs
*   Trees
*   Menus
*   Navigations
