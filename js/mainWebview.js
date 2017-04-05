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

function isNumber (event) {
    if (event) {
        var charCode = (event.which)? event.which: event.keyCode;
        if (charCode != 190 && charCode > 31 &&
            (charCode < 48 || charCode > 57) &&
            (charCode < 96 || charCode > 105) &&
            (charCode < 37 || charCode > 40) &&
            charCode != 110 && charCode != 8 && charCode != 46)
            return false;
    }
    return true;
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

function removeUSFromAddress (address) {
    var regexp = /,*\s*usa|,*\s*US|,*\s*united states( of america)?/i;
    return address.replace(regexp,' ');
}

tryBackgroundImages('background', $('.wrapDiv'));
tryBackgroundImages('content-background', $('.container'));

$(window).on('load resize', function () {
    var winHeight = $(window).height();
    var winWidth = $(window).width();
    var widthToHeightRatio = 1.338;
    var wrapDiv = $('.wrapDiv');

    wrapDiv.css({'height': wrapDiv.width() * widthToHeightRatio});
    $('.container').css({'font-size': wrapDiv.width() / 23 + 'px'});

    eventPlace.innerHTML = removeUSFromAddress(eventPlace.innerHTML);

    $('.remodal-overlay').css({'margin-top': $('.header').height() + 15});

    $("#number_of_adults").val(1);
    $("#number_of_kids").val(0);
    $("input[name=rsvp]").change(function () {
        if ($("input[name=rsvp]:checked").val() == 1) {
            if ($("#number_of_adults").val() < 1) {
                $("#number_of_adults").val(1);
                $("#number_of_adults").removeAttr("readonly");
                $("#number_of_kids").removeAttr("readonly");
            }
        } else {
            $("#number_of_adults").val(0);
            $("#number_of_kids").val(0);
            $("#number_of_adults").attr("readonly", "readonly");
            $("#number_of_kids").attr("readonly", "readonly");
        }
    });

    $("#rsvpForm").submit(function (e) {
        e.preventDefault();
        var domainUrl = document.domain;
        $.urlParam = function (name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return results[1] || 0;
            }
        };
        var em_id = $.urlParam('em_id');
        var number = $.urlParam('number');
        var email = $.urlParam('email');
        var rsvp = $("input[name=rsvp]:checked").val();
        var no_of_adults = $("#number_of_adults").val();
        var no_of_kids = $("#number_of_kids").val();


        $.ajax({
            url: "http://" + domainUrl + "/phildora/index.php/webservice/sendRsvp",
            type: "post",
            data: {
                'em_id': em_id,
                'number': number,
                'email': email,
                'rsvp': rsvp,
                'no_of_adults': no_of_adults,
                'no_of_kids': no_of_kids
            },
            success: function (response) {
                if (response == "true") {
                    $(".submit-form").html("<center><h5>Your RSVP response successfully sent!</h5></center>");
                    $(".submit-form").css({"padding-top": "0"});
                } else if (response == "false") {
                    alert("Please enter the correct number or email on which you have got the invitation!");
                } else {
                    alert("Error!" + response);
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });
});
