import React from "react";

const Card2 = ({ place }) => {
	return (
		<div className='card-2'>
			<img src={place.picture} alt={`TravLocally ${place.desc}`} />
			<div className='text'>
				<h4>{place.desc}</h4>
			</div>
		</div>
	);
};

export default Card2;
