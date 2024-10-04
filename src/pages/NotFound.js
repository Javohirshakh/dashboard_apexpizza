import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Не забудьте добавить стили, если нужно

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default NotFound;
