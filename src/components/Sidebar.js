// src/components/Sidebar.js
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { UserContext } from '../context/UserContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleLogout = () => {
    // localStorage.setItem('user', 'null')
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const displayProfilePhoto = user?.profilePhoto
    ? user.profilePhoto
    : '/images/profile-img.png';

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src="/images/logo.png" alt="logo" />
        <h2>Apexpizza</h2>
      </div>
      <ul className="sidebar-links">
        <h4>
          <span>Asosiy menu</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> dashboard </span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/asosiy" className={location.pathname === "/asosiy" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> overview </span>
            Asosiy
          </Link>
        </li>
        <li>
          <Link to="/analytics" className={location.pathname === "/analytics" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> monitoring </span>
            Analitika
          </Link>
        </li>
        <h4>
          <span>Umumiy</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link to="/proektlar" className={location.pathname === "/proektlar" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> folder </span>
            Proektlar
          </Link>
        </li>
        <li>
          <Link to="/barcha-hisobotlar" className={location.pathname === "/barcha-hisobotlar" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> flag </span>
            Barcha hisobotlar
          </Link>
        </li>
        <li>
          <Link to="/bildirishnomalar" className={location.pathname === "/bildirishnomalar" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> notifications_active </span>
            Bildirishnomalar
          </Link>
        </li>
        <h4>
          <span>Instrumentlar</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link to="/monitors" className={location.pathname === "/monitors" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> cast </span>
            Monitorlar
          </Link>
        </li>
        <li>
          <Link to="/complaints" className={location.pathname === "/complaints" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> feedback </span>
            Shikoyatlar
          </Link>
        </li>
        <h4>
          <span>Akkount</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link to="/profile" className={location.pathname === "/profile" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> account_circle </span>
            Profil
          </Link>
        </li>
        <li>
          <Link to="/sozlamalar" className={location.pathname === "/sozlamalar" ? "active-link" : ""}>
            <span className="material-symbols-outlined"> settings </span>
            Sozlamalar
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>
            <span className="material-symbols-outlined"> logout </span>
            Chiqish
          </Link>
        </li>
      </ul>
      <div className="user-account">
        <div className="user-profile">
          <img src={displayProfilePhoto} alt={`${user?.name} ${user?.surname}`} onError={(e) => { e.target.src = '/images/profile-img.png'; }} />
          <div className="user-detail">
            <h3>{user?.name} {user?.surname}</h3>
            <span>{user?.department}/{user?.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
