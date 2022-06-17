import React, { useState, useContext } from "react";
import axios from "axios";
import placeContext from "./context/place/placeContext";
import Loading from "./Loading";

const AddDetails = ({ setCurrentItem, currentItem, setPred, isEat }) => {
	const PlaceContext = useContext(placeContext);
	const { uploadItem } = PlaceContext;
	const [about, setAbout] = useState("");

	const handleChange = (e) => {
		setAbout(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const type = isEat ? "eat" : "visit";
		var map = new window.google.maps.Map(
			document.getElementById("map-canvas"),
			{
				zoom: 15,
			}
		);

		var request = {
			placeId: currentItem.place_id,
			fields: [
				"geometry",
				"formatted_address",
				"address_components",
				"name",
				"place_id",
				"url",
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
					map_url: place.url,
				};
				uploadItem(city, setCurrentItem, type, about);
			}
		}
		setPred([]);
	};

	return (
		<div className='add-details'>
			{PlaceContext.state.loading && <Loading />}
			<div className='add-details-content'>
				<div id='map-canvas'></div>
				<div className='detail-content-header'>
					<i className='fas fa-times' onClick={() => setCurrentItem(null)}></i>
				</div>

				<div className='detail-content-body'>
					<form onSubmit={handleSubmit}>
						<label htmlFor='about'>About This Place</label>
						<textarea
							type='text'
							id='about'
							name='about'
							required
							onChange={handleChange}
							placeholder='Your experience at this place'
						/>
						<button className='btn-primary' type='submit'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddDetails;
