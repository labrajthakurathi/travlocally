import React, { useEffect, useState, useContext } from "react";
import placeContext from "./context/place/placeContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, onSnapshot, storage } from "../firebase";
import Card2 from "./Card2";
import Card3 from "./Card3";

const User = () => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;
	const [placeAry, setPlaceAry] = useState([]);
	useEffect(() => {
		const estRef = collection(db, "places");

		const getEst = async () => {
			const q = query(estRef, where("parent_id", "==", `${state.user.uid}`));

			const querySnapshot = await getDocs(q);
			let arry = [];
			querySnapshot.forEach((doc) => {
				arry.push(doc.data());
			});
			setPlaceAry(arry);
		};
		getEst();
	}, []);

	return (
		<div className='user'>
			<div className='content'>
				<div className='top'>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Fuser-curv.png?alt=media&token=c3dc7aa2-98d8-4e0a-acdf-00379c88ed4e'
						alt='TravLocally asset'
					/>

					<div className='search-bar'>
						<h1 className='heading'>EXPLORE</h1>
						<div className='search'>
							<input type='text' placeholder='Enter city,state or country' />
							<i className='fas fa-search-location'></i>
						</div>
					</div>
				</div>
				<div className='bottom-sec'>
					<div className='section section-1'>
						<h2>Your Contribution</h2>
						<div className='top-places-cards'>
							{placeAry &&
								placeAry.map((place, index) => (
									<Card3 key={index} place={place} />
								))}
						</div>
					</div>
					<div className='section section-2'>
						<h2>Saved Places</h2>
						{/* <div className='top-places-cards'>
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
