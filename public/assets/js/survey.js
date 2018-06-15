jQuery(document).ready(function() {
  if ($(".cd-stretchy-nav").length > 0) {
    var stretchyNavs = $(".cd-stretchy-nav");

    stretchyNavs.each(function() {
      var stretchyNav = $(this),
        stretchyNavTrigger = stretchyNav.find(".cd-nav-trigger");

      stretchyNavTrigger.on("click", function(event) {
        event.preventDefault();
        stretchyNav.toggleClass("nav-is-visible");
      });
    });

    $(document).on("click", function(event) {
      !$(event.target).is(".cd-nav-trigger") &&
        !$(event.target).is(".cd-nav-trigger span") &&
        stretchyNavs.removeClass("nav-is-visible");
    });
  }
});

   // Getting plant name
    // Adding an event listener for when the form is submitted
    $(".btn-floating").on("click", function () {
      event.preventDefault();

      // Post to new plant db
      $.post("/api/my-garden", {
          plant: plantObj.commonName
      });
  });