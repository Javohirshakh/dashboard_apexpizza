import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css'; 
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Login from './pages/Login';

// Компонент для защиты маршрутов
const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authToken'); // Проверяем токен

  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Layout с проверкой пути
const Layout = () => {
  const location = useLocation(); // Получаем текущий маршрут

  return (
    <div className="app">
      {/* Показываем Sidebar, если мы не на странице логина */}
      {location.pathname !== '/login' && <Sidebar />}
      
      <div className="content">
        <Routes>
          {/* Защищенные маршруты */}
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/analytics" element={<PrivateRoute element={<Analytics />} />} />
          <Route path="/login" element={<Login />} /> {/* Страница логина */}
        </Routes>
      </div>
    </div>
  );
};

// Основной компонент App
const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
