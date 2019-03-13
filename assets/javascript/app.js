$(document).ready(function () {

    // When the submit button is clicked, prevent default and...
    $(".btn").on("click", function (event) {
        event.preventDefault();
        console.log("hey");

        // Get the value of the user inputs
        var dateInput = $("#inputDate").val().trim();
        var genreInput = $("#inputGenre").val().trim();
        var priceInput = $("#choosePrice").val();
        var cityInput = $("#inputCity").val().trim();

        console.log(priceInput);
        priceRange = "0," + priceInput;
        console.log(priceRange);
        
        var queryURL = "http://app.ticketmaster.com/discovery/v2/events.json?apikey=rbzvFPQuTHwPs9wYmrP99BX332WdMatP" +
         "&city=" + cityInput + 
        "&classificationName=music" + 
        "&sort=relevance,asc";

        console.log(queryURL)
        
        $.ajax({
            type: "GET",
            url: queryURL,
            async: true,
            dataType: "json",
            success: function (response) {
                
                if (response.hasOwnProperty('_embedded')) {
                    console.log("It has property embedded");
                    
                    
                    for (var i = 0; i < 5; i++) {
                        console.log(response._embedded.events[i]);
                        
                        
                    }
                    
                    
                } else {
                    
                    console.log("It does NOT have property embedded");
                    
                    $("#concertSchedule").html("<em>" + "TicketMaster currently does not have any event information for " + artist + ".</em>");
                    
                    
                }
            }
        });
        
    })
        

        
        
        
        
        
        
        
        
        
        
        
        
    });
    
    