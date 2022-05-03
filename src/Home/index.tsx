import { useEffect } from 'react';
import JournalsList from '../Journals/JournalsList';
import { useAppDispatch } from '../reducers/hooks';
import { fetchJournals } from '../reducers/journalsSlice';

import styles from './Home.module.scss';

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchJournals());
    })();
  }, []);

  return (
    <div className={styles.Container}>
      {/* add tab here to see all or near with flag of location */}
      <JournalsList />
    </div>
  );
};

export default Home;
