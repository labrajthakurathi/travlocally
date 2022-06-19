import React, { useState } from "react";

const SearchImages = ({ setPicMethod, setBlogUi, blog, blogUi }) => {
	const [text1, setText1] = useState(blog);
	const [pics, setPics] = useState([]);
	const [searchText, setSearchText] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		var axios = require("axios");
		var config = {
			method: "get",
			url: `https://api.unsplash.com/search/photos?query=${searchText}&page=1&per_page=12&client_id=f3_iwgnQbE-wALyhS6nnPUkjsmMWT9RKbRyJ34h1EJ0`,
			headers: {},
		};

		axios(config)
			.then(function (response) {
				response.data.total > 0
					? setPics(response.data.results)
					: setPics("No result found");

				console.log(response);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleImageClick = async (pic) => {
		await setText1({
			...text1,
			content: { pic_url: pic.urls.regular, pic_by: pic.user.username },
		});
		let text2 = {
			...text1,
			content: { pic_url: pic.urls.regular, pic_by: pic.user.username },
		};
		let nu = blogUi.filter((ui) => ui.pos !== text1.pos);
		let newOne = [...nu, { ...text2 }];
		let sortedData = newOne.sort((a, b) => {
			return a.pos - b.pos;
		});
		setBlogUi(sortedData);
		let dta = JSON.stringify(sortedData);

		blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));
	};

	return (
		<div className='search-image-modal'>
			<i className='fas fa-times' onClick={() => setPicMethod("")}></i>
			<div className='search-image-section'>
				<div className='search-bar'>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							required
							minLength={2}
							value={searchText}
							onChange={(e) => setSearchText(e.target.value)}
							placeholder='Enter search term'
						/>
						<button type='submit'>
							<i className='fas fa-search'></i>
						</button>
					</form>
				</div>
				{pics.length > 0 && pics !== "No result found" && <h4>Choose Image</h4>}
				<div className='gallery'>
					{pics == "No result found" ? (
						<p>No result Found</p>
					) : (
						pics.length > 0 &&
						pics.map((pic, index) => (
							<img
								src={pic.urls.regular}
								className='search-image-select'
								onClick={() => handleImageClick(pic)}
								key={index}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default SearchImages;
