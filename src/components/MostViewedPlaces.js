import React, { useState, useEffect, useRef } from "react";
import Card2 from "./Card2";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PicLoading from "./PicLoading";

const MostViewedPlaces = () => {
	const [mostViewed, setmostViewed] = useState([]);
	const myInput = useRef("");
	const [innerWidth, setInnerWidth] = useState("");
	const [elementWidth, setElementWidth] = useState("");
	const [scrolled, setScrolled] = useState("");

	useEffect(() => {
		const getData = async () => {
			const docRef = doc(db, "category", "most_viewed");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setmostViewed(docSnap.data().items);
			} else {
				console.log("No such document!");
			}
		};
		getData();
	}, []);
	useEffect(() => {
		setWidth();
	}, [mostViewed]);
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
			<h2>Most Viewed Places</h2>
			{mostViewed.length === 0 && <PicLoading style={"category"} />}
			<div
				className='nearby-places-cards'
				ref={myInput}
				onScroll={(e) => handleElementScroll(e)}
			>
				{mostViewed &&
					mostViewed.map((place, index) => <Card2 place={place} key={index} />)}
			</div>
			{elementWidth > innerWidth && (
				<div className='arrow'>
					<i
						class={
							scrolled > -100 ? "fas fa-chevron-left" : "fas fa-chevron-right"
						}
					></i>
				</div>
			)}
		</div>
	);
};

export default MostViewedPlaces;
