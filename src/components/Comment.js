import React, { useEffect, useState, useContext } from "react";
import placeContext from "./context/place/placeContext";
import ConfirmModal from "./ConfirmModal";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Comment = ({ item, place, type }) => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;
	const [color, setColor] = useState("");
	const [stamp, setStamp] = useState("");
	const [confirm, setConfirm] = useState(false);
	const [id, setId] = useState("");

	let initials =
		item.parent_name.split(" ")[0][0] + item.parent_name.split(" ")[1][0];

	const stampNow = () => {
		const today = Date.now();
		const seconds = Math.round((today - item.timeStamp) / 1000);
		const minutes = Math.round((today - item.timeStamp) / 1000 / 60);

		if (seconds <= 59) {
			return "just now";
		} else if (minutes <= 59) {
			return minutes > 1 ? `${minutes} mins ago` : `${minutes} min ago`;
		} else if (minutes >= 60 && minutes <= 1439) {
			const stamp = Math.floor(minutes / 60);
			return stamp > 1 ? `${stamp} hrs ago` : `${stamp} hr ago`;
		} else if (minutes >= 1440 && minutes <= 10079) {
			const stamp = Math.floor(minutes / 1440);
			return stamp > 1 ? `${stamp} days ago` : `${stamp} day ago`;
		} else if (minutes >= 10080 && minutes <= 43800) {
			const stamp = Math.floor(minutes / 10080);
			return stamp > 1 ? `${stamp} weeks ago` : `${stamp} week ago`;
		} else if (minutes >= 43801 && minutes <= 525600) {
			const stamp = Math.floor(minutes / 43801);
			return stamp > 1 ? `${stamp} months ago` : `${stamp} month ago`;
		} else {
			const stamp = Math.floor(minutes / 525600);
			return stamp > 1 ? `${stamp} years ago` : `${stamp} year ago`;
		}
	};

	function getRandomColor() {
		let color = "hsl(" + Math.random() * 360 + ", 50%, 85%)";
		setColor(color);
	}
	useEffect(() => {
		getRandomColor();
	}, []);

	const handleClick = (id) => {
		setConfirm(true);
		setId(id);
	};
	const deleteComment = () => {
		if (type === "place") {
			const ref1 = doc(db, "places", place.place_id);
			console.log(place.comments);
			let newArry = place.comments.filter((comment) => comment.id != id);
			setDoc(ref1, { ...place, comments: newArry }, { merge: true });
			console.log(newArry);
			setConfirm(false);
		} else {
			const ref1 = doc(db, "blogs", place.blog_id);

			let newArry = place.comments.filter((comment) => comment.id != id);
			setDoc(ref1, { ...place, comments: newArry }, { merge: true });
			console.log(newArry);
			setConfirm(false);
		}
	};

	return (
		<div className='comment-card'>
			{confirm && (
				<ConfirmModal setConfirm={setConfirm} deleteComment={deleteComment} />
			)}
			<div className='name'>
				<div className='sudo-pic' style={{ backgroundColor: color }}>
					<p>{initials}</p>
				</div>
				<div className='name-time'>
					<h4>
						{item.parent_name}
						{state.user.uid === item.parent_id && <small> (you)</small>}
					</h4>
					{item.timeStamp && <p className='time-stamp'>{stampNow()}</p>}
					{state.user.uid === item.parent_id && (
						<i
							className='fas fa-trash'
							onClick={() => handleClick(item.id)}
						></i>
					)}
				</div>
			</div>
			<div className='comment'>
				<p>{item.text}</p>
			</div>
		</div>
	);
};

export default Comment;
