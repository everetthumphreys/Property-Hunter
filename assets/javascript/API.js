// google maps key without restrictions...
let $googleMapsKey = "key=API_KEY" + "AIzaSyDyHXb9WjRwhERKpNkK8svc50vOr-YsUJw";
let $input = $("#textarea2");

// API call for google maps .js api;
let getLocation = (name, address) => {
    let mapsURL =
        "https://maps.googleapis.com/maps/api/js?" +
        googleMapsKey +
        "&callback=initMap";
    $.ajax({
        url: mapsURL,
        method: "GET"
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    });
}