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
    var origin = "ICON+330,+330+Phillip+St,+Waterloo,+ON+N2L+3W9,+Canada";
    var destination = "Shoppers+Drug+Mart,+260+Queen+St+W,+Toronto,+ON+M5V+1Z8";
    var travelMode = "driving";

    // driving
    var carRequestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
    var carRequest = new XMLHttpRequest();
    carRequest.open('GET', carRequestUri, true);
    //carRequest.setRequestHeader('Access-Control-Allow-Headers', '*');

    var carDistanceMeters = 10;
    var busDistanceMeters = 11;

    //carRequest.onload = parseJson(this.response);
    var data = JSON.parse(this.response);
    carDistanceMeters = data.routes[0].legs[0].distance.value;

    console.log(carDistanceMeters);
    carRequest.send();
    
    // transit
    travelMode = "transit";

    var busRequestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
    var busRequest = new XMLHttpRequest();
    busRequest.open('GET', busRequestUri, true);
    //busRequest.setRequestHeader('Access-Control-Allow-Headers', '*');

    busRequest.onload = function () {
        parseJson(this.response);
    }
    var data = JSON.parse(this.response);
    busDistanceMeters = data.routes[0].legs[0].distance.value;

    console.log(busDistanceMeters);
    busRequest.send();

    var emissionArray = emissionCal(carDistanceMeters, busDistanceMeters);

    //document.getElementById('carEmissions').innerHTML = emissionArray[0];
    //document.getElementById('busEmissions').innerHTML = emissionArray[1];

    return busDistanceMeters;
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

function parseJson(response) {
    // take the distance
    var data = JSON.parse(response);
    return data.routes[0].legs[0].distance.value;
}