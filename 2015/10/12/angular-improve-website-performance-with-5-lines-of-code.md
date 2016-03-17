<div class="mograblog">Programmers usually miss it, but if you use `$timeout` or `$interval`, or even `$http` - the promise lives beyond the scope.  

and then upsetting things can happen. imagine a simple redirect after an ajax request success:  

<pre>  
$http.get( .. ) .then( function(){ $location.path(.. ) }  
</pre>

or polling every second?

<pre>  
$interval( func, 1000);  
</pre>

what most people don't know is that you have to cancel them with scope destruction..  

Here is first result in google: [Ben Nadel's - Don't Forget To Destroy Events](http://www.bennadel.com/blog/2548-don-t-forget-to-cancel-timeout-timers-in-your-destroy-events-in-angularjs.htm) You probably missed that, or missed something somewhere and there are leaking pollings and stuff in your code that you are unaware of. That's a shame because with probably 5 lines of code you can improve the behavior and performance of your code.

## How to destroy events the ugly way?

simply(?) do `$scope.$on('$destroy', .. )`.  
Some people will do `$onLocationChange` or something nasty, just so they won't have to work hard.. but that's uuuuuglly... don't you agree? just for a single scenario.. not a complete solution

## How to destroy events the pretty way?

Since I want events to exist only with scope, wouldn't that be most intuitive to have `$scope.$interval` for example? or even `$scope.$http` so that if the scope is destroyed, the event is cancelled. Well, here is how you do that

<pre class="prettyprint">  

angular.module('mograblog', [])  
    .run(function($rootScope, $interval) {  
        // add the register task to the rootScope. This will allow for autoUnregister when the  
        // scope is destroyed to prevent tasks from leaking.  

        var ScopeProt = Object.getPrototypeOf($rootScope);  
        ScopeProt.$interval = function(func, time){  
             var timer = $interval(func,time);  
             this.on('$destroy', function(){ $timeout.cancel(timer); });  
             return timer;  
        };  
    });  
</pre>

This solution uses the fact that scopes has a prototypical inheritance and adds a function to all scopes (including isolated). This function will simply cancel the interval. Same thing can be done for the rest. and that's it!</div>