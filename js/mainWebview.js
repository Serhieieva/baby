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

$(window).on('load resize',function () {

    //Global Variable
    var winHeight = $(window).height();
    var winWidth = $(window).width();

    function ScreenHeight () {
        if (winWidth < 550 && winHeight < 737) {
            $('.wrapDiv').css({'margin': '0 10px 10px 10px', 'padding': '15px'});
            $('.wrapDiv').css({'height': winHeight - (40 + $('header').height())});
            $('.container').css({'height': winHeight - (70 + $('header').height()), 'padding': '15px'});
        } else if (winWidth > 550 && winHeight < 737) {
            $('.wrapDiv').css({'margin': '0 auto 10px', 'padding': '15px 0'});
            $('.wrapDiv').css({'height': winHeight - (40 + $('header').height())});
            $('.container').css({'height': winHeight - (70 + $('header').height()), 'padding': '15px 0'});
        } else if (winWidth > 559 && winHeight < 960) {
            $('.wrapDiv').css({'margin': '0 auto 15px', 'padding': '15px 0'});
            $('.wrapDiv').css({'height': winHeight - (45 + $('header').height())});
            $('.container').css({'height': winHeight - (75 + $('header').height()), 'padding': '15px 0'});
        }

        //This js for Modal popup margin top
        $('.remodal-overlay').css({'margin-top': $('.header').height() + 15});
    }

    //set daynamic height as per ration
    var bannerWidth = $('.bannerImag').innerWidth();
    $('.bannerImag').css({'height': bannerWidth});

    //when Document Height < Window Height Then this fun will call
    var DocHeoght = $('.wrapDiv').innerHeight() + $('header').innerHeight();
    if (DocHeoght < winHeight) {
        ScreenHeight();
    }

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
