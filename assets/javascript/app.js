var globalArtist;
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
            // "&city=nashville" +
            // "&countyCode=US&classificationName=music" +
            // "&sort=relevance,asc" + 
            "&keyword=" + genreInput;

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
                        globalArtist = (response._embedded.events[i].name);
                        console.log(globalArtist+ "im not global");

                    }


                    makeSecondCall(globalArtist);


                } else {

                    console.log("It does NOT have property embedded");

                    $("#concertSchedule").html("<em>" + "TicketMaster currently does not have any event information for " + globalArtist + ".</em>");


                }
            }
        });


        
        
        
        
        
        
})
        
        
        
        
        
    });







    function makeSecondCall (globalArtist){
        console.log(globalArtist);
        globalArtist = "madonna";
        $.ajax({
            type: 'POST',
            url: 'http://ws.audioscrobbler.com/2.0/',
            data: 'method=artist.getinfo&' +
            'artist=' + globalArtist +
            '&getTopTags&' +
            'getTopTracks&' +
            'api_key=a365207bc395cbad8267b11acaca3263&' +
            'format=json',
            dataType: 'jsonp',
            success: function (data) {
                console.log("data from api", data.artist.tags.tag[0].name)
                // Handle success code here
                var response = data.data;
                for (i = 0; i < data.length; i++) {
                    
                    var DataDiv = $("<div>");
                    
                    
                    console.log("making sure this works", results[i].images.fixed_width_still.url);
                    $("#spotifyData").html(data.artist.name)
                    ArtistImage.attr(data.image[0])
                    
                    DataDiv.append(p);
                    DataDiv.append(ArtistImage);
                    
                }
                var name = $("<h1>").text(data.artist.name);
                
                var ArtistImage = $("<img>");
                ArtistImage.attr("src", data.artist.image[3]["#text"]);
                
                var p = $("<p>").text(data.artist.tags.tag[0].name);
                $("#spotifyData").append(name, ArtistImage, p);
            }
            
        });
        console.log(globalArtist + " are we here?");
        $.ajax({
            type: 'POST',
            url: 'http://ws.audioscrobbler.com/2.0/',
            data: 'method=artist.gettoptracks&' +
            'artist=' + globalArtist +
            'getTopTags&' +
            'getTopTracks&' +
            'api_key=a365207bc395cbad8267b11acaca3263&' +
            'format=json',
            dataType: 'jsonp',
            success: function (data) {
                console.log("data from api", data.toptracks.track[0].name);
                var topTracks = $("<p>").text(data.toptracks.track[0].name);
                $("#spotifyData").append(data.toptracks.track[0].name); 
            }
    })

    
}