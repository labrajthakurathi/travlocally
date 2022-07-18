import React, { useState, useRef, useContext, useEffect } from "react";
import placeContext from "./context/place/placeContext";
import Loading from "./Loading";
import Message from "./Message";
import SelectPhoto from "./SelectPhoto";
import LoginMessageModal from "./LoginMessageModal";

const AddPlaces = () => {
	const PlaceContext = useContext(placeContext);
	const searchBar = useRef();
	const { setPlace, state } = PlaceContext;
	const [barFocus, setBarFocus] = useState(false);
	const [input, setInput] = useState("");
	const [pred, setPred] = useState("");
	const [notLogged, setNotLogged] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleChange = (e) => {
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

	const handleFocus = () => {
		document.activeElement == searchBar.current ||
		searchBar.current.value !== ""
			? setBarFocus(true)
			: setBarFocus(false);
	};
	const handleUnFocus = () => {
		searchBar.current.value = "";
		setBarFocus(false);
		setPred("");
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
				};

				setPlace(city, desc, structured_formatting, lng, lat, setInput);
			}
		}
	};

	useEffect(() => {
		window.scrollTo(0, 0);
		state.user ? setNotLogged(false) : setNotLogged(true);
	}, [state]);

	const handleSearchClick = () => {
		notLogged ? setShowModal(true) : setShowModal(false);
	};

	return (
		<>
			{state.place == null ? (
				<div className='add-places' onClick={handleFocus}>
					{state.loading && <Loading />}
					{state.alert != null && <Message />}
					{showModal && <LoginMessageModal setShowModal={setShowModal} />}

					<div className={barFocus ? "up section-1" : "section-1"}>
						<p className='heading'>
							Search for the City or Site you want to Add!
						</p>
						<div id='map-canvas'></div>

						<div className='search-bar'>
							<input
								className='add-places-search'
								type='text'
								placeholder='Enter city,state or country'
								onChange={handleChange}
								ref={searchBar}
								onClick={handleSearchClick}
							/>
							{barFocus ? (
								<i
									className='fas fa-times input-icon'
									onClick={handleUnFocus}
									style={{ color: "#ff29a2" }}
								></i>
							) : (
								<i className='fas fa-search-location input-icon'></i>
							)}
						</div>

						{pred.length !== 0 && barFocus == true && (
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
					<div
						className={
							barFocus ? "section-2-3-wrapper hide" : "section-2-3-wrapper"
						}
					>
						<div className='section-2'>
							<img
								src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Fspeaker.png?alt=media&token=9b93ecbd-0aca-447e-bb64-64d49d29b1cb'
								alt='TravLocally speaker'
							/>
						</div>
						<div className='section-3'>
							<h1>
								TELL THE WORLD ABOUT <span> YOUR CITY</span>
							</h1>
						</div>
					</div>
				</div>
			) : (
				<SelectPhoto />
			)}
		</>
	);
};

export default AddPlaces;
