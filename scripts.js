document.addEventListener("DOMContentLoaded", function (event) {
    var show = document.getElementById("busEmissions");
    show.onload = main();
});

function main() {
    // set up
    //var url = window.location.href;
    //console.log(window.location.href);

    chrome.tabs.query({ 'active': true, 'currentWindow': true }, function (tabs) {
        var url = "";
        url = tabs[0].url;
        console.log(url);

        var urlArr = url.split("/");
        var arr = [urlArr[5], urlArr[6]];


        //var arr = parseUri(url);
        var key = "AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM";
        var origin = arr[0];//"University+of+Waterloo,+200+University+Ave+W,+Waterloo,+ON+N2L+3G1";
        var destination = arr[1];//"Ryerson+University,+Victoria+Street,+Toronto,+ON";
        var travelMode = "driving";
        console.log(arr[0]);
        console.log(arr[1]);

        // var start = origin.split(",")[0].split("+");
        // var startdone = ''
        // foreach(word in start){
        //     startdone += 
        //     startdone += word
        //     startdone += " "
        // }
        // var end = destination.split(",")[0].split("+");
        var start = origin.split(",")[0].replace(/\+/g, " ");
        var end = destination.split(",")[0].replace(/\+/g, " ");

        document.getElementById("to").innerText = "TO: ".concat(start);
        document.getElementById("from").innerText = "FROM: ".concat(end);

        // driving
        var requestUri = "https://maps.googleapis.com/maps/api/directions/json?origin=" + origin + "&destination=" + destination + "&mode=" + travelMode + "&key=" + key;
        var request = new XMLHttpRequest();
        request.open('GET', requestUri, true);
        console.log(requestUri);
        //var carDistanceMeters = 10;
        //var busDistanceMeters = 11;

        //var distanceArray = [5, 6];

        request.onload = function () {
            // take the distance
            var data = JSON.parse(this.response);
            console.log(data);
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
                console.log(carEmissions);
                console.log(busEmissions);
                console.log(differenceEmissions);
            }
            request2.send();


        }
        request.send();
        //document.getElementById("carEmissions").setAttribute("name", "5");


    });
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