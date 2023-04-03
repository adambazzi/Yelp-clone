import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./index.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const [disablButton, setDisableButton] = useState(true)

	useEffect(() => {
		if (email.length && username.length && password.length && confirmPassword.length)  setDisableButton(false)
	  }, [email, username, password, confirmPassword])

	  useEffect(() => {
		if (!email.length || !username.length || !password.length || !confirmPassword.length)  setDisableButton(true)
	  }, [email, username, password, confirmPassword])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div id='sign-up'>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit} id='sign-up-form'>
				<p>
					{errors.length ? 'Invalid Credentials' : ''}
				</p>
				<label>
					<input
						type="text"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
						required
					/>
				</label>
				<label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Username'
						required
					/>
				</label>
				<label>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					<input
						type="password"
						placeholder="Confirm Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit" id='sign-in-button' disabled={disablButton}>Sign Up</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
