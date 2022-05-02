import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { selectIsAuthenticated } from '../../reducers/authSlice';
import { useAppSelector } from '../../reducers/hooks';

interface Props {
  children: React.ReactNode;
}

const AppContainer = ({ children }: Props) => {
  const isLoggedIn = useAppSelector(selectIsAuthenticated);

  return (
    <div>
      {isLoggedIn && 
        <h1>Navbar</h1>
      }
      <BrowserRouter>{children}</BrowserRouter>
    </div>
  );
};

export default AppContainer;
