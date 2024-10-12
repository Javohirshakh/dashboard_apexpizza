// src/pages/Complaints.js
import React, { useState } from 'react';
import './Complaints.css';

const Complaints = () => {
  const [activeSection, setActiveSection] = useState('branchComplaints');

  return (
    <div className="complaints-page">
      <h1 className="complaints-title">Shikoyatlar</h1>
      
      {/* Навигация по разделам */}
      <div className="complaints-tabs">
        <button 
          className={`complaints-tab ${activeSection === 'branchComplaints' ? 'active' : ''}`}
          onClick={() => setActiveSection('branchComplaints')}
        >
          Filiallar
        </button>
        <button 
          className={`complaints-tab ${activeSection === 'generalComplaints' ? 'active' : ''}`}
          onClick={() => setActiveSection('generalComplaints')}
        >
          Shikoyatlar
        </button>
      </div>

      {/* Контент для каждого раздела */}
      <div className="complaints-content">
        {activeSection === 'branchComplaints' && (
          <div className="complaints-section">
            <h2>Filiallar</h2>
            <p>Filiallar qo'shish, nazorat qilish, kuzatish.</p>
            {/* В дальнейшем можно добавить форму или таблицу с жалобами */}
          </div>
        )}

        {activeSection === 'generalComplaints' && (
          <div className="complaints-section">
            <h2>Shikoyatlar</h2>
            <p>Bu yerda barcha shikoyatlar ko'rinadi.</p>
            {/* В дальнейшем можно добавить форму или таблицу с жалобами */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
