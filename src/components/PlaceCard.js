import React, { useContext } from "react";
import placeContext from "./context/place/placeContext";
import FeedbackSec from "./FeedbackSec";
const PlaceCard = ({
	active,
	item,
	val,
	notLogged,
	showModal,
	setShowModal,
}) => {
	const PlaceContext = useContext(placeContext);
	const { state, likeDislike } = PlaceContext;
	const likeRatio = parseInt((item.like / (item.like + item.dislike)) * 100);
	let isLiked = notLogged ? false : val.live.liked.includes(item.item_id);
	let isDisliked = notLogged ? false : val.live.disliked.includes(item.item_id);

	return (
		<div className={active ? "place-body active" : "place-body"}>
			<div className='item'>
				{item.type == "tips" ? (
					<>
						<div className='pic'>
							<i className='fas fa-lightbulb'></i>
						</div>
						<div className='text'>
							<p>{item.tip}</p>
						</div>
					</>
				) : (
					<>
						<h3>{item.name}</h3>
						<div className='address'>
							<a href={item.map_url} target='blink'>
								{item.address}
								<i className='fas fa-location-arrow ml-1'></i>
							</a>
						</div>
						<div className='pic'>
							<i
								className={
									item.type == "eat" ? "fas fa-utensils" : "fas fa-route"
								}
							></i>
						</div>
						<div className='text'>
							<p>{item.about}</p>
						</div>
					</>
				)}

				<FeedbackSec
					isLiked={isLiked}
					isDisliked={isDisliked}
					notLogged={notLogged}
					setShowModal={setShowModal}
					likeDislike={likeDislike}
					item={item}
					likeRatio={likeRatio}
					showModal={showModal}
					collection='establishment'
				/>
			</div>
		</div>
	);
};

export default PlaceCard;
