import React, { useState } from 'react';
import '../styles/MonitoringPanel.css';

const WastePanel = () => {
  const [wasteItems, setWasteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWaste = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://127.0.0.1:8000/waste');
      const data = await response.json();
      setWasteItems(data.waste_items || []);
    } catch (err) {
      setError('FAILED TO SYNC WITH WASTE MODULE');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="monitoring-panel glass-panel">
      <header className="panel-header">
        <div className="title-group">
          <h3>WASTE MONITORING</h3>
          <span className="module-id">MOD_WST_01</span>
        </div>
        <button className="sync-btn" onClick={fetchWaste} disabled={isLoading}>
          {isLoading ? 'SYNCING...' : 'LOAD WASTE DATA'}
        </button>
      </header>

      <div className="panel-content">
        {error && <p className="panel-error">{error}</p>}
        
        {wasteItems.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>ITEM ID</th>
                <th>NAME</th>
                <th>REASON</th>
              </tr>
            </thead>
            <tbody>
              {wasteItems.map((item) => (
                <tr key={item.item_id}>
                  <td className="code">{item.item_id}</td>
                  <td>{item.name}</td>
                  <td className="reason">{item.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !isLoading && <div className="empty-state">NO WASTE DETECTED IN CURRENT SECTOR.</div>
        )}

        {isLoading && <div className="panel-loader">SCANNING...</div>}
      </div>
    </div>
  );
};

export default WastePanel;
