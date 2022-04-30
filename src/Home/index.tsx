import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../assets/Button';
import { invalidate } from '../reducers/authSlice';
import { UserSchema } from '../reducers/usersSlice';
import { setToken } from '../services/login';
import userCalls from '../services/users';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserSchema | null>(null);

  useEffect(() => {
    let fetching = true;
    const tokenAuth = localStorage.getItem('token');
    const userAuth = localStorage.getItem('username');
    if (tokenAuth && userAuth) {
      const token = JSON.parse(tokenAuth);
      const username = JSON.parse(userAuth);
      setToken(token);
      userCalls
        .getUserByUsername(username)
        .then(user => {
          if (fetching) {
            setUser(user as UserSchema);
            setIsLoading(false);
          }
        })
        .catch(err => {
          console.error(err);
          dispatch(invalidate());
          navigate('/');
        });
    }

    return () => {
      fetching = false;
    };
  }, [dispatch, navigate]);

  const logout = () => {
    dispatch(invalidate());
    navigate('/');
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <>
      {user ? <h1> Welcome, {user.username}!</h1> : ''}
      <Button className="logoutBtn" type="button" text="logout" clickHandler={logout} />
    </>
  );
};

export default Home;
