import React, { useState } from 'react';
import Button from '../assets/Button';
import userCalls from '../serverCalls/users';

const CreateUserForm = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const createNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { username, password, location };
    try {
      const createdUser = await userCalls.createUser(newUser);
      console.log(createdUser);

      // reset form
      setUsername('');
      setPassword('');
      setLocation('');
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data)
      }
    }
  };

  return (
    <form onSubmit={createNewUser}>
      <input
        aria-label="usernameInput"
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        aria-label="passwordInput"
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
      />
      <input
        aria-label="locationInput"
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="location"
      />
      <Button className="signupSubmit" type="submit" text="Create user" />
    </form>
  );
};

export default CreateUserForm;
