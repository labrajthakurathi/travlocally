import { useNavigate } from "react-router-dom";
const Hit = ({ hit }) => {
	const navigate = useNavigate();

	const handleRoute = (uid) => {
		localStorage.setItem("place-id", uid);
		navigate(`/place/${uid}`);
	};
	return (
		<div className='custom-hit' onClick={() => handleRoute(hit.place_id)}>
			<img src={hit.picture} align='left' alt={hit.name} />

			<p>{hit.desc}</p>
		</div>
	);
};
export default Hit;
