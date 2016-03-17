  

Lately, I have been tutoring small children how to program.  
The parents seemed excited about Python, so I went along with it.  

As the time flies by, I am amazed to discover the amount of knowledge transferred to children by programming just a little bit.  

# English

For non-native speakers, this requirement is amazing.  
True - we need to know English well in order to program, but we can also get along quite well without it.  

We need to understand the keywords. For example : "for","while","if","else","switch" etc...  
and some built-in functions' name : "print","input" etc..  

Other than that - you can definitely get along with mixed languages. For example "shem_shel_sefer" - which means "book's name" in Hebrew.  

It seems that this requirement from children is quite simple. They have a good memory for words and by this age they know all the letters and some words, and a little speech.  

# Hello World!

Take the simplest example "hello world!" program.  

In order to teach this, you run "python" command and go into the shell.  

Then you type  

<pre name="code" class="python">print("hello world!")  
</pre>

On the first example you already have a function call.  

At this point they don't need to fully understand what a function is, but simply that it does stuff.  

Next, you usually read some input. Something like this (pseudo-code) :  

<pre name="code" class="python">name = input("please insert name:")  
print("hello " + name)  
</pre>

You have another function. Now they know 2 major functions. One of them is returning a value.  

Another amazing thing here is the variable "name". (you can also write "shem" which is name in Hebrew). It seems so intuitive to kids that the value returned in "input" is kept inside "name" and then used in "print".  

Funny how difficult it is for 13 years old children learning math to observe the same thing.  

# Loops, Boolean and Math

These three usually go along, so it is intuitive to teach them together.  
The kids already know the meaning of  

<pre name="code" class="python">x = 2  
</pre>

They know it means - put "2" inside "x".  
But it is a bit difficult for them to learn  

<pre name="code" class="python">x == 2  
</pre>

This is due to the fact they've never seen this syntax before anywhere!  

However, once you point out the computer needs to know the difference between the two, they seem to get the hang of it. "x == 2" - is the correct way to ask the computer "are they equal?".  

Python returns "True" or "False" - and so they learn 2 more words.  

From there on, teaching other operators such as ">" , "<" etc.. is even easier as they know this syntax from school.  

Going on from there to "if" is quite simple, and adding "else" is elementary.  

Loops take some time, but remember - kids don't need to know everything(!) - so teaching "while" is enough.  

So for "while" you need to write some code  

<pre name="code" class="python">x = 2  
while ( x < 5 ):  
    x = x - 1  
    print("x = " + str(x) )  
</pre>

Then I explain to them 3 things :

1.  at first x is 2
2.  each time x is less than 5 I print to screen that value of x, and decrement it by one
3.  I stop when x is NOT less than 5 (don't say bigger or equals..)

They are pretty smart. By now you can go over the code line by line, and they will understand what the program does. (AMAZING!).  

Now the question is : What will be printed on screen?  
I go over with them. The first cycle is a bit hard, and then the second.  
In the third they do it alone, and then they understand it stops.  
The immediately press ENTER to see if they are right..  

# Infinity

I discovered that the next best thing to teach at this point is the infinite loop.  
First of all - kids love the concept, and second of all - it is quite practical later on. (I will show you in a bit). So I write

<pre name="code" class="python">while( 1 == 1 )  
{  
 print ("hello world!")   
}  
</pre>

and then I ask them - how many times will it print on screen?  
They think a little and answer "a lot". :)  

You should ask them "when will it stop printing?" - and then you get the answer you want.. they say "never".  

# Writing a function

This is a big step. I tell them I am about to write a function and when I am done I will explain to them everything. I write the following code

<pre name="code" class="python">def sum(a,b):  
   return a+b  
</pre>

I explain to them what I wrote : "def" - is short for "definition".  
"sum" - is the name of the function. I can give whatever name I want. (leave out the details here).  
"return" - means that the following value will be returned from the function (just like "input" returned what I typed in).  

Then I explain :  
The function gets 2 numbers "a" and "b" and returns the sum.  

Then I tell them - lets use this function. And so I write  

<pre name="code" class="python">print( sum(2,3) )  
</pre>

And I ask them - what will it print?  

