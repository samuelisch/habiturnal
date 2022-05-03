import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../assets/Button';
import { invalidate, populate } from '../reducers/authSlice';
import styles from './Main.module.scss';
import { GiBookshelf } from 'react-icons/gi';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenAuth = localStorage.getItem('token');
    if (tokenAuth) {
      const token = JSON.parse(tokenAuth);
      dispatch(populate(token));
      navigate('/home');
    } else {
      dispatch(invalidate());
    }
  }, [dispatch, navigate]);

  return (
    <div className={styles.Container}>
      <GiBookshelf size="50px" />
      <h1 className={styles.Title}>Journal together with millions</h1>
      <div className={styles.MidContainer}>
        <h2 className={styles.Header}>Join Reflect today.</h2>
        <Button
          type="button"
          className={styles.SignupButton}
          text="Sign up"
          clickHandler={() => navigate('/signup')}
        />
        <Button
          type="button"
          className={styles.LoginButton}
          text="Log in"
          clickHandler={() => navigate('/login')}
        />
      </div>
    </div>
  );
};

export default Main;
