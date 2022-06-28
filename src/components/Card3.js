import React from "react";
import { useNavigate } from "react-router-dom";

const Card3 = ({ place }) => {
	const navigate = useNavigate();
	const handleVisit = () => {
		navigate(`/place/${place.place_id}`);
	};
	const handleEdit = () => {
		localStorage.setItem("place_id", place.place_id);
		navigate("/add-items");
		console.log("ren");
	};

	return (
		<div className='card-3'>
			<img src={place.picture} alt='' />
			<div className='card-3-content'>
				<div className='card-name'>
					<h4 className={place.desc.length > 24 ? "big-text" : ""}>
						{place.desc}{" "}
					</h4>
				</div>
				<div className='buttons'>
					<button className='btn-light' onClick={handleEdit}>
						Edit
					</button>
					<button className='btn-secondary' onClick={handleVisit}>
						Visit
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card3;
