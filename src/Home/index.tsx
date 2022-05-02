import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App/ProtectedContainer';
import Button from '../assets/Button';
import JournalsList from '../Journals/JournalsList';
import { invalidate } from '../reducers/authSlice';
import { useAppDispatch } from '../reducers/hooks';
import { fetchJournals } from '../reducers/journalsSlice';

const Home = () => {
  const user = useContext(UserContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      dispatch(fetchJournals());
    })();
  }, [dispatch]);

  const logout = () => {
    dispatch(invalidate());
    navigate('/login');
  };

  return (
    <div>
      {user ? <h1> Welcome, {user.username}!</h1> : ''}
      <Button className="logoutBtn" type="button" text="logout" clickHandler={logout} />
      <Button className="createJournal" type="button" text="create new" clickHandler={() => navigate('/journals/create')} />
      <JournalsList />
    </div>
  );
};

export default Home;
