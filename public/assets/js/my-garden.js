
$(document).ready(function () {
    // Getting jQuery author and chosen plant

    // Get messages upon page load
    getUserInfo();
    var localUser;
    // Adding an event listener for when the form is submitted
    $(".btn-floating").on("click", function () {
        event.preventDefault();

        // Constructing a newPlant object to hand to the database
        // var newPlant = {
        //     plant: $(this).attr("name"),
        //     UserId: localUser.id
        // };
        // console.log(newPlant)
        // Post to database, retrieve updated view, change placeholder to standard
        $.post("/api/my-garden", {
            plant: $(this).attr("name"),
            UserId: localUser.id
        });
    });



    // Store current user info on client side. Set form placeholder to welcome user
    function getUserInfo() {
        $.get("/api/user_data", function (data) {
            if (!data.email) {
                console.log("not signed in");
            } else {
                localUser = data;
            }
        });
    }

    // A function for handling what happens when the form to create a new message is submitted
    // function handleFormSubmit(event) {
    //     event.preventDefault();

    //     // Constructing a newPlant object to hand to the database
    //     var newPlant = {
    //         plant: $(".btn-floating"),
    //         UserId: localUser.id
    //     };
    //     console.log(newPlant)
    //     // Post to database, retrieve updated view, change placeholder to standard
    //     $.post("/api/my-garden", newPlant);

    // }
});