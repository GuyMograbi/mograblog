$(function () {
  if (window && window.location && window.location.hostname === 'localhost') {
    return // don't trigger counter on localhost
  }
  
  $.getScript('https://www.gstatic.com/firebasejs/3.2.1/firebase.js', function () {
    /**
     * initialize
     * @type {{apiKey: string, authDomain: string, databaseURL: string, storageBucket: string}}
     */
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBPkaNJa7n7yb670VB07t-6SO5nGSJ_3R0',
      authDomain: 'mograblog.firebaseapp.com',
      databaseURL: 'https://mograblog.firebaseio.com',
      storageBucket: ''
    }
    firebase.initializeApp(config)
    var rootRef = firebase.database().ref()
    var pageViewsRef = rootRef.child('pageviews')
    if (window && window.location && window.location.pathname) {
      /****
       *
       * update page views
       *
       ****/
      var pathkey = slug(window.location.pathname)
      var pageRef = pageViewsRef.child(pathkey)
      var counted = false

      pageRef.on('value', function (pageviews) {
        var pageviewsCount = pageviews.val()
        console.log('this is value', pageviewsCount)
        var $pageviews = $('.pageviews')
        $pageviews.attr('title', pageviewsCount + ' people saw this post')
        $pageviews.text(pageviewsCount)
        if (pageviewsCount > 20) {
          $pageviews.addClass('initialized')
        }
        if (!counted) {
          counted = true
          pageRef.transaction(function (views) {
            return views + 1
          })
        }
      })
    }
    /******
     *
     * update currently reading
     *
     *******/
    var currentReadingRef = rootRef.child('currentlyReading')
    var currentlyReading = false
    currentReadingRef.on('value', function (currentlyReadingValue) {
      /*****
       *
       * construct the twitter-feed like display
       *
       *****/
      var $currentlyReading = $('.currently-reading')
      $currentlyReading.empty()
      currentlyReadingValue.val().forEach(function (value) {
        $currentlyReading.append(
          $('<a>', {text: value.title, href: value.url, 'class': 'currently-reading-link mograblog-link'})
        )

        var agoText = 'earlier..'
        if (value.timestamp) {
          var hoursAgo = Math.floor((Date.now() - value.timestamp) / (1000 * 60 * 60))
          agoText = hoursAgo < 2 ? 'right now..' : hoursAgo + ' hours ago'
        }

        $currentlyReading.append(
          $('<div>', {text: agoText, 'class': 'currently-reading-ago'})
        )
      })
      $('.currently-reading-wrapper').addClass('initialized')

      /**
       *
       * update the value
       *
       */
      if (!currentlyReading) { // modify only once
        currentlyReading = true
        currentReadingRef.transaction(function (currentlyReadingArray) {
          var postTitle = $('.post-title').text()
          try {
            if (currentlyReadingArray && currentlyReadingArray.length > 0 && currentlyReadingArray[0].title === postTitle) { // don't modify if already registered this post
              return
            }
          } catch (e) {
          }
          return [{ // add this post and append with all the rest
            title: postTitle,
            url: document.location.pathname,
            timestamp: Date.now()
          }].concat(currentlyReadingArray.slice(0, currentlyReadingArray.length - 1))
        })
      }
    })
  })
})
