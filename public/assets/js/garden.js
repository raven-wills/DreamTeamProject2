router.set('views', path.join(__dirname, 'views'));

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
  });



//   JinvertScroll
$.jInvertScroll(['container-content', 'container-header']);