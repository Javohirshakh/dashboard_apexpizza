import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css'; 
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const Layout = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('authToken'); // Проверяем, есть ли токен

  return (
    <div className="app">
      {/* Показываем сайдбар только если пользователь залогинен и не на странице логина или 404 */}
      {isLoggedIn && location.pathname !== '/login' && location.pathname !== '/404' && <Sidebar />}
      <div className="content">
        <Routes>
          {/* Приватные маршруты */}
          <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={isLoggedIn ? <Analytics /> : <Navigate to="/login" />} />
          <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/" />} /> {/* Перенаправляем на /, если уже авторизован */}
          <Route path="*" element={<NotFound />} /> {/* Страница 404 */}
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
};

export default App;
