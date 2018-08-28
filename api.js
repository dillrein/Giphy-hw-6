//api placeholder
//api = NUmzu2fHHFydYfDYcToF2MqA12752Vfe;


var cartoons = ["Spongebob", "Tom and Jerry", "Family Guy"];

// displayCartoongif 
function displayCartoongif() {

    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=NUmzu2fHHFydYfDYcToF2MqA12752Vfe&limit=10";

    // AJAX call per gif
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            var results = response.data;

            //clears divs of gifs
            $("#cartoons-view").empty();

            //for loop to display 10 gifs. (10 comes from queryURL limit 10)
            for (var i = 0; i < results.length; i++) {
                var cartoonDiv = $("<div class='cartoon'>");

                var p = $("<p>").text("Rating: " + results[i].rating);

                //creating <img> at a still frame position.
                var image = $("<img>").attr("src", results[i].images.fixed_height_still.url)
                .attr("class", "gif")
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("data-animate", results[i].images.fixed_height.url)
                .attr("data-state", "still")
                .attr("class", "gif");
                

                cartoonDiv.append(p);
                cartoonDiv.append(image);

                // Putting the entire cartoon above the previous cartoons
                $("#cartoons-view").prepend(cartoonDiv);

                
            }
            //saw this as extension to possibly pause gifs. needs other documentation to work.
            //$(".gif").on("click", gifplayer());
            
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
        a.addClass("btn btn-dark")
        // Adding a data-attribute
        a.attr("data-name", cartoons[i]);
        // Providing the initial button text
        a.text(cartoons[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);

        
    }
}




// Form Submit button to create cartoon button.
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

//gif freeze functionality.
$(document).on("click", ".gif", function() {
    
    var state = $(this).attr("data-state");
    
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });





// inital buttons
renderButtons();

