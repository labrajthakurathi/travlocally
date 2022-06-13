import React from "react";
import ContributeSec from "./ContributeSec";
import Landing from "./Landing";
import NearbyPlaces from "./NearbyPlaces";
import TopPlaces from "./TopPlaces";

const Home = () => {
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
