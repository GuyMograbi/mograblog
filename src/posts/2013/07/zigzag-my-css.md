---
title: Zigzag my CSS
published: 2013-07-29T02:38:00.000-07:00
description: this is how you can implement a zigzag in css.
keywords: css
layout: post.hbs
---


# ZigZag with SCSS

Recently I wanted to do a zigzag header/footer since it is so modern.  
I decided to implement it with pure CSS.  
I quickly found out a solution over at stackoverflow.  
However that solution was only for zigzag facing down.  
I decided to [enhance the solution, implement it as a mixin in SCSS](http://stackoverflow.com/a/17505515/1068746 "My enhanced solution"),  
and get the color as parameter.  

Since I am not an SCSS expert, I made my life easier and implemented 4 different mixins,  
one for each direction (up/down/right/left).  

## The Code

```
@mixin zigzag_downward( $color ){  
  background: linear-gradient( 45deg, transparent 75%, $color 75%) 0 50%,  
    linear-gradient(-45deg, transparent 75%, $color 75%) 0 50%;  
    background-repeat: repeat-x;  
    background-size:30px 30px, 30px 30px;  
}  

@mixin zigzag_upward( $color ){  
  background: linear-gradient( 45deg, $color 25%, transparent 25%) 0 50%,  
  linear-gradient(-45deg, $color 25%, transparent 25%) 0 50%;  
  background-repeat: repeat-x;  
  background-size:30px 30px, 30px 30px;  
}  

@mixin zigzag_left( $color ){  
  background: linear-gradient( 45deg, transparent 75%, $color 75%) 0% 0,  
    linear-gradient(135deg, transparent 75%, $color 75%) 0% 0%;  
    background-repeat: repeat-y;  
    background-size:30px 30px, 30px 30px;  
}  

@mixin zigzag_right( $color ){  
  background: linear-gradient( 45deg, $color 25%, transparent 25%) 0% 0,  
    linear-gradient(135deg, $color 25%, transparent 25%) 0% 0%;  
    background-repeat: repeat-y;  
    background-size:30px 30px, 30px 30px;  
}  

```

## How Does It Work?

This solution uses a very powerful feature in CSS3\.  
In CSS3 you can have multiple gradients as background.  
In this example, there are 2 gradients.  

```
linear-gradient( 45deg, $color 25%, transparent 25%) 0 50%,
linear-gradient(-45deg, $color 25%, transparent 25%) 0 50%;
```

These 2 gradient are actually 2 triangles which together create a single repetition in the zigzag pattern.  

In the div above I created a small offset between the two patterns which reveals the trick.  
A single triangle is simply a gradient of color and transparent.  
If you play with the gradient you can make a zigzag that fades out.  

You can play around with code using this mixin over at [codepen](http://codepen.io/anon/pen/HjJBF "Codepen").

### Lea Verou's Cool CSS Patterns Site

Lea Verou is a (rising?) star in the CSS world.  
Among her many tools she created a nifty site for [CSS patterns](http://lea.verou.me/css3patterns/ "CSS3 Patterns Gallery").  
This site is cool because you can edit the pattern online and get immediate feedback.  
Try it on her [zigzag pattern](http://lea.verou.me/css3patterns/#zig-zag "Zigzag Pattern").  
And if you're into CSS, you just might to check up on Lea every now and then.  

