console.log("client.js-found");

$(document).ready(function() {
  console.log('doc-ready');

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

    const timeagoDate = timeago.format(new Date(tweet.created_at));
    $tweet.find('.tweet-date').text(timeagoDate);

    return $tweet;
  };
  $('#tweet-form').submit(function(event) {
    event.preventDefault();

    const tweetText = $('#tweet-text').val();
    const tweetLength = tweetText.length;

    if (tweetLength === 0) {
      alert("Oops! Your tweet is empty.");
      return;
    } else if (tweetLength > 140) {
      alert("Oops! Your tweet is too long. Maximum character allowed is 140.");
      return;
    }

    const serializedData = $(this).serialize();
    console.log('form being sent', serializedData);

    $.post('/tweets', serializedData, function(response) {
      console.log('tweet submitted:', response);   
    }).fail(function(error) {
      console.error('Error submitting tweet:', error);
    });
  });


  function loadTweets() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(tweets) {
      renderTweets(tweets);
      },
      error: function(error) {
        console.log('Error fetching tweets:', error);  
      }
    });
}

  loadTweets();

});
