$(document).ready(function () {
    var menuToggle = $('.menu').unbind();
    $('[data-type="menu"] ul').removeClass("show");

    menuToggle.on('click', function (e) {
        e.preventDefault();
        $('[data-type="menu"] ul').slideToggle(function () {
            if ($('[data-type="menu"] ul').is(':hidden')) {
                $('[data-type="menu"] ul').removeAttr('style');
            }
        });
    });
});