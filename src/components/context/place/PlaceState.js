import React, { useReducer } from "react";
import PlaceContext from "./placeContext";
import PlaceReducer from "./placeReducer";
import { db, onSnapshot, storage } from "../../../firebase";

import {
	setDoc,
	collection,
	query,
	where,
	getDocs,
	doc,
	updateDoc,
	increment,
	getDoc,
} from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
	onAuthStateChanged,
} from "firebase/auth";
import { useEffect } from "react/cjs/react.production.min";

const PlaceState = (props) => {
	const initialState = {
		loading: false,
		error: null,
		place: null,
		alert: null,
		user: false,
		live: null,
	};
	const [state, dispatch] = useReducer(PlaceReducer, initialState);

	//set place
	const setPlace = async (
		city,
		desc,
		structured_formatting,
		lng,
		lat,
		setInput
	) => {
		setLoading();

		const citiesRef = collection(db, "places");
		const q = query(citiesRef, where("place_id", "==", city.place_id));

		const querySnapshot = await getDocs(q);
		if (querySnapshot.empty) {
			const data = {
				...city,
				desc: desc,
				coordinates: {
					lng,
					lat,
				},
				structured_formatting: structured_formatting,
			};

			localStorage.setItem("place_id", city.place_id);
			dispatch({ type: "SET_PLACE", payload: data });
			removeLoading();
		} else {
			removeLoading();
			setAlert("City Already Exists");

			setTimeout(() => {
				removeAlert();
			}, 5000);
		}
	};
	//end set place

	//upload item
	const uploadItem = async (item, setCurrentItem, type, about) => {
		setLoading();
		const data = {
			item_id: item.place_id,
			name: item.name,
			lng: item.coordinates.lng,
			lat: item.coordinates.lat,
			address: item.formatted_address,
			map_url: item.map_url,
			parent_id: state.place.place_id,
			type: type,
			about: about,
			like: 1,
			dislike: 0,
		};

		const docRef1 = doc(db, "establishment", item.place_id);
		const docRef2 = doc(db, "places", state.place.place_id);
		let req1 = await setDoc(docRef1, data);

		let req2 =
			type == "eat"
				? await updateDoc(docRef2, {
						est_eat: [...state.place.est_eat, item.place_id],
				  })
				: await updateDoc(
						docRef2,
						{
							est_visit: [...state.place.est_visit, item.place_id],
						},
						{ merge: true }
				  );
		removeLoading();
		setCurrentItem(null);
		setAlert("Content Added");

		setTimeout(() => {
			removeAlert();
		}, 4000);
	};
	//end item

	//upload tips
	const uploadTips = async (tip, uid, setTip) => {
		setLoading();
		const data = {
			item_id: uid,
			parent_id: state.place.place_id,
			type: "tips",
			like: 1,
			dislike: 0,
			tip: tip,
		};
		const docRef1 = doc(db, "establishment", uid);
		const docRef2 = doc(db, "places", state.place.place_id);
		let req1 = await setDoc(docRef1, data);

		let req2 = await updateDoc(
			docRef2,
			{
				tips: [...state.place.tips, uid],
			},
			{ merge: true }
		);
		removeLoading();
		setTip("");
		setAlert("Content Added");

		setTimeout(() => {
			removeAlert();
		}, 4000);
	};

	//end upload tips

	//like dislike item
	const likeDislike = async (id, type) => {
		const itemRef = doc(db, "establishment", id);
		const userRef = doc(db, "users", state.user.uid);
		const docSnap = await getDoc(userRef);
		let user = {};
		let data = {};

		if (docSnap.exists()) {
			user = docSnap.data();
		} else {
		}

		if (type == "like") {
			if (user.liked.includes(id)) {
				let likedArry = user.liked.filter((like) => like != id);

				data = { ...user, liked: [...likedArry] };
				updateDoc(itemRef, {
					like: increment(-1),
				});
			} else {
				data = { ...user, liked: [...user.liked, id] };
				updateDoc(itemRef, {
					like: increment(1),
				});
			}
		} else {
			if (user.disliked.includes(id)) {
				let dislikedArry = user.disliked.filter((dislike) => dislike != id);

				data = { ...user, disliked: [...dislikedArry] };
				updateDoc(itemRef, {
					dislike: increment(-1),
				});
			} else {
				updateDoc(itemRef, {
					dislike: increment(1),
				});
				data = { ...user, disliked: [...user.disliked, id] };
			}
		}
		await setDoc(userRef, data);
	};

	//end like dislike item

	//getPlace
	const getPlace = () => {
		const placeId = localStorage.getItem("place_id");
		const unSub = onSnapshot(doc(db, "places", placeId), (doc) => {
			dispatch({ type: "UPDATE_PLACE", payload: doc.data() });
		});
	};
	//end getPlace

	const uploadPlace = async (current) => {
		setLoading();
		const docRef = doc(db, "places", state.place.place_id);

		if (current != "") {
			if (current.selfUpload == false) {
				let place = {
					...state.place,
					picture: current.url,
					est_eat: [],
					est_visit: [],
					comments: [],
					tips: [],
				};
				let req = await setDoc(docRef, { ...place });
			} else {
				const storageRef = ref(storage, `places/${current.url.name}`);
				let upload = await uploadBytes(storageRef, current.url);
				let url = await getDownloadURL(storageRef);
				let place = {
					...state.place,
					picture: url,
					est_eat: [],
					est_visit: [],
					comments: [],
					tips: [],
				};
				let req = await setDoc(docRef, { ...place });
			}

			removeLoading();
		}
	};
	//end upload place

	//add comment
	const addComment = async (place, comment, setComment) => {
		const docRef = doc(db, "places", place.place_id);
		let commentRef = {
			text: comment,
			parent_name: state.user.displayName,
			parent_id: state.user.uid,
			id: uuidv4(),
			timeStamp: Date.now(),
		};
		let dta = {
			...place,
			comments: [...place.comments, commentRef],
		};

		let req = await setDoc(docRef, { ...dta });
		setComment("");
		setAlert("Comment Added");
		setTimeout(() => {
			removeAlert();
		}, 4000);
	};
	//end add comment

	//delete comment

	//end delete comment

	//user
	//sign up
	const signUp = async (data, setData, navigate) => {
		setLoading();
		const auth = getAuth();

		try {
			let req = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);

			try {
				let reqEmail = await sendEmailVerification(auth.currentUser);

				const user = {
					email: req.user.email,
					uid: req.user.uid,
					first_name: data.first_name,
					last_name: data.last_name,
					liked: [],
					disliked: [],
				};
				let updateReq = await updateProfile(auth.currentUser, {
					displayName: `${data.first_name} ${data.last_name}`,
				});
				const docRef = doc(db, "users", req.user.uid);
				const userReq = await setDoc(docRef, { ...user });
			} catch (err) {
				setAlert("Something Went Wrong");
				setTimeout(() => {
					removeAlert();
				}, 8000);
			}

			navigate("/me", { replace: true });
		} catch (err) {
			let message = "";
			err.code == "auth/email-already-in-use"
				? (message = "Email Already Exists")
				: (message = "Something Went Wrong");

			setAlert(message);
			setTimeout(() => {
				removeAlert();
			}, 8000);
		}
		removeLoading();
	};

	const setLive = (dta) => {
		dispatch({ type: "SET_LIVE", payload: dta });
	};

	const setUser = (user) => {
		dispatch({ type: "SET_USER", payload: user });
		localStorage.setItem("uid", user.uid);
	};
	const removeUser = () => {
		dispatch({ type: "REMOVE_USER" });
		localStorage.removeItem("uid");
	};
	//end user

	//loading
	const setLoading = () => {
		dispatch({ type: "SET_LOADING" });
	};

	const removeLoading = () => {
		dispatch({ type: "REMOVE_LOADING" });
	};
	//end loading

	//message
	const setAlert = (message) => {
		dispatch({ type: "SET_ALERT", payload: message });
	};
	const removeAlert = () => {
		dispatch({ type: "REMOVE_ALERT" });
	};
	//end message
	const value = {
		state,
		setPlace,
		setLoading,
		removeLoading,
		setAlert,
		removeAlert,
		uploadPlace,
		uploadItem,
		getPlace,
		signUp,
		setUser,
		removeUser,
		addComment,
		likeDislike,
		setLive,
		uploadTips,
	};
	return (
		<PlaceContext.Provider value={value}>
			{props.children}
		</PlaceContext.Provider>
	);
};

export default PlaceState;
