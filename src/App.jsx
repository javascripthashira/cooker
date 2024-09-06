import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import RecipeDisplay from "./components/RecipeDisplay";

function App() {
  const [data, setData] = useState(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAPIData() {
      const API_KEY = import.meta.env.VITE_API_KEY;
      const url = `https://api.spoonacular.com/recipes/random?number=12&apiKey=${API_KEY}`;

      const today = new Date().toDateString();
      const localKey = `SPOONACULAR-${today}`;

      if (localStorage.getItem(localKey)) {
        const apiData = JSON.parse(localStorage.getItem(localKey));
        setData(apiData.recipes);
        return;
      }

      localStorage.clear();

      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData.recipes);
        console.log("fetched from API");
      } catch (err) {
        console.log(err.message);
      }
    }

    fetchAPIData();
  }, []);

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipeId(recipe.id); 
    navigate(`/recipe/${recipe.id}`); 
  };

  // Search handler for complex search API
  const handleSearch = async () => {
    if (searchTerm.trim() === "") return;

    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&number=12&apiKey=${API_KEY}`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const apiData = await res.json();
      setData(apiData.results); // Update state with search results
    } catch (err) {
      console.log("Error fetching search results:", err.message);
    }
  };

  return (
    <>
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              data={data} 
              onRecipeSelect={handleRecipeSelect}
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              handleSearch={handleSearch} 
            />
          } 
        />
        {selectedRecipeId && (
          <Route 
            path={`/recipe/${selectedRecipeId}`} 
            element={<RecipeDisplay recipeId={selectedRecipeId} />} 
          />
        )}
      </Routes>
    </>
  );
}

export default App;
