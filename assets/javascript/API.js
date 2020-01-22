// google maps key without restrictions...
let googleMapsKey = "AIzaSyDyHXb9WjRwhERKpNkK8svc50vOr-YsUJw";
let $input = $("#address-input");
let $submit = $("#submit-btn");

let currentLat;
let currentLng;

// API call for google map * does NOT have the directions
let map, infoWindow;
function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 33.749, lng: -84.38633 },
		zoom: 12
	});
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				let lat = position.coords.latitude;
				let lng = position.coords.longitude;
				currentLat = lat;
				currentLng = lng;
				var pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};
				console.log(position);

				infoWindow.setPosition(pos);
				infoWindow.setContent("Location found.");
				infoWindow.open(map);
				map.setCenter(pos);
			},

			function() {
				handleLocationError(true, infoWindow, map.getCenter());
			}
		);
		infoWindow = new google.maps.InfoWindow();
	} else {
		// if the Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
			? "Error: The Geolocation service failed."
			: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}

// click event for the address to populate directions in the map;  need to append to the div and replace the initial map with a .hide class switch;
$submit.on("click", function() {
	let address = $input.val();
	directions(address);

	function directions(address) {
		let directionURL =
			"https://maps.googleapis.com/maps/api/directions/json?origin=" +
			origin +
			"&destination=" +
			destination +
			"&key=" +
			googleMapsKey;
		let origin = currentLat,
			currentLng;
		let destination = address;
		console.log("origin: " + origin, "dest: " + destination);
	}
	directions();
});
