import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Не забудьте добавить стили, если нужно

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Sahifa topilmadi :(</h1>
      <p>Bunday sahifa mavjud emas.</p>
      <Link to="/login">Bosh sahifa</Link>
    </div>
  );
};

export default NotFound;
