import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import Blog from "../images/blog.jpg";
import placeContext from "./context/place/placeContext";
import Loading from "./Loading";

const FullBlogCard = ({ blog, fullBlog }) => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;

	useEffect(() => {
		window.scrollTo(0, 0);
		getDat();
	}, []);
	const getDat = async () => {
		let today = new Date().toString().split(" ").splice(1, 3).join(" ");
	};

	return (
		<div className='full-blog-card'>
			{blog == undefined && <Loading />}
			<div className='blog-card-header'>
				<div className='img-name'>
					<img src={Blog} alt='' />

					<div className='name-time'>
						<p>Lab Raj Thakurathi</p>
						<p>{fullBlog.read_time} minutes read</p>
					</div>
				</div>
				<div className='date'>
					<p>{fullBlog.posted_on}</p>
				</div>
			</div>
			<div className='blog-title'>
				<h1>{fullBlog.title}</h1>
			</div>
			<div className='blog-body'>
				{blog &&
					blog.map((item, index) => {
						if (item.type === "1") {
							let contentState = convertFromRaw(item.content);
							const editorState = EditorState.createWithContent(contentState);
							return (
								<Editor editorState={editorState} readOnly={true} key={index} />
							);
						} else {
							return (
								<div className='blog-img' key={index}>
									<img src={item.content.pic_url} alt='' key={index} />
									<small>
										Pictured by <b>{item.content.pic_by}</b>, facilited by{" "}
										<a href='https://unsplash.com/' target='blink'>
											Unsplash
										</a>
									</small>
								</div>
							);
						}
					})}
			</div>
		</div>
	);
};

export default FullBlogCard;

// <div className='blog-body'>
// {blog &&
// 	blog.map((item, index) => {
// 		if (item.type === "1") {
// 			return item.content.map((line) => {
// 				if (line.type === "unstyled") {
// 					return <p>{line.text}</p>;
// 				} else if (line.type === "header-one") {
// 					return <h1> {line.text}</h1>;
// 				} else if (line.type === "header-two") {
// 					return <h2> {line.text}</h2>;
// 				} else if (line.type === "header-three") {
// 					return <h3> {line.text}</h3>;
// 				} else if (line.type === "unordered-list-item") {
// 					return <li> {line.text}</li>;
// 				} else if (line.type === "ordered-list-item") {
// 					return (
// 						<ol>
// 							<li> {line.text}</li>
// 						</ol>
// 					);
// 				} else if (line.type === "blockquote") {
// 					return (
// 						<blockquote>
// 							<p>{line.text}</p>
// 						</blockquote>
// 					);
// 				}
// 			});
// 		} else {
// 			return (
// 				<div className='blog-img'>
// 					<img src={item.content.pic_url} alt='' key={index} />
// 				</div>
// 			);
// 		}
// 	})}

// </div>
