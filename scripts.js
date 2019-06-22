// Create request
var request = new XMLHttpRequest()

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
}

// Send request
request.send()