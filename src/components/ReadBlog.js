import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, onSnapshot } from "../firebase";
import FullBlogCard from "./FullBlogCard";
import Comment from "./Comment";
import placeContext from "./context/place/placeContext";
import Message from "./Message";
import FeedbackSec from "./FeedbackSec";
import LoginMessageModal from "./LoginMessageModal";

const ReadBlog = () => {
	const PlaceContext = useContext(placeContext);
	const { addBlogComment, state, setLive, likeDislike } = PlaceContext;
	const [blog, setBlog] = useState("");
	const [comment, setComment] = useState("");
	const [notLogged, setNotLogged] = useState(false);
	const { id } = useParams();
	const [showModal, setShowModal] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);
	const likeRatio = parseInt((blog.like / (blog.like + blog.dislike)) * 100);
	useEffect(() => {
		handleLikedDisliked();
	}, [state]);

	const handleLikedDisliked = async () => {
		if (state.live !== null) {
			await setIsLiked(
				notLogged ? false : state.live.liked.includes(blog.item_id)
			);

			await setIsDisliked(
				notLogged ? false : state.live.disliked.includes(blog.item_id)
			);
		} else {
			console.log("null");
		}
	};

	useEffect(() => {
		async function kia() {
			let uid = await localStorage.getItem("uid");

			let unsub = await onSnapshot(doc(db, "users", uid), (doc) => {
				setLive(doc.data());
			});
			return unsub;
		}
		return kia();
	}, []);

	useEffect(() => {
		state.user ? setNotLogged(false) : setNotLogged(true);
	}, [state]);

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const docRef = doc(db, "blogs", id);
		const unsub = onSnapshot(doc(db, "blogs", id), (doc) => {
			setBlog(doc.data());
		});
	};
	const handleCommentClick = () => {
		notLogged && setShowModal(true);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addBlogComment(blog, comment, setComment);
	};
	console.log(state.live);

	return (
		<div className='read-blog'>
			<FullBlogCard blog={blog.blog_text} fullBlog={blog} />
			{PlaceContext.state.alert != null && <Message />}
			{showModal && <LoginMessageModal setShowModal={setShowModal} />}

			<div className='read-blog-secondary'>
				<FeedbackSec
					isLiked={isLiked}
					isDisliked={isDisliked}
					notLogged={notLogged}
					setShowModal={setShowModal}
					likeDislike={likeDislike}
					item={blog}
					likeRatio={likeRatio}
					showModal={showModal}
					collection='blogs'
				/>
				<div className='comment-sec'>
					<h3>Comments</h3>
					<form className='comment-form' onSubmit={handleSubmit}>
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
						{blog && blog.comments.length ? (
							blog.comments
								.sort(function ({ timeStamp: a }, { timeStamp: b }) {
									return b - a;
								})
								.map((item, index) => (
									<Comment item={item} key={index} place={blog} type='blog' />
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
		</div>
	);
};

export default ReadBlog;
