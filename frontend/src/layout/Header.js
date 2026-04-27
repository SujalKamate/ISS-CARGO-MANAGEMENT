import React from 'react';
import '../styles/Header.css';

const Header = ({ status }) => {
  return (
    <header className="main-header glass-panel">
      <div className="header-left">
        <h1 className="neon-glow font-orbitron">ISS CARGO CONTROL</h1>
        <p className="subtext">ORBITAL STORAGE MANAGEMENT INTERFACE</p>
      </div>
      <div className="header-right">
        <div className={`status-badge ${status}`}>
          <span className="pulse-dot"></span>
          SYSTEM STATUS: <span className="status-text">{status.toUpperCase()}</span>
        </div>
        <div className="time-display">
          {new Date().toISOString().replace('T', ' ').substr(0, 19)} UTC
        </div>
      </div>
    </header>
  );
};

export default Header;
