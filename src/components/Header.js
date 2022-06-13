import React, { useState, useContext, useEffect } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import Logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";

import placeContext from "./context/place/placeContext";

const Header = () => {
	const PlaceContext = useContext(placeContext);
	const { state, removeUser, setUser } = PlaceContext;
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const auth = getAuth();
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			currentUser ? setUser(currentUser) : removeUser();
		});
	}, []);

	const handleLogout = () => {
		signOut(auth)
			.then(() => {})
			.catch((error) => {
				console.log(error);
			});
		removeUser();
		navigate("/");
	};

	return (
		<div className='header'>
			<div className={open ? "menu show" : "menu"}>
				<ul>
					<li>Home</li>
					<li>Contribute</li>
				</ul>
			</div>

			<div
				className={open ? "burger-icon open" : "burger-icon"}
				onClick={() => setOpen(!open)}
			>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<Link to='/' className='logo'>
				<img src={Logo} alt='' />
			</Link>
			{state.user && (
				<div
					className={show ? "user-logo-wrapper reveal" : "user-logo-wrapper"}
				>
					<div className='user-logo' onClick={() => setShow(!show)}>
						<i className={show ? "fas fa-times" : "fas fa-user"}></i>
					</div>
					<i className='fa fa-sort-down'></i>

					<div className='user-menu'>
						<ul>
							<Link to='/me'>
								<li onClick={() => setShow(!show)}>
									<p>My Account</p>
									<i className='fas fa-user'></i>
								</li>
							</Link>
							<li onClick={() => setShow(!show)}>
								<p>Edit Account</p>
								<i className='fas fa-edit'></i>
								<i className='fas fa-pen-to-square'></i>
							</li>

							<li onClick={(() => setShow(!show), handleLogout)}>
								<p>Logout</p> <i className='fas fa-sign-out-alt '></i>
							</li>
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};

export default Header;
