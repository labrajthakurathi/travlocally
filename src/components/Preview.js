import React, { useEffect, useState, useContext } from "react";
import FullBlogCard from "./FullBlogCard";
import { Link } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import placeContext from "./context/place/placeContext";
import { v4 as uuidv4 } from "uuid";
import Loading from "./Loading";

const Preview = ({ setShow }) => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;
	const [blogLocal, setBlogLocal] = useState("");
	const [loading, setLoading] = useState(false);
	const [fullBlog, setFullBlog] = useState("");
	useEffect(() => {
		let dta = JSON.parse(localStorage.getItem("blog-ui"));
		let sorted = dta.sort((a, b) => {
			return a.pos - b.pos;
		});

		return setBlogLocal(sorted);
	}, []);
	const getData = async () => {
		const docRef = doc(db, "blogs", "test");
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			setBlogLocal(docSnap.data());
		} else {
			console.log("No such document!");
		}
	};

	const handlePost = async () => {
		setLoading(true);
		if (localStorage.getItem("blog-id")) {
			let id = localStorage.getItem("blog-id");
			const cityRef = doc(db, "blogs", id);
			setDoc(
				cityRef,
				{
					blog_text: [...blogLocal],
					title: localStorage.getItem("title"),
					tag: JSON.parse(localStorage.getItem("tag")),
				},
				{ merge: true }
			);
		} else {
			let item_id = uuidv4();
			let fullData = {
				blog_text: [...blogLocal],
				title: localStorage.getItem("title"),
				read_time: readTime(),
				posted_on: new Date().toString().split(" ").splice(1, 3).join(" "),
				parent_id: state.user.uid,
				item_id,
				like: 1,
				dislike: 0,
				comments: [],
				tag: JSON.parse(localStorage.getItem("tag")),
			};

			await setDoc(doc(db, "blogs", item_id), { ...fullData });
		}

		setLoading(false);
		localStorage.clear();
	};
	const readTime = () => {
		let blogg = JSON.parse(localStorage.getItem("blog-ui"));
		let num = 0;
		blogg &&
			blogg.map((line) => {
				if (line.type === "1") {
					line.content.blocks.map((text) => {
						num += text.text.length;
					});
				}
			});
		let readTime = Math.ceil(num / 1320);
		return readTime;
	};
	console.log(fullBlog);
	return (
		<div className='preview'>
			{loading && <Loading />}
			<FullBlogCard
				blog={blogLocal}
				fullBlog={{
					name: state.user.displayName,
					posted_on: new Date().toString().split(" ").splice(1, 3).join(" "),
					title: localStorage.getItem("title"),
					read_time: readTime(),
				}}
			/>
			<div className='preview-buttons'>
				<Link
					to='/blog/write'
					className='btn-primary'
					onClick={() => setShow(false)}
				>
					<i className='fas fa-angle-left '></i>
					Edit
				</Link>
				<button className='btn-dark' onClick={handlePost}>
					Post
				</button>
			</div>
		</div>
	);
};

export default Preview;
