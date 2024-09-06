import React from 'react';
import Header from './Header';
import Hero from './Hero';
import RecipeList from './RecipeList';
import Seperator from './Seperator';
import Sidebar from './Sidebar';

const Home = ({ data, onRecipeSelect, searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <div>
      {/* Pass searchTerm, setSearchTerm, and handleSearch to Header */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      <Hero />
      <Seperator />
      <div className="main-container">
        <Sidebar />
        <RecipeList data={data} onRecipeSelect={onRecipeSelect} />
      </div>
    </div>
  );
};

export default Home;
