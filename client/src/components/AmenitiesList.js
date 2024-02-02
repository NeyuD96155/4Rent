// AmenitiesList.js
import React from 'react';

const AmenitiesList = ({ amenities }) => (
  <div>
    <h3>Amenities</h3>
    <ul>
      {amenities.map((amenity, index) => (
        <li key={index}>{amenity}</li>
      ))}
    </ul>
  </div>
);

export default AmenitiesList;
