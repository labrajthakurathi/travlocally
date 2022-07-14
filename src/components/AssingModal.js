import React, { useState } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Loading from "./Loading";

const AssingModal = ({ currentItem, setCurrentItem, setShowModal }) => {
	const [loading, setLoading] = useState(false);
	const handleAssign = async (cat) => {
		setLoading(true);
		let data = {};
		const docRef = doc(db, "category", cat);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			data = docSnap.data();
		} else {
			console.log("No such document!");
		}
		let finalData = { ...data, items: [...data.items, { ...currentItem }] };
		let upload = await setDoc(docRef, { ...finalData });
		setLoading(false);
		setShowModal(false);
	};

	return (
		<div className='confirm-modal '>
			{loading && <Loading />}
			<div className='content assign'>
				<div className='content-header'>
					<i className='fas fa-times' onClick={() => setShowModal(false)}></i>
				</div>
				<div className='content-body'>
					<h3>Choose the category to assign</h3>
					<p>{currentItem.desc}</p>
					<div className='category-list'>
						<button
							className='btn-dark'
							onClick={() => {
								handleAssign("popular");
							}}
						>
							Popular
						</button>
						<button
							className='btn-dark'
							onClick={() => {
								handleAssign("most_viewed");
							}}
						>
							Most Viewed
						</button>
						<button
							className='btn-dark'
							onClick={() => {
								handleAssign("travlocally_favorite");
							}}
						>
							TravLocally Favorite
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AssingModal;
