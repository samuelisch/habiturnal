import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../assets/Button';
import Loading from '../assets/Loading';
import JournalsList from '../Journals/JournalsList';
import { UserSchema } from '../reducers/usersSlice';
import userCalls from '../services/users';
import styles from './User.module.scss';

const User = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedUser, setSelectedUser] = useState<UserSchema | null>(null);
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

  if (isLoading) {
    return <Loading />;
  }

  if (!selectedUser) {
    return <h1>No user found!</h1>;
  }

  return (
    <div>
      <div className={styles.UserMeta}>
        <h1>User: {selectedUser.username}</h1>
        <p>Location: {selectedUser.location}</p>
        <p>Joined: {new Date(selectedUser.date_joined).getTime()}</p>
        <Button className="goBack" type="button" text="Back" clickHandler={() => navigate(-1)} />
      </div>
      {/* // TODO: TABS FOR USER JOURNALS / SAVED JOURNALS - to change state and pass to journalsList */}
      <JournalsList filter='user' value={id} />
    </div>
  );
};

export default User;
