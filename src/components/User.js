import React, { useEffect, useState, useContext } from "react";
import placeContext from "./context/place/placeContext";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
} from "firebase/firestore";
import { db, onSnapshot, storage } from "../firebase";
import Card2 from "./Card2";
import Card3 from "./Card3";
import Admin from "./Admin";
import UserCurv from "../images/user-cuvr.png";
import TopPlaces from "./TopPlaces";
import NearbyPlaces from "./NearbyPlaces";
import { Link } from "react-router-dom";

const User = () => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;
	const [placeAry, setPlaceAry] = useState([]);
	const [user, setUser] = useState("");
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

	useEffect(() => {
		const getEst = async () => {
			const docRef = doc(db, "users", state.user.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setUser(docSnap.data());
			} else {
				console.log("No such document!");
			}
		};
		getEst();
	}, []);

	return (
		<div className='user'>
			{user.cat === "admin" ? (
				<Admin />
			) : (
				<div className='content'>
					<div className='top'>
						{/* <img
							src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Fuser-curv.png?alt=media&token=c3dc7aa2-98d8-4e0a-acdf-00379c88ed4e'
							alt='TravLocally asset'
						/> */}
						<img src={UserCurv} alt='TravLocally asset' />

						<div className='search-bar'>
							<h1 className='heading'>EXPLORE</h1>
							<div className='search'>
								<input type='text' placeholder='Enter city,state or country' />
								<i className='fas fa-search-location input-icon'></i>
							</div>
						</div>
					</div>
					<div className='bottom-sec'>
						<div className='nearby-places-section'>
							<h2>Your Contribution</h2>
							<div className='nearby-places-cards'>
								{placeAry.length ? (
									placeAry.map((place, index) => (
										<Card3 key={index} place={place} />
									))
								) : (
									<div className='no-content'>
										<p>So Empty</p>
										<i className='fas fa-folder-open'></i>
									</div>
								)}
							</div>
						</div>
						<div className='section section-2'>
							<NearbyPlaces />
						</div>
						<div className='section section-3'>
							<h2>Contribute</h2>
							<div className='section-3-btn'>
								<Link to='/add-places' className='btn-primary'>
									Add Places
								</Link>
								<Link to='/blog/write' className='btn-secondary'>
									Write Blogs
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default User;
