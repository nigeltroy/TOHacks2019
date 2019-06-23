// Create request
// var directionsService = new google.maps.DirectionsService;

var origin = "Disneyland";
var destination = "Universal Studios Hollywood";

//request.open('GET', 'https://maps.googleapis.com/maps/api/directions/json?key=AIzaSyDtgSb2PZdgvvplLteWJmVRBKe2eXH-AgM', true)

//request.onload = main();

function main() {
    // var directionsService = new google.maps.DirectionsService;

    // var url;
    // chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    //     url = tabs[0].url;
    // });
    // var arr = parseUri(url);

    // //get locations
    // var carDistance = getDistance(arr[0], arr[1], "DRIVING");
    // var busDistance = getDistance(arr[0], arr[1], "TRANSIT");

    // var carDistance = emissionArray[0];
    // var busDistance = emissionArray[1];




    // var emissionArray = emissionCal(carDistance, busDistance);
    // var notification = webkitNotifications.createNotification(
    //     'Hello!',  // notification title
    //     'Lorem ipsum...'  // notification body text
    // );
    // notification.show();

    return 25;
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

function emissionCal(distance1, distance2){
    distance2 = distance2*0.6;
    return [distance1, distance2];
}

main();

// junk code


