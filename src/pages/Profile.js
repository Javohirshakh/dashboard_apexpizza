// src/pages/Profile.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import AvatarEditor from 'react-avatar-editor';
import './Profile.css';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [profile, setProfile] = useState({
    name: '',
    surname: '',
    role: '',
    department: '',
    profilePhoto: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [srcImage, setSrcImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfile(user);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSrcImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const base64Image = canvas.toDataURL('image/jpeg');
      const updatedProfile = { ...profile, profilePhoto: base64Image };

      setProfile(updatedProfile);
      setUser(updatedProfile);
      localStorage.setItem('user', JSON.stringify(updatedProfile));

      setSrcImage(null);

      setIsSaving(true);
      try {
        await fetch('https://script.google.com/macros/s/AKfycbyZyQdnx_73lQ4zVm2WFUf6zD4L1HMWk-0iIPgM5e3hJsTUynIB2vYQ0iLCxLD3qCQ5/exec?route=updateUser', {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedProfile),
        });

        setSaveSuccess(true);
        setEditMode(false);
      } catch (error) {
        console.error('Ошибка при сохранении фото:', error);
      } finally {
        setIsSaving(false);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);

    try {
      setUser(profile);
      localStorage.setItem('user', JSON.stringify(profile));

      await fetch('https://script.google.com/macros/s/AKfycbyZyQdnx_73lQ4zVm2WFUf6zD4L1HMWk-0iIPgM5e3hJsTUynIB2vYQ0iLCxLD3qCQ5/exec?route=updateUser', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });

      setSaveSuccess(true);
      setEditMode(false);
    } catch (error) {
      console.error('Ошибка при сохранении данных профиля:', error);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const triggerFileUpload = () => {
    document.getElementById('photo-upload').click();
  };

  return (
    <div className="profile-container-wide">
      <div className="profile-header">
        <div className="profile-photo-container-wide" onClick={triggerFileUpload}>
          <img className="profile-photo-wide" src={profile.profilePhoto || '/images/default-profile.png'} alt="Profile" />
          <div className="profile-photo-hover-wide">
            <span className="material-icons camera-icon-wide">photo_camera</span>
          </div>
          <input type="file" onChange={handleFileChange} style={{ display: 'none' }} id="photo-upload" />
        </div>

        {srcImage && (
          <div className="editor-modal">
            <div className="editor-modal-content">
              <h3>Rasmni tahrirlash</h3>
              <AvatarEditor ref={editorRef} image={srcImage} width={250} height={250} border={50} borderRadius={125} scale={scale} className="avatar-editor" />
              <div className="editor-controls">
                <label>Masshtab:</label>
                <input type="range" value={scale} min="1" max="3" step="0.1" onChange={(e) => setScale(parseFloat(e.target.value))} className="scale-slider" />
              </div>
              <div className="editor-actions">
                <button className="cancel-btn" onClick={() => setSrcImage(null)}>Bekor qilish</button>
                <button className="apply-btn" onClick={handleCrop}>Saqlash</button>
              </div>
            </div>
          </div>
        )}

        <div className="profile-info-wide">
          {editMode ? (
            <div className="profile-info-edit">
              <label>Ism:</label>
              <input type="text" name="name" value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
              <label>Familiya:</label>
              <input type="text" name="surname" value={profile.surname} onChange={e => setProfile({ ...profile, surname: e.target.value })} />
            </div>
          ) : (
            <div className="profile-info-display">
              <h1>{profile.name} {profile.surname}</h1>
            </div>
          )}
          <h3>Rol: {profile.role}</h3>
          <h3>Bo'lim: {profile.department}</h3>

          {editMode ? (
            <button className="save-btn" onClick={handleSaveProfile} disabled={isSaving}>
              {isSaving ? 'Saqlanmoqda...' : 'Saqlash'}
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>Tahrirlash</button>
          )}

          {saveSuccess && (
            <div className="notification-success">
              Muvaffaqiyatli saqlandi!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
