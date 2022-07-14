import {
	InstantSearch,
	SearchBox,
	Hits,
	Highlight,
} from "react-instantsearch-hooks-web";
import { useNavigate } from "react-router-dom";
const Hit = ({ hit }) => {
	const navigate = useNavigate();

	const handleRoute = (uid) => {
		localStorage.setItem("place-id", uid);
		navigate(`/place/${uid}`);
	};
	return (
		<div className='custom-hit' onClick={() => handleRoute(hit.place_id)}>
			{/* <img src={props.hit.picture} align='left' alt={props.hit.name} /> */}
			{/* <div className='hit-name'>
				<Highlight attribute='name' hit={props.hit} />
			</div>
			<div className='hit-description'>
				<Highlight attribute='description' hit={props.hit} />
			</div> */}
			<img src={hit.picture} align='left' alt={hit.name} />

			<p>{hit.desc}</p>
		</div>
	);
};
export default Hit;
