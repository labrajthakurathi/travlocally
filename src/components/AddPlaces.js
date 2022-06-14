import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import Speaker from "../images/speaker.png";
import placeContext from "./context/place/placeContext";
import { upload } from "@testing-library/user-event/dist/upload";
import Loading from "./Loading";
import Message from "./Message";
import SelectPhoto from "./SelectPhoto";

const AddPlaces = () => {
	const PlaceContext = useContext(placeContext);
	const [barFocus, setBarFocus] = useState(false);
	const [input, setInput] = useState("");
	const searchBar = useRef();
	const { setPlace, state } = PlaceContext;

	const [pred, setPred] = useState("");

	const handleChange = async (e) => {
		var axios = require("axios");
		var config = {
			method: "get",
			url: `maps/api/place/autocomplete/json?input=${e.target.value}&types=(regions)&key=AIzaSyDsAzjjBX9_XgBLeoFzjmQ79nAgwNHzX8o`,
			headers: {},
		};

		axios(config)
			.then(function (response) {
				if (response.data.error_message) {
					console.log(response);
					console.log("error");
				} else {
					setPred(response.data.predictions);
					console.log(response);
					console.log("ran");
				}
			})
			.catch(function (err) {
				console.log(err);
			});
	};
	console.log(pred);
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
		var config = {
			method: "get",
			url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=AIzaSyDsAzjjBX9_XgBLeoFzjmQ79nAgwNHzX8o`,
			headers: {},
		};

		axios(config)
			.then(function (response) {
				setPlace(response.data.result, desc, structured_formatting, setInput);
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	console.log(pred);
	return (
		<>
			{state.place == null ? (
				<div className='add-places' onClick={handleFocus}>
					{state.loading && <Loading />}
					{state.alert != null && <Message />}

					<div className={barFocus ? "up section-1" : "section-1"}>
						<p className='heading'>
							Search for the City or Site you want to Add!
						</p>

						<div className='search-bar'>
							<input
								type='text'
								placeholder='Enter city,state or country'
								onChange={handleChange}
								ref={searchBar}
							/>
							{barFocus ? (
								<i
									className='fas fa-times'
									onClick={handleUnFocus}
									style={{ color: "#ff29a2" }}
								></i>
							) : (
								<i className='fas fa-search-location'></i>
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
							<img src={Speaker} alt='speaker' />
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
