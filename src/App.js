import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
// import Asosiy from './pages/Asosiy';
// import Analitika from './pages/Analitika';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/asosiy" element={<Asosiy />} />
            <Route path="/analitika" element={<Analitika />} /> */}
            {/* Добавьте другие страницы */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
