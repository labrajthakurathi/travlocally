import React, { useState } from "react";
import ContributeSec from "./ContributeSec";
import Landing from "./Landing";
import NearbyPlaces from "./NearbyPlaces";
import TopPlaces from "./TopPlaces";

const Home = () => {
	const [load, setLoad] = useState(true);

	return (
		<div>
			<Landing />
			<TopPlaces />
			<NearbyPlaces />
			<ContributeSec />
		</div>
	);
};

export default Home;
