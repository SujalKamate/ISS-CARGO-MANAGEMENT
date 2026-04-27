import React, { useState } from "react";

const BASE_URL = "http://127.0.0.1:8000";

function App() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await fetch(`${BASE_URL}/search/${search}`);
    const data = await res.json();
    setResults(data.results);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🚀 ISS Cargo Dashboard</h1>

      <input
        type="text"
        placeholder="Enter item name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <h2>Results</h2>

      {results.map((item, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <b>{item.name}</b> (ID: {item.item_id})  
          <br />
          Container: {item.container}
        </div>
      ))}
    </div>
  );
}

export default App;