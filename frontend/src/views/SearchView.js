import React from 'react';
import SearchBar from '../components/SearchBar';
import ResultCard from '../components/ResultCard';
import '../styles/Views.css';

const SearchView = ({ results, isLoading, error, hasSearched, onSearch, onSmartLocate, onRetrieve }) => {
  return (
    <div className="view-container fade-in">
      <div className="view-header">
        <h2 className="neon-glow">CARGO SEARCH SYSTEM</h2>
        <p>Query the manifest database for orbital assets</p>
      </div>

      <div className="search-section-wrapper">
        <SearchBar onSearch={onSearch} />
      </div>

      <div className="results-container">
        {isLoading && (
          <div className="loader-container">
            <div className="loader"></div>
            <p className="loading-text">SCANNING CARGO DATABASE...</p>
          </div>
        )}

        {error && (
          <div className="error-panel glass-panel">
            <span className="error-icon">⚠</span>
            <div className="error-content">
              <h4>COMMUNICATION ERROR</h4>
              <p>{error}</p>
            </div>
          </div>
        )}

        {!isLoading && !error && results.length > 0 && (
          <div className="results-grid">
            {results.map((item) => (
              <ResultCard 
                key={item.item_id} 
                item={item} 
                onSmartLocate={onSmartLocate}
                onRetrieve={onRetrieve}
              />
            ))}
          </div>
        )}

        {!isLoading && !error && hasSearched && results.length === 0 && (
          <div className="empty-state-container glass-panel">
            <div className="empty-icon">∅</div>
            <h3>NO MATCHING CARGO FOUND</h3>
            <p>Refine your search criteria or check system logs.</p>
          </div>
        )}

        {!hasSearched && !isLoading && (
          <div className="initial-state-container">
            <div className="hint-card glass-panel">
              <span className="hint-icon">ℹ</span>
              <p>ENTER ITEM NAME OR CATEGORY TO INITIATE MANIFEST SCAN</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchView;
