import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import placeContext from "./context/place/placeContext";
import LoginMessageModal from "./LoginMessageModal";

const ContributeSec = () => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;
	const navigate = useNavigate();
	const [alert, setAlert] = useState(false);
	const handleClick = () => {
		if (state.user) {
			navigate("/add-places");
		} else {
			setAlert(true);
		}
	};
	return (
		<div className='contribute-sec'>
			{alert && <LoginMessageModal setShowModal={setAlert} />}
			<h1>Wanna Contribute ?</h1>

			<button className='btn-primary' onClick={handleClick} id='btn'>
				Add Places
			</button>
		</div>
	);
};

export default ContributeSec;
