import {
	InstantSearch,
	SearchBox,
	Hits,
	Highlight,
} from "react-instantsearch-dom";
const Hit = (props) => {
	return (
		<div className='hits'>
			{/* <img src={props.hit.picture} align='left' alt={props.hit.name} /> */}
			{/* <div className='hit-name'>
				<Highlight attribute='name' hit={props.hit} />
			</div>
			<div className='hit-description'>
				<Highlight attribute='description' hit={props.hit} />
			</div> */}
			<div className='hit-price'>{props.hit.desc}</div>
		</div>
	);
};
export default Hit;
