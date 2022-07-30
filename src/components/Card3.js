import React from "react";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

const Card3 = ({ place, type }) => {
	const storage = getStorage();
	const navigate = useNavigate();
	const handleVisit = () => {
		type === "review"
			? navigate(`/admin/place/${place.place_id}`)
			: navigate(`/place/${place.place_id}`);
	};
	const handleEdit = () => {
		localStorage.setItem("edit_place_id", place.place_id);
		navigate("/edit-place");
	};

	const handleApprove = async () => {
		const docRef = doc(db, "places", place.place_id);
		let finalData = {
			...place,
			reviewed: true,
			in_review: false,
		};
		let req = await setDoc(docRef, { ...finalData });
		let del = await deleteDoc(doc(db, "review_places", place.place_id));
		console.log(place);
	};

	const handleDeny = async () => {
		if (place.self_upload === true) {
			const imageRef = ref(storage, place.picture);
			deleteObject(imageRef)
				.then(() => {
					// File deleted successfully
				})
				.catch((error) => {
					console.log(error);
				});
		}

		place.est_eat.forEach(async (eat) => {
			await deleteDoc(doc(db, "establishment", eat));
		});
		place.est_visit.forEach(async (visit) => {
			await deleteDoc(doc(db, "establishment", visit));
		});
		place.tips.forEach(async (tip) => {
			await deleteDoc(doc(db, "establishment", tip));
		});
		let del = await deleteDoc(doc(db, "review_places", place.place_id));
	};

	return (
		<div className='card-3'>
			<img src={place.picture} alt='' />
			<div
				className={
					type === "review" ? "card-3-content review" : "card-3-content"
				}
			>
				<div className='card-name'>
					<h4 className={place.desc.length > 24 ? "big-text" : ""}>
						{place.desc}{" "}
					</h4>
				</div>
				{type === "review" ? (
					<div className='buttons'>
						<div className='first'>
							<button className='btn-light' onClick={handleDeny}>
								Deny
							</button>
							<button className='btn-secondary' onClick={handleApprove}>
								Approve
							</button>
						</div>
						<button className='btn-primary' onClick={handleVisit}>
							Visit
						</button>
					</div>
				) : (
					<div className='buttons'>
						<button className='btn-light' onClick={handleEdit}>
							Edit
						</button>
						<button className='btn-secondary' onClick={handleVisit}>
							Visit
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Card3;
