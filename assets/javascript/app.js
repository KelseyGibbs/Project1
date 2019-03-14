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







// finding user location


var queryLocationURL = {
    "async": true,
    "crossDomain": true,
    "url": "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBroF5LX3P_qRm3VK8IaOGVCaY1g06VhG4",
    "method": "POST",
    "headers": {
      "cache-control": "no-cache",
      "Postman-Token": "1c36ce3c-b962-42c3-86d5-7deccb5a3fdf"
    }
  }
  
  $.ajax(queryLocationURL).done(function (response) {
    console.log(response.location);
  });













});