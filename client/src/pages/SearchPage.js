// src/pages/SearchPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchPage.css'; // Make sure to create a SearchPage.css file for styling

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform the search logic here, or update the URL with the search term
    navigate(`/search-results?query=${encodeURIComponent(searchTerm)}`);
  };

  return (
    <div className="search-page">
      <h1>Search for Timeshares</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter search terms..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/* You can add more search filters or categories here */}
    </div>
  );
};

export default SearchPage;
