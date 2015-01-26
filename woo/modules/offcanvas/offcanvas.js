// data-action
// data-open

$(document).ready(function() {

    'use strict';

    var leftCanvas = "js-opencanvas-left";
    var rightCanvas = "js-opencanvas-right";
    var topCanvas = "js-opencanvas-top";
    var bottomCanvas = "js-opencanvas-bottom";

    $('[data-action="open-offcanvas"]').click(function(e) {

        if ($(this).attr('data-open') == 'left') {
            $(this).toggleClass('active');
            if ($('body').hasClass(leftCanvas)) {
                $('body').removeClass();
            } else {
                $('body').addClass(leftCanvas);
            }
        }

        if ($(this).attr('data-open') == 'right') {
            $(this).toggleClass('active');
            if ($('body').hasClass(rightCanvas)) {
                $('body').removeClass();
            } else {
                $('body').addClass(rightCanvas);
            }
        }

        if ($(this).attr('data-open') == 'top') {
            $(this).toggleClass('active');
            if ($('body').hasClass(topCanvas)) {
                $('body').removeClass();
            } else {
                $('body').addClass(topCanvas);
            }
        }

        if ($(this).attr('data-open') == 'bottom') {
            $(this).toggleClass('active');
            if ($('body').hasClass(bottomCanvas)) {
                $('body').removeClass();
            } else {
                $('body').addClass(bottomCanvas);
            }
        }


        e.preventDefault();
    });

});
