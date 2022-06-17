import React, { useState } from "react";

const Landing = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => {
		setScreenWidth(window.innerWidth);
	});

	return (
		<div className='landing-page'>
			<div className='landing-section-1'>
				<div className='img'>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Fhome-bg.jpg?alt=media&token=d47ceaf0-7e15-43b9-a2fd-47d9b70de5e2'
						alt='TravLocally Hero picture'
					/>
				</div>
				<div className='overlay'></div>
				<div className='overlay-content'>
					<div className='texts'>
						<h1>LOCAL RECOMMENDATIONS FOR EVERY PLACE YOU GO</h1>
						<h4>
							Places to visit, things to do, and places to eat suggested by
							locals
						</h4>
					</div>

					<div className='home-search-bar'>
						<h2>Where You Wanna Go ?</h2>
						<div className='bar'>
							<input type='text' placeholder='Enter Destination' />

							<i className='fas fa-search-location'></i>
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
