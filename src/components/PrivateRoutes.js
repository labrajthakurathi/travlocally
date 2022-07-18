import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Login from "./Login";

import placeContext from "./context/place/placeContext";

const PrivateRoutes = () => {
	const PlaceContext = useContext(placeContext);
	const { state } = PlaceContext;

	console.log(state.user);

	return state.user ? <Outlet /> : <Login />;
};

export default PrivateRoutes;