Sometimes I will need to go over the explanation several times. It is a hard leap for some but eventually they get the courage to say "5".  
I keep with some more obvious questions and only once I ensure their ego is big enough, I carry on.  

Then, I ask them what the following returns  

<pre name="code" class="python">sum("hello ","world")  
</pre>

This question is very intriguing to them. If they want to let it run and see, let them. They actually know what it will do - so they jump ahead and check if they are right.  

# Writing a Small Game

Just telling them you are about to write a game makes their eyes shine.  
I write the following code in a file this time (writing it in a console is very hard even for me):

<pre name="code" class="python">def game(a, b):  
    result = a + b  
    res = input("how much is " + str(a) + " + " + str(b) + "?")  
    if ( res == result):  
           print("You are right!!!!")  
    else:  
           print("You are wrong! The correct answer is : " + str(result) )  

game(2,3)   
game(20,3)   
game(16,13)   
</pre>

I go over the code several times. Their questions will mainly be due to the fact it is the biggest chunk of code they've ever seen.  
They understand the program perfectly, but they will be intimidated from the size of it, and will make you go over it several times.  

Then you should run the code.  
The screen will ask them "how much is 2 + 3?".  
They will answer "5" as they've answered this question minutes before.  
You will write "5" and press ENTER. The screen will show "You are right!!!" (ego boost).  
Then I tell them - lets see what happens if I write a wrong answer. And we input "4" and get the "else" scenario.  
Then the same for 20 and 3, 16 and 13\.  
They will be correct each time.  

This is where I tell them I don't want to pick the numbers myself. I want to the computer to pick the numbers for me..  
So I add some random and the code looks like  

<pre name="code" class="python">import random  
def game(a, b):  
    result = a + b  
    res = input("how much is " + str(a) + " + " + str(b) + "?")  
    if ( res == result):  
           print("You are right!!!!")  
    else:  
           print("You are wrong! The correct answer is : " + str(result) )  

game(random.randint(0,100),random.randint(0,1000))  
</pre>

Change the interval of rand if it is too hard for them.  
I run the game again. I run it several times - and they see that the numbers keep changing without changing the code. They understand the computer is peaking the numbers by itself.  

Then I add an infinite loop. I make sure they remember what it does. The code looks like

<pre name="code" class="python">import random  
def game(a, b):  
    result = a + b  
    res = input("how much is " + str(a) + " + " + str(b) + "?")  
    if ( res == result):  
           print("You are right!!!!")  
    else:  
           print("You are wrong! The correct answer is : " + str(result) )  

while( 2 == 2 ):  
     game(random.randint(0,100),random.randint(0,1000))  
</pre>

Now they see the game keeps running. You don't need to run it again each time..  

# Conclusion

You need to go over what you did. If you can do it while showing off to some other adult, do so. It will make them feel good with themselves - and for good reasons.  

# How to go on from here

You can take it in many directions.  
I like to add "points". Whenever an answer is correct - you get a point. Whenever it is incorrect, you loose 4 points.  

Then I like to add "players" - this will require code change OR if you are feeling up to it - teach them about lists.  

Each player has a different score.

# Why Does It Work?

If you ask me why does it work, I'd say it is simply the computer is communicating with the children.  
The computer will tell you if you are wrong or right, and sometimes it will surprise you. Children respond to computer and challenges, especially if they can test their answers right away.  
One of the mistakes the traditional schools have this day, I believe, is that children go home to do homework, and by the time they get to check the homework - which is days later - they already lost interest. The rush is already gone.  

But with computers, the rush stays as the result is immediate.  

# Things to Note

*   You should note I avoid reaching "0", as this number is a mystery even for some grown-ups*   You should make sure the code works. We are dealing with quite simple code, but still, go over it once before teaching a child. You don't want any embarrassments when the time comes*   Programming puts math into good use. The children get feedback about something too abstract without it.*   I avoid using "while(True)" as the sentences become vague. I use "while (1 == 1)" instead or something of that nature*   Sometimes the kid won't tell you the answer, and they will want to run the code and see the result. Let them. This behavior is a result of lack of confidence. Confronting them will have a negative outcome.