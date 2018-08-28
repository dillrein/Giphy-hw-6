//api = NUmzu2fHHFydYfDYcToF2MqA12752Vfe;
var cartoons = ["Spongebob", "Tom and Jerry", "Family Guy"];

// displayCartoongif function re-renders the HTML to display the appropriate content
function displayCartoongif() {

    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=NUmzu2fHHFydYfDYcToF2MqA12752Vfe&limit=10";

    // Creating an AJAX call for the specific cartoon button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var results = response.data;

            //clears divs of gifs
            $("#cartoons-view").empty();

            //for loop to display 10 gifs.
            for (var i = 0; i < results.length; i++) {
                var cartoonDiv = $("<div class='cartoon'>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                //creating <img> at a still frame position.
                var image = $("<img>").attr("src", results[i].images.fixed_height.url)
                //.attr("data-still", results[i].images.fixed_height.url)
                //.attr("data-animate", results[i].images.fixed_height.url)
                //.attr("data-state", "still")
                //.attr("class", "gif");
                console.log(image);

                cartoonDiv.append(p);
                cartoonDiv.append(image);

                // Putting the entire cartoon above the previous cartoons
                $("#cartoons-view").prepend(cartoonDiv);

                
            }
               console.log 
            
        });

}

// Function for displaying cartoon data via array
function renderButtons() {

    // Deleting the cartoons prior to adding new cartoons
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of cartoons
    for (var i = 0; i < cartoons.length; i++) {

        // Then dynamicaly generating buttons for each cartoon in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of cartoon-btn to our button
        a.addClass("cartoon-btn");
        // Adding a data-attribute
        a.attr("data-name", cartoons[i]);
        // Providing the initial button text
        a.text(cartoons[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);

        
    }
}




// Form Subtmit button to create cartoon button.
$("#add-cartoon").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var cartoon = $("#cartoon-input").val().trim();

    // Adding cartoon from the textbox to our array
    cartoons.push(cartoon);

    // Calling renderButtons which handles the processing of our cartoon array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "cartoon-btn"
//$(document).on("click", ".cartoon-btn", $("#cartoons-view").empty());
$(document).on("click", ".cartoon-btn", displayCartoongif);






//freeze frame for gifs.
$(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(".gif").attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(".gif").attr("src", $(".gif").attr("data-animate"));
      $(".gif").attr("data-state", "animate");
    } else {
      $(".gif").attr("src", $(".gif").attr("data-still"));
      $(".gif").attr("data-state", "still");
    }
  });
// Calling the renderButtons function to display the intial buttons
renderButtons();