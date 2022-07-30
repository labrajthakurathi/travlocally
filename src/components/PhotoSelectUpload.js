import React, { useState } from "react";
import SearchImages from "./SearchImages";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import PicLoading from "./PicLoading";

const PhotoSelectUpload = ({ index, setBlogUi, blog, blogUi }) => {
	const [picMethod, setPicMethod] = useState("");
	const [loading, setLoading] = useState(false);
	const handlePicDelete = () => {
		console.log(blog);

		let nu = blogUi.filter((ui) => ui.pos !== blog.pos);
		console.log("nu", nu);

		let newOne = [...nu, { ...blog, content: "" }];

		console.log("new one", newOne);

		let sortedData = newOne.sort((a, b) => {
			return a.pos - b.pos;
		});
		console.log("sorted", sortedData);
		setBlogUi(sortedData);
		let dta = JSON.stringify(sortedData);

		blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));
		setPicMethod("");
	};

	const handleImageUpload = async (e) => {
		setLoading(true);

		let file = e.target.files[0];
		const storageRef = ref(storage, `blogs/${file.name}`);
		let upload = await uploadBytes(storageRef, file);
		let url = await getDownloadURL(storageRef);
		let nu = blogUi.filter((ui) => ui.pos !== blog.pos);
		let newOne = [
			...nu,
			{
				...blog,
				content: {
					pic_url: url,
					pic_by: false,
				},
			},
		];
		let sortedData = newOne.sort((a, b) => {
			return a.pos - b.pos;
		});

		setBlogUi(sortedData);
		let dta = JSON.stringify(sortedData);
		blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));

		setLoading(false);
	};
	return (
		<div className='title upload-select-pic'>
			<label htmlFor='pic'>Image</label>
			{loading ? (
				<PicLoading />
			) : (
				<>
					{blog.content ? (
						<div className='selected-pic-wrapper'>
							<img src={blog.content.pic_url} alt='' className='selected-pic' />
							<i className='fas fa-times' onClick={handlePicDelete}></i>
						</div>
					) : picMethod == "" ? (
						<div className='upload-buttons'>
							<div className='upload-wrapper'>
								<label htmlFor='upload' className='btn-dark'>
									Upload<i className='fas fa-upload ml-1'></i>
								</label>
								<input
									type='file'
									accept='image/*'
									id='upload'
									onChange={handleImageUpload}
								/>
							</div>
							<p>Or</p>
							<button
								className='btn-dark'
								onClick={() => setPicMethod("search")}
							>
								Search in Library<i className='fas fa-search ml-1'></i>
							</button>
						</div>
					) : (
						picMethod == "search" && (
							<SearchImages
								setPicMethod={setPicMethod}
								key={index}
								blog={blog}
								setBlogUi={setBlogUi}
								blogUi={blogUi}
							/>
						)
					)}
				</>
			)}
		</div>
	);
};

export default PhotoSelectUpload;
