import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../assets/Loading';
import JournalsList from '../Journals/JournalsList';
import userCalls from '../services/users';
import styles from './User.module.scss';
import ReactCountryFlag from 'react-country-flag';
import { BsCalendar3 } from 'react-icons/bs';
import { formatDate } from '../utils/utilfunc';
import { UserContext } from '../App/ProtectedContainer';
import { UserSchema } from '../utils/types';

const User = () => {
  const { id } = useParams();
  const user = useContext(UserContext);
  const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);
  const [dateJoined, setDateJoined] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [tabFilter, setTabFilter] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string | number | null>(null);
  const [userTabClassName, setUserTabClassName] = useState<string>(styles.TabSelected);
  const [savedTabClassName, setSavedTabName] = useState<string>(styles.Tab);

  useEffect(() => {
    let fetching = true;
    if (id) {
      setTabFilter('user');
      setFilterValue(id);
      (async () => {
        try {
          const user = await userCalls.getUserById(id);
          if (fetching) {
            setSelectedUser(user as UserSchema);
          }
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      })();
    }

    return () => {
      fetching = false;
    };
  }, [id]);

  useEffect(() => {
    if (selectedUser) {
      const formattedDate = formatDate(selectedUser.date_joined);
      setDateJoined(formattedDate);
    }
  }, [selectedUser]);

  if (isLoading) {
    return <Loading />;
  }

  if (!selectedUser) {
    return <h1>No user found!</h1>;
  }

  const selectTab = (selection: string) => {
    if (selection === 'user') {
      setSavedTabName(styles.Tab);
      setUserTabClassName(styles.TabSelected);
      setTabFilter('user');
    } else {
      setUserTabClassName(styles.Tab);
      setSavedTabName(styles.TabSelected);
      setTabFilter('saved');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <div className={styles.UserMeta}>
        <div className={styles.Details}>
          <div className={styles.Username}>{selectedUser.username}</div>
          <ReactCountryFlag
            countryCode={selectedUser.location}
            svg
            style={{
              fontSize: '2.3rem',
            }}
          />
        </div>
        <div className={styles.Date}>
          <BsCalendar3 />
          <span className={styles.DateText}>Joined {dateJoined}</span>
        </div>
      </div>
      <div className={styles.TabContainer}>
        <div className={userTabClassName} onClick={() => selectTab('user')}>
          Journals
        </div>
        <div className={savedTabClassName} onClick={() => selectTab('saved')}>
          Saved
        </div>
      </div>
      <JournalsList filter={tabFilter} value={filterValue} />
    </div>
  );
};

export default User;
