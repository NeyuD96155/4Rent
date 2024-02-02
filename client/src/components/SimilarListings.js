// SimilarListings.js
import React from 'react';

const SimilarListings = ({ location }) => (
  <div>
    <h3>Similar Listings</h3>
    <p>Similar listings based on location: {location}</p>
    {/* Display similar listings here. In a real scenario, this would fetch and display listings based on location */}
  </div>
);

export default SimilarListings;
