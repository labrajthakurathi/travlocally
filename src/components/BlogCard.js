import React from "react";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
	const navigate = useNavigate();
	const handleClick = (id) => {
		navigate(`/blog/${id}`);
	};
	console.log(blog);
	return (
		<div className='blog-card' onClick={() => handleClick(blog.item_id)}>
			<div className='blog-card-header'>
				<div className='img-name'>
					{blog.parent_pic ? (
						<img src={blog.parent_pic} alt='' />
					) : (
						<div className='no-pic'>
							<i className='fas fa-user'></i>
						</div>
					)}

					<p>{blog.parent_name}</p>
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
					<div className='tag'>
						<p>{blog.tag.desc}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BlogCard;
