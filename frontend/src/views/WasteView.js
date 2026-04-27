import React from 'react';
import WastePanel from '../components/WastePanel';
import ExpiredPanel from '../components/ExpiredPanel';
import '../styles/Views.css';

const WasteView = () => {
  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <h2>WASTE & EXPIRATION MONITORING</h2>
        <p>Track discarded items and monitor cargo shelf-life</p>
      </div>

      <div className="monitoring-grid">
        <WastePanel />
        <ExpiredPanel />
      </div>
    </div>
  );
};

export default WasteView;
