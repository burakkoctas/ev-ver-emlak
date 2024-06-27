// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#D7D8D1', padding: '10px 0', textAlign: 'center' }}>
      Hamit Burak Koçtaş © {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
