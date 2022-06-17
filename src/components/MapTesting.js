import React, { useState } from "react";

const MapTesting = () => {
	const [inp, setInpu] = useState("dd");
	// const handleClick = () => {
	const center = { lat: 50.064192, lng: -130.605469 };
	// Create a bounding box with sides ~10km away from the center point
	// const defaultBounds = {
	// 	north: center.lat + 0.1,
	// 	south: center.lat - 0.1,
	// 	east: center.lng + 0.1,
	// 	west: center.lng - 0.1,
	// };

	// const options = {
	// 	bounds: defaultBounds,
	// 	componentRestrictions: { country: "us" },
	// 	fields: ["address_components", "geometry", "icon", "name"],
	// 	strictBounds: false,
	// 	types: ["establishment"],
	// };
	// const autocomplete = new window.google.maps.places.Autocomplete(inp, options);
	// console.log(autocomplete);
	// console.log(autocomplete.getQueryPredictions());

	const handleClick = () => {
		var map = new window.google.maps.Map(
			document.getElementById("map-canvas"),
			{
				center: new window.google.maps.LatLng(42.444508, -76.499491),
				zoom: 15,
			}
		);

		var request = {
			placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
		};

		let service = new window.google.maps.places.PlacesService(map);
		service.getDetails(request, callback);

		function callback(place, status) {
			if (status == window.google.maps.places.PlacesServiceStatus.OK) {
				console.log(place);
			}
		}
		console.log(service);
	};

	// };
	return (
		<div className='testing'>
			{/* <input type='text' value={inp} /> */}
			<button onClick={handleClick}>click</button>
			<div id='map-canvas'></div>
		</div>
	);
};

export default MapTesting;
