import React from 'react';

const Header = ({ searchTerm, setSearchTerm, handleSearch, hideSearch }) => {
  return (
    <div className='Header'>
      <h1>Carmy</h1>
      {!hideSearch && ( // Conditionally render search bar
        <>
          <input
            type="text"
            placeholder="Search for a recipe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
            className="search-bar"
          />
          <button onClick={handleSearch}>Search</button>
        </>
      )}
    </div>
  );
};

export default Header;
