/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

$(document).ready(() => {

  const createTweetElement = function(tweet) {

    const { user, content, created_at } = tweet;

    const $template = $("#tweet-template").contents().clone();

    $template.find(".avatar").attr("src", user.avatars);
    $template.find(".avatar").attr("alt", `${user.avatars}'s avatar`);
    $template.find(".user-firstname").text(user.name);
    $template.find(".user-handle").text(user.handle);
    $template.find(".tweet-content p").html(content.text);
    $template.find(".timestamp").text(created_at);

    return $template;

  };

  const renderTweets = function(tweets) {

    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }

  }

  renderTweets(data);

});