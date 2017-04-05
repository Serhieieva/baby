function setDetails (event_name, host_name, event_date, event_time, event_venue, event_desc, image1_url, image2_url) {
    $('#event_name').html(event_name);
    $('#host_name').html(host_name);
    $('#event_date').html(event_date);
    $('#event_time').html(event_time);
    $('#event_venue').html(event_venue);
    $('#event_desc').html(event_desc);
    $('#image1_url').attr('src', image1_url);
    $('#image2_url').attr('src', image2_url);
}

tryBackgroundImages('background', $('.wrapDiv'));
tryBackgroundImages('content-background', $('.container'));

$(window).on('load resize', function () {
    var eventPlace = document.getElementById('event_venue');
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var widthToHeightRatio = 1.338;
    var wrapDiv = $('.wrapDiv');
    //
    // if (wrapDiv.height() > winHeight) {
    //     wrapDiv.width(winHeight / 1.345);
    // }

    wrapDiv.css({'height': wrapDiv.width() * widthToHeightRatio});

    $('.container').css({'font-size': wrapDiv.width() / 23 + 'px'});
   eventPlace.innerHTML = removeUSFromAddress(eventPlace.innerHTML);

    console.log(wrapDiv.height(), winHeight);
});

function removeUSFromAddress (address) {
    var regexp = /,*\s*usa|,*\s*US|,*\s*united states( of america)?/i;
    return address.replace(regexp,' ');
}

function tryBackgroundImages (name, destination) {
    var img = new Image();

    img.src = 'images/' + name + '.jpg';
    img.onerror = function () {
        img.src = 'images/' + name + '.png';
        img.onerror = function () {
            img.src = 'images/' + name + '.gif';
        };
    };

    img.onload = function () {
        destination.css('background-image', 'url(' + this.src + ')');
    };
}
