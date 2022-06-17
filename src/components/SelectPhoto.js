import React, { useContext, useEffect, useState } from "react";
import placeContext from "./context/place/placeContext";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const SelectPhoto = () => {
	const navigate = useNavigate();
	const defaultImages = [
		"https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/places%2Fundraw_Images_re_0kll.png?alt=media&token=ac2c33e3-23db-40d4-8af3-a64eacf9092a",
		"https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/places%2Fundraw_Santa_visit_re_oiwr.png?alt=media&token=c625bf0a-8741-4d7c-87b2-459dc25e84ab",
		"https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/places%2Fundraw_best_place_r685.png?alt=media&token=a1129e8e-f5bd-4fd5-b0c7-deb8edc16f16",
		"https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/places%2Fundraw_connected_world_wuay.png?alt=media&token=a8135a62-3235-4dcb-a772-e2fc42af4e60",
		"https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/places%2Fundraw_quite_town_mg2q.png?alt=media&token=d83199c1-fad1-4e74-bbe9-837d15e5f627",
	];
	const PlaceContext = useContext(placeContext);
	const { state, uploadPlace } = PlaceContext;
	const [pics, setPics] = useState([]);
	const [selected, setSelected] = useState("");
	const [current, setCurrent] = useState("");
	const [fileName, setFileName] = useState("");
	useEffect(() => {
		let unsub = getPic();
		return () => unsub;
	}, []);
	const getPic = async () => {
		var axios = require("axios");
		var config = {
			method: "get",
			url: `https://api.unsplash.com/search/photos?query=${state.place.name}&page=1&per_page=10&client_id=f3_iwgnQbE-wALyhS6nnPUkjsmMWT9RKbRyJ34h1EJ0`,
			headers: {},
		};

		axios(config)
			.then(function (response) {
				setPics(response.data.results);
			})
			.catch(function (error) {
				console.log(error);
			});
	};

	const handleClick = (pic, index, def) => {
		if (def) {
			setSelected(index);
			setCurrent({ url: pic, selfUpload: false });
		} else {
			setSelected(index);

			setCurrent({ url: pic.urls.regular, selfUpload: false });
		}
	};
	const handleCancel = (pic, index) => {
		setSelected("");
		setCurrent("");
		setFileName("");
	};

	const selectUpload = (e) => {
		setFileName(URL.createObjectURL(e.target.files[0]));
		let selected = e.target.files[0];
		setCurrent({ url: selected, selfUpload: true });
	};
	const handleNext = async () => {
		let req = await uploadPlace(current);
		navigate("/add-items");
	};

	return (
		<div className='select-section'>
			{state.loading && <Loading />}
			<h3>
				Select a cover picture for <span>{state.place.desc}</span>
			</h3>
			{pics.length == 0 && (
				<p className='no-found'>
					0 relevant picture found, select one of below or upload !
				</p>
			)}

			{fileName == "" ? (
				<div className='select-pic-gallery'>
					{pics.length !== 0
						? pics.map((pic, index) => (
								<img
									src={pic.urls.small}
									alt='place name travlocally'
									// className={
									// 	index == selected ? "select-pic selected" : "select-pic"
									// }
									className={
										index == selected ? "select-pic selected" : "select-pic"
									}
									key={pic.urls.small}
									onClick={() => handleClick(pic, index)}
								/>
						  ))
						: defaultImages.map((pic, index) => (
								<img
									src={pic}
									alt=''
									className={
										index == selected ? "select-pic selected" : "select-pic"
									}
									key={pic}
									onClick={() => handleClick(pic, index, true)}
								/>
						  ))}
				</div>
			) : (
				<div className='pic-to-upload'>
					<img src={fileName} className='pic-to-upload' />
				</div>
			)}

			<div className='upload'>
				<h4>Or Upload From Your Device</h4>
				{fileName ? (
					<label htmlFor='upload' className='btn-dark'>
						Change <i className='fas fa-sync ml-1'></i>
					</label>
				) : (
					<label htmlFor='upload' className='btn-dark'>
						Upload<i className='fas fa-upload ml-1'></i>
					</label>
				)}

				<input type='file' id='upload' onChange={selectUpload} />
			</div>
			<div className='next'>
				<button
					className='btn-primary'
					disabled={current == ""}
					onClick={handleCancel}
				>
					Cancel <i className='fas fa-times'></i>
				</button>
				<button
					className='btn-secondary-dark'
					disabled={current == ""}
					onClick={handleNext}
				>
					Next <i className='fas fa-angle-right'></i>
				</button>
			</div>
		</div>
	);
};

export default SelectPhoto;
