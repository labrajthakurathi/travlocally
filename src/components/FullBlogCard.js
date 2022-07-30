import React, { useEffect, useContext } from "react";
import { Editor, EditorState, convertFromRaw } from "draft-js";
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
					{fullBlog.parent_pic ? (
						<img src={fullBlog.parent_pic} alt='' />
					) : (
						<div className='no-pic'>
							<i className='fas fa-user'></i>
						</div>
					)}

					<div className='name-time'>
						<p>{fullBlog.parent_name}</p>
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
