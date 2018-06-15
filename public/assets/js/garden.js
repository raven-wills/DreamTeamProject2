// Also on Script.js for testing

$(document).ready(function() {
  
  $("#i1").on("click", function() {
    window.location.href = "/survey";
  });
  $("#i2").on("click", function() {
    window.location.href = "/badges";
  });
  $("#i3").on("click", function() {
    window.location.href = "/chat";
  });

  $("#i4").on("click", function() {
    window.location.href = "/my-garden";
  });
});

//   Horizontal Scroll
$(function() {
  $("ul.nav a").bind("click", function(event) {
    var $anchor = $(this);
    /*
		if you want to use one of the easing effects:
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1500,'easeInOutExpo');
		 */
    $("html, body")
      .stop()
      .animate(
        {
          scrollLeft: $($anchor.attr("href")).offset().left
        },
        1000
      );
    event.preventDefault();
  });
});


jQuery(document).ready(function () {
  if ($(".cd-stretchy-nav").length > 0) {
      var stretchyNavs = $(".cd-stretchy-nav");

      stretchyNavs.each(function () {
          var stretchyNav = $(this),
              stretchyNavTrigger = stretchyNav.find(".cd-nav-trigger");

          stretchyNavTrigger.on("click", function (event) {
              event.preventDefault();
              stretchyNav.toggleClass("nav-is-visible");
          });
      });

      $(document).on("click", function (event) {
          !$(event.target).is(".cd-nav-trigger") &&
              !$(event.target).is(".cd-nav-trigger span") &&
              stretchyNavs.removeClass("nav-is-visible");
      });
  }
});


