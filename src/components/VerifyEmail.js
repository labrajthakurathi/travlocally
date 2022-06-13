import React, { useEffect } from "react";
import EmailCurv from "../images/email-curv.png";
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
					<img src={EmailCurv} alt='' />
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
