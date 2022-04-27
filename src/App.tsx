import { ReactElement } from 'react';
import Button from './assets/Button';
import userCalls from './services/users';
import journalCalls from './services/journals';
import './App.scss';

import CreateUserForm from './CreateUserForm';

const App = (): ReactElement | null => {
  const getUsersIndex = async (): Promise<void> => {
    const data = await userCalls.getUsers();
    console.log(data);
  };

  const getJournalsIndex = async (): Promise<void> => {
    const data = await journalCalls.getHabits();
    console.log(data);
  };

  return (
    <>
      <h1>Hello world!</h1>
      <Button
        className="callUsersIndex"
        type="button"
        text="Retrieve user index"
        clickHandler={getUsersIndex}
      />
      <Button
        className="callJournalsIndex"
        type="button"
        text="Retrieve journals index"
        clickHandler={getJournalsIndex}
      />
      <CreateUserForm />
    </>
  );
};

export default App;
