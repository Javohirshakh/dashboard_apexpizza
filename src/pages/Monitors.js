// src/pages/Monitors.js
import React from 'react';
import './Monitors.css';

const Monitors = () => {
  return (
    <div className="monitors-page">
      {/* Заголовок по центру */}
      <h1 className="monitors-title">Monitorlar</h1>

      {/* Основной контейнер для филиалов и телевизоров на всю ширину */}
      <div className="monitors-content">
        <div className="branch-card">
          <h2>Filial 1</h2>
          <div className="tvs">
            <div className="tv-card">
              <h3>Televizor 1</h3>
              <p>Status: Oflayn</p>
            </div>
            <div className="tv-card">
              <h3>Televizor 2</h3>
              <p>Status: Onlayn</p>
            </div>
          </div>
        </div>

        <div className="branch-card">
          <h2>Filial 2</h2>
          <div className="tvs">
            <div className="tv-card">
              <h3>Televizor 1</h3>
              <p>Status: Onlayn</p>
            </div>
            <div className="tv-card">
              <h3>Televizor 2</h3>
              <p>Status: Oflayn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitors;
