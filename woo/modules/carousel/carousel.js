(function() {

   'use strict';

   $('.carousel').each(function() {
       var $ele = $(this),
           itemCount = $ele.data('items'),
           useNav = $ele.data('nav') !== undefined ? $ele.data('nav') : false,
           useDots = $ele.data('dots') !== undefined ? $ele.data('nav') : true,
           useAutoWidth = $ele.data('auto-width') !== undefined ? $ele.data('auto-width') : false,
           margin = $ele.data('margin') !== undefined ? $ele.data('margin') : null,
           options = {
               dots: useDots,
               nav: useNav,
               autoWidth: useAutoWidth
           };

       if (margin !== null) {
           options.margin = margin;
       }

       if (itemCount !== undefined) {
           options.items = $.isArray(itemCount) ? itemCount[3] : itemCount
           options.responsive = {
               0:{
                   items: $.isArray(itemCount) ? itemCount[0] : 1
               },
               740:{
                   items: $.isArray(itemCount) ? itemCount[1] : 2
               },
               1025:{
                   items: $.isArray(itemCount) ? itemCount[3] : itemCount
               }
           };
       };

       $ele.owlCarousel(options);
   });

    })();
