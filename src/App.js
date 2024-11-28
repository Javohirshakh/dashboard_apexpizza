// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Reports from './pages/Reports';
import Monitors from './pages/Monitors';
import Complaints from './pages/Complaints';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import { UserProvider } from './context/UserContext';

const Layout = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('authToken');

  return (
    <div className="app">
      {isLoggedIn && location.pathname !== '/login' && location.pathname !== '/404' && <Sidebar />}
      <div className="content">
        <Routes>
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={isLoggedIn ? <Analytics /> : <Navigate to="/login" />} />
          <Route path="/reports" element={isLoggedIn ? <Reports /> : <Navigate to="/login" />} />
          <Route path="/monitors" element={isLoggedIn ? <Monitors /> : <Navigate to="/login" />} />
          <Route path="/complaints" element={isLoggedIn ? <Complaints /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Layout />
      </Router>
    </UserProvider>
  );
};

export default App;
