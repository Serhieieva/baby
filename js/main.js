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

    resizeWrapper();

    eventPlace.innerHTML = removeUSFromAddress(eventPlace.innerHTML);
});

function resizeWrapper (wrapDiv) {
    var winHeight = $(window).height(),
        widthToHeightRatio = 1.337,
        heightToWidthRatio = 0.75,
        wrapDiv = $('.wrapDiv'),
        wpapperHeight,
        wpapperWidth;

    if ($(window).width() > 550 && winHeight > 736) {
        wpapperHeight = 736;
        wpapperWidth = 550;
    } else if ($(window).width() > 550) {
        wpapperHeight = winHeight;
        wpapperWidth = wpapperHeight * heightToWidthRatio;
    } else if (winHeight > 736) {
        wpapperWidth = $(window).width();
        wpapperHeight = wpapperWidth * widthToHeightRatio;
    } else {
        if ($(window).width() / winHeight < 1.338) {
            wpapperHeight = ($(window).width() - 30) * widthToHeightRatio;
            wpapperWidth = wpapperHeight * heightToWidthRatio;
        } else {
            wpapperHeight = winHeight;
            wpapperWidth = winHeight * heightToWidthRatio;
        }
    }

    if ($(window).width() < 320 || winHeight < 400) {
        wpapperHeight = 388;
        wpapperWidth = 290;
    }

    wrapDiv.css({
        'height': wpapperHeight,
        'width': wpapperWidth
    });

    $('.container').css({'font-size': wpapperWidth / 23 + 'px'});
}

function removeUSFromAddress (address) {
    var regexp = /,*\s*usa|,*\s*US|,*\s*united states( of america)?/i;
    return address.replace(regexp, ' ');
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