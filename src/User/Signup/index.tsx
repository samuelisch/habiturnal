import React, { FormEvent, useState } from 'react';
import Button from '../../assets/Button';
import userCalls from '../../services/users';

const Signup = () => {
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
    <>
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
    </>
  );
};

export default Signup;
