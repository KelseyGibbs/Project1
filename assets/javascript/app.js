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
            }
          }
          
          $.ajax(settings).done(function (response) {
            console.log(response.location.zip_code);
          });
    };

    yelpCall();
})

