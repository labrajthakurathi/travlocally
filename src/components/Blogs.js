import React, { useState } from "react";
import Blog2 from "../images/blog2.jpg";
import Blog3 from "../images/blog3.jpg";
import Curv3 from "../images/curv3.png";
import Curv4 from "../images/curv4.png";
import BlogCard from "./BlogCard";

const Blogs = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => {
		setScreenWidth(window.innerWidth);
	});
	return (
		<div className='blog-landing'>
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
					{" "}
					<BlogCard />
					<BlogCard />
					<BlogCard />
				</div>
			</div>
		</div>
	);
};

export default Blogs;
