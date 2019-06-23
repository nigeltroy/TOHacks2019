// Create request
var directionsService = new google.maps.DirectionsService;

var origin = "Disneyland";
var destination = "Universal Studios Hollywood";

//request.open('GET', 'https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM', true)

//request.onload = main();

function main() {
    var directionsService = new google.maps.DirectionsService;

    var url;
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        url = tabs[0].url;
    });
    var arr = parseUri(url);

    //get locations
    var carDistance = getDistance(arr[0], arr[1], "DRIVING");
    var busDistance = getDistance(arr[0], arr[1], "TRANSIT");
}

function parseUri(uri) {
    var uriArr = uri.split("/");
    var arr = [uriArr[6], uriArr[7]];

    return arr;
}

function getDistance(origin, destination, travelMode) {
    directionsService.route({
        origin: origin,
        destination: destination,
        travelMode: travelMode
    });



    var distance;

    return distance;
}





calculateAndDisplayRoute(
    directionsDisplay, directionsService, markerArray, stepDisplay, map);
// Listen to change events from the start and end lists.
var onChangeHandler = function () {
    calculateAndDisplayRoute(
        directionsDisplay, directionsService, markerArray, stepDisplay, map);
};

function calculateAndDisplayRoute(directionsDisplay, directionsService,
    markerArray, stepDisplay, map) {

    // Retrieve the start and end locations and create a DirectionsRequest using
    // WALKING directions.
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        travelMode: 'WALKING'
    }, function (response, status) {
        // Route the directions and pass the response to a function to create
        // markers for each step.
        if (status === 'OK') {
            document.getElementById('warnings-panel').innerHTML =
                '<b>' + response.routes[0].warnings + '</b>';
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}





var request = new XMLHttpRequest()

var baseUri = 'https://maps.googleapis.com/maps/api/directions/json'
var params = {

}
// Set method and URI
request.open('GET', 'https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM', true)

// Access JSON response data
request.onload = function () {
    // Parse JSON into an object
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400)
    {
        // Do stuff with the data
    }
    else
    {
        console.log('error')
    }

    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        var url = tabs[0].url;
    });
}

// Send request
request.send()