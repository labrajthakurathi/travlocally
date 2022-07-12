import React, { useState, useEffect } from "react";
import Card2 from "./Card2";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const MostViewedPlaces = () => {
	const [mostViewed, setmostViewed] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const docRef = doc(db, "places", "most_viewed");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setmostViewed(docSnap.data().items);
			} else {
				console.log("No such document!");
			}
		};
		getData();
	}, []);
	return (
		<div className='nearby-places-section'>
			<h2>Most Viewed Places</h2>
			<div className='nearby-places-cards'>
				{mostViewed &&
					mostViewed.map((place, index) => <Card2 place={place} key={index} />)}
			</div>
		</div>
	);
};

export default MostViewedPlaces;
