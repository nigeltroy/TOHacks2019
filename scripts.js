document.addEventListener("DOMContentLoaded", function(event) {
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
    var origin = "ICON+330,+330+Phillip+St,+Waterloo,+ON+N2L+3W9,+Canada";
    var destination = "Shoppers+Drug+Mart,+260+Queen+St+W,+Toronto,+ON+M5V+1Z8";
    var travelMode = "driving";

    // driving
    var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
    var request = new XMLHttpRequest();
    var request2 = new XMLHttpRequest();
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
    request2.open('GET', requestUri, true);

    request2.onload = function () {
        // take the distance
        var data = this.response;
        busDistanceMeters = data.routes[0].legs[0].distance.value;
    }

    request2.send();

    var emissionArray = emissionCal(carDistanceMeters, busDistanceMeters);

    //document.getElementById('carEmissions').innerHTML = "ICON+330,+330+Phillip+St,+Waterloo,+ON+N2L+3W9,+Canada";
    //document.getElementById('busEmissions').innerHTML = "Shoppers+Drug+Mart,+260+Queen+St+W,+Toronto,+ON+M5V+1Z8,+Canada";
    return emissionArray;
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
    printed.innerText = main()[0];
    //var printing = document.getElementById("busEmissions");
    //printing.innerText = main()[1]
}
