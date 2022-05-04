import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../assets/Loading';
import JournalsList from '../Journals/JournalsList';
import { UserSchema } from '../reducers/usersSlice';
import userCalls from '../services/users';
import styles from './User.module.scss';
import ReactCountryFlag from 'react-country-flag';
import { BsCalendar3 } from 'react-icons/bs';
import { formatDate } from '../utils/utilfunc';

const User = () => {
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);
  const [dateJoined, setDateJoined] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let fetching = true;
    if (id) {
      (async () => {
        try {
          const user = await userCalls.getUserById(id);
          if (fetching) {
            console.log(user);
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
  }, [selectedUser])

  if (isLoading) {
    return <Loading />;
  }

  if (!selectedUser) {
    return <h1>No user found!</h1>;
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
              fontSize: '2.3rem'
            }}
          />
        </div>
        <div className={styles.Date}>
            <BsCalendar3 />
            <span className={styles.DateText}>Joined {dateJoined}</span>
        </div>
      </div>
      {/* // TODO: TABS FOR USER JOURNALS / SAVED JOURNALS - to change state and pass to journalsList */}
      <JournalsList filter='user' value={id} />
    </div>
  );
};

export default User;
