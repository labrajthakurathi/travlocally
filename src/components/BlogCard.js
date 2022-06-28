import React from "react";
import Blog from "../images/blog.jpg";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
	const navigate = useNavigate();
	const handleClick = (id) => {
		navigate(`/blog/${id}`);
	};
	return (
		<div className='blog-card' onClick={() => handleClick(blog.item_id)}>
			<div className='blog-card-header'>
				<div className='img-name'>
					<img src={Blog} alt='' />
					<p>Lalit Thakurathi</p>
				</div>
				<div className='date'>
					<p>{blog.posted_on}</p>
				</div>
			</div>
			<div className='blog-card-body'>
				<h2>{blog.title}</h2>
				<p>
					{blog.blog_text.map((text, index) => {
						if (text.type === "1") {
							return text.content.blocks[0].text;
						}
					})}
				</p>
			</div>
			<div className='blog-card-footer'>
				<div className='blog-card-footer-icons'>
					<div className='icon'>
						<i className='far fa-thumbs-up'></i>
						<p>{blog.like}</p>
					</div>
					<div className='icon'>
						<p>{blog.read_time} mins read</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
