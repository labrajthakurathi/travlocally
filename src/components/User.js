import React, { useEffect, useState, useContext } from "react";
import placeContext from "./context/place/placeContext";
import {
	collection,
	query,
	where,
	getDocs,
	doc,
	getDoc,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Card3 from "./Card3";
import Admin from "./Admin";
import UserCurv from "../images/user-cuvr.png";
import MostViewedPlaces from "./MostViewedPlaces";
import EditInfoModal from "./EditInfoModal";
import Search from "./Search";

const User = () => {
	const PlaceContext = useContext(placeContext);
	const { state, removeUser, setUser } = PlaceContext;
	const [placeAry, setPlaceAry] = useState([]);
	const [reviewAry, setReviewAry] = useState([]);
	const auth = getAuth();
	const navigate = useNavigate();
	const [user1, setUser1] = useState("");
	const [edit, setEdit] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			currentUser ? setUser(currentUser) : removeUser();
		});
	}, []);

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
		const getReview = async () => {
			const q = query(
				collection(db, "review_places"),
				where("parent_id", "==", `${state.user.uid}`),
				where("in_review", "==", true)
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arry = [];
				querySnapshot.forEach((doc) => {
					arry.push(doc.data());
				});
				setReviewAry(arry);
			});
		};
		return getReview();
	}, []);

	useEffect(() => {
		const getUser = async () => {
			const unsub = onSnapshot(doc(db, "users", state.user.uid), (doc) => {
				setUser1(doc.data());
			});
		};
		getUser();
	}, []);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {})
			.catch((error) => {
				console.log(error);
			});
		removeUser();
		navigate("/login");
	};

	return (
		<div className='user'>
			{edit && <EditInfoModal setEdit={setEdit} user={user1} />}
			<div
				className={
					show
						? "user-logo-wrapper reveal user-header"
						: "user-logo-wrapper user-header"
				}
			>
				<i className='fa fa-angle-down' onClick={() => setShow(!show)}></i>

				<div className='user-menu'>
					<ul>
						<Link to='/me'>
							<li>
								<p>My Account</p>
								<i className='fas fa-user'></i>
							</li>
						</Link>
						<li
							onClick={() => {
								setEdit(true);
								setShow(false);
							}}
						>
							<p>Edit Account</p>
							<i className='fas fa-edit'></i>
							<i className='fas fa-pen-to-square'></i>
						</li>

						<li onClick={handleLogout}>
							<p>Logout</p> <i className='fas fa-sign-out-alt '></i>
						</li>
					</ul>
				</div>
			</div>

			{user1.cat === "admin" ? (
				<Admin />
			) : (
				<div className='content'>
					{}
					<div className='top'>
						<img
							src={UserCurv}
							className='top-sec-img'
							alt='TravLocally asset'
						/>

						<div className='search-bar'>
							<h1 className='heading'>EXPLORE</h1>
							{/* <div className='search'>
								<input type='text' placeholder='Enter city,state or country' />
								<i className='fas fa-search-location input-icon'></i>
							</div> */}
							<div className='bar'>
								<Search />
							</div>
						</div>
					</div>
					<div className='bottom-sec'>
						{reviewAry.length > 0 && (
							<div className='nearby-places-section'>
								<h2>Awaiting Review</h2>
								<div className='nearby-places-cards'>
									{reviewAry.map((place, index) => (
										<div className='card-1' key={index}>
											<img src={place.picture} alt='' />
											<h4 className={place.desc.length > 24 ? "big-text" : ""}>
												{place.desc}
											</h4>
										</div>
									))}
								</div>
							</div>
						)}

						<div className='nearby-places-section'>
							<h2>Your Contribution</h2>
							<div className='nearby-places-cards'>
								{placeAry.length ? (
									placeAry.map((place, index) => (
										<Card3 key={index} place={place} type='user' />
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
							<MostViewedPlaces />
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
