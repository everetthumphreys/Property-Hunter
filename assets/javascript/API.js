// google maps key without restrictions...
// let googleMapsKey = "key=API_KEY" + "AIzaSyDyHXb9WjRwhERKpNkK8svc50vOr-YsUJw";
let $input = $("#address-input");
let $submit = $("#submit-btn");

// API call for google maps .js api

let map;
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 33.749, lng: -84.38633 },
		zoom: 9
	});
}

$submit.on("click", function() {
	let address = $input.val();
	console.log(address);
});
