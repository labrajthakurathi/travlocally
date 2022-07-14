import React from "react";
import { useNavigate } from "react-router-dom";

const Card1 = ({ place }) => {
	let navigate = useNavigate();
	const handleClick = () => {
		navigate(`/place/${place.place_id}`);
	};
	return (
		<div className='card-1' onClick={handleClick}>
			<img src={place.picture} alt='' />
			<h4 className={place.desc.length > 24 ? "big-text" : ""}>{place.desc}</h4>
		</div>
	);
};

export default Card1;
