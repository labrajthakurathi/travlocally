import React from "react";
import { useNavigate } from "react-router-dom";

const Card2 = ({ place }) => {
	let navigate = useNavigate();
	const handleClick = () => {
		navigate(`/place/${place.place_id}`);
	};
	return (
		<div
			className='card-2'
			onClick={handleClick}
		>
			<img
				src={place.picture}
				alt={`TravLocally ${place.desc}`}
			/>
			<div className='text'>
				<h4 className={place.desc.length > 24 ? "big-text" : ""}>
					{place.desc}
				</h4>
			</div>
		</div>
	);
};

export default Card2;
