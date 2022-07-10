import React, { useState } from "react";

const TagPlace = ({ setShowTagSearch, setTag, setProgressBar }) => {
	const [pred, setPred] = useState("");

	const handleChange = (e) => {
		if (e.target.value === "") setPred("");
		const displaySuggestions = function (predictions, status) {
			if (
				status != window.google.maps.places.PlacesServiceStatus.OK ||
				!predictions
			) {
				alert(status);
				return;
			}

			setPred(predictions);
		};

		const service = new window.google.maps.places.AutocompleteService();
		service.getPlacePredictions(
			{ input: e.target.value, types: ["(regions)"] },

			displaySuggestions
		);
	};

	const handleCity = async (id, desc, structured_formatting) => {
		var map = new window.google.maps.Map(
			document.getElementById("map-canvas"),
			{
				zoom: 15,
			}
		);

		var request = {
			placeId: id,
			fields: [
				"geometry",
				"formatted_address",
				"address_components",
				"name",
				"place_id",
			],
		};

		let service = new window.google.maps.places.PlacesService(map);
		service.getDetails(request, callback);

		function callback(place, status) {
			if (status == window.google.maps.places.PlacesServiceStatus.OK) {
				let lng = place.geometry.location.lng();
				let lat = place.geometry.location.lat();
				let city = {
					coordinates: {
						lng,
						lat,
					},
					formatted_address: place.formatted_address,
					address_components: place.address_components,
					name: place.name,

					place_id: place.place_id,
					desc,
				};

				setTag(city);
				setShowTagSearch(false);
				setProgressBar(33);
				localStorage.setItem("tag", JSON.stringify(city));
				localStorage.setItem("progress", JSON.stringify(30));
			}
		}
	};

	return (
		<div className='search-image-modal'>
			<i className='fas fa-times' onClick={() => setShowTagSearch(false)}></i>
			<div className='search-image-section'>
				<div className='search-bar'>
					<input
						type='text'
						required
						minLength={2}
						placeholder='Search a place to tag'
						onChange={handleChange}
					/>
				</div>
				<div id='map-canvas'></div>
				{pred.length !== 0 && (
					<div className='prediction-list'>
						<ul>
							{pred &&
								pred.map((city) => (
									<li
										key={city.place_id}
										onClick={() =>
											handleCity(
												city.place_id,
												city.description,
												city.structured_formatting
											)
										}
									>
										<p>{city.description}</p>
									</li>
								))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default TagPlace;
