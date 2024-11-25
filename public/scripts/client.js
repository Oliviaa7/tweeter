/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {

  // A function to grab tweet data and convert it to HTML to be presented on the webpage
  const createTweetElement = function(tweet) {

    const { user, content, created_at } = tweet;

    const $template = $("#tweet-template").contents().clone();

    $template.find(".avatar").attr("src", user.avatars);
    $template.find(".avatar").attr("alt", `${user.avatars}'s avatar`);
    $template.find(".user-firstname").text(user.name);
    $template.find(".user-handle").text(user.handle);
    $template.find(".tweet-content p").html(content.text);

    const timeagoStamp = timeago.format(created_at);

    $template.find(".timestamp").text(timeagoStamp);

    return $template;

  };

  // A function to grab the tweet data and append it to the HTML form 
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();

    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }

  };

  // Event listener for Tweet submit button which will serialize the data and then use AJAX POST request to post to the /tweets endpoint. 
  $(() => {
    const $button = $('#tweet-form');
    $button.on('submit', (event) => {
      event.preventDefault();

      const tweetText = $('#tweet-text').val().trim();

      if (!tweetText) {
        alert('Your tweet cannot be empty.');
        return;
      };

      if (tweetText.length > 140) {
        alert('Your tweet is too long. Maximum allowed is 140 characters.');
        return;
      };

      const serializedData = $(event.target).serialize();

      $.post('../tweets', serializedData)
        .done((response) => {
          $('#tweets-container').append(response);
          console.log('Tweet submitted successfully: ', response);
          $('#tweet-form textarea').val('');
          $('.counter').val('140');
          loadTweets();
        })
        .fail((error) => {
          console.error('Error submitting tweet: ', error);
          alert('Failed to submit. Please try again.');
        })
    })
  });

  // A function to fetch tweets from the /tweets page using AJAX GET request.
  const loadTweets = function() {
    $.get('../tweets')
      .done((tweets) => {
        console.log('Tweets retreived: ', tweets);
        renderTweets(tweets);
      })
      .fail((error) => {
        console.error('Error retreiving tweets: ', error);
        alert('Failed to load tweets. Please try again later.');
      })
  };

  loadTweets();
});