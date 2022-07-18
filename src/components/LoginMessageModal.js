import React from "react";
import { Link } from "react-router-dom";

const LoginMessageModal = ({ setShowModal }) => {
	return (
		<div className='confirm-modal '>
			<div className='content'>
				<div className='content-header'>
					<i className='fas fa-times' onClick={() => setShowModal(false)}></i>
				</div>
				<div className='content-body'>
					<h3>Login Required</h3>
					<div className='buttons'>
						<button className='btn-primary' onClick={() => setShowModal(false)}>
							Cancel
						</button>
						<Link to='/login' className='btn-secondary ml-1'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginMessageModal;
