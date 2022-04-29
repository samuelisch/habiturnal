import { ReactElement } from 'react';
import Button from './assets/Button';
import journalCalls from './services/journals';
import './App.scss';

import CreateUserForm from './CreateUserForm';
import { fetchUsers, selectAllUsers } from './reducers/usersSlice';
import { useAppDispatch, useAppSelector } from './reducers/hooks';

const App = (): ReactElement | null => {
  const dispatch = useAppDispatch()
  const usersLoaded = useAppSelector(selectAllUsers);
  const getUsersIndex = async (): Promise<void> => {
    await dispatch(fetchUsers())
  };

  const viewUsers = async () => {
    console.log(usersLoaded)
  }

  const viewUserById = (userId: string | number) => {
    console.log(usersLoaded.find(user => user.id === userId))
  }

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
        className="viewUsers"
        type="button"
        text="View users in store"
        clickHandler={viewUsers}
      />
      <Button
        className="viewUser"
        type="button"
        text="View user by id"
        clickHandler={() => viewUserById(8)}
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
