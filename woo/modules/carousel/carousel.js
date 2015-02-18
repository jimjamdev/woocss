(function() {

   'use strict';

   $('.carousel').each(function() {
       var $ele = $(this),
           itemCount = $ele.data('items'),
           useNav = $ele.data('nav') !== undefined ? $ele.data('nav') : true,
           useAutoWidth = $ele.data('auto-width') !== undefined ? $ele.data('auto-width') : true,
           margin = $ele.data('margin') !== undefined ? $ele.data('margin') : null,
           options = {
               dots: useNav,
               nav: useNav,
               autoWidth: useAutoWidth
           };

       if (margin !== null) {
           options.margin = margin;
       }

       if (itemCount !== undefined) {
           options.items = $.isArray(itemCount) ? itemCount[4] : itemCount
           options.responsive = {
               0:{
                   items: $.isArray(itemCount) ? itemCount[0] : 1
               },
               678:{
                   items: $.isArray(itemCount) ? itemCount[1] : 4
               },
               960:{
                   items: $.isArray(itemCount) ? itemCount[3] : itemCount
               }
           };
       };

       $ele.owlCarousel(options);
   });

    })();
