import React, { useState, useContext, useEffect } from "react";
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import placeContext from "./context/place/placeContext";

const Header = () => {
	const PlaceContext = useContext(placeContext);
	const { state, removeUser, setUser } = PlaceContext;
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);
	const [width, setWidth] = useState(window.innerWidth);
	const auth = getAuth();
	const navigate = useNavigate();

	useEffect(() => {
		onAuthStateChanged(auth, (currentUser) => {
			currentUser ? setUser(currentUser) : removeUser();
		});
	}, []);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});

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
			<Link to='/' className='logo'>
				<img
					src='https://firebasestorage.googleapis.com/v0/b/travlocally-34376.appspot.com/o/app%2Flogo%20%20(3).png?alt=media&token=c2c5dc99-5661-4036-81df-d5cb3b649c23'
					alt='TravLocally Logo'
				/>
			</Link>

			<div className='icon-menu-wrapper'>
				{width < 1080 ? (
					<>
						<div className={open ? "menu show" : "menu"}>
							<Link to='/' onClick={() => setOpen(false)}>
								Home
							</Link>
							<Link to='/blogs' onClick={() => setOpen(false)}>
								Blogs
							</Link>

							<Link to='/add-places' onClick={() => setOpen(false)}>
								Contribute
							</Link>

							<Link to='/login' onClick={() => setOpen(false)}>
								Login
							</Link>
						</div>
						<div
							className={open ? "burger-icon open" : "burger-icon"}
							onClick={() => setOpen(!open)}
						>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</>
				) : (
					<div className='menu-desk'>
						<Link to='/' onClick={() => setOpen(false)}>
							Home
						</Link>
						<Link to='/blogs' onClick={() => setOpen(false)}>
							Blogs
						</Link>

						<Link to='/add-places' onClick={() => setOpen(false)}>
							Contribute
						</Link>

						<Link to='/login' onClick={() => setOpen(false)}>
							Login
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
