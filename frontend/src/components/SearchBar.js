import React, { useState } from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form className="search-container glass-panel" onSubmit={handleSubmit}>
      <div className="search-input-wrapper">
        <span className="input-prefix">CMD></span>
        <input
          type="text"
          placeholder="ENTER ITEM NAME FOR CARGO SCAN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
      </div>
      <button type="submit" className="scan-button">
        <span className="button-text">INITIATE SCAN</span>
        <div className="button-glow"></div>
      </button>
    </form>
  );
};

export default SearchBar;
