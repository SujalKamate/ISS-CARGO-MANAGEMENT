import React, { useState } from 'react';
import '../styles/ResultCard.css';

const ResultCard = ({ item, onSmartLocate, onRetrieve }) => {
  const [isRetrieving, setIsRetrieving] = useState(false);

  const handleRetrieveClick = async () => {
    setIsRetrieving(true);
    await onRetrieve(item.item_id);
    setIsRetrieving(false);
  };

  return (
    <div className="result-card glass-panel">
      <div className="card-header">
        <span className="status-indicator"></span>
        <h3 className="item-name">{item.name}</h3>
      </div>
      
      <div className="card-body">
        <div className="data-row">
          <span className="label">ITEM ID:</span>
          <span className="value">{item.item_id}</span>
        </div>
        <div className="data-row">
          <span className="label">CONTAINER:</span>
          <span className="value highlight">{item.container || 'UNASSIGNED'}</span>
        </div>
      </div>

      <div className="card-actions">
        <button 
          className="action-btn secondary" 
          onClick={() => onSmartLocate(item.item_id)}
          title="Intelligent Retrieval Analysis"
        >
          SMART LOCATE
        </button>
        <button 
          className="action-btn primary" 
          onClick={handleRetrieveClick}
          disabled={isRetrieving}
        >
          {isRetrieving ? 'RETRIEVING...' : 'RETRIEVE'}
        </button>
      </div>

      <div className="card-footer">
        <div className="scan-id">REF_SEC_{item.item_id.split('_')[0] || 'GEN'}</div>
      </div>
      <div className="card-glow"></div>
    </div>
  );
};

export default ResultCard;
