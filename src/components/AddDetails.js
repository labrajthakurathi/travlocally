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
		const type = isEat ? "eat" : "visit";

		e.preventDefault();
		var config = {
			method: "get",
			url: `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${currentItem.place_id}&key=AIzaSyCNj5cCj9VXIO5OdrwKHwKYzYnFO3OGjw8`,
			headers: {},
		};

		axios(config)
			.then(function (response) {
				uploadItem(response.data.result, setCurrentItem, type, about);
			})
			.catch(function (error) {
				console.log(error);
			});

		setPred([]);
	};

	return (
		<div className='add-details'>
			{PlaceContext.state.loading && <Loading />}
			<div className='add-details-content'>
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
