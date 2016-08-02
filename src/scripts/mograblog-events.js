$(function(){
    var title = $('.post-title').text();
    mixpanel.track("post-view", { 'title' : title});
    
    mixpanel.time_event('session-duration')

    $(window).unload(function(){
        mixpanel.track('session-duration',{'title' : title})
    })
})