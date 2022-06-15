import React, { useEffect, useState } from "react";
import Card1 from "./Card1";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const TopPlaces = () => {
	const [topPlaces, setTopPlaces] = useState([]);

	useEffect(() => {
		const getData = async () => {
			let topPlacesArry = [];
			const querySnapshot = await getDocs(collection(db, "places"));
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				topPlacesArry.push(doc.data());
			});
			setTopPlaces(topPlacesArry);
		};
		getData();
	}, []);

	return (
		<div className='top-places-section'>
			<h2>Top Places</h2>
			<div className='top-places-cards'>
				{topPlaces &&
					topPlaces.map((place, index) => <Card1 place={place} key={index} />)}
			</div>
		</div>
	);
};

export default TopPlaces;
