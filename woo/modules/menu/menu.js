$(document).ready(function () {
    var menuToggle = $('.menu').unbind();
    $('.menu ul').removeClass("show");

    menuToggle.on('click', function (e) {
        e.preventDefault();
        $('.menu ul').slideToggle(function () {
            if ($('.menu ul').is(':hidden')) {
                $('.menu ul').removeAttr('style');
            }
        });
    });
});