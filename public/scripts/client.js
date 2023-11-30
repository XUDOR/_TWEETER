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
    
    let $tweet = $('<article>').addClass('tweet');
  
    // Header
    let $header = $('<header>').addClass('tweet-header');
    let $picture = $('<div>').addClass('picture');
    $picture.append($('<img>').attr('src', tweet.user.avatars || 'default-avatar-path'));
    $header.append($picture);
    $header.append($('<div>').addClass('name').text(tweet.user.name || 'Unknown User'));
    $header.append($('<div>').addClass('user').text(tweet.user.handle || '@unknown'));
  
    // Tweet Content
    let $tweetContent = $('<section>').addClass('old-tweet').text(tweet.content.text || 'No text provided');
  
    // Footer
    let $footer = $('<footer>');
    let $date = $('<div>').addClass('tweet-date').text(timeago.format(new Date(tweet.created_at)));
    let $icons = $('<div>').addClass('icons');
    // icons
   
      //        
    //    <i class="fa-solid fa-heart"></i>

    $icons.append($('<i class="fa-solid fa-flag"></i>'));
    $icons.append($('<i class="fa-solid fa-retweet"></i>'));
    $icons.append($('<i class="fa-solid fa-heart"></i>'));

    $footer.append($date, $icons,);
  
    // Assemble the complete tweet
    $tweet.append($header, $tweetContent, $footer);
  
    return $tweet;
  };
  

  $('#tweet-form').submit(function(event) {
    event.preventDefault();

    const tweetText = $('#tweet-text').val();
    const tweetLength = tweetText.length;
    
    $('#error-message').slideUp();

    if (tweetLength === 0) {
      $('#error-message').text("Oops! Your tweet is empty.").slideDown();
      return;
    } else if (tweetLength > 140) {
      $('#error-message').text("Oops! Your tweet is too long. Maximum character allowed is 140.").slideDown();
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
