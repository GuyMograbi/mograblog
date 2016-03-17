<div class="mograblog" dir="ltr" style="text-align: left;" trbidi="on">

# AngularJS - I18N

As AngularJS becomes more popular, the demand for features increases immensely.  
While chart libraries and effects support take shape, quick fix solutions are useful.  

## I18N Support

I18N support for AngularJS is quite easy if you use [i18next](http://i18next.com/ "i18next site") library.  
And example for usage taken from their homepage show this library's appealing simplicity.  
With this JSON dictionary

<pre>  
{  
  "app": {  
    "name": "i18next"  
  }  
}  
        </pre>

Translation is as easy as writing

<pre>var appName = t("app.name");</pre>

So now all that is left, is to wrap around this with some AngularJS magic.

## Naive Implementation With Bugs

Seeking a nice way to get AngularJS produce i18next results, the obvious  
solution is to write a filter.  
Filters make functions available on any scope.  
Filters are not limited in any way, and can be chained.  
So in many ways, filters are simply a function call.  
Believe it or not, but all it takes is the following code

<pre>  
myModule.filter( 'i18n', function(  ){  
    return function(){ return t( arguments ); }  
} )  
        </pre>

As you can see we are simply returning a function that calls translate.  
Since we pass "arguments" to "t", our code already supports parameters.  

### Using our code

Assuming we have the following JSON translation

<pre>  
            {'form' {'first.name':'First Name'} }  
        </pre>

I use it like so

<pre>  
            {{'first.name' | i18n }}  
        </pre>

And if I need to format my msg

<pre>  
            {'hello':'Hello __name__!'}  
        </pre>

I can write

<pre>  
            {{ 'hello' | i18n:'{"name":"Guy"}' }}  
        </pre>

However, the above code is wrong only because i18next requires initialization.  
Initializing things with AngularJS is rarely a problem.  

I am not an AngularJS expert.  
I just show you how I resolved things.  
It does not mean this is the best practice or even the recommended solution.  
This is just a solution - one of many.  

## Initializing I18Next with AngularJS

Luckily, I18Next has an initialization callback, so you can do stuff once initialized.  
I decided to run the initialization code by defining a service.  

<pre>  
myModule.service('i18nextService', function( $rootScope ){  
        var option = getOptions(); //implement some way to get options according to your needs.  
        i18n.init(option, function(){ $rootScope.$digest(); console.log("after i18n loading")});  
    } );  
        </pre>

Please note that my solution does not wrap i18next.  
In general I believe that wrapping libraries with Angular is a bad practice.

## Improving My Solution

My solution still introduces some problems - one of them still in the initialization part.  
Although the page will show correctly eventually, the user might see the keys  
until i18next is initialized.  
AngularJS has the mechanism to preload data before routing.  
However, this solution requires a steeper learning curve, so I prefer to use it  
only when I really need.  
[How to make AngularJS more like Gmail By John Lindquist](http://youtu.be/P6KITGRQujQ "How to make AngularJS more like Gmail By John Lindquist") is a great video  
that will teach you how to resolve the issue.  

</div>