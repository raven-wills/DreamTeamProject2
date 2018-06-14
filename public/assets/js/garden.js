
// Also on Script.js for testing

$(document).ready(function () {

    $("#i1").on("click", function () {
      window.location.href = "/survey";
    });
    $("#i2").on("click", function () {
      window.location.href = "/badges";
    });
    $("#i3").on("click", function () {
      window.location.href = "/chat";
    });
  
    $("#i4").on("click", function () {
      window.location.href = "/my-garden";
    });

    $("#h2Database").on("click", function () {
      window.location.href = "/plants";
    });
  });



//   JinvertScroll
$(function() {
	$('ul.nav a').bind('click',function(event){
		var $anchor = $(this);
		/*
		if you want to use one of the easing effects:
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1500,'easeInOutExpo');
		 */
		$('html, body').stop().animate({
			scrollLeft: $($anchor.attr('href')).offset().left
		}, 1000);
		event.preventDefault();
	});
});


