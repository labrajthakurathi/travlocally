import React from "react";
import { Link } from "react-router-dom";

const ContributeSec = () => {
	return (
		<div className='contribute-sec'>
			<h1>Wanna Contribute as a Local ?</h1>

			<a href='/add-places' className='btn-primary'>
				Add Places
			</a>
		</div>
	);
};

export default ContributeSec;
