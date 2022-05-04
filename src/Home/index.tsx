import JournalsList from '../Journals/JournalsList';

import styles from './Home.module.scss';

const Home = () => {
  return (
    <div className={styles.Container}>
      {/* add tab here to see all or near with flag of location */}
      <JournalsList />
    </div>
  );
};

export default Home;
