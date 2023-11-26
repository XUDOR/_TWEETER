console.log("client.js-found");
$(document).ready(function() {
  console.log('doc-ready');

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
  ];

  const renderTweets = function(tweets) {
    console.log("render");
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('.tweet-list').append($tweet);
    });
  };


  const createTweetElement = function(tweet) {
    console.log("create");
    let $tweet = $('<article>').addClass('tweet');
    $tweet.html(`
    <header class="tweet-header">
      <div class="picture">
        <img src="${tweet.user.avatars}">
      </div>
      <div class="name">${tweet.user.name}</div>
      <div class="user">${tweet.user.handle}</div>  
    </header>
    <section class="old-tweet">${tweet.content.text}</section>
    <footer>
      <div class="tweet-date">${new Date(tweet.created_at).toLocaleString()}</div>
      <div class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  `);
    return $tweet;
  };
  $('#tweet-form').submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    console.log('form being sent', serializedData);
    $.post('/tweets', serializedData, function(response) {
      console.log('tweet submitted:', response);
      
    }).fail(function(error) {
      console.error('Error submitting tweet:', error);
    });
  });
  renderTweets(data);
});
