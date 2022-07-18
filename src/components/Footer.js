import React from "react";

const Footer = () => {
	return (
		<div className='footer'>
			<div className='find-sec'>
				<h4>Find Us</h4>
				<div className='icons'>
					<div className='icon-wrapper'>
						<i className='fab fa-instagram'></i>
					</div>
					<a
						href='https://pin.it/4CVUi1q'
						target='blink'
						className='icon-wrapper'
					>
						{" "}
						<i className='fab fa-pinterest'></i>
					</a>
				</div>
			</div>
			<div className='text-sec'>
				<div className='copyright'>
					<p>
						<i className='fas fa-copyright'></i>
						2022 TravLocally | All Right Reserved{" "}
						<i className='fas fa-lock'></i>
					</p>
				</div>
				<div className='developer'>
					<p>
						Designed & Developed with <i className='fas fa-heart'></i>
						by <a href='https://labraj.com/'>Lab Raj Thakurathi</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
