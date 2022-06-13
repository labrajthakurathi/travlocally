import React, { useState } from "react";
import HomeBg from "../images/home-bg.jpg";
import Curv1 from "../images/curv1.png";
import Curv2 from "../images/curv2.png";

const Landing = () => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	window.addEventListener("resize", () => {
		setScreenWidth(window.innerWidth);
	});

	return (
		<div className='landing-page'>
			<div className='landing-section-1'>
				<div className='img'>
					<img src={HomeBg} alt='' />
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
						<img src={Curv1} alt='' />
					) : (
						<img src={Curv2} alt='' />
					)}
				</div>
			</div>
		</div>
	);
};

export default Landing;
