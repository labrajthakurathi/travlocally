import React, { useContext, useState } from "react";
import placeContext from "../components/context/place/placeContext";
import Loading from "./Loading";
import Message from "./Message";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
	const navigate = useNavigate();
	const PlaceContext = useContext(placeContext);
	const { signUp, state, setAlert } = PlaceContext;
	const [name, setName] = useState(false);
	const [reDirect, setReDirect] = useState(false);
	const [data, setData] = useState({
		email: "",
		password: "",
		re_password: "",
		first_name: "",
		last_name: "",
	});

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.password === data.re_password) {
			setName(true);
		} else {
			setAlert("Password Didn't match");
			setData({
				...data,
				password: "",
				re_password: "",
			});
		}
	};
	const handleSignUp = async (e) => {
		e.preventDefault();
		let req = await signUp(data, setData, navigate);
		setData({
			email: "",
			password: "",
			re_password: "",
			first_name: "",
			last_name: "",
		});
		setName(false);
	};

	return (
		<div className='sign-up'>
			{state.loading && <Loading />}
			{state.alert !== null && <Message />}
			{name ? (
				<div className='content'>
					<h1>Your Info</h1>
					<form onSubmit={handleSignUp}>
						<div className='group'>
							<label htmlFor='email'>First Name</label>
							<input
								type='text'
								name='first_name'
								value={data.first_name}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='group'>
							<label htmlFor='password'>Last Name</label>
							<input
								type='text'
								name='last_name'
								value={data.last_name}
								onChange={handleChange}
								required
							/>
						</div>

						<button className='btn-secondary' type='submit'>
							Submit
						</button>
					</form>
				</div>
			) : (
				<div className='content'>
					<h1>Sign up</h1>
					<form onSubmit={handleSubmit}>
						<div className='group'>
							<label htmlFor='email'>Email</label>
							<input
								type='email'
								name='email'
								value={data.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className='group'>
							<label htmlFor='password'>Password</label>
							<input
								type='text'
								name='password'
								value={data.password}
								onChange={handleChange}
								required
								minLength='6'
							/>
						</div>
						<div className='group'>
							<label htmlFor='re_password'>Re-password</label>
							<input
								type='password'
								name='re_password'
								value={data.re_password}
								onChange={handleChange}
								required
								minLength='6'
							/>
						</div>

						<button className='btn-secondary' type='submit'>
							Submit
						</button>
					</form>
					<Link to='/login' className='link'>
						Login Instead ?
					</Link>
				</div>
			)}
		</div>
	);
};

export default SignUp;
