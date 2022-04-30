import React, { FormEvent, useState } from 'react';
import Button from '../assets/Button';
import loginCalls, { setToken, TokenSchema } from '../services/login';
import { useDispatch } from 'react-redux';
import { fetch, success, fail } from '../reducers/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const credentials = { username: loginUsername, password: loginPassword };
    dispatch(fetch());
    try {
      const tokens = await loginCalls.loginUser(credentials);
      if (tokens) {
        dispatch(success(tokens));
        localStorage.setItem('username', JSON.stringify(loginUsername));
        setToken(tokens as TokenSchema);
      }
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
      dispatch(fail(error.response));
    }
  };

  return (
    <>
      <h1>Log in leh</h1>
      <form onSubmit={loginUser}>
        <input
          aria-label="usernameInput"
          type="text"
          value={loginUsername}
          onChange={e => setLoginUsername(e.target.value)}
          placeholder="username"
        />
        <input
          aria-label="passwordInput"
          type="text"
          value={loginPassword}
          onChange={e => setLoginPassword(e.target.value)}
          placeholder="password"
        />
        <Button className="loginSubmit" type="submit" text="Login user" />
      </form>
    </>
  );
};

export default Login;
