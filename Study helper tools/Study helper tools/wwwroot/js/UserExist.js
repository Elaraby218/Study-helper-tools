$(function () {
    setTimeout(function () {
        $('body').removeClass('loading');
    }, 1000);
    $('.go-back-btn').on('click', function () {
        window.location.href = "/SignUpLogin/index"; 
    });
});