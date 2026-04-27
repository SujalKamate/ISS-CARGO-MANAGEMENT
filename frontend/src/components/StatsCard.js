import React from 'react';
import '../styles/StatsCard.css';

const StatsCard = ({ label, value, color, icon }) => {
  return (
    <div className={`stats-card glass-panel ${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <span className="stats-label">{label}</span>
        <h2 className="stats-value">{value}</h2>
      </div>
      <div className="stats-glow"></div>
    </div>
  );
};

export default StatsCard;
