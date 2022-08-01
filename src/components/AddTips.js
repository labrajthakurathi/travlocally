import React, { useState, useContext } from "react";
import placeContext from "./context/place/placeContext";
import { v4 as uuidv4 } from "uuid";

const AddTips = () => {
	const PlaceContext = useContext(placeContext);
	const { state, uploadTips } = PlaceContext;
	const [tip, setTip] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();
		let uid = uuidv4();
		uploadTips(tip, uid, setTip);
	};
	return (
		<div className='add-tips-section'>
			<p>Add Tips</p>
			<form onSubmit={onSubmit}>
				<textarea
					placeholder='Enter Tip'
					cols='30'
					rows='4'
					required
					onChange={(e) => setTip(e.target.value)}
					value={tip}
				></textarea>
				<button type='submit' className='btn-dark '>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddTips;
