import React from "react";

const PicLoading = ({ style }) => {
	return (
		<div className={style ? "pic-loading category" : "pic-loading "}>
			<div className='pic-spinner'></div>
		</div>
	);
};

export default PicLoading;
