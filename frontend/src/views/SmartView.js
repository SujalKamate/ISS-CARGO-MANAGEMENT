import React, { useState } from 'react';
import '../styles/Views.css';

const SmartView = ({ onSmartLocate }) => {
  const [itemId, setItemId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (itemId.trim()) {
      onSmartLocate(itemId);
    }
  };

  return (
    <div className="view-container smart-analysis-view fade-in">
      <div className="view-header-centered">
        <div className="header-tag">SYSTEM MODULE: OPT-PATH-v2</div>
        <h2 className="neon-glow large-title">SMART RETRIEVAL ANALYSIS</h2>
        <p>Advanced algorithmic pathfinding for orbital cargo extraction</p>
      </div>

      <div className="smart-main-layout">
        <div className="smart-input-section glass-panel tech-border">
          <div className="panel-accent-top"></div>
          <form onSubmit={handleSubmit} className="smart-form-refined">
            <div className="input-group-modern">
              <label>TARGET IDENTIFIER</label>
              <div className="input-with-icon">
                <span className="input-icon">⌘</span>
                <input 
                  type="text" 
                  placeholder="ENTER ITEM_ID..." 
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  className="mission-input"
                />
              </div>
            </div>
            <button type="submit" className="mission-btn btn-ripple">
              <span className="btn-content">
                <span className="icon">⚡</span>
                INITIATE PATHFINDING SEQUENCE
              </span>
              <div className="btn-shine"></div>
            </button>
          </form>
          <div className="panel-accent-bottom"></div>
        </div>

        <div className="smart-features-grid-modern">
          <div className="feature-card-modern glass-panel">
            <div className="feature-icon">⛓</div>
            <div className="feature-text">
              <h4>PATH OPTIMIZATION</h4>
              <p>The system automatically calculates the fewest steps required to access deep-stored cargo units using Dijkstra-based orbital logic.</p>
            </div>
          </div>
          
          <div className="feature-card-modern glass-panel">
            <div className="feature-icon">🛡</div>
            <div className="feature-text">
              <h4>BLOCKING DETECTION</h4>
              <p>Real-time identification of all physical obstructions preventing direct access to your target item across all storage sectors.</p>
            </div>
          </div>

          <div className="feature-card-modern glass-panel">
            <div className="feature-icon">🛰</div>
            <div className="feature-text">
              <h4>SECTOR ANALYSIS</h4>
              <p>Multi-sector synchronization ensures that pathfinding data remains accurate even during station-wide cargo re-organization.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="background-decoration">
        <div className="circle-one"></div>
        <div className="circle-two"></div>
      </div>
    </div>
  );
};

export default SmartView;
