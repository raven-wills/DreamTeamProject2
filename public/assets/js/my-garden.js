// Getting plant name
// Adding an event listener for when the form is submitted
$(".btn-floating:not(.darken-2)").on("click", function () {
    event.preventDefault();

    $.get("/api/my-garden", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                name: req.user.name,
                email: req.user.email,
                id: req.user.id
            });
        }
    });
    // Post to new plant db
    $.post("/api/my-garden", {
        plant: $(this).attr("name")
    });

});

$(function () {
    $(".col").slice(0, 30).show();
    $("#loadMore").on('click', function (e) {
        e.preventDefault();
        $(".col:hidden").slice(0, 30).slideDown();
        if ($(".col:hidden").length == 0) {
            $("#load").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
    });
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 50) {
        $('.totop a').fadeIn();
    } else {
        $('.totop a').fadeOut();
    }
});


var $elementList = $('.row').find('p');
$('.typeahead').keyup(function (eve) {

    searchString = $(this).val().toLowerCase();
    searchArray = searchString.split(' ');
    var len = searchArray.length;
    $elementList.each(function (index, elem) {
        $eleli = $(elem)
        $eleli.removeClass('hideThisLine');
        var oneLine = $eleli.text().toLowerCase()
        match = true,
            sal = len;
        while (sal--) {
            if (oneLine.indexOf(searchArray[sal]) == -1) {
                match = false;
            }
        }
        if (!match) {
            //console.log('this one is gets hidden',searchString);
            $eleli.addClass('hideThisLine');
        }
    });
    $('.dontShow').removeClass('dontShow');
    $('.hideThisLine').addClass('dontShow');
});
$('#clearSearch').click(function (e) {
    $('#cBuscador').val('').keyup();
});

$('.fixed-action-btn').floatingActionButton();

