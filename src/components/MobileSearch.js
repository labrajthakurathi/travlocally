import React, { useState, useContext } from "react";
import placeContext from "./context/place/placeContext";
import AddDetails from "./AddDetails";
import Message from "./Message";

const MobileSearch = ({ setBarFocus }) => {
	const [pred, setPred] = useState("");
	const PlaceContext = useContext(placeContext);
	const { setPlace, state } = PlaceContext;
	const [isEat, setIsEat] = useState(true);
	const [currentItem, setCurrentItem] = useState(null);

	const handleChange = (e) => {
		var axios = require("axios");
		var config = {
			method: "get",
			url: `maps/api/place/autocomplete/json?input=${e.target.value}&types=establishment&location=${state.place.coordinates.lat}%2C${state.place.coordinates.lng}&radius=5000&key=AIzaSyCNj5cCj9VXIO5OdrwKHwKYzYnFO3OGjw8`,
			headers: {},
		};

		axios(config)
			.then(function (response) {
				setPred(response.data.predictions);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	return (
		<>
			{currentItem !== null ? (
				<AddDetails
					currentItem={currentItem}
					setCurrentItem={setCurrentItem}
					setPred={setPred}
					isEat={isEat}
				/>
			) : (
				<div className='mobile-search'>
					{PlaceContext.state.alert != null && <Message />}
					<div className='back-toggle-wrapper'>
						<div className='back-btn'>
							{" "}
							<i
								className='fas fa-arrow-left'
								onClick={() => setBarFocus(false)}
							></i>
						</div>
						<div className='toggle' onClick={() => setIsEat(!isEat)}>
							<label
								htmlFor='toggle'
								className={isEat ? "eat btn" : "visit btn"}
							></label>

							<input type='checkbox' id='toggle' name='toggle' />
							<span className={isEat ? "eat-span" : "visit-span"}></span>
							<div className='toggle-text'>
								<p className={isEat ? "current" : ""}>Eat</p>
								<p className={isEat ? "" : "current"}>Visit</p>
							</div>
						</div>
					</div>
					<p className='small'>
						<small>Toggle to Change</small>
					</p>

					<div className='search-bar'>
						<input
							type='text'
							placeholder='Enter city,state or country'
							onChange={handleChange}
						/>

						<i className='fas fa-search-location input-icon'></i>
					</div>
					{pred.length !== 0 && (
						<div className='prediction-list'>
							<ul>
								{pred &&
									pred.map((city) => (
										<li
											key={city.place_id}
											onClick={() => setCurrentItem(city)}
										>
											<h5>{city.structured_formatting.main_text}</h5>
											<p>{city.structured_formatting.secondary_text}</p>
										</li>
									))}
							</ul>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default MobileSearch;
