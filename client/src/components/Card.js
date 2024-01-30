// Card.js
import React from 'react';
import '../styles/Card.css';  // Import CSS file

const Card = ({ title, description, imageUrl, price, onClickDetail }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <p>{description}</p>
      <p>Price: {price}</p>
      <button onClick={onClickDetail}>Detail</button>
    </div>
  );
};

export default Card;
