function setDetails (event_name, host_name, event_date, event_time, event_venue, event_desc, image1_url, image2_url) {
    $("#event_name").html(event_name);
    $("#host_name").html(host_name);
    $("#event_date").html(event_date);
    $("#event_time").html(event_time);
    $("#event_venue").html(event_venue);
    $("#event_desc").html(event_desc);
    $("#image1_url").attr('src', image1_url);
    $("#image2_url").attr('src', image2_url);
}

$(window).on('load resize', function () {

    //Global Variable
    var winHeight = $(window).height();
    var winWidth = $(window).width();

    function ScreenHeight () {
        if (winWidth < 550 && winHeight < 736) {
            $('.wrapDiv').css({'margin': '15px', 'padding': '15px', 'height': winHeight - 60});
            $('.container').css({'height': winHeight - 90, 'padding': '15px'});
        } else if (winWidth > 550 && winHeight < 736) {
            $('.wrapDiv').css({'margin': '15px auto', 'padding': '15px 0', 'height': winHeight - 60});
            $('.container').css({'height': winHeight - 90, 'padding': '15px 0'});
        } else if (winWidth > 559 && winHeight < 736) {
            $('.wrapDiv').css({'margin': '15px auto', 'padding': '15px 0', 'height': winHeight - 60});
            $('.container').css({'height': winHeight - 90, 'padding': '15px 0'});
        }
    }

    //when Document Height < Window Height Then this fun will call
    if ($('.wrapDiv').innerHeight() < winHeight) {
        ScreenHeight();
    }

    //set daynamic height as per ration
    var bannerWidth = $('.bannerImag').innerWidth();
    $('.bannerImag').css({'height': bannerWidth});
});