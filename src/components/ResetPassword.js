import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Loading from "./Loading";
import PicLoading from "./PicLoading";

const ResetPassword = ({ setReset }) => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	const handleReset = (e) => {
		e.preventDefault();
		setLoading(true);
		const auth = getAuth();

		sendPasswordResetEmail(auth, email)
			.then(() => {
				setLoading(false);
				setMessage({
					type: "success",
					headline: "Check Your Inbox",
					message:
						"An email with instructions has been sent to you. Please follow the instructions.",
				});
			})
			.catch((error) => {
				setLoading(false);
				let text =
					error.code === "auth/user-not-found"
						? "User Not Found"
						: "Something Went Wrong, please contact us.";
				setMessage({
					type: "fail",
					headline: "Password Reset Failed",
					message: text,
				});
				console.log(error.code);
				console.log(error.message);
				// ..
			});
	};

	return (
		<div className='confirm-modal' id='reset'>
			<div className='content'>
				<div className='content-header'>
					<i className='fas fa-times' onClick={() => setReset(false)}></i>
				</div>
				{loading ? (
					<PicLoading />
				) : (
					<div className='content-body'>
						{message ? (
							message.type === "success" ? (
								<>
									<h3>{message.headline}</h3>
									<p
										style={{
											backgroundColor: "rgb(53, 242, 195)",
											padding: "1rem",
										}}
									>
										{message.message}
									</p>
									<button
										className='btn-dark'
										onClick={() => {
											setEmail("");
											setReset(false);
										}}
									>
										Login
									</button>
								</>
							) : (
								<>
									{" "}
									<h3>{message.headline}</h3>
									<p style={{ backgroundColor: "#ff29a2" }}>
										{message.message}
									</p>
									<button
										className='btn-primary'
										onClick={() => {
											setMessage(null);
											setEmail("");
										}}
									>
										Try Again
									</button>
								</>
							)
						) : (
							<>
								<h3>Reset Password</h3>
								<form className='form' onSubmit={(e) => handleReset(e)}>
									<div className='input'>
										<label htmlFor=''>Email</label>
										<input
											type='email'
											name='email'
											value={email}
											onChange={handleChange}
											required
										/>
									</div>
									<button type='submit' className='btn-secondary'>
										Submit
									</button>
								</form>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default ResetPassword;
