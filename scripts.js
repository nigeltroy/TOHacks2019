document.addEventListener("DOMContentLoaded", function (event) {
    var show = document.getElementById("busEmissions");
    show.onload = main();
});

function main() {
    // set up
    var url = window.location.href ;
    //chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    //    url = tabs[0].url;
    //});
    var arr = parseUri(url);
    console.log(url);
    var key = "AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM";
    var origin = "Ryerson+University,+Victoria+Street,+Toronto,+ON";
    var destination = "University+of+Waterloo,+200+University+Ave+W,+Waterloo,+ON+N2L+3G1";
    var travelMode = "driving";

    // driving
    var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
    var request = new XMLHttpRequest();
    request.open('GET', requestUri, true);

    //var carDistanceMeters = 10;
    //var busDistanceMeters = 11;

    //var distanceArray = [5, 6];

    request.onload = function () {
        // take the distance
        var data = JSON.parse(this.response);
        var distanceM = data.routes[0].legs[0].distance.value;
        var emissions = distanceM;
        document.getElementById("carEmissions").innerText = emissions;
    }
    request.send();

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
        document.getElementById("busEmissions").innerText = emissions;
    }
    request2.send();

    document.getElementById("difference").innerText = 37436;

    document.getElementById("trees").innerText = 780;
}

function parseUri(uri) {
    var uriArr = uri.split("/");
    var arr = [uriArr[6], uriArr[7]];
    return arr;
}

//function showRes() {
//    var printed = document.getElementById("carEmissions");
//    printed.innerText = main();
//    var printing = document.getElementById("busEmissions");
//    printing.innerText = main();
//}