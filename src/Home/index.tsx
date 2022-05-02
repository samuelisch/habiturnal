import { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../assets/Button';
import CreateJournalForm from '../Journals/CreateJournalForm';
import JournalsList from '../Journals/JournalsList';
import { invalidate } from '../reducers/authSlice';
import { UserSchema } from '../reducers/usersSlice';
import { setToken } from '../services/login';
import userCalls from '../services/users';

export const UserContext = createContext<UserSchema | null>(null);

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserSchema | null>(null);
  const [showingForm, setShowingForm] = useState<boolean>(false);

  useEffect(() => {
    let fetching = true;
    (async () => {
      const tokenAuth = localStorage.getItem('token');
      const userAuth = localStorage.getItem('username');
      if (tokenAuth && userAuth) {
        try {
          const token = JSON.parse(tokenAuth);
          const username = JSON.parse(userAuth);
          setToken(token);
          const user = await userCalls.getUserByUsername(username);
          if (fetching) {
            setUser(user as UserSchema);
            setIsLoading(false);
          }
        } catch (err) {
          console.error(err);
          dispatch(invalidate());
          navigate('/');
        }
      }
    })();

    return () => {
      fetching = false;
    };
  }, [dispatch, navigate]);

  const logout = () => {
    dispatch(invalidate());
    navigate('/');
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <UserContext.Provider value={user}>
      {user ? <h1> Welcome, {user.username}!</h1> : ''}
      <Button className="logoutBtn" type="button" text="logout" clickHandler={logout} />
      {showingForm ? (
        <CreateJournalForm setShowingForm={setShowingForm} />
      ) : (
        <Button
          className="createBtn"
          type="button"
          text="New journal"
          clickHandler={() => setShowingForm(true)}
        />
      )}
      <JournalsList />
    </UserContext.Provider>
  );
};

export default Home;
