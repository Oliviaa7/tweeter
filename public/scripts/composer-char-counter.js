$(document).ready(() => {

  // Capturing keyboard input in textarea to calculate how many characters are left
  $('#tweet-text').on("input", function() {

    const $tweetText = $(this);
    const $counter = $tweetText.closest('form').find('.counter');

    const inputValue = $tweetText.val()

    const charsLeft = 140 - inputValue.length;

    $counter.text(charsLeft);

    if(charsLeft < 0) {
      $counter.addClass('over-limit');
    } else {
      $counter.removeClass('over-limit');
    }

  });


});