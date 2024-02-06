// Gallery.js
import React from 'react';

const Gallery = ({ images }) => (
    <div>
    {images.map((image, index) => (
      <img key={index} src={image} alt={`Gallery item ${index + 1}`} style={{ maxWidth: '100%', height: 'auto' }} />
    ))}
</div>

);

export default Gallery;
