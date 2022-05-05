import { useContext, useState } from 'react';
import ReactCountryFlag from 'react-country-flag';
import { UserContext } from '../App/ProtectedContainer';
import JournalsList from '../Journals/JournalsList';

import styles from './Home.module.scss';

const Home = () => {
  const user = useContext(UserContext);
  const [tabFilter, setTabFilter] = useState<string | null>('');
  const [filterValue, setFilterValue] = useState<string | null>('');
  const [allTabClassName, setAllTabClassName] = useState<string>(styles.TabSelected);
  const [nearbyTabClassName, setNearbyTabName] = useState<string>(styles.Tab);

  const selectTab = (selection: string) => {
    if (selection === 'all') {
      setNearbyTabName(styles.Tab);
      setAllTabClassName(styles.TabSelected);
      setTabFilter(null);
      setFilterValue(null);
    } else {
      setAllTabClassName(styles.Tab);
      setNearbyTabName(styles.TabSelected);
      if (user) {
        setTabFilter('nearby');
        setFilterValue(user.location);
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.TabContainer}>
        <div className={allTabClassName} onClick={() => selectTab('all')}>
          All
        </div>
        <div className={nearbyTabClassName} onClick={() => selectTab('nearby')}>
          <span className={styles.Nearby}>Nearby </span>
          <ReactCountryFlag countryCode={user.location} />
        </div>
      </div>
      <JournalsList filter={tabFilter} value={filterValue} />
    </div>
  );
};

export default Home;
