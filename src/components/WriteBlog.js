import React, { useEffect, useState } from "react";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import PhotoSelectUpload from "./PhotoSelectUpload";

const WriteBlog = () => {
	const [blogUi, setBlogUi] = useState([]);
	const [blog, setBlog] = useState({});
	useEffect(() => {
		if (localStorage.getItem("blog-ui") === null) {
			localStorage.setItem("blog-ui", blogUi);
			setBlogUi([]);
		} else {
			// setBlog(localStorage.getItem("blog-ui"));
			let tes = JSON.parse(localStorage.getItem("blog-ui"));
			let sortedData = tes.sort((a, b) => {
				return a.pos - b.pos;
			});
			setBlogUi(sortedData);
		}
	}, []);

	const handleBlog = async (val) => {
		await setBlogUi([
			...blogUi,
			{ type: val, pos: blogUi.length + 1, content: "" },
		]);
		console.log(blogUi);
	};
	useEffect(() => {
		let dta = JSON.stringify(blogUi);
		blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));
	}, [blogUi]);

	const handleClear = () => {
		setBlogUi([]);
		localStorage.removeItem("blog-ui");
	};

	return (
		<div className='write-blog'>
			<div className='title'>
				<label htmlFor='title'>Title</label>
				<textarea type='text' rows='2' id='title' />
			</div>
			{blogUi &&
				blogUi.map((b, index) => {
					if (b.type == 1) {
						return (
							<Paragraph
								key={index}
								blog={b}
								setBlogUi={setBlogUi}
								blogUi={blogUi}
							/>
						);
					} else if (b.type == 2) {
						return <p>hello2</p>;
					} else if (b.type == 3) {
						return (
							<Heading
								key={index}
								blog={b}
								setBlogUi={setBlogUi}
								blogUi={blogUi}
							/>
						);
					} else {
						return (
							<PhotoSelectUpload
								key={index}
								blog={b}
								setBlogUi={setBlogUi}
								blogUi={blogUi}
							/>
						);
					}
				})}
			<hr />
			<div className='tool-selection'>
				<i
					className='fas fa-paragraph'
					data-name='Paragraph'
					onClick={() => handleBlog("1")}
				></i>
				<i
					className='fas fa-list'
					data-name='List'
					onClick={() => handleBlog("2")}
				></i>
				<i
					className='fas fa-heading'
					data-name='Heading'
					onClick={() => handleBlog("3")}
				></i>
				<i
					className='fas fa-image'
					data-name='Image'
					onClick={() => handleBlog("4")}
				></i>
			</div>
			<div className='clear'>
				<button className='btn-primary' onClick={handleClear}>
					Clear<i className='fas fa-times ml-1'></i>
				</button>
				<button className='btn-secondary' onClick={handleClear}>
					Preview<i className='fas fa-eye ml-1'></i>
				</button>
			</div>
		</div>
	);
};

export default WriteBlog;

// let blog = [
// 	{
// 		type: 1,
// 		content: "How to make a spinner in CSS",
// 		1: "oen",
// 	},
// 	{
// 		type: 2,
// 		content: "Step 1 is this and do this",
// 	},
// 	{
// 		type: 3,
// 		conten:
// 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolore corrupti perferendis ipsam laudantium odit libero temporibus ratione praesentium dolorum tempore tempora, labore quo aliquid repellat maiores ipsa qui debitis eligendi asperiores fugiat impedit? Ipsa, suscipit, repudiandae iste nihil quod autem, numquam ab magnam molestiae perspiciatis esse assumenda voluptatibus quisquam.",
// 	},
// 	,
// 	{
// 		type: 2,
// 		content: "Step 2 is this and do this",
// 	},
// 	{
// 		type: 3,
// 		conten:
// 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolore corrupti perferendis ipsam laudantium odit libero temporibus ratione praesentium dolorum tempore tempora, labore quo aliquid repellat maiores ipsa qui debitis eligendi asperiores fugiat impedit? Ipsa, suscipit, repudiandae iste nihil quod autem, numquam ab magnam molestiae perspiciatis esse assumenda voluptatibus quisquam.",
// 	},
// 	,
// 	{
// 		type: 2,
// 		content: "Step 3 is this and do this",
// 	},
// 	{
// 		type: 3,
// 		conten:
// 			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum dolore corrupti perferendis ipsam laudantium odit libero temporibus ratione praesentium dolorum tempore tempora, labore quo aliquid repellat maiores ipsa qui debitis eligendi asperiores fugiat impedit? Ipsa, suscipit, repudiandae iste nihil quod autem, numquam ab magnam molestiae perspiciatis esse assumenda voluptatibus quisquam.",
// 	},
// ];
