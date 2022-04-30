import { ReactElement, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Home';

import Login from './Login';
import { invalidate, populate, selectIsAuthenticated } from './reducers/authSlice';
import { useAppSelector } from './reducers/hooks';
import Signup from './Signup';

const App = (): ReactElement | null => {
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    const tokenAuth = localStorage.getItem('token');
    if (tokenAuth) {
      const token = JSON.parse(tokenAuth);
      dispatch(populate(token));
    } else {
      dispatch(invalidate());
    }
  });

  const routes = (() => {
    if (isLoggedIn) {
      return (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      );
    }
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  })();

  return <BrowserRouter>{routes}</BrowserRouter>;
};

export default App;
