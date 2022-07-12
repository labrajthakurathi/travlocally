import React from "react";
import ContributeSec from "./ContributeSec";
import Landing from "./Landing";
import MostViewedPlaces from "./MostViewedPlaces";
import PopularPlaces from "./PopularPlaces";
import TravLocallyFavPlaces from "./TravLocallyFavPlaces";

const Home = () => {
	return (
		<div>
			<Landing />
			<PopularPlaces />
			<MostViewedPlaces />

			<TravLocallyFavPlaces />
			<ContributeSec />
		</div>
	);
};

export default Home;
