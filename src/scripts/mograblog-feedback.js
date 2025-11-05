// Getform.io endpoint for feedback
const GETFORM_ENDPOINT = 'https://getform.io/f/apjzgvka';

/**
 * Submit feedback to getform.io
 * @param {object} info
 * @param {string} info.post
 * @param {string} info.url
 * @param {string} info.feedback
 **/
const submitFeedback = (info) => {
  fetch(GETFORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(info)
  })
  .then(response => {
    if (response.ok) {
      console.log('Feedback submitted successfully');
    } else {
      console.error('Failed to submit feedback');
    }
  })
  .catch(err => {
    console.error('Error submitting feedback:', err);
  });
};

$('body').on('click', '.feedback-trigger', function(e){
  $('.feedback').toggleClass('show-form');
  e.stopPropagation();
  e.preventDefault();
  console.log('opening feedback form');
  return false;
})

$('body').on('submit', '.feedback-form', function(e){
  e.preventDefault();

  // Hide any previous error
  $('.form-error').fadeOut(200);

  // Collect checked quick feedback options
  const quickFeedback = [];
  $('input[name="feedback-quick"]:checked').each(function(){
    quickFeedback.push($(this).val());
  });

  const message = $('#feedback-message').val().trim();

  // Validate: require at least quick feedback OR custom message
  if (quickFeedback.length === 0 && !message) {
    $('.form-error').fadeIn(300);
    // Scroll to error message
    $('.feedback-form-container').animate({
      scrollTop: 0
    }, 300);
    return;
  }

  const formData = {
    name: $('#feedback-name').val(),
    email: $('#feedback-email').val(),
    message: message,
    quick_feedback: quickFeedback.join(', '),
    post: $('.post-title').text(),
    url: window.location.href
  };

  submitFeedback(formData);

  // Reset form
  $('.feedback-form')[0].reset();

  // Show thank you
  $('.feedback').removeClass('show-form');
  $('.feedback').addClass('show-thank-you');
});

$('body').on('click', '.feedback .btn-cancel', function(){
  $('.feedback').removeClass('show-form');
  $('.feedback-form')[0].reset();
  $('.form-error').hide();
});

$('body').on('click', '.feedback .close', function(){
  $('.feedback').removeClass('show-thank-you');
})
