import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    role: '',
    department: '',
    profilePhoto: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Для состояния загрузки
  const [saveSuccess, setSaveSuccess] = useState(false); // Для уведомления об успешном сохранении


  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setProfile(userData);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, profilePhoto: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };


  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbxxmY763Vsd0xeXKxxcF02561m5W_0pLoUr2WfbYDo-ZD53mheNVhC8Fu8t0SImHgds/exec?route=updateUser', {
        method: 'POST',
        mode: 'no-cors', // Включаем no-cors
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
  
      // Мы не сможем обработать результат, так как режим no-cors скрывает ответ
      console.log("Запрос был отправлен", response);
  
      // Обновляем интерфейс: показываем сообщение и отключаем режим редактирования
      setSaveSuccess(true); 
      setEditMode(false);
  
      // Получаем актуальные данные о пользователе
      await fetchAndUpdateUser(); 
  
    } catch (error) {
      console.error('Ошибка:', error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };
  
  // Функция для обновления localStorage и состояния после сохранения
  const fetchAndUpdateUser = async () => {
    try {
      const userListResponse = await fetch('https://script.google.com/macros/s/AKfycbxxmY763Vsd0xeXKxxcF02561m5W_0pLoUr2WfbYDo-ZD53mheNVhC8Fu8t0SImHgds/exec?route=users');
      const users = await userListResponse.json();
  
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const phone = storedUser.phone;
  
      const updatedUser = users.find(user => user.phone === phone);
  
      if (updatedUser) {
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setProfile(updatedUser); // Обновляем профиль в состоянии компонента
      }
    } catch (error) {
      console.error('Ошибка обновления данных пользователя:', error);
    }
  };
  
  
  
  
  

  
  const triggerFileUpload = () => {
    document.getElementById('photo-upload').click();
  };

  return (
    <div className="profile-container-wide">
      <div className="profile-header">
        <div className="profile-photo-container-wide" onClick={triggerFileUpload}>
          <img
            className="profile-photo-wide"
            src={profile.profilePhoto || '/images/default-profile.png'}
            alt="Profile"
          />
          <div className="profile-photo-hover-wide">
            <span className="material-icons camera-icon-wide">photo_camera</span>
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="photo-upload"
          />
        </div>

        <div className="profile-info-wide">
          {editMode ? (
            <div className="profile-info-edit">
              <label>Ism:</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
              />
              <label>Familiya:</label>
              <input
                type="text"
                name="surname"
                value={profile.surname}
                onChange={handleInputChange}
              />
            </div>
          ) : (
            <div className="profile-info-display">
              <h1>{profile.name} {profile.surname}</h1>
            </div>
          )}
          <h3>Rol: {profile.role}</h3>
          <h3>Bo'lim: {profile.department}</h3>

          {editMode ? (
  <button className="save-btn" onClick={handleSave} disabled={isSaving}>
    {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
  </button>
) : (
  <button className="edit-btn" onClick={() => setEditMode(true)}>Tahrirlash</button>
)}

{/* Уведомление об успешном сохранении */}
{saveSuccess && (
  <div className="notification-success">
    Ma'lumotlar saqlandi!
  </div>
)}


        </div>
      </div>
    </div>
  );
};

export default Profile;
