import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../assets/Button';
import userCalls from '../../services/users';
import styles from './Signup.module.scss';

const Signup = () => {
  const navigate = useNavigate();
  const [createUsername, setCreateUsername] = useState<string>('');
  const [createPassword, setCreatePassword] = useState<string>('');
  const [createLocation, setCreateLocation] = useState<string>('');

  const createNewUser = async (e: FormEvent) => {
    e.preventDefault();
    const newUser = {
      username: createUsername,
      password: createPassword,
      location: createLocation,
    };
    try {
      const createdUser = await userCalls.createUser(newUser);
      console.log(createdUser);

      // reset form
      setCreateUsername('');
      setCreatePassword('');
      setCreateLocation('');
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div>
      <h1>Sign up la</h1>
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
        <input
          aria-label="locationInput"
          type="text"
          value={createLocation}
          onChange={e => setCreateLocation(e.target.value)}
          placeholder="location"
        />
        <Button className="signupSubmit" type="submit" text="Create user" />
      </form>
      <span>Have an account? Don't create another. <span className={styles.Link} onClick={() => navigate('/login')}>Log in</span></span>
    </div>
  );
};

export default Signup;
