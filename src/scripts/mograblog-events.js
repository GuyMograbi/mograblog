$(function(){
    mixpanel.track("post-view", { 'title' : $('.post-title').text()});
})