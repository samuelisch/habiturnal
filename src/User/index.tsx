import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../assets/Loading';
import JournalsList from '../Journals/JournalsList';
import { UserSchema } from '../reducers/usersSlice';
import userCalls from '../services/users';
import styles from './User.module.scss';
import ReactCountryFlag from 'react-country-flag';
import { format, parseISO } from 'date-fns';

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
      const date = parseISO(selectedUser.date_joined)
      const formattedJoinedDate = format(date, 'MMMM R')
      setDateJoined(formattedJoinedDate);
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
              fontSize: '2rem'
            }}
          />
        </div>
        <div className={styles.Date}>Joined: {}</div>
      </div>
      {/* // TODO: TABS FOR USER JOURNALS / SAVED JOURNALS - to change state and pass to journalsList */}
      <JournalsList filter='user' value={id} />
    </div>
  );
};

export default User;
