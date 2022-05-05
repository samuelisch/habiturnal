import styles from './Navbar.module.scss';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { SiLivejournal } from 'react-icons/si';
import { AiOutlineHome } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { invalidate } from '../../reducers/authSlice';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../App/ProtectedContainer';


const Navbar = () => {
  const user = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(invalidate());
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <div className={styles.OuterContainer}>
      <div className={styles.Container}>
        <div className={styles.IconHome} onClick={() => navigate('/home')}>
          <AiOutlineHome size='25px' />
        </div>
        <div className={styles.Icon} onClick={() => navigate(`/user/${user.id}`)}>
          <CgProfile size='25px' />
        </div>
        <div className={styles.Icon} onClick={() => navigate('/journals/create')}>
          <SiLivejournal size='25px' />
        </div>
        <div className={styles.Icon} onClick={logout}>
          <BiLogOut size='25px' />
        </div>
      </div>
    </div>
  )
}

export default Navbar