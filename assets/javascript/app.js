//Initial array of animals
var animals = ["Dog", "Cat", "Lion", "Panda"];

 // displayAnimalInfo function re-renders the HTML to display the appropriate content
 function displayAnimalInfo() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Creating an AJAX call for the specific animal button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        // Creating a div to hold the animal
        var animalDiv = $("<div class='animal'>");

        var imgURL = response.data;

        for (var i = 0; i < imgURL.length; i++) {
            var image = $("<img>").attr("src", imgURL);
            // Appending the image
            animalDiv.append(image);
        }

        // Putting the entire movie above the previous movies
        $("#animal-view").prepend(animalDiv);
      });

    }

    // Function for displaying animal data
    function renderButtons() {

      // Deleting the animals prior to adding new animals
      // (this is necessary otherwise you will have repeat buttons)
      $("#buttons-view").empty();

      // Looping through the array of animals
      for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of animal-btn to our button
        a.addClass("animal-btn");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
      }
    }

    // This function handles events where an animal button is clicked
    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      // This line grabs the input from the textbox
      var animal = $("#animal-input").val().trim();

      // Adding animal from the textbox to our array
      animals.push(animal);

      // Calling renderButtons which handles the processing of our animal array
      renderButtons();
    });

    // Adding a click event listener to all elements with a class of "animal-btn"
    $(document).on("click", ".animal-btn", displayAnimalInfo);

    // Calling the renderButtons function to display the intial buttons
    renderButtons();
