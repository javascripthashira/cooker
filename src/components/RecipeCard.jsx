import React from 'react';

const RecipeCard = ({ title, image, description, onClick }) => {
  return (
    <div className="Card" onClick={onClick}>
      <img src={image} alt={title} />
      <h1>{title}</h1>
    </div>
  );
}

export default RecipeCard;
