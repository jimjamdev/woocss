$(document).ready(function () {
'use strict';
  $('.tabs').each(function(index) {
    $(this).children('li').first().children('a').addClass('active').next().addClass('open').show();
  });

  $('.tabs').on('click', 'li > a', function(event) {
    if (!$(this).hasClass('active')) {
      event.preventDefault();
      var accordionTabs = $(this).closest('.tabs');
      accordionTabs.find('.open').removeClass('open').hide();

      $(this).next().toggleClass('open').toggle();
      accordionTabs.find('.active').removeClass('active');
      $(this).addClass('active');
    } else {
      event.preventDefault();
    }
  });
});
