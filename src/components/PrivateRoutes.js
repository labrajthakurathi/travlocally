import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const PrivateRoutes = () => {
	const [isAuth, setIsAuth] = useState();
	const auth = getAuth();
	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			currentUser ? setIsAuth(true) : setIsAuth(false);
		});
	}, []);
	return isAuth ? <Outlet /> : <Login />;
};

export default PrivateRoutes;
