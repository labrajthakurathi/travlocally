import React, { useState, useEffect, useContext } from "react";
import Blog2 from "../images/blog2.jpg";
import Blog3 from "../images/blog3.jpg";
import Curv3 from "../images/curv3.png";
import Curv4 from "../images/curv4.png";
import BlogCard from "./BlogCard";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import placeContext from "./context/place/placeContext";
import Loading from "./Loading";
import LoginMessageModal from "./LoginMessageModal";

const Blogs = () => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [blogs, setBlogs] = useState([]);
	const navigate = useNavigate();
	const [alert, setAlert] = useState(false);

	window.addEventListener("resize", () => {
		setScreenWidth(window.innerWidth);
	});

	useEffect(() => {
		const getData = async () => {
			let blogArry = [];
			const querySnapshot = await getDocs(collection(db, "blogs"));
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				blogArry.push(doc.data());
			});
			setBlogs(blogArry);
		};
		getData();
	}, []);
	const handleCheck = () => {
		if (state.user) {
			navigate("/blog/write");
		} else {
			setAlert(true);
		}
	};

	return (
		<div className='blog-landing'>
			{blogs.length === 0 && <Loading />}
			{alert && <LoginMessageModal setShowModal={setAlert} />}
			<div className='blog-top-sec'>
				{screenWidth < 1040 ? (
					<>
						<img src={Blog2} className='pic1' alt='' />
						<img src={Curv3} alt='TravLocally' className='pic2' />
					</>
				) : (
					<>
						<img src={Blog3} className='pic1' alt='' />
						<img src={Curv4} alt='Travlocally' className='pic2' />
					</>
				)}

				<div className='top-sec-content'>
					<h2 className='blog-sec-heading'>
						WANNA KNOW THE PLACE BETTER BEFORE YOU VISIT ?
					</h2>

					<div className='search-bar'>
						<input type='text' id='blog-search' placeholder='Enter the city' />
						<i className='fas fa-search-location'></i>
					</div>
				</div>
			</div>
			<div className='blog-popular-sec'>
				<h2 className='sec-heading'>Popular Blogs</h2>
				<div className='popular-sec-blogs'>
					{blogs.map((blog, index) => (
						<BlogCard blog={blog} key={index} />
					))}
				</div>
				<button className='btn-dark' onClick={handleCheck}>
					Write Blog
				</button>
			</div>
		</div>
	);
};

export default Blogs;
