import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from "./Sidebar";

const RecipeDisplay = ({ recipeId }) => {
  const [Rep, setRep] = useState(null);

  useEffect(() => {
    async function fetchRecipeDetails() {
      const API_KEY = import.meta.env.VITE_API_KEY; 
      const url = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const recipeDetails = await res.json();
        setRep(recipeDetails);
      } catch (err) {
        console.error(err.message);
      }
    }

    fetchRecipeDetails();
  }, [recipeId]);

  const stripHtml = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  if (!Rep) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header hideSearch /> {/* Hide search bar on this page */}
      <div className="main-container">
        <Sidebar />
        <div className="recipe-detail">
          <h2>{Rep.title}</h2>
          <img src={Rep.image} alt={Rep.title} />
          <h3>Ingredients</h3>
          <ul>
            {Rep.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
          <h3>Instructions</h3>
          <p>{stripHtml(Rep.instructions)}</p>
        </div>
      </div>
    </>
  );
}

export default RecipeDisplay;
