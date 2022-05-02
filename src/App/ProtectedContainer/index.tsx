import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { invalidate, populate } from '../../reducers/authSlice';
import { useAppDispatch } from '../../reducers/hooks';
import { UserSchema } from '../../reducers/usersSlice';
import { setToken } from '../../services/login';
import userCalls from '../../services/users';

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
      const userAuth = localStorage.getItem('username');
      if (tokenAuth && userAuth) {
        try {
          const token = JSON.parse(tokenAuth);
          const username = JSON.parse(userAuth);
          const user = await userCalls.getUserByUsername(username);
          if (fetching) {
            dispatch(populate(token));
            setToken(token);
            setUser(user as UserSchema);
          }
        } catch (err) {
          console.error(err);
          dispatch(invalidate());
          navigate('/login');
        }
      }
    })();

    return () => {
      fetching = false;
    };
  }, [dispatch, navigate]);

  return (
    <div>
      <UserContext.Provider value={user}>
        <h1>Navbar</h1>
        {children}
      </UserContext.Provider>
    </div>
  );
};

export default ProtectedContainer;
