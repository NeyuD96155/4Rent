import React from 'react';
import '../styles/SearchBar.css'; // Đảm bảo link đến file CSS của bạn

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Where Are You Going To?" />
      <input type="date" placeholder="Check In Date" />
      <input type="date" placeholder="Check Out Date" />
      <input type="number" min="1" placeholder="Adults 2" />
      <input type="number" min="0" placeholder="Children 3" />
      <select>
        <option value="single">Single Room</option>
        <option value="double">Double Room</option>
        <option value="suite">Suite</option>
      </select>
      <button type="submit">Search</button>
    </div>
  );
};

export default SearchBar;
