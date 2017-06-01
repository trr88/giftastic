window.onload = function() {
    var themes = ["cars", "cats", "technology", "dogs"];
    var limit = 10;

    function displayGif() {

        var theme = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + theme + "&limit=" + limit + "&api_key=dc6zaTOxFJmzC";

        //     // Creates AJAX call for the specific movie button being clicked
        $.ajax({
                url: queryURL,
                method: "GET"
            })
            .done(function(response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.prepend(gifImage);
                    gifDiv.prepend(p);

                    $("#gif-view").prepend(gifDiv);
                };

            });

    }

    // Function for displaying movie data
    function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#selections").empty();
        // Loops through the array of movies
        for (var i = 0; i < themes.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<button>");
            // Adds a class of movie to our button
            a.addClass("theme");
            // Added a data-attribute
            a.attr("data-name", themes[i]);
            // Provided the initial button text
            a.text(themes[i]);
            // Added the button to the buttons-view div
            $("#selections").append(a);
        }
    }


    // // This function handles events where the add movie button is clicked
    $("#add-gif").on("click", function(event) {
        event.preventDefault();
        //     // This line of code will grab the input from the textbox
        var theme = $("#gif-input").val().trim();

        //     // The movie from the textbox is then added to our array
        themes.push(theme);

        //     // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });

    // // Adding click event listeners to all elements with a class of "movie"
    $(document).on("click", ".theme", displayGif);


    // Calling the renderButtons function to display the intial buttons
    renderButtons();


    console.log(themes);
}
