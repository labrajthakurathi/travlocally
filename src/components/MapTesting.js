import React from "react";
var axios = require("axios");

var config = {
	method: "get",
	url: "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyDsAzjjBX9_XgBLeoFzjmQ79nAgwNHzX8o",
	headers: {},
};

axios(config)
	.then(function (response) {
		console.log(JSON.stringify(response.data));
	})
	.catch(function (error) {
		console.log(error);
	});

const MapTesting = () => {
	return (
		<div className='testing'>
			<button>click</button>
		</div>
	);
};

export default MapTesting;
