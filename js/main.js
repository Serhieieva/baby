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
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var widthToHeightRatio = 1.338;
    var wrapDiv = $('.wrapDiv');

    wrapDiv.css({'height': wrapDiv.width() * widthToHeightRatio});
    $('.container').css({'font-size': wrapDiv.width() / 23 + 'px'});
});