import React, { useEffect, useState, useContext } from "react";
import VerifyEmail from "./VerifyEmail";
import placeContext from "./context/place/placeContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Message from "./Message";
import User from "./User";

const Account = () => {
	const PlaceContext = useContext(placeContext);
	const { setAlert, state } = PlaceContext;

	const [verify, setVerify] = useState(null);
	useEffect(() => {
		const unsub = console.log("subbed");

		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const uid = user.uid;
				console.log(user.emailVerified);
				setVerify(user.emailVerified);
			} else {
				setAlert("Something Went Wrong");
			}
		});
		return () => console.log("unsubbed");
	}, []);
	return (
		<div>
			{state.alert !== null && <Message />}
			{verify !== null &&
				(verify ? <User /> : <VerifyEmail setVerify={setVerify} />)}
		</div>
	);
};

export default Account;
