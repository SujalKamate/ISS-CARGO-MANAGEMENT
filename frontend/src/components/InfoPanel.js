import React from 'react';
import '../styles/InfoPanel.css';

const InfoPanel = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <div className="info-panel-overlay" onClick={onClose}>
      <div className="info-panel glass-panel neon-border" onClick={(e) => e.stopPropagation()}>
        <header className="info-header">
          <h3>INTELLIGENT LOCATOR</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </header>
        
        <div className="info-body">
          <div className="info-row">
            <span className="label">TARGET ID:</span>
            <span className="value highlight">{data.item_id}</span>
          </div>
          <div className="info-row">
            <span className="label">LOCATED IN:</span>
            <span className="value highlight">{data.container}</span>
          </div>
          <div className="info-row big">
            <span className="label">RETRIEVAL STEPS:</span>
            <span className="value glow">{data.retrieval_steps}</span>
          </div>
          
          <div className="complexity-meter">
            <div 
              className={`meter-fill ${data.retrieval_steps > 3 ? 'high' : 'low'}`} 
              style={{ width: `${Math.min((data.retrieval_steps + 1) * 20, 100)}%` }}
            ></div>
          </div>
          <p className="complexity-label">
            {data.retrieval_steps === 0 ? 'OPTIMAL: DIRECT ACCESS' : 'CAUTION: BLOCKING ITEMS DETECTED'}
          </p>
        </div>

        <footer className="info-footer">
          <span className="timestamp">SCAN COMPLETED: {new Date().toLocaleTimeString()}</span>
        </footer>
      </div>
    </div>
  );
};

export default InfoPanel;
