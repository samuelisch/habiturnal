import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../assets/Navbar';
import { invalidate, populate } from '../../reducers/authSlice';
import { useAppDispatch } from '../../reducers/hooks';
import { initLikes } from '../../reducers/journalLikeSlice';
import journalCalls from '../../services/journals';
import { setToken } from '../../services/login';
import userCalls from '../../services/users';
import { UserSchema } from '../../utils/types';
import styles from './ProtectedContainer.module.scss';

export const UserContext = createContext<UserSchema | null>(null);

interface Props {
  children: React.ReactNode;
}

const ProtectedContainer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    let fetching = true;
    (async () => {
      const tokenAuth = localStorage.getItem('token');
      const detailsAuth = localStorage.getItem('tokenDetails');
      if (tokenAuth && detailsAuth) {
        try {
          const token = JSON.parse(tokenAuth);
          const tokenDetails = JSON.parse(detailsAuth);
          if (Date.now() >= tokenDetails.exp * 1000) {
            console.error('token expired');
            dispatch(invalidate());
            navigate('/login');
          }
          const user = await userCalls.getUserById(tokenDetails.user_id);
          if (fetching) {
            setToken(token);
            dispatch(populate(token));
            setUser(user as UserSchema);
          }
        } catch (err) {
          console.error(err);
          dispatch(invalidate());
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    })();

    return () => {
      fetching = false;
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    (async () => {
      if (user) {
        const likedJournals = await journalCalls.getJournalLikesByUserId(user.id);
        dispatch(initLikes(likedJournals));
      }
    })();
  }, [user, dispatch]);

  return (
    <div>
      <UserContext.Provider value={user}>
        <div className={styles.MainContainer}>{children}</div>
        <Navbar />
        
      </UserContext.Provider>
    </div>
  );
};

export default ProtectedContainer;
