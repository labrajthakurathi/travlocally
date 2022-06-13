import React, { useEffect, useContext } from "react";
import UserCurv from "../images/user-curv.png";
import Card2 from "./Card2";

const User = () => {
	return (
		<div className='user'>
			<div className='content'>
				<div className='top'>
					<img src={UserCurv} alt='' />

					<div className='search-bar'>
						<h1 className='heading'>EXPLORE</h1>
						<div className='search'>
							<input
								type='text'
								placeholder='Enter city,state or country'
								// onChange={handleChange}
								// ref={searchBar}
							/>
							<i className='fas fa-search-location'></i>
						</div>

						{/* {barFocus ? (
							<i
								className='fas fa-times'
								onClick={handleUnFocus}
								style={{ color: "#ff29a2" }}
							></i>
						) : (
							<i className='fas fa-search-location'></i>
						)} */}
					</div>
				</div>
				<div className='bottom-sec'>
					<div className='section section-1'>
						<h2>Saved Places</h2>
						<div className='top-places-cards'>
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
						</div>
					</div>
					<div className='section section-2'>
						<h2>Saved Places</h2>
						<div className='top-places-cards'>
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
							<Card2 />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
