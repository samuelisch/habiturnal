import React, { FormEvent, useEffect, useState } from 'react';
import Button from '../assets/Button';
import loginCalls, { setToken, TokenSchema } from '../services/login';
import { useDispatch } from 'react-redux';
import { fetch, success, fail, populate, invalidate } from '../reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.scss';
import userCalls from '../services/users';

export interface DecodedTokenSchema {
  token_type: string;
  exp: number | string;
  iat: number | string;
  jti: string;
  user_id: number | string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  useEffect(() => {
    const tokenAuth = localStorage.getItem('token');
    if (tokenAuth) {
      const token = JSON.parse(tokenAuth);
      dispatch(populate(token));
      navigate('/home');
    } else {
      dispatch(invalidate());
    }
  }, [dispatch, navigate]);

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const credentials = { username: loginUsername, password: loginPassword };
    dispatch(fetch());
    try {
      const tokens = await loginCalls.loginUser(credentials);
      if (tokens) {
        dispatch(success(tokens));
        const decodedToken = await userCalls.getJwtDetails()
        localStorage.setItem('tokenDetails', JSON.stringify(decodedToken as DecodedTokenSchema));
        setToken(tokens as TokenSchema);
        navigate('/home');
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
          className={styles.Input}
          type="text"
          value={loginUsername}
          onChange={e => setLoginUsername(e.target.value)}
          placeholder="username"
        />
        <input
          aria-label="passwordInput"
          className={styles.Input}
          type="text"
          value={loginPassword}
          onChange={e => setLoginPassword(e.target.value)}
          placeholder="password"
        />
        <Button className="loginSubmit" type="submit" text="Login user" />
      </form>
      <span>
        Don't have an account?{' '}
        <span className={styles.Link} onClick={() => navigate('/signup')}>
          Sign up with us
        </span>
      </span>
    </>
  );
};

export default Login;
