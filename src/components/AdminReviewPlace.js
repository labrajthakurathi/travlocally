import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc } from "firebase/firestore";
import { db, onSnapshot } from "../firebase";
import Loading from "./Loading";
import PlaceCard from "./PlaceCard";
import placeContext from "./context/place/placeContext";
import { collection, query, where, getDocs } from "firebase/firestore";
import Comment from "./Comment";
import Message from "./Message";
import LoginMessageModal from "./LoginMessageModal";

const AdminReviewPlace = () => {
	const PlaceContext = useContext(placeContext);
	const { addComment, state, setLive } = PlaceContext;
	const { id } = useParams();
	const [place, setPlace] = useState("");
	const [est, setEst] = useState("");
	const [current, setCurrent] = useState(0);
	const [type, setType] = useState("visit");
	const [comment, setComment] = useState("");
	const [notLogged, setNotLogged] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		handleLive();
	}, []);

	const handleLive = async () => {
		let uid = await localStorage.getItem("uid");
		let unsub = await onSnapshot(doc(db, "users", uid), (doc) => {
			setLive(doc.data());
		});
	};

	useEffect(() => {
		const unsub = onSnapshot(doc(db, "review_places", id), (doc) => {
			setPlace(doc.data());
		});
		return unsub;
	}, []);
	useEffect(() => {
		setCurrent(0);
	}, [type]);

	useEffect(() => {
		const estRef = collection(db, "establishment");
		const getEst = async () => {
			const q = query(
				estRef,
				where("parent_id", "==", `${id}`),
				where("type", "==", `${type}`)
			);

			const querySnapshot = await getDocs(q);
			let arry = [];
			querySnapshot.forEach((doc) => {
				arry.push(doc.data());
			});
			setEst(arry);
		};
		getEst();
	}, [type]);

	useEffect(() => {
		state.user ? setNotLogged(false) : setNotLogged(true);
	}, [state]);

	const handleClick = (arg) => {
		if (arg == "-") {
			if (current == 0) {
				setCurrent(est.length - 1);
			} else {
				setCurrent(current - 1);
			}
		} else {
			if (current == est.length - 1) {
				setCurrent(0);
			} else {
				setCurrent(current + 1);
			}
		}
	};
	const handleCommentClick = () => {
		notLogged && setShowModal(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (notLogged) {
			setShowModal(true);
			setComment("");
		} else {
			addComment(place, comment, setComment);
		}
	};

	return place == "" ? (
		<Loading />
	) : (
		<div className='place'>
			{PlaceContext.state.alert != null && <Message />}
			{showModal && <LoginMessageModal setShowModal={setShowModal} />}

			<div className='bg'>
				<div className='img'>
					<img src={place.picture} alt='' />
				</div>

				<div className='bottom'></div>
			</div>
			<div className='place-header'>
				<ul>
					<li
						onClick={() => setType("visit")}
						className={type == "visit" ? "active-category" : ""}
					>
						Attractions <span>{place.est_visit.length}</span>
					</li>
					<li
						onClick={() => setType("eat")}
						className={type == "eat" ? "active-category" : ""}
					>
						Eat <span>{place.est_eat.length}</span>
					</li>

					<li
						onClick={() => setType("tips")}
						className={type == "tips" ? "active-category" : ""}
					>
						Tips <span>{place.tips.length}</span>
					</li>
				</ul>
			</div>
			<div className='place-heading'>
				{" "}
				<h1>{place.desc}</h1>
			</div>
			<div className='place-content'>
				<div className='content-header'>
					<h3>
						{type == "visit"
							? "Attractions and Activities"
							: type == "eat"
							? "Places To Eat"
							: "Tips and Tricks"}
					</h3>
					<div className='indicators'>
						{est &&
							est.map((item, index) => (
								<span
									className={current == index ? "active-indicator" : ""}
									key={index}
								></span>
							))}
					</div>
				</div>
				<div className='cards'>
					{notLogged
						? est &&
						  est.map((item, index) => (
								<PlaceCard
									active={current == index}
									item={item}
									key={index}
									val={state}
									notLogged={notLogged}
									setShowModal={setShowModal}
								/>
						  ))
						: est &&
						  state.live != null &&
						  est.map((item, index) => (
								<PlaceCard
									active={current == index}
									item={item}
									key={index}
									val={state}
									notLogged={notLogged}
									setShowModal={setShowModal}
									showModal={showModal}
								/>
						  ))}
				</div>
				<div className='change-buttons'>
					<i
						className='fas fa-chevron-circle-left'
						onClick={() => handleClick("-")}
					></i>
					<i
						className='fas fa-chevron-circle-right'
						onClick={() => handleClick("+")}
					></i>
				</div>
			</div>

			<div className='comment-sec'>
				<h3>Comments</h3>
				<form onSubmit={handleSubmit} className='comment-form'>
					<textarea
						type='text'
						onChange={(e) => setComment(e.target.value)}
						maxLength='200'
						required='required'
						value={comment}
						placeholder='Limit your comment to 200 characters'
						onClick={handleCommentClick}
					/>
					<button type='submit' className='btn-dark'>
						Comment
					</button>
				</form>
				<div className='comment-list'>
					{place.comments.length ? (
						place.comments
							.sort(function ({ timeStamp: a }, { timeStamp: b }) {
								return b - a;
							})
							.map((item, index) => (
								<Comment item={item} key={index} place={place} type='place' />
							))
					) : (
						<div className='no-comments'>
							<p>No Comments to Show</p>
							<i className='fas fa-folder-open'></i>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AdminReviewPlace;
