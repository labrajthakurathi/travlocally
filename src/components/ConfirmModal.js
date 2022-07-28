import React from "react";

const ConfirmModal = ({ setConfirm, id, place, deleteComment }) => {
	return (
		<div className='confirm-modal '>
			<div className='content'>
				<div className='content-header'>
					<i className='fas fa-times' onClick={() => setConfirm(false)}></i>
				</div>
				<div className='content-body'>
					<h3>Confirm Delete ?</h3>
					<div className='buttons'>
						<button className='btn-secondary' onClick={() => setConfirm(false)}>
							Cancel
						</button>
						<button
							className='btn-primary ml-1'
							onClick={() => deleteComment()}
						>
							Delete
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ConfirmModal;
