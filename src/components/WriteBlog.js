import React, { useEffect, useState, useRef } from "react";
import Paragraph from "./Paragraph";
import Heading from "./Heading";
import PhotoSelectUpload from "./PhotoSelectUpload";
import { Link } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import TagPlace from "./TagPlace";

const WriteBlog = () => {
	const [tag, setTag] = useState("");
	const [blogUi, setBlogUi] = useState([]);
	const [blog, setBlog] = useState({});
	const [title, setTitle] = useState("");
	const [finalData, setFinalData] = useState("");
	const [showTagSearch, setShowTagSearch] = useState(false);
	const [progressBar, setProgressBar] = useState(0);

	useEffect(() => {
		if (localStorage.getItem("blog-ui") === null) {
			localStorage.setItem("blog-ui", blogUi);
			setBlogUi([]);
		} else {
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
		if (localStorage.getItem("tag")) {
			let tagLocal = JSON.parse(localStorage.getItem("tag"));
			setTag(tagLocal);
		}
		if (localStorage.getItem("progress")) {
			let progressLocal = JSON.parse(localStorage.getItem("progress"));
			setProgressBar(progressLocal);
		}
	}, []);

	const handleBlog = async (val) => {
		await setBlogUi([
			...blogUi,
			{ type: val, pos: blogUi.length + 1, content: "" },
		]);
	};
	useEffect(() => {
		let dta = JSON.stringify(blogUi);

		blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));
	}, [blogUi]);

	const handleClear = () => {
		setBlogUi([]);
		setTitle("");
		setTag("");
		setProgressBar(0);
		localStorage.clear();
	};

	// const handlePreview = () => {
	// 	let d1 = JSON.parse(localStorage.getItem("blog_ui"));
	// 	let d2 = JSON.parse(localStorage.getItem("p"));
	// 	let d3 = { ...d1 };
	// };
	const handleTitleChange = async (e) => {
		await setTitle(() => e.target.value);
	};
	useEffect(() => {
		JSON.stringify(localStorage.setItem("title", title));
	}, [title]);
	useEffect(() => {
		if (tag !== "") {
			setProgressBar(33);
		}
		if (title !== "") {
			setProgressBar(66);
		}
		if (blogUi.length) {
			if (blogUi[0].content !== "") {
				setProgressBar(100);
			}
		}
	}, [title, tag, blogUi]);

	return (
		<div className='write-blog'>
			{showTagSearch && (
				<TagPlace
					setShowTagSearch={setShowTagSearch}
					setTag={setTag}
					setProgressBar={setProgressBar}
				/>
			)}
			<div className='progress-bar'>
				<div className='line-wrapper'>
					<div className='line'></div>
					<div
						className='second-line'
						style={{ width: `${progressBar}%` }}
					></div>
				</div>

				<div className='wrapper'>
					<div className='child'>
						<div className='icon'>1</div>
					</div>
					<div className='child'>
						<div className='icon'>2</div>
					</div>
					<div className='child'>
						<div className='icon'>3</div>
					</div>
					<div className='child'>
						<div className='icon'>4</div>
					</div>
				</div>
			</div>
			<div className='title tag-title'>
				{tag === "" ? (
					<button
						className='btn-secondary'
						onClick={() => setShowTagSearch(true)}
					>
						Tag a Place
					</button>
				) : (
					<div className='tag'>
						<p>{tag.desc}</p>
					</div>
				)}
			</div>
			{/* {progressBar >= 33 && ( */}
			<div className='title'>
				<label htmlFor='title'>Blog Title</label>
				<textarea
					type='text'
					rows='2'
					id='title'
					value={title}
					onChange={handleTitleChange}
				/>
			</div>
			{/* )} */}

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

			<div className='tools-buttons'>
				<div className='tool-selection'>
					<button onClick={() => handleBlog("1")}>
						<i className='fas fa-paragraph' data-name='Add Text'></i>
					</button>
					<button onClick={() => handleBlog("2")}>
						<i className='fas fa-image' data-name='Add Image'></i>
					</button>
				</div>
				<div className='clear'>
					<button className='btn-primary' onClick={handleClear}>
						Clear<i className='fas fa-times ml-1'></i>
					</button>
					<Link to='/blog/preview' className='btn-secondary-dark'>
						Preview<i className='fas fa-eye ml-1'></i>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default WriteBlog;
