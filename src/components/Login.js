import React, { useState, useContext } from "react";
import placeContext from "../components/context/place/placeContext";
import { useNavigate, Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Message from "./Message";
import Loading from "./Loading";

const Login = () => {
	const PlaceContext = useContext(placeContext);
	const { state, setAlert, setLoading, removeLoading } = PlaceContext;
	const navigate = useNavigate();
	const [data, setData] = useState({ email: "", password: "" });
	const auth = getAuth();

	const handleChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading();

		try {
			const loginReq = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password
			);
			navigate("/me");
			removeLoading();
		} catch (err) {
			let message = "";
			err.code == "auth/user-not-found"
				? (message = "Account Doesn't Exists")
				: err.code == "auth/wrong-password"
				? (message = "Password Didn't Matched")
				: (message = "Something Went Wrong");
			removeLoading();
			setAlert(message);
			console.log(err.code);
		}
	};
	return (
		<div className='sign-up'>
			{state.alert !== null && <Message />}
			{state.loading == true && <Loading />}

			<div className='content'>
				<h1>Login</h1>

				<form onSubmit={handleSubmit}>
					<div className='group'>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							name='email'
							id='email'
							onChange={handleChange}
							value={data.email}
						/>
					</div>
					<div className='group'>
						<label htmlFor='password'>Password</label>
						<input
							type='text'
							name='password'
							id='password'
							onChange={handleChange}
							value={data.password}
						/>
					</div>

					<button className='btn-secondary' type='submit'>
						Submit
					</button>
				</form>
				<Link to='/sign-up' className='link'>
					Sign-Up Instead ?
				</Link>
			</div>
		</div>
	);
};

export default Login;
