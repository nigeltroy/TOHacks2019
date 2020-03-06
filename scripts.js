// This file has the script our extension uses to parse the
// start and end locations, send a request to Google Maps API and
// calculate our "trees killed" metric"

document.addEventListener("DOMContentLoaded", function(event) {
    var show = document.getElementById("busEmissions");
    show.onload = main();
});

// replaceObliqueWithSpace(str) returns str with its obliques replaced with spaces
function replaceObliqueWithSpace(str) {
    return str.split(",")[0].replace(/\+/g, " ");
}

// convertUrlToLocations(url) parses the given URL to return an array of
// the required origin and destination locations
function convertUrlToLocations(url) {
    var urlArray = url.split("/");
    var origin = urlArray[5];
    var destination = urlArray[6];
    var locationArray = [
        origin,
        destination
    ];
    return locationArray;
}

// Our main() function, where all the important stuff goes down
function main() {
    // Set up our settings for the query we need to execute
    var chromeTabsQuerySettings = {
        'active': true,
        'currentWindow': true
    };
    chrome.tabs.query(chromeTabsQuerySettings, function(tabs) {
        // Get active tab's URL
        var url = tabs[0].url;

        // Parse the URL and get the origin and destination locations
        var locationArray = convertUrlToLocations(url);
        var origin = locationArray[0]; // like "University+of+Waterloo,+200+University+Ave+W,+Waterloo,+ON+N2L+3G1"
        var destination = locationArray[1]; // like "Ryerson+University,+Victoria+Street,+Toronto,+ON"

        // This is so bad omg, luckily we deactivated this key, but
        // this would normally be part of a .env file that is part of our .gitignore
        var key = "AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM";

        // Set our default travel mode
        var travelMode = "driving";

        // Set these values in the frontend of our extension
        document.getElementById("to").innerText = "TO: ".concat(replaceObliqueWithSpace(origin));
        document.getElementById("from").innerText = "FROM: ".concat(replaceObliqueWithSpace(destination));

        // Gotta refactor this request code ...
        // ... from here ...
        // driving
        var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
        var request = new XMLHttpRequest();
        request.open('GET', requestUri, true);

        request.onload = function () {
            // take the distance
            var data = JSON.parse(this.response);
            var distanceM = data.routes[0].legs[0].distance.value;
            var emissions = distanceM;
            document.getElementById("carEmissions").setAttribute("name", emissions);


            // transit
            travelMode = "transit";

            var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
            var request2 = new XMLHttpRequest();
            request2.open('GET', requestUri, true);

            request2.onload = function () {
                // take the distance
                var data = JSON.parse(this.response);
                var distanceM = data.routes[0].legs[0].distance.value;
                var emissions = distanceM * 0.6;
                document.getElementById("busEmissions").setAttribute("name", emissions);

                var carEmissions = parseFloat(document.getElementById("carEmissions").getAttribute("name"));
                var busEmissions = parseFloat(document.getElementById("busEmissions").getAttribute("name"));

                document.getElementById("difference").setAttribute("name", carEmissions - busEmissions);
                //document.getElementById("difference").innerText = 23;
                var differenceEmissions = parseFloat(document.getElementById("difference").getAttribute("name"));
                document.getElementById("trees").innerText = Math.round(differenceEmissions * 0.000621371 / 48.0*100)/100;
            }
            request2.send();
        }
        request.send();
        // ... to here!
    });
}
