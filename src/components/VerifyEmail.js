import React from "react";
import { getAuth } from "firebase/auth";

const VerifyEmail = ({ setVerify }) => {
	const auth = getAuth();

	setInterval(function () {
		auth.currentUser.reload();
		if (auth.currentUser.emailVerified) {
			setVerify(true);
		} else {
			setVerify(false);
		}
	}, 1000);

	return (
		<div className='verify-email'>
			<div className='content'>
				<div className='top-sec'>
					<img
						src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Femail-curv.png?alt=media&token=af1f247b-bb9e-45c6-b130-99c2889bb403'
						alt='Travlocally asset'
					/>
					<h1>VERIFY YOUR EMAIL</h1>
					<i className='fa fa-envelope-open-text'></i>
					<p>An Email with verification link has been sent to you</p>
				</div>
				<div className='bottom-sec'>
					<h1>HAVEN'T RECEIVED EMAIL YET ?</h1>
					<button className='btn-primary'>
						Send Again <i className='fa fa-paper-plane'></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default VerifyEmail;
