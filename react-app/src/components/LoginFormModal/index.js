import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./index.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [disableButton, setDisableButton] = useState(true)
  const { closeModal } = useModal();

  useEffect(() => {
    if (email.length >= 4 && password.length >= 6)  setDisableButton(false)
  }, [password, email])

  useEffect(() => {
    if (email.length < 4 || password.length < 6)  setDisableButton(true)
  }, [password, email])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const demoLogIn = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  }

  return (
    <div className="log-in">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className='log-in-form'>
        <p>
					{errors.length ? 'Invalid Credentials' : ''}
				</p>
        <label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            id='username'
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
        <button type="submit" id='log-in-button' disabled={disableButton}>Log In</button>
        <button onClick={demoLogIn} className='curs' id='log-in-demo-user'>Demo User Login</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
