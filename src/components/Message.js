import React, { useContext } from "react";
import placeContext from "./context/place/placeContext";

const Message = () => {
	const PlaceContext = useContext(placeContext);
	const { state, removeAlert } = PlaceContext;

	return (
		<div className='message '>
			<div className='content'>
				<div className='content-header'>
					<i className='fas fa-times' onClick={() => removeAlert()}></i>
				</div>
				<div className='content-body'>
					<h3>{state.alert.message}</h3>
					<button className='btn-primary' onClick={() => removeAlert()}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default Message;
