var sns = new AWS.SNS({ accessKeyId: 'AKIAIKB67YFUHBYFKITQ', secretAccessKey: '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', region: 'us-east-1'});



/**
 * @param {object} info
 * @param {string} info.post
 * @param {string} info.url
 * @param {string} feedback
 **/
var params = (info) => ({
  Message: JSON.stringify(info,{},2), /* required */
  Subject: `Mograblog Feedback: ${info.feedback}`,
  TopicArn: 'arn:aws:sns:us-east-1:547507846372:mograblogFeedback'
});
const publish = (info) => sns.publish(params(info), function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});

  $('body').on('click' , '.feedback i', function(e){
    $(this).closest('.feedback').toggleClass('show-menu');
    e.stopPropagation();
    e.preventDefault();
    console.log('sending feedback');
    return false;
  })

  $('body').on('click', '.feedback .menu li', function(e){
    const info = {
      feedback: $(this).text(),
      post: $('.post-title').text(),
      url: window.location.href

    }
    publish(info);
    $('.feedback').removeClass('show-menu');
    $('.feedback').addClass('show-thank-you');
  });

  $('body').on('click', '.feedback .close', function(){
    $('.feedback').removeClass('show-thank-you');
  })
