import React, { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase";
import { db } from "../firebase";
import PicLoading from "./PicLoading";

const EditInfoModal = ({ setEdit, uid }) => {
	const [showUpload, setShowUpload] = useState(false);
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState({});
	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
		console.log(data);
	};

	const handleImageUpload = async (e) => {
		setLoading(true);
		const userRef = doc(db, "users", uid);

		let file = e.target.files[0];
		const storageRef = ref(storage, `profiles/${file.name}`);
		let upload = await uploadBytes(storageRef, file);
		let url = await getDownloadURL(storageRef);

		let update = await updateDoc(userRef, { profile_pic: url });

		// let file = e.target.files[0];
		// const storageRef = ref(storage, `profiles/${file.name}`);
		// let upload = await uploadBytes(storageRef, file);
		// let url = await getDownloadURL(storageRef);

		// let newOne = [
		// 	...nu,
		// 	{
		// 		...blog,
		// 		content: {
		// 			pic_url: url,
		// 			pic_by: false,
		// 		},
		// 	},
		// ];

		setLoading(false);
	};
	const handleUpload = () => {
		const userRef = doc(db, "users", uid);
		const update = updateDoc(userRef, {
			first_name: data.first_name,
			last_name: data.last_name,
		});
	};

	return (
		<div className='confirm-modal '>
			<div className='content'>
				<div className='content-header'>
					<i className='fas fa-times' onClick={() => setEdit(false)}></i>
				</div>
				<div className='content-body'>
					<form className='form'>
						<div className='input'>
							<label htmlFor=''>Profile Picture</label>
							{showUpload ? (
								<div className='upload-wrapper'>
									{loading ? (
										<PicLoading style='rounded' />
									) : (
										<>
											<label htmlFor='upload' className='btn-dark'>
												Upload<i className='fas fa-upload ml-1'></i>
											</label>

											<input
												type='file'
												accept='image/*'
												id='upload'
												onChange={handleImageUpload}
											/>
											<button
												className='btn-primary'
												onClick={() => setShowUpload(false)}
											>
												Cancel
											</button>
										</>
									)}
								</div>
							) : (
								<div className='pic-btn'>
									<img
										src='https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwyOTM1MDZ8MHwxfHNlYXJjaHw2fHx0cmF2ZWx8ZW58MHx8fHwxNjU3ODQxMjMw&ixlib=rb-1.2.1&q=80'
										alt=''
									/>
									<button
										className='btn-dark'
										onClick={() => setShowUpload(true)}
									>
										Change
									</button>
								</div>
							)}
						</div>
						<div className='input'>
							<label htmlFor=''>First Name</label>
							<input
								type='text'
								name='first_name'
								value={data.first_name}
								onChange={handleChange}
							/>
						</div>

						<div className='input'>
							<label htmlFor=''>Last Name</label>
							<input
								type='text'
								name='last_name'
								value={data.last_name}
								onChange={handleChange}
							/>
						</div>
					</form>

					<div className='buttons'>
						<button className='btn-primary' onClick={() => setEdit(false)}>
							Cancel
						</button>
						<button
							className='btn-secondary ml-1'
							onClick={() => handleUpload()}
						>
							submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditInfoModal;
