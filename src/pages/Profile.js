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

  const handleSave = () => {
    localStorage.setItem('user', JSON.stringify(profile));
    setEditMode(false);
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
            <button className="save-btn" onClick={handleSave}>Saqlash</button>
          ) : (
            <button className="edit-btn" onClick={() => setEditMode(true)}>Tahrirlash</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
