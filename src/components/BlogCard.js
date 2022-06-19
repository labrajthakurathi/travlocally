import React from "react";
import Blog from "../images/blog.jpg";

const BlogCard = () => {
	return (
		<div className='blog-card'>
			<div className='blog-card-header'>
				<div className='img-name'>
					<img src={Blog} alt='' />
					<p>Lalit Thakurathi</p>
				</div>
				<div className='date'>
					<p>12 July 2020</p>
				</div>
			</div>
			<div className='blog-card-body'>
				<h2>Apple Just Wrecked 15+ Startups In Less Than 1 Hour</h2>
				<p>
					From misogynistic managers to meeting Drake —  the luxurious lifestyle
					came at a cost How heroic individualism perpetuates impossible
				</p>
			</div>
			<div className='blog-card-footer'>
				<div className='blog-card-footer-icons'>
					<div className='icon'>
						<i className='far fa-thumbs-up'></i>
						<p>111</p>
					</div>
					<div className='icon'>
						<i className='far fa-eye'></i>
						<p>111</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
