function main() {
    // set up
    var url;
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        url = tabs[0].url;
    });
    var arr = parseUri(url);

    var key = "AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM";
    var origin = arr[0];
    var destination = arr[1];
    var travelMode = "driving";

    // driving
    var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
    request.open('GET', requestUri, true);

    var carDistanceMeters;
    var busDistanceMeters;

    request.onload = function () {
        // take the distance
        var data = this.response;
        carDistanceMeters = data.routes[0].legs[0].distance.value;
    }

    request.send();

    // transit
    travelMode = "transit";

    var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
    request.open('GET', requestUri, true);

    request.onload = function () {
        // take the distance
        var data = this.response;
        busDistanceMeters = data.routes[0].legs[0].distance.value;
    }

    request.send();
}

function parseUri(uri) {
    var uriArr = uri.split("/");
    var arr = [uriArr[6], uriArr[7]];

    return arr;
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