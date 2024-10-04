import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: '',
    surname: '',
  });

  // Получаем данные пользователя из localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Сохраняем данные пользователя в state
    }
  }, []);

  // Логика для выхода из системы
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Удаляем токен аутентификации
    localStorage.removeItem('user'); // Удаляем данные пользователя
    navigate('/login'); // Перенаправляем на страницу логина после логаута
  };

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
          <Link
            to="/"
            className={location.pathname === "/" ? "active-link" : ""}
          >
            <span className="material-symbols-outlined"> dashboard </span>
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/asosiy"
            className={location.pathname === "/asosiy" ? "active-link" : ""}
          >
            <span className="material-symbols-outlined"> overview </span>
            Asosiy
          </Link>
        </li>
        <li>
          <Link
            to="/analytics"
            className={location.pathname === "/analytics" ? "active-link" : ""}
          >
            <span className="material-symbols-outlined"> monitoring </span>
            Analitika
          </Link>
        </li>
        <h4>
          <span>Umumiy</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link
            to="/proektlar"
            className={location.pathname === "/proektlar" ? "active-link" : ""}
          >
            <span className="material-symbols-outlined"> folder </span>
            Proektlar
          </Link>
        </li>
        <li>
          <Link
            to="/barcha-hisobotlar"
            className={
              location.pathname === "/barcha-hisobotlar" ? "active-link" : ""
            }
          >
            <span className="material-symbols-outlined"> flag </span>
            Barcha hisobotlar
          </Link>
        </li>
        <li>
          <Link
            to="/bildirishnomalar"
            className={
              location.pathname === "/bildirishnomalar" ? "active-link" : ""
            }
          >
            <span className="material-symbols-outlined">
              notifications_active
            </span>
            Bildirishnomalar
          </Link>
        </li>
        <h4>
          <span>Akkount</span>
          <div className="menu-separator"></div>
        </h4>
        <li>
          <Link
            to="/profile"
            className={location.pathname === "/profile" ? "active-link" : ""}
          >
            <span className="material-symbols-outlined"> account_circle </span>
            Profil
          </Link>
        </li>
        <li>
          <Link
            to="/sozlamalar"
            className={location.pathname === "/sozlamalar" ? "active-link" : ""}
          >
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
          <img src="/images/profile-img.png" alt={`${user.name} ${user.surname}`} />
          <div className="user-detail">
            <h3>{user.name} {user.surname}</h3> {/* Динамическое отображение имени и фамилии */}
            <span>{user.department}/{user.role}</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
