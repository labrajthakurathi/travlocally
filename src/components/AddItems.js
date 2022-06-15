import React, { useState, useRef, useContext, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc } from "firebase/firestore";
import axios from "axios";
import Speaker from "../images/speaker.png";
import placeContext from "./context/place/placeContext";
import Loading from "./Loading";
import Message from "./Message";
import SelectPhoto from "./SelectPhoto";
import MobileSearch from "./MobileSearch";
import AddDetails from "./AddDetails";
import AddTips from "./AddTips";

const AddPlaces = () => {
	const PlaceContext = useContext(placeContext);
	const [barFocus, setBarFocus] = useState(false);
	const searchBar = useRef();
	const { setPlace, state, getPlace } = PlaceContext;
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [eats, setEats] = useState([]);
	const [visits, setVisits] = useState([]);
	const [tips, setTips] = useState([]);
	const [currentItem, setCurrentItem] = useState(null);
	const [isEat, setIsEat] = useState(true);
	const [pred, setPred] = useState("");
	const [show1, setShow1] = useState(false);
	const [show2, setShow2] = useState(false);
	const [show3, setShow3] = useState(false);
	const [isTips, setIsTips] = useState(false);

	window.addEventListener("resize", () => {
		setScreenWidth(window.innerWidth);
	});
	useEffect(() => {
		getPlace();
	}, []);

	useEffect(() => {
		const placeId = localStorage.getItem("place_id");
		const q = query(
			collection(db, "establishment"),
			where("parent_id", "==", placeId),
			where("type", "==", "eat")
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const cities = [];
			querySnapshot.forEach((doc) => {
				cities.push(doc.data());
			});
			setEats(cities);
		});
	}, []);

	useEffect(() => {
		const placeId = localStorage.getItem("place_id");
		const q = query(
			collection(db, "establishment"),
			where("parent_id", "==", placeId),
			where("type", "==", "visit")
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const cities = [];
			querySnapshot.forEach((doc) => {
				cities.push(doc.data());
			});
			setVisits(cities);
		});
	}, []);
	useEffect(() => {
		const placeId = localStorage.getItem("place_id");
		const q = query(
			collection(db, "establishment"),
			where("parent_id", "==", placeId),
			where("type", "==", "tips")
		);
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const tips = [];
			querySnapshot.forEach((doc) => {
				tips.push(doc.data());
			});
			setTips(tips);
		});
	}, []);

	const handleChange = (e) => {
		var axios = require("axios");
		var config = {
			method: "get",
			url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${e.target.value}&types=establishment&location=${state.place.coordinates.lat}%2C${state.place.coordinates.lng}&radius=5000&key=AIzaSyCNj5cCj9VXIO5OdrwKHwKYzYnFO3OGjw8`,
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

	return (
		<>
			{barFocus == true && screenWidth < 580 ? (
				<MobileSearch setBarFocus={setBarFocus} />
			) : (
				<>
					{currentItem !== null ? (
						<AddDetails
							currentItem={currentItem}
							setCurrentItem={setCurrentItem}
							setPred={setPred}
							isEat={isEat}
						/>
					) : (
						<>
							{state.place == null ? (
								<Loading />
							) : (
								<div className='add-items' onClick={handleFocus}>
									{PlaceContext.state.alert != null && <Message />}
									<div className={barFocus ? "up section-1" : "section-1"}>
										<h3>{state.place.desc}</h3>

										{isTips == false && (
											<>
												<div className='progress-bar'>
													<div className='line'></div>
													<div className='second-line'></div>
													<div className='wrapper'>
														<div className='child'>
															<div className='icon'>1</div>
														</div>
														<div className='child'>
															<div className='icon'>2</div>
														</div>
														<div className='child'>
															<div className='icon'>3</div>
														</div>
													</div>
												</div>

												{screenWidth > 580 ? (
													<div className='toggle-text-wrapper'>
														<p className='heading'>
															{isEat
																? "Places to Eat"
																: "Attractions / Activities"}
														</p>
														<div
															className='toggle'
															onClick={() => setIsEat(!isEat)}
														>
															<label
																htmlFor='toggle'
																className={isEat ? "eat btn" : "visit btn"}
															></label>

															<input
																type='checkbox'
																id='toggle'
																name='toggle'
															/>
															<span
																className={isEat ? "eat-span" : "visit-span"}
															></span>
															<div className='toggle-text'>
																<p className={isEat ? "current" : "a"}>Eats</p>
																<p className={isEat ? "a" : "current"}>Visit</p>
															</div>
														</div>
													</div>
												) : (
													<p className='heading'>
														Search Places to {isEat ? "Eat" : "Visit"}!
													</p>
												)}
											</>
										)}
										{isTips ? (
											<AddTips setIsTips={setIsTips} isTips={isTips} />
										) : (
											<div className='search-result'>
												<div className='search-bar'>
													<input
														type='text'
														placeholder='Enter the name'
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
																		onClick={() => setCurrentItem(city)}
																	>
																		<h5>
																			{city.structured_formatting.main_text}
																		</h5>
																		<p>
																			{
																				city.structured_formatting
																					.secondary_text
																			}
																		</p>
																	</li>
																))}
														</ul>
													</div>
												)}
											</div>
										)}

										<div className='add-tips'>
											<p>Or</p>
											<button
												className='btn-light'
												onClick={() => setIsTips(!isTips)}
											>
												{isTips ? "Add Places" : "Add Tips"}
											</button>
										</div>
									</div>
									<div className='section-2'>
										<div className='places-wrapper'>
											<div className='places' onClick={() => setShow1(!show1)}>
												<div className='number'>{eats.length}</div>
												<div className='title'>
													<h4>PLACES TO EAT</h4>
												</div>
												<i
													className={
														show1
															? "fa fa-angle-down rotate "
															: "fa fa-angle-down "
													}
												></i>
											</div>
											<ul className={show1 ? "show" : ""}>
												{eats.map((eat, index) => (
													<li key={index}>
														<div className='texts'>
															<p>{eat.name}</p>
															<a href={eat.map_url} target='_blank'>
																<i className='fa fa-location-arrow'></i>
															</a>
														</div>
														<p className='address'> {eat.address}</p>
													</li>
												))}
											</ul>
										</div>

										<div className='places-wrapper'>
											<div className='places' onClick={() => setShow2(!show2)}>
												<div className='number'>{visits.length}</div>
												<div className='title'>
													<h4>Attractions / Activities</h4>
												</div>
												<i
													className={
														show2
															? "fa fa-angle-down rotate "
															: "fa fa-angle-down "
													}
												></i>
											</div>
											<ul className={show2 ? "show" : ""}>
												{visits.map((visit, index) => (
													<li key={index}>
														<div className='texts'>
															<p>{visit.name}</p>
															<a href={visit.map_url} target='_blank'>
																<i className='fa fa-location-arrow'></i>
															</a>
														</div>
														<p className='address'> {visit.address}</p>
													</li>
												))}
											</ul>
										</div>
										<div className='places-wrapper'>
											<div className='places' onClick={() => setShow3(!show3)}>
												<div className='number'>{tips.length}</div>
												<div className='title'>
													<h4>Tips</h4>
												</div>
												<i
													className={
														show3
															? "fa fa-angle-down rotate "
															: "fa fa-angle-down "
													}
												></i>
											</div>
											<ul className={show3 ? "show" : ""}>
												{tips.map((tip, index) => (
													<li key={index}>
														<p className='address'> {tip.tip}</p>
													</li>
												))}
											</ul>
										</div>
									</div>
									<div className='finish'>
										<Link
											to={`/place/${state.place.place_id}`}
											className='btn-dark'
										>
											Finish
										</Link>
									</div>
								</div>
							)}
						</>
					)}
				</>
			)}
		</>
	);
};

export default AddPlaces;
