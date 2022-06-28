import React, { useEffect, useState } from "react";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import PhotoSelectUpload from "./PhotoSelectUpload";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const WriteBlog = () => {
	const [blogUi, setBlogUi] = useState([]);
	const [blog, setBlog] = useState({});
	const [title, setTitle] = useState("");
	const [finalData, setFinalData] = useState("");

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
		if (localStorage.getItem("title")) {
			let titleLocal = localStorage.getItem("title");
			setTitle(titleLocal);
		} else {
			setTitle("");
		}

		// setTitle(JSON.parse(localStorage.getItem("title")));
	}, []);

	const handleBlog = async (val) => {
		await setBlogUi([
			...blogUi,
			{ type: val, pos: blogUi.length + 1, content: "" },
		]);
	};
	useEffect(() => {
		let dta = JSON.stringify(blogUi);
		// let sortedData = dta.sort((a, b) => {
		// 	return a.pos - b.pos;
		// });
		blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));
	}, [blogUi]);

	const handleClear = () => {
		setBlogUi([]);
		localStorage.clear();
	};

	const handlePreview = () => {
		let d1 = JSON.parse(localStorage.getItem("blog_ui"));
		let d2 = JSON.parse(localStorage.getItem("p"));
		let d3 = { ...d1 };
	};
	const handleTitleChange = async (e) => {
		await setTitle(() => e.target.value);
	};
	useEffect(() => {
		JSON.stringify(localStorage.setItem("title", title));
	}, [title]);
	console.log(title);
	return (
		<div className='write-blog'>
			<div className='title'>
				<label htmlFor='title'>Title</label>
				<textarea
					type='text'
					rows='2'
					id='title'
					value={title}
					onChange={handleTitleChange}
				/>
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
					className='fas fa-image'
					data-name='Image'
					onClick={() => handleBlog("2")}
				></i>
			</div>
			<div className='clear'>
				<button className='btn-primary' onClick={handleClear}>
					Clear<i className='fas fa-times ml-1'></i>
				</button>
				<Link to='/blog/preview' className='btn-secondary'>
					Preview<i className='fas fa-eye ml-1'></i>
				</Link>
			</div>
		</div>
	);
};

export default WriteBlog;
