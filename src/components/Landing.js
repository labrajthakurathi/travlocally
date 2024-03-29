import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import Search from "./Search";
import { doc } from "firebase/firestore";
import { db, onSnapshot } from "../firebase";

const Landing = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);
	const [loading, setLoading] = useState(true);
	const [home, setHome] = useState("");

	window.addEventListener("resize", () => {
		setScreenWidth(window.innerWidth);
	});
	const handleLoad = () => {
		setLoading(false);
	};
	useEffect(() => {
		getHome();
	}, []);
	const getHome = async () => {
		const unsub = await onSnapshot(doc(db, "app", "home"), (doc) => {
			setHome(doc.data());
		});
	};

	return (
		<div className='landing-page'>
			{loading && <Loading />}

			<div className='landing-section-1'>
				<div className='img'>
					<img
						src={home.pic}
						alt='TravLocally Hero picture'
						onLoad={handleLoad}
					/>
				</div>
				<div className='overlay'></div>
				<div className='overlay-content'>
					<div className='texts'>
						<h1>LOCAL RECOMMENDATIONS FOR PLACES YOU WANNA VISIT</h1>
						<h4>
							Places to visit, things to do, and places to eat suggested by
							locals in single place
						</h4>
					</div>

					<div className='home-search-bar'>
						<h2>Where You Wanna Go ?</h2>
						<div className='bar'>
							<Search />
						</div>
					</div>
				</div>
				<div className='curvy'>
					{screenWidth < 1040 ? (
						<img
							src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Fcurv1.png?alt=media&token=8249cad3-7838-4c16-aa7a-826a9a62591d'
							alt='TravLocally'
						/>
					) : (
						<img
							src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Fcurv2.png?alt=media&token=dc901341-bf31-45df-9e96-c43d853caf2e'
							alt='Travlocally'
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default Landing;
