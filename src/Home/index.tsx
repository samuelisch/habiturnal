import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App/ProtectedContainer';
import JournalsList from '../Journals/JournalsList';
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
  }, []);

  return (
    <>
      {/* add tab here to see all or near with flag of location */}
      <JournalsList />
    </>
  );
};

export default Home;
