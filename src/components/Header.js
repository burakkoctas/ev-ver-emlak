// src/components/Header.js
import { Button, Image } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import icon from '../assets/icon.jpg';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('properties');
    navigate('/login');
  };
  
  return (
    <header style={{ backgroundColor: '#D7D8D1', padding: '10px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <a href={username ? '/property-management' : '/'}>
          <img src={icon} alt='Ev-Ver Emlak' style={{ width: 100 , marginLeft: 30}} />
        </a>
      </div>
      {username && (
        <div style={{ display: 'flex', alignItems: 'center' ,marginRight:40}}>
          <h1 style={{ marginRight: 30 ,fontFamily: "sans-serif" , fontSize: "20px"}}>Hoşgeldin {username}</h1>
          <Button onClick={handleLogout}>Çıkış Yap</Button>
        </div>
      )}
    </header>
  );
};

export default Header;
