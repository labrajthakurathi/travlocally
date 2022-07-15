import React from "react";

const Footer = () => {
	return (
		<div className='footer'>
			<div className='find-sec'>
				<h4>Find Us</h4>
				<div className='icons'>
					<div className='icon-wrapper'>
						<i class='fab fa-instagram'></i>
					</div>
					<a
						href='https://pin.it/4CVUi1q'
						target='blink'
						className='icon-wrapper'
					>
						{" "}
						<i class='fab fa-pinterest'></i>
					</a>
				</div>
			</div>
			<div className='text-sec'>
				<div className='copyright'>
					<p>
						<i class='fas fa-copyright'></i>
						2022 TravLocally | All Right Reserved <i class='fas fa-lock'></i>
					</p>
				</div>
				<div className='developer'>
					<p>
						Designed & Developed with <i class='fas fa-heart'></i>
						by <a href='https://labraj.com/'>Lab Raj Thakurathi</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
