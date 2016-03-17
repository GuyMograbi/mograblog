The other day I was modifying a file, and I accidentally caused this GUI modification  

<div class="separator" style="clear: both; text-align: center;">[![](http://4.bp.blogspot.com/_J3A8WqpdCX0/TGpK_1b4aZI/AAAAAAAAAmk/tQDWXouvLoM/s320/accident_gui_change.png)](http://4.bp.blogspot.com/_J3A8WqpdCX0/TGpK_1b4aZI/AAAAAAAAAmk/tQDWXouvLoM/s1600/accident_gui_change.png)</div>

The required Look and Feel was the one on the left, where all balls are one beside the other.  
What I did was wrap those circles with an HBox.  

It was obvious to me that I needed a behavior similar to [border-collapse](http://www.w3schools.com/css/tryit.asp?filename=trycss_table_border-collapse) for a table or some sort of padding in CSS - as shown in this [table style wizard](http://www.somacon.com/p141.php).  

The answer to my question was "horizontalGap". Setting this to 0, gave me the required behavior.