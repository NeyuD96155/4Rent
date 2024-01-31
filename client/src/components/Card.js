// Card.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const Card = ({ title, description, imageUrl, price }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <img className="card-image" src={imageUrl} alt={title} />
      <p className="card-description">{description}</p>
      <p className="card-price">Price: {price}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

export default Card;
