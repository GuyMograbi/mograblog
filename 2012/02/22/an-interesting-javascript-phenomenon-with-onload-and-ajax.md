<style>.content { padding-left:40px; } pre { background-color:#EFEFEF; padding:20px; }</style>

# Symptom

<div class="content">Getting

<pre style="color:red">  
"Uncaught ReferenceError"  
</pre>

for a function which is defined on the page</div>

# Reproduction

<div class="content">Create 2 pages. On first page write the following

<pre>  

<script><br />    $(function(){<br />        $("#result").load("/Application/guy")<br />    })<br /></script>  
</pre>

And on the other write

<pre>  
<script><br />    $(function(){<br />        guy();<br />     })<br /></script>  
<script><br />     function guy(){ console.log("hello world")}<br /></script>  
</pre>

Make all the required wiring so that page1 will load with ajax page2\.</div>

# Some comments

<div class="content">

*   I successfully reproduced this in Chrome and FF
*   This does not happen if you place both function in the same "script" section
*   Some might say the code is written badly, and I won't argue, but I still think this is a browser bug.

</div>

# Resolution?

<div class="content">Simply reorganize the function so it works.</div>