import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../assets/Button';
import userCalls from '../../services/users';
import styles from './Signup.module.scss';
import ReactFlagsSelect from 'react-flags-select';
import { create } from '../../reducers/usersSlice';
import { useAppDispatch } from '../../reducers/hooks';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      dispatch(create(createdUser))

      // reset form
      setCreateUsername('');
      setCreatePassword('');
      setCreateLocation('');

      navigate('/login');
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <div className={styles.Container}>
      <h1 className={styles.Header}>Sign up</h1>
      <form onSubmit={createNewUser} className={styles.Form}>
        <input
          aria-label="usernameInput"
          className={styles.Input}
          type="text"
          value={createUsername}
          onChange={e => setCreateUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          aria-label="passwordInput"
          className={styles.Input}
          type="password"
          value={createPassword}
          onChange={e => setCreatePassword(e.target.value)}
          placeholder="Password"
        />
        <ReactFlagsSelect 
          selected={createLocation}
          className={styles.Country}
          onSelect={(code: string) => setCreateLocation(code)}
          showSelectedLabel={true}
          showSecondarySelectedLabel={true}
          placeholder='Select country ...'
          searchable={true}
          alignOptionsToRight={false}
          fullWidth={false}
          disabled={false}
        />
        <Button className={styles.Button} type="submit" text="Create user" />
      </form>
      <span className={styles.Info}>Have an account? Don't create another. <span className={styles.Link} onClick={() => navigate('/login')}>Log in</span></span>
    </div>
  );
};

export default Signup;
