<div dir="ltr" style="text-align: left;" trbidi="on">As I was starting to learn python, I learned some surprising things about python quite quickly. And thought I should share in a little example  

<pre class="python" name="code">### This file shows usage of constructor  

class Calc:  
    numberA = 0  
    numberB = 0  

    def __init__(self, numberA:int, numberB=1):  
        self.numberA = numberA  
        self.numberB = numberB  

    def sum(self, v:int):  
        return self.numberA + v  

    def sum(self): # overrides the previous definition  
        return self.numberA + self.numberB  

    def mul(self):  
        return self.numberA * self.numberB  

    def div(self):  
        return self.numberA / self.numberB  

    def mod(self):  
        return self.numberA % self.numberB  

class MyCalc( Calc ):  
    numberA = 5  

    def __init__(self, numberA:int ):  
        super(MyCalc,self).__init__( numberA )  
        ## you can also do  
        # Calc.__init__(self,numberA)  

calc = MyCalc( 2 )  
print( calc.sum( ) )  

try:  
    print( calc.sum( 6 ) ) # will cause an error  
except Exception as e:  
    print('an error occured' + str(e))  

print( calc.mul( ) )  
print( calc.div( ) )  
print( calc.mod( ) )  
print( 'dir = ' + ",".join( dir( calc ) ) )  
print( 'class = ' + str( calc.__class__ ) )  
print( calc.__class__.__name__ )  
</pre>

# Things to Note

*   The constructor is called "__init__"  
*   Signature overloading is impossible. Instead you get override  
*   You can initialize function params  
*   Null in python is None  
*   "dir" function will show all attributes of a class  
*   ".__class__.__name__" will show the class' name  
*   When using a "try/except" you can use "Exception" as broadest type  
*   An empty function is "pass"  
*   You can call super constructor in more than one way  
*   You can define types on function parameters, but it's optional  

</div>