import React, { useContext } from "react";
import placeContext from "./context/place/placeContext";

const Message = ({ message, setMessage }) => {
	const PlaceContext = useContext(placeContext);
	const { state, removeAlert } = PlaceContext;

	return (
		<div className='message'>
			{message ? (
				<div className='content'>
					<div className='content-header'>
						<i className='fas fa-times' onClick={() => setMessage(false)}></i>
					</div>
					<div className='content-body'>
						<h3>{message}</h3>
						<button className='btn-primary' onClick={() => setMessage(false)}>
							Close
						</button>
					</div>
				</div>
			) : (
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
			)}
		</div>
	);
};

export default Message;
