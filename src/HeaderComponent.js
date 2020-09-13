import React, { useState } from "react";
import DebugComponent from './DebugComponent';

function HeaderComponent() {
  const [searchQueryState, setsearchQueryState] = useState("");
  const [input, setInput] = useState("");
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setsearchQueryState(input);
    setInput("");
  }
  
  const handleChange = (event) =>{
    event.preventDefault();
    setInput(event.target.value);
  }
  
  return (
    <div className="header">
      <div className="hero">
        <div className="app">
          <p>Try out the Anime Search API</p>
          <form onSubmit={handleSubmit} className="search">
            <input
              value={input} 
              onChange={handleChange}
              id="search_query"
              type="text"
              name="query"
              placeholder="search for an anime, e.g Naruto"
            />
            <button type="submit" id="serach">Go</button>
          </form>
          <DebugComponent
            searchInput = {searchQueryState}
          />
        </div>
      </div>
    </div>
  );
}

export default HeaderComponent;
