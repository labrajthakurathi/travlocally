import React, { useEffect, useState, useRef } from "react";
import Card1 from "./Card1";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PicLoading from "./PicLoading";

const TravLocallyFavPlaces = () => {
	const [travLocallyFav, setTravLocallyFav] = useState([]);
	const myInput = useRef("");
	const [innerWidth, setInnerWidth] = useState("");
	const [elementWidth, setElementWidth] = useState("");
	const [scrolled, setScrolled] = useState(-101);

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

	useEffect(() => {
		setWidth();
	}, [travLocallyFav]);

	const setWidth = () => {
		setInnerWidth(window.innerWidth);
		setElementWidth(myInput.current.scrollWidth);
	};
	const handleResize = () => {
		setInnerWidth(window.innerWidth);
		setElementWidth(myInput.current.scrollWidth);
	};
	window.addEventListener("resize", handleResize);

	const handleElementScroll = (e) => {
		const end =
			myInput.current.offsetWidth +
			myInput.current.scrollLeft -
			myInput.current.scrollWidth;

		setScrolled(end);
	};

	return (
		<div className='nearby-places-section'>
			<h2>TravLocally Favorite Places</h2>
			{travLocallyFav.length === 0 && <PicLoading style={"category"} />}
			<div
				className='fav-places-cards'
				ref={myInput}
				onScroll={(e) => handleElementScroll(e)}
			>
				{travLocallyFav &&
					travLocallyFav.map((place, index) => (
						<Card1 place={place} key={index} />
					))}
			</div>
			{elementWidth > innerWidth && (
				<div className='arrow'>
					<i
						className={
							scrolled > -100 ? "fas fa-chevron-left" : "fas fa-chevron-right"
						}
					></i>
				</div>
			)}
		</div>
	);
};

export default TravLocallyFavPlaces;
