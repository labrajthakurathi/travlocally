import React, { useState, useEffect } from "react";
import {
	doc,
	deleteDoc,
	collection,
	getDocs,
	setDoc,
	getDoc,
	onSnapshot,
	query,
	where,
} from "firebase/firestore";

import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import Loading from "./Loading";
import AssingModal from "./AssingModal";
import SearchImages from "./SearchImages";
import Card3 from "./Card3";

const Admin = () => {
	const [type, setType] = useState("blogs");
	const [catType, setCatType] = useState("popular");
	const [data, setData] = useState([]);
	const [searched, setSearched] = useState([]);
	const [showItem, setShowItem] = useState(false);
	const [showCategory, setShowCategory] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [currentItem, setCurrentItem] = useState("");
	const [places, setPlaces] = useState([]);
	const [picMethod, setPicMethod] = useState("");
	const [home, setHome] = useState("");
	const [picChange, setPicChange] = useState(false);
	const [placeAry, setPlaceAry] = useState([]);
	let show = searched.length ? searched : data;

	const navigate = useNavigate();
	useEffect(() => {
		getData();
		setSearched([]);
	}, [type]);

	useEffect(() => {
		getPlaces();
	}, [catType]);

	useEffect(() => {
		const getReviews = async () => {
			const q = query(
				collection(db, "review_places"),
				where("in_review", "==", true)
			);
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const arry = [];
				querySnapshot.forEach((doc) => {
					arry.push(doc.data());
					console.log("ran");
				});
				setPlaceAry(arry);
			});
		};
		return getReviews();
	}, []);

	const getData = async () => {
		const querySnapshot = await getDocs(collection(db, type));
		let dataArry = [];
		querySnapshot.forEach((doc) => {
			dataArry.push(doc.data());
		});

		setData([...dataArry]);
	};
	const getPlaces = async () => {
		const unsub = await onSnapshot(doc(db, "category", catType), (doc) => {
			setPlaces(doc.data().items);
		});
	};
	useEffect(() => {
		getHome();
	}, []);
	const getHome = async () => {
		const unsub = await onSnapshot(doc(db, "app", "home"), (doc) => {
			setHome(doc.data());
		});
	};

	const handleDelete = async (id, item) => {
		if (type === "places") {
			let place = id;
			const storage = getStorage();
			if (place.self_upload === true) {
				const imageRef = ref(storage, place.picture);
				deleteObject(imageRef)
					.then(() => {
						// File deleted successfully
					})
					.catch((error) => {
						console.log(error);
					});
			}
			place.est_eat.forEach(async (eat) => {
				await deleteDoc(doc(db, "establishment", eat));
			});
			place.est_visit.forEach(async (visit) => {
				await deleteDoc(doc(db, "establishment", visit));
			});
			place.tips.forEach(async (tip) => {
				await deleteDoc(doc(db, "establishment", tip));
			});
			setData(data.filter((item) => item.place_id != place.place_id));
			setSearched([]);
		} else if (type === "blogs") {
			setData(data.filter((item) => item.item_id != id));
		} else {
			await setDoc(doc(db, "banned_users", item.email), {
				...item,
			});

			setData(data.filter((item) => item.uid != id));
		}

		if (type === "places") {
			await deleteDoc(doc(db, type, id.place_id));
		} else {
			await deleteDoc(doc(db, type, id));
		}
	};

	const handlePlaceDelete = async (item) => {
		let data = {};
		const docRef = doc(db, "category", catType);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			data = docSnap.data();
		} else {
			console.log("No such document!");
		}
		let removed = data.items.filter(
			(place) => place.place_id !== item.place_id
		);

		let finalData = { ...data, items: [...removed] };
		let upload = await setDoc(docRef, { ...finalData });
	};
	const handleSearch = (e) => {
		let matches = data.filter((item) => {
			const regex = new RegExp(`^${e.target.value}`, "gi");

			if (type === "blogs") {
				return item.title.match(regex);
			} else if (type === "places") {
				return item.desc.match(regex);
			} else {
				return item.first_name.match(regex) || item.last_name.match(regex);
			}
		});
		setSearched(matches);
	};
	const handleEdit = (item) => {
		let content = JSON.stringify(item.blog_text);
		localStorage.clear();
		localStorage.setItem("title", item.title);
		localStorage.setItem("blog-id", item.item_id);

		localStorage.setItem("blog-ui", content);
		localStorage.setItem("tag", "");
		item.blog_text.forEach((text) => {
			if (text.type === "1") {
				let content = JSON.stringify(text.content);
				localStorage.setItem(`content${text.pos}`, content);
			}
		});

		navigate("/blog/write");
	};
	const handleHide = async (place) => {
		const docRef = doc(db, "review_places", place.place_id);
		let finalData = {
			...place,
			reviewed: false,
			in_review: true,
		};
		let req = await setDoc(docRef, { ...finalData });
		let del = await deleteDoc(doc(db, "places", place.place_id));
		setData(data.filter((item) => item.uid != place.place_id));
		setSearched([]);
	};

	return (
		<div className='admin'>
			{!data.length && <Loading />}
			{showModal && (
				<AssingModal
					currentItem={currentItem}
					setCurrentItem={setCurrentItem}
					setShowModal={setShowModal}
				/>
			)}
			<div className='place-header'>
				<ul>
					<li
						onClick={() => setType("blogs")}
						className={type == "blogs" ? "active-category" : ""}
					>
						Blogs
					</li>
					<li
						onClick={() => setType("places")}
						className={type == "places" ? "active-category" : ""}
					>
						Places
					</li>

					<li
						onClick={() => setType("users")}
						className={type == "users" ? "active-category" : ""}
					>
						Users
					</li>
					<div className='hide' onClick={() => setShowItem(!showItem)}>
						<i
							className={showItem ? "fas fa-angle-up" : "fas fa-angle-down"}
						></i>
					</div>
				</ul>
			</div>
			{showItem && (
				<div className='items-sec '>
					<div className='search-bar'>
						<p>
							Search in {data.length} {type}
						</p>
						<div className='bar'>
							<input
								type='text'
								id='blog-search'
								placeholder='Type...'
								onChange={handleSearch}
							/>
							<i className='fas fa-search-location'></i>
						</div>
					</div>
					<div className='data-list'>
						{data.length &&
							show.map((item, index) => {
								if (type === "blogs") {
									return (
										<div className='admin-card' key={index}>
											<p>{item.title}</p>{" "}
											<div className='action'>
												<i
													className='fas fa-pen'
													onClick={() => handleEdit(item)}
												></i>
												<i
													className='fas fa-trash'
													onClick={() => handleDelete(item.item_id)}
												></i>
											</div>
										</div>
									);
								} else if (type === "places") {
									return (
										<div className='admin-card' key={index}>
											<p>{item.desc}</p>{" "}
											<div className='action'>
												<i
													className='fas fa-pen'
													onClick={() => handleEdit(item.place_id)}
												></i>
												<i
													className='fas fa-trash'
													onClick={() => handleDelete(item)}
												></i>
												<i
													className='fas fa-eye-slash'
													onClick={() => handleHide(item)}
												></i>
												<i
													className='fas fa-plus'
													onClick={() => {
														setShowModal(true);
														setCurrentItem(item);
													}}
												></i>
											</div>
										</div>
									);
								} else {
									return (
										<div className='admin-card' key={index}>
											<div className='name-email'>
												<p>
													{item.first_name} {item.last_name}
												</p>{" "}
												<p>{item.email}</p>
											</div>

											<div className='action'>
												<i
													className='fas fa-ban'
													onClick={() => handleDelete(item.uid, item)}
												></i>
											</div>
										</div>
									);
								}
							})}
					</div>
				</div>
			)}

			<div className='place-header'>
				<ul>
					<li
						onClick={() => setCatType("popular")}
						className={catType == "popular" ? "active-category" : ""}
					>
						Popular
					</li>
					<li
						onClick={() => setCatType("most_viewed")}
						className={catType == "most_viewed" ? "active-category" : ""}
					>
						Most Viewed
					</li>

					<li
						onClick={() => setCatType("travlocally_favorite")}
						className={
							catType == "travlocally_favorite" ? "active-category" : ""
						}
					>
						TravLocally Favorite
					</li>
					<div className='hide' onClick={() => setShowCategory(!showCategory)}>
						<i
							className={showCategory ? "fas fa-angle-up" : "fas fa-angle-down"}
						></i>
					</div>
				</ul>
			</div>

			<div className='items-sec'>
				{showCategory && (
					<div className='data-list'>
						{places.length &&
							places.map((item, index) => (
								<div className='admin-card' key={index}>
									<p>{item.desc}</p>{" "}
									<div className='action'>
										<i
											className='fas fa-trash'
											onClick={() => handlePlaceDelete(item)}
										></i>
									</div>
								</div>
							))}
					</div>
				)}
			</div>
			{picChange ? (
				<div className='app-sec '>
					<div className='current-pic'>
						<img src={home.pic} alt='' />
						<button className='btn-dark' onClick={() => setPicMethod("change")}>
							Change pic
						</button>
						<button className='btn-primary' onClick={() => setPicChange(false)}>
							Cancel
						</button>
					</div>

					{picMethod !== "" && (
						<SearchImages setPicMethod={setPicMethod} picMethod={picMethod} />
					)}
				</div>
			) : (
				<div className=' app-sec change'>
					{" "}
					<button className='btn-primary' onClick={() => setPicChange(true)}>
						Change Hero Image
					</button>
				</div>
			)}

			<div className='nearby-places-section'>
				<h2 style={{ color: "white" }}>Review</h2>
				<div className='nearby-places-cards'>
					{placeAry.length ? (
						placeAry.map((place, index) => (
							<Card3 key={index} place={place} type='review' />
						))
					) : (
						<div className='no-content'>
							<p>So Empty</p>
							<i className='fas fa-folder-open'></i>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Admin;
