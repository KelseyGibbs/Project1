$(document).ready(function () {

    var artist = "Madonna";
    console.log(artist);

    var queryURL = "http://app.ticketmaster.com/discovery/v1/events.json?keyword=" + artist + "&apikey=rbzvFPQuTHwPs9wYmrP99BX332WdMatP&callback=myFunction"
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


    var queryURL2 = ""
    $.ajax({
        type: "GET",
        url: queryURL2,
        async: true,
        dataType: "json",
        success: function (response) {

        }
    })













});