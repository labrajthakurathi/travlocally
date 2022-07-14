import React, { useEffect, useState } from "react";
import Card1 from "./Card1";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PicLoading from "./PicLoading";

const PopularPlaces = () => {
	const [popularPlaces, setPopularPlaces] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const docRef = doc(db, "category", "popular");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setPopularPlaces(docSnap.data().items);
			} else {
				console.log("No such document!");
			}
		};
		getData();
	}, []);

	return (
		<div className='top-places-section'>
			<h2>Popular Places</h2>
			{popularPlaces.length === 0 && <PicLoading style={"category"} />}
			<div className='top-places-cards'>
				{popularPlaces &&
					popularPlaces.map((place, index) => (
						<Card1 place={place} key={index} />
					))}
			</div>
		</div>
	);
};

export default PopularPlaces;
