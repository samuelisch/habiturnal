import React, { FormEvent, useState } from 'react';
import Button from '../assets/Button';
import loginCalls from '../services/login';
import userCalls from '../services/users';
import { useDispatch, useSelector } from 'react-redux';
import { fetch, success, fail, selectAuthData, AuthSchema } from '../reducers/authSlice';

const CreateUserForm = () => {
  const dispatch = useDispatch();
  const tokens = useSelector(selectAuthData) as AuthSchema;
  const [createUsername, setCreateUsername] = useState<string>('');
  const [createPassword, setCreatePassword] = useState<string>('');
  const [loginUsername, setLoginUsername] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');

  const createNewUser = async (e: FormEvent) => {
    e.preventDefault();
    const newUser = { username: createUsername, password: createPassword };
    try {
      const createdUser = await userCalls.createUser(newUser);
      console.log(createdUser);

      // reset form
      setCreateUsername('');
      setCreatePassword('');
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  const loginUser = async (e: FormEvent) => {
    e.preventDefault();
    const credentials = { username: loginUsername, password: loginPassword };
    dispatch(fetch());
    try {
      const tokens = await loginCalls.loginUser(credentials);
      console.log(tokens);
      dispatch(success(tokens));
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
      dispatch(fail(error.response));
    }
  };

  return (
    <>
      <form onSubmit={createNewUser}>
        <input
          aria-label="usernameInput"
          type="text"
          value={createUsername}
          onChange={e => setCreateUsername(e.target.value)}
          placeholder="username"
        />
        <input
          aria-label="passwordInput"
          type="text"
          value={createPassword}
          onChange={e => setCreatePassword(e.target.value)}
          placeholder="password"
        />
        <Button className="signupSubmit" type="submit" text="Create user" />
      </form>
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

export default CreateUserForm;
