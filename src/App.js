import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css'; 
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const Layout = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('authToken'); // Проверка авторизации

  return (
    <div className="app">
      {/* Показываем сайдбар только если пользователь залогинен и не на странице логина или 404 */}
      {isLoggedIn && location.pathname !== '/login' && location.pathname !== '/404' && <Sidebar />}
      <div className="content">
        <Routes>
          {/* Приватные маршруты */}
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={isLoggedIn ? <Analytics /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          
          {/* Если пользователь уже залогинился, не показывать страницу логина */}
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} /> 
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} /> {/* Для всех остальных несуществующих страниц */}
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
