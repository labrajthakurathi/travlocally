import React, { useEffect, useState } from "react";

const Paragraph = ({ setBlogUi, blog, blogUi }) => {
	const [text1, setText1] = useState(blog);

	const handleChange = (e) => {
		setText1({ ...text1, content: e.target.value });
	};
	const handleSubmit = () => {
		if (text1.content != "") {
			let nu = blogUi.filter((ui) => ui.pos !== text1.pos);
			let newOne = [...nu, { ...text1 }];
			let sortedData = newOne.sort((a, b) => {
				return a.pos - b.pos;
			});
			setBlogUi(sortedData);
			let dta = JSON.stringify(sortedData);

			blogUi && JSON.stringify(localStorage.setItem("blog-ui", dta));
		}
	};

	return (
		<div className='title'>
			<label htmlFor='title'>Paragraph</label>
			<textarea
				type='text'
				rows='4'
				id='title'
				value={text1.content}
				onChange={handleChange}
				onBlur={handleSubmit}
			/>
		</div>
	);
};

export default Paragraph;
