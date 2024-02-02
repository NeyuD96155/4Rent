// Gallery.js
import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`Gallery ${index}`} style={{ width: '100%', padding: '10px' }} />
      ))}
    </div>
  );
};

export default Gallery;
