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

$(document).ready(function(){
    






});






































// finding user location


  
=======

// date picker from calendar
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, options);
  });

$(document).ready(function(){
var search = "cheeseburgers"
 
    function yelpCall () {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/WavvLdfdP6g8aZTtbBQHTw",
            "method": "GET",
            "headers": {
              "Authorization": "Bearer QPHJeCyKhtLXLqpFK-oy08dSYsiWJb-OABR-ET1CM__QDP3M2lIaSf-fvas3LIsDgta9ZuTZ5z_cEW1hjI8fBawa5YWr_v5g1alkNrWznK58xqo3mdZcpyJiUf6DXHYx",
              "cache-control": "no-cache"
=======

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