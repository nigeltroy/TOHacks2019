document.addEventListener("DOMContentLoaded", function (event) {
    var printing = document.getElementById("carEmissions");
    //var printed = document.getElementById("busEmissions");
    printing.onload = showRes();
    //printed.onload = showRes();
});

function main() {
    // set up
    var url = "";
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        url = tabs[0].url;
    });
    var arr = parseUri(url);

    var key = "AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM";
    var origin = "ICON + 330,+330 + Phillip + St, +Waterloo, +ON + N2L + 3W9, +Canada";
    var destination = "Shoppers + Drug + Mart,+260 + Queen + St + W, +Toronto, +ON + M5V + 1Z8";
    var travelMode = "driving";

    // driving
    var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
    request.open('GET', requestUri, true);

    var carDistanceMeters = 10;
    var busDistanceMeters = 11;

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

    var emissionArray = emissionCal(carDistanceMeters, busDistanceMeters);

    document.getElementById('carEmissions').innerHTML = emissionArray[0];
    document.getElementById('busEmissions').innerHTML = emissionArray[1];
}

function parseUri(uri) {
    var uriArr = uri.split("/");
    var arr = [uriArr[6], uriArr[7]];
    return arr;
}

function emissionCal(distance1, distance2) {
    distance2 = distance2 * 0.6;
    return [distance1, distance2];
}

function showRes() {
    var printed = document.getElementById("carEmissions");
    printed.innerText = main();
    var printing = document.getElementById("busEmissions");
    printing.innerText = main();
}