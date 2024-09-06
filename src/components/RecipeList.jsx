import React from 'react';
import RecipeCard from './RecipeCard';

const RecipeList = ({ data, onRecipeSelect }) => {
  return (
    <div className="recipe-grid">
      {data && data.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          title={recipe.title} 
          image={recipe.image} 
          description={recipe.summary} 
          onClick={() => onRecipeSelect(recipe)} // Pass the selected recipe up
        />
      ))}
    </div>
  );
}

export default RecipeList;
