import React, { useState, useContext, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage, db } from "../firebase";
import {
	getAuth,
	updateProfile,
	onAuthStateChanged,
	signOut,
} from "firebase/auth";
import placeContext from "./context/place/placeContext";
import PicLoading from "./PicLoading";
import Message from "./Message";

const EditInfoModal = ({ setEdit, user }) => {
	const PlaceContext = useContext(placeContext);
	const { state, removeUser, setUser } = PlaceContext;
	const [showUpload, setShowUpload] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState(false);
	const auth = getAuth();

	const updateUserState = async () => {
		onAuthStateChanged(auth, (currentUser) => {
			currentUser && setUser(currentUser);
			console.log(currentUser);
		});
	};

	const [data, setData] = useState({
		first_name: user.first_name,
		last_name: user.last_name,
	});
	const handleChange = (e) => {
		setData({
			...data,
			[e.target.name]: e.target.value,
		});
		console.log(data);
	};

	const handleImageUpload = async (e) => {
		setLoading(true);
		const userRef = doc(db, "users", user.uid);
		const auth = getAuth();

		let file = e.target.files[0];
		const storageRef = ref(storage, `profiles/${file.name}`);
		let upload = await uploadBytes(storageRef, file);
		let url = await getDownloadURL(storageRef);

		let update = await updateDoc(userRef, { profile_pic: url });

		updateProfile(auth.currentUser, {
			photoURL: url,
		})
			.then(() => {
				// Profile updated!
				// ...
			})
			.catch((error) => {
				// An error occurred
				// ...
			});

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
		await updateUserState();
		setLoading(false);
		setShowUpload(false);
	};
	const handleUpload = async () => {
		setLoading(true);
		const auth = getAuth();
		const userRef = doc(db, "users", user.uid);
		const update = updateDoc(userRef, {
			first_name: data.first_name,
			last_name: data.last_name,
		});
		updateProfile(auth.currentUser, {
			displayName: `${data.first_name} ${data.last_name}`,
		})
			.then(() => {
				// Profile updated!
				// ...
			})
			.catch((error) => {
				// An error occurred
				// ...
			});
		await updateUserState();

		setLoading(false);
		setMessage("Sucessfully Updated");
		setTimeout(() => {
			setMessage(false);
			setEdit(false);
		}, 3000);
	};

	return (
		<div className='confirm-modal' id='message'>
			{message && <Message setMessage={setMessage} message={message} />}
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
									<img src={user.profile_pic} alt='' />
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
								required
							/>
						</div>

						<div className='input'>
							<label htmlFor=''>Last Name</label>
							<input
								type='text'
								name='last_name'
								value={data.last_name}
								onChange={handleChange}
								required
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
