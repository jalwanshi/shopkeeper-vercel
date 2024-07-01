import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './components/AdminPage';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';
import HomePage from './components/HomePage';
import UserAccountPages from './components/UserAccountPages';
import LandingPage from './components/LandingPage';
import GetStarted from './components/GetStarted';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/pannel" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home/:key" element={<HomePage />} />
        <Route path="/useraccountpages/:key1/:key2" element={<UserAccountPages />} />
        <Route path="/getstarted" element={<GetStarted />} />
        {/* Redirect from root to /pannel */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  );
};

export default App;
