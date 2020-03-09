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

// createRequestUri(origin, destination, travelMode) plugs in the given parameters and
// creates a URI to use to send a GET request to the Google Maps API
function createRequestUri(origin, destination, travelMode, apiKey) {
    var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + apiKey;
    return requestUri;
}

// parseRequestResponse(responseObject, emissionsModifier, emissionsElement) parses the response data and
// sets the respective HTML element to the calculated value
function parseRequestResponse(responseObject, emissionsModifier, emissionsElement) {
    var data = JSON.parse(responseObject.response);
    var distance = data.routes[0].legs[0].distance.value;
    var emissions = distance * emissionsModifier;
    document.getElementById(emissionsElement).setAttribute("name", emissions);
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

        // Set the origin and destination values in the frontend of our extension
        document.getElementById("origin").innerText = "TO: ".concat(replaceObliqueWithSpace(origin));
        document.getElementById("destination").innerText = "FROM: ".concat(replaceObliqueWithSpace(destination));

        // Let's set up our requests
        var request = new XMLHttpRequest();
        var drivingRequestUri = createRequestUri(origin, destination, "driving", key);
        var transitRequestUri = createRequestUri(origin, destination, "transit", key);
        // I know this isn't the best way to do it, but here goes
        var emissionsModifier = 1;
        var emissionsElement = "carEmissions"

        request.onload = parseRequestResponse(this, emissionsModifier, emissionsElement);

        // Mode: driving
        request.open('GET', drivingRequestUri, true);
        request.send();

        // Mode: transit
        emissionsModifier = 0.6;
        emissionsElement = "busEmissions";
        request.open('GET', transitRequestUri, true);
        request.send();

        // Get the calculated values for emissions
        var carEmissions = parseFloat(document.getElementById("carEmissions").getAttribute("name"));
        var busEmissions = parseFloat(document.getElementById("busEmissions").getAttribute("name"));
        var differenceInEmissions = carEmissions - busEmissions;
        var treesSavedModifier = 0.000621371 / 48.0 * 100;

        // Set the difference and trees saved metric values in the frontend of our application
        document.getElementById("difference").setAttribute("name", differenceInEmissions);
        document.getElementById("trees").innerText = Math.round(differenceEmissions * treesSavedModifier)/100;
    });
}
