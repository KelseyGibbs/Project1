var globalArtist;
var ticketSearch;
var ticketURL;

function searchDate() {
    var timeStamp = moment().format("YYYY-MM-DD[T]HH:mm:[00Z]");
    var searchDate = moment().add(1, "days").format("YYYY-MM-DD[T]HH:mm:[00Z]");
    ticketSearch = "&startDateTime=" + timeStamp + "&endDateTime=" + searchDate;
};

searchDate();

$(document).ready(function () {
    
    $("#ticketButton").hide();
    
    // When the submit button is clicked, prevent default and...
    $(".btn").on("click", function (event) {
        event.preventDefault();
        $("#ticketButton").show();
        
        // Get the value of the user inputs
        var genreInput = $("#inputGenre").val().trim();
        var cityInput = $("#inputCity").val().trim();

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
                        ticketURL = (response._embedded.events[0].url);
                        var ticketText = (response._embedded.events[0].sales.public.startDateTime);
                        emptyDiv.append(ticketName);
                        emptyDiv.append(ticketText);
                        emptyDiv.append(ticketURL);

                        $("#ticketmasterData").html(emptyDiv);
                        
                    }


                    myFunction(globalArtist);


                } else {

                    console.log("It does NOT have property embedded");

                    $("#concertSchedule").html("<em>" + "TicketMaster currently does not have any event information for " + globalArtist + ".</em>");


                }
            }
        });

    })

                 
});


// function anotherOne(globalArtist){
//     var s = globalArtist;
//     var n = s.indexOf(':');
//     s = s.substring(0, n != -1 ? n : s.length);
//     document.write(s);
// }

//function to manipulate ticketmaster artist for lastFM API
var str = "";
var res = "";
var artistSearch = "";
var artist;

function myFunction(globalArtist) {
    str = globalArtist;
    console.log(globalArtist + "I'm global");
    res = str.split(" , ", 1);
    console.log(res + "res");
    myFunction2();
}

function myFunction2() {

    artistSearch = res[0].split(" ").join("+");
    console.log(artistSearch);
    makeSecondCall(artistSearch);
}



function makeSecondCall(artistSearch) {
    artist = artistSearch;
    console.log(artist + "hiiiiiii")
    $.ajax({
        type: 'POST',
        url: 'http://ws.audioscrobbler.com/2.0/',
        data: 'method=artist.getinfo&' +
            "artist=" + artist +
            '&getTopTags&' +
            'getTopTracks&' +
            'api_key=a365207bc395cbad8267b11acaca3263&' +
            'format=json',
        dataType: 'jsonp',    
        success: function (data) {
            console.log("data from api", data)
            // Handle success code here
            var response = data.data;
            console.log(response);
            for (i = 0; i < data.length; i++) {
                console.log(artist + "artist is here ")
                var DataDiv = $("<div>");


                console.log("making sure this works", results[i].images.fixed_width_still.url);
                $("#lastFMData").append(response.artist.name);
                ArtistImage.attr(data.image[0])

                DataDiv.append(p);
                DataDiv.append(ArtistImage);

            }    
            var name = $("<h1>").text(data.artist.name);

            var ArtistImage = $("<img>");
            ArtistImage.attr("src", data.artist.image[3]["#text"]);

            var Bio = $("<p>").text(data.artist.bio.summary);
            console.log("am i getting data",Bio)

            var p = $("<p>").text(data.artist.tags.tag[0].name);
            $("#lastFMData").append(name, ArtistImage, p, Bio);
        }    

    });    

    console.log(artist + " are we here?");
    $.ajax({
        type: 'POST',
        url: 'http://ws.audioscrobbler.com/2.0/',
        data: 'method=artist.gettoptracks&' +
            'artist=' + artist +
            '&getTopTags&' +
            'getTopTracks&' +
            'api_key=a365207bc395cbad8267b11acaca3263&' +
            'format=json',
        dataType: 'jsonp',    
        success: function (data) {
            for(var i = 0; i < 4; i++){
                console.log(data);
            var topTracks = $("<p>").text(data.toptracks.track[i].name);
            $("#lastFMData").append(data.toptracks.track[i].name);
            }
        }    
    })    

}


$("#ticketButton").on("click", function (event){
    location.href = ticketURL;
})
