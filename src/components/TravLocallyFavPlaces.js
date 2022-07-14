import React, { useEffect, useState } from "react";
import Card1 from "./Card1";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PicLoading from "./PicLoading";

const TravLocallyFavPlaces = () => {
	const [travLocallyFav, setTravLocallyFav] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const docRef = doc(db, "category", "travlocally_favorite");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setTravLocallyFav(docSnap.data().items);
			} else {
				console.log("No such document!");
			}
		};
		getData();
	}, []);

	return (
		<div className='nearby-places-section'>
			<h2>TravLocally Favorite Places</h2>
			{travLocallyFav.length === 0 && <PicLoading style={"category"} />}
			<div className='nearby-places-cards'>
				{travLocallyFav &&
					travLocallyFav.map((place, index) => (
						<Card1 place={place} key={index} />
					))}
			</div>
		</div>
	);
};

export default TravLocallyFavPlaces;
