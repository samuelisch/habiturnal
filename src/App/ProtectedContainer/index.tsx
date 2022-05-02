import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { invalidate, populate } from '../../reducers/authSlice';
import { useAppDispatch } from '../../reducers/hooks';

interface Props {
  children: React.ReactNode;
}

const ProtectedContainer = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenAuth = localStorage.getItem('token');
    if (tokenAuth) {
      const token = JSON.parse(tokenAuth);
      dispatch(populate(token));
    } else {
      dispatch(invalidate());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return (
    <div>
      <h1>Navbar</h1>
      {children}
    </div>
  );
};

export default ProtectedContainer;
