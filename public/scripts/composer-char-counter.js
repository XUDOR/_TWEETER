console.log(jQuery); // or console.log($);
$(document).ready(function() {
  // ...
});



jQuery(document).ready(function() {
  // Event listener for character input.
  $('.new-tweet textarea').on('input', function() {
    const textLength = $(this).val().length;
    const remaining = 140 - textLength;

    // Assuming .counter is within the same parent element as the textarea
    const counter = $(this).siblings('.counter');
    counter.text(remaining);

    // Add or remove invalid class based on character count
    if (remaining < 0) {
      counter.addClass('invalid');
    } else {
      counter.removeClass('invalid');
    }
  });
});
