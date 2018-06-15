
    // Getting plant name
    // Adding an event listener for when the form is submitted
    $(".btn-floating").on("click", function () {
        event.preventDefault();

        // Post to new plant db
        $.post("/api/my-garden", {
            plant: $(this).attr("name")
        });
    });