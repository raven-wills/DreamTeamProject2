// $("#searchBar").on("click", function(event) {
//     event.preventDefault();
  
//     // get the value from the search bar
//     var newBuddy = $("#autocomplete-input").val().trim();

// // Ajax Call
//     $.get("/plants/" + newBuddy, function(data) {
//         console.log('hi',data.commonName)

//         // possibly add an "or" option to also search .scientificName and display whichever of the 2 categories matches the input value
//    });

// //     the following will go in the routes page & render the card as it shows in the plants page
// router.get("/plants/:newBuddy", function(req, res) {
//     buddy = req.params.newBuddy,
  
//     db.Plants.find ({
//       where: {
//         commonName: buddy
//       }
//     }).then((plant)=>{
//       console.log(plant)
//       return res.render(plant)})
//   });
  
// //   post/Render
// router.post("/plants/:newBuddy", function(req, res) {
//     db.Plants.create({
//     //   this should create/display the card
//     }).then(function(plant) {
//       res.json(plant);
//     });

//     // or

//     $.post("/api/my-garden", {
//         plant: $(this).attr("name")
//     });
//   });

// })



var $elementList = $('#row').find('p');

$('#searchInput').keyup(function(eve){
        searchString=$(this).val().toLowerCase();
searchArray=searchString.split(' ');
var len = searchArray.length;
$elementList.each(function(index,elem){
      $eleli = $(elem)
      $eleli.removeClass('hideThisLine');
      var oneLine = $eleli.text().toLowerCase()
      match = true,
      sal = len;
      while(sal--){
        if( oneLine.indexOf( searchArray[sal] ) == -1 ){
          match = false;
        }
      }
      if(!match){
        //console.log('this one is gets hidden',searchString);
        $eleli.addClass('hideThisLine');
      }
    });
    $('.dontShow').removeClass('dontShow');
    $('.hideThisLine').addClass('dontShow');
  });
$('#clearSearch').click(function (e){
  $('#cBuscador').val('').keyup();
});
