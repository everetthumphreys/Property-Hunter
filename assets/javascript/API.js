// google maps key without restrictions...
let googleMapsKey = "AIzaSyDyHXb9WjRwhERKpNkK8svc50vOr-YsUJw";
let $input = $("#address-input");
let $submit = $("#submit-btn");
let selectedMode = $("#travelMode").attr("travelMode");

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
function initDirections(currentLat, currentLng) {
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();
	// var haight = new google.maps.LatLng(37.7699298, -122.4469157);
	// var oceanBeach = new google.maps.LatLng(
	// 	37.7683909618184,
	// 	-122.51089453697205
	// );
	// console.log(oceanBeach);
	var latLng = currentLat + ", " + currentLng;
	var mapOptions = {
		zoom: 12,
		center: latLng
	};
	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	directionsRenderer.setMap(map);

	function calcRoute() {
		var address = $("#address-input").val();
		var encodedAddress = address.trim().replace(/ /g, "+");
		var latLng = currentLat + ", " + currentLng;
		console.log(latLng);

		var request = {
			origin: latLng,
			destination: encodedAddress,
			travelMode: "DRIVING"
		};
		console.log(google.maps);
		directionsService.route(request, function(response, status) {
			if (status == "OK") {
				directionsRenderer.setDirections(response);
			}
		});
	}
	calcRoute();
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
	// directions(address);
	initDirections(address);
});
