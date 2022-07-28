import React from "react";

const FeedbackSec = ({
	isLiked,
	isDisliked,
	notLogged,
	setShowModal,
	likeDislike,
	item,
	likeRatio,

	collection,
}) => {
	return (
		<div className='feedback'>
			<div className='icon-wrapper'>
				<i
					className={isLiked ? "fas fa-thumbs-up lit" : "far fa-thumbs-up "}
					id={isDisliked ? "disabled" : ""}
					onClick={() => {
						notLogged
							? setShowModal(true)
							: likeDislike(item.item_id, "like", collection);
					}}
				></i>
				<div className='count'>
					<small>{item.like}</small>
					<small>Likes</small>
				</div>
			</div>
			<div className='bars'>
				<div className='bar'></div>
				<div className='bar' style={{ width: likeRatio + "%" }}></div>
			</div>
			<div className='icon-wrapper'>
				<i
					className={
						isDisliked ? "fas fa-thumbs-down lit" : "far fa-thumbs-down"
					}
					id={isLiked ? "disabled" : ""}
					onClick={() => {
						notLogged
							? setShowModal(true)
							: likeDislike(item.item_id, "dislike", collection);
					}}
				></i>
				<div className='count'>
					<small>{item.dislike}</small>
					<small> Dislikes</small>
				</div>
			</div>
		</div>
	);
};

export default FeedbackSec;
