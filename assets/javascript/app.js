var globalArtist;
var ticketSearch;
function searchDate() {
    var timeStamp = moment().format("YYYY-MM-DD[T]HH:mm:[00Z]");
    console.log(timeStamp);

    var searchDate = moment().add(1, "days").format("YYYY-MM-DD[T]HH:mm:[00Z]");
    console.log(searchDate);

    ticketSearch = "&startDateTime=" + timeStamp + "&endDateTime=" + searchDate;
    console.log(ticketSearch);
};

searchDate();

$(document).ready(function () {

    $("#ticketButton").hide();


    // When the submit button is clicked, prevent default and...
    $(".btn").on("click", function (event) {
        event.preventDefault();

        $("#ticketButton").show();
        
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
            "&classificationName=music" +
            "&city=" + cityInput +
            "&keyword=" + genreInput + ticketSearch;

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
                        globalArtist = (response._embedded.events[0].name);
                        console.log(response._embedded.events[i]);
                        console.log(globalArtist + "im not global");
                        var emptyDiv = $("<div class='ticketmaster'>")
                        var ticketName = $("<h3 class='title'>").text(response._embedded.events[0].name);
                        // var ticketText = (response._embedded.events[0].start.dateTime);







                        emptyDiv.append(ticketName);
                        // emptyDiv.append(ticketText);

                        $("#ticketmasterData").html(emptyDiv);
                    }


                    makeSecondCall(globalArtist);


                } else {

                    console.log("It does NOT have property embedded");

                    $("#concertSchedule").html("<em>" + "TicketMaster currently does not have any event information for " + globalArtist + ".</em>");


                }
            }
        });








    })

    //document.ready closing tag               
});









function makeSecondCall(globalArtist) {
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

    //function to manipulate ticketmaster artist for lastFM API
    var str = "";
    var res = "";
    var artistSearch = "";

    function myFunction(globalArtist) {
        str = globalArtist;
        console.log(globalArtist);
        res = str.split(" , ", 1);
    }

    myFunction();
    console.log(res);

    function myFunction2() {

        artistSearch = res[0].split(" ").join("+");
        console.log(artistSearch);
    }

    myFunction2();
    console.log(artistSearch);




    //
}

$("#ticketButton").on("click", function (event){
    location.href = ticketURL;
})