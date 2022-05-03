import { ReactElement } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from '../Home';

import Login from '../Login';
import Signup from '../Signup';
import JournalDetailsView from '../Journals/JournalDetailsView';
import ProtectedContainer from './ProtectedContainer';
import CreateJournalForm from '../Journals/CreateJournalForm';
import User from '../User';

const App = (): ReactElement | null => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <ProtectedContainer>
            <Home />
          </ProtectedContainer>
        } />
        <Route path="/user/:id" element={
          <ProtectedContainer>
            <User />
          </ProtectedContainer>
        } />
        <Route path="/journals/create" element={
          <ProtectedContainer>
            <CreateJournalForm />
          </ProtectedContainer>
        } />
        <Route path="/journals/view/:id" element={
          <ProtectedContainer>
            <JournalDetailsView />
          </ProtectedContainer>
        } />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
