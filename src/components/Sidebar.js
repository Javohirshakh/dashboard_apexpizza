import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
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
          <Link to="/">
            <span className="material-symbols-outlined"> dashboard </span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/asosiy">
            <span className="material-symbols-outlined"> overview </span>
            Asosiy
          </Link>
        </li>
        <li>
          <Link to="/analitika">
            <span className="material-symbols-outlined"> monitoring </span>
            Analitika
          </Link>
        </li>
        <h4>
          <span>Umumiy</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link to="/proektlar">
            <span className="material-symbols-outlined"> folder </span>
            Proektlar
          </Link>
        </li>
        <li>
          <Link to="/barcha-hisobotlar">
            <span className="material-symbols-outlined"> flag </span>
            Barcha hisobotlar
          </Link>
        </li>
        <li>
          <Link to="/bildirishnomalar">
            <span className="material-symbols-outlined"> notifications_active </span>
            Bildirishnomalar
          </Link>
        </li>
        <h4>
          <span>Akkount</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link to="/profil">
            <span className="material-symbols-outlined"> account_circle </span>
            Profil
          </Link>
        </li>
        <li>
          <Link to="/sozlamalar">
            <span className="material-symbols-outlined"> settings </span>
            Sozlamalar
          </Link>
        </li>
        <li>
          <Link to="/chiqish">
            <span className="material-symbols-outlined"> logout </span>
            Chiqish
          </Link>
        </li>
      </ul>
      <div className="user-account">
        <div className="user-profile">
          <img src="/images/profile-img.jpg" alt="Mohigul K" />
          <div className="user-detail">
            <h3>Mohigul K</h3>
            <span>Project Manager</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
