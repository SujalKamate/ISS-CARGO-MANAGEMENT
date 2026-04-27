import React, { useState } from 'react';
import '../styles/MonitoringPanel.css';

const ExpiredPanel = () => {
  const [expiredItems, setExpiredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpired = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/waste/expired');
      const data = await response.json();
      setExpiredItems(data.expired_items || []);
    } catch (err) {
      setError('EXPIRY CLOCK DESYNC');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="monitoring-panel glass-panel secondary-border">
      <header className="panel-header">
        <div className="title-group">
          <h3>EXPIRATION TRACKER</h3>
          <span className="module-id">MOD_EXP_02</span>
        </div>
        <button className="sync-btn alt" onClick={fetchExpired} disabled={isLoading}>
          {isLoading ? 'ANALYZING...' : 'CHECK EXPIRED ITEMS'}
        </button>
      </header>

      <div className="panel-content">
        {error && <p className="panel-error">{error}</p>}
        
        {expiredItems.length > 0 ? (
          <div className="expired-list">
            {expiredItems.map((item) => (
              <div className="expired-item-row" key={item.item_id}>
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-id">{item.item_id}</span>
                </div>
                <div className="expiry-tag">
                  <span className="label">EXPIRED ON:</span>
                  <span className="date">{item.expiry_date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !isLoading && <div className="empty-state">ALL SYSTEMS NOMINAL. NO EXPIRATION DETECTED.</div>
        )}

        {isLoading && <div className="panel-loader">CALCULATING TIMELINES...</div>}
      </div>
    </div>
  );
};

export default ExpiredPanel;
