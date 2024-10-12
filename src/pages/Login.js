import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../config';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Состояние для лоадинга
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Включаем лоадинг на кнопке

    // Отправляем запрос к API для получения данных пользователей
    const response = await fetch(`${config.API}?route=users`);
    const users = await response.json();

    // Ищем пользователя с введённым телефоном и паролем
    const user = users.find(user => user.phone.toString() === phone && user.password.toString() === password);

    setTimeout(() => {
      if (user) {
        // Сохраняем данные пользователя и токен в localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', 'fake-jwt-token'); // Пример использования токена

        setIsLoading(false);
        navigate('/'); // Перенаправляем на Dashboard
        window.location.reload(); 
      } else {
        setError('Telefon yoki parol xato!');
        setIsLoading(false);
      }
    }, 1500); // Симуляция времени ответа
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Kirish</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Telefon raqam</label>
            <input 
              type="tel" 
              placeholder="Telefon raqam" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Parol</label>
            <input 
              type="password" 
              placeholder="Parol" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? <div className="loader"></div> : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
