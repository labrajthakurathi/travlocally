import React, { useEffect, useState, useRef } from "react";
import Card1 from "./Card1";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PicLoading from "./PicLoading";

const PopularPlaces = () => {
	const [popularPlaces, setPopularPlaces] = useState([]);
	const myInput = useRef("");
	const [innerWidth, setInnerWidth] = useState("");
	const [elementWidth, setElementWidth] = useState("");
	const [scrolled, setScrolled] = useState(-101);

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

	useEffect(() => {
		setWidth();
	}, [popularPlaces]);
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
		<div className='top-places-section'>
			<h2>Popular Places</h2>
			{popularPlaces.length === 0 && <PicLoading style={"category"} />}
			<div
				className='top-places-cards'
				ref={myInput}
				onScroll={(e) => handleElementScroll(e)}
			>
				{popularPlaces &&
					popularPlaces.map((place, index) => (
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

export default PopularPlaces;
