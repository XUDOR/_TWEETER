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
    const avatarSrc = tweet.user.avatars || 'default-avatar-path'; // Update with a valid default path
    const userName = tweet.user.name || 'Unknown User';
    const userHandle = tweet.user.handle || '@unknown';
    const tweetText = tweet.content.text || 'No text provided';
    const createdAt = new Date(tweet.created_at).toLocaleString();
  
    let $tweet = $(`
      <article class="tweet">
        <header class="tweet-header">
          <div class="picture">
            <img src="${avatarSrc}">
          </div>
          <div class="name">${userName}</div>
          <div class="user">${userHandle}</div>  
        </header>
        <section class="old-tweet">${tweetText}</section>
        <footer>
          <div class="tweet-date">${createdAt}</div>
          <div class="icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
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
      console.log('response:', response);
      const newTweetElement = createTweetElement(response);
      $('.tweet-list').prepend(newTweetElement);
      $('#tweet-text').val('');
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
