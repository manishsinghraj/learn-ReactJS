import './App.css';
import React, { useState } from "react";

function App() {
  const [selectedStarCount, setSelectedStarCount] = useState(0);
  const [selectedStarHoverCount, setSelectedStarHoverCount] = useState(0);


  return (
    <div className='App'>
      Star Rating
      <div className="stars">
        {[...Array(5)].map((_, index) => {
          return <span className={`${index + 1 <= selectedStarCount ? "selected" : ""} ${index + 1 <= selectedStarHoverCount ? "selected" : ""}`}
            onClick={() => setSelectedStarCount(index + 1)}
            onMouseOver={() => {
              setSelectedStarHoverCount(index + 1);
            }}

            onMouseOut={() => {
              setSelectedStarHoverCount(0);
            }}
            key={index}>&#9733;</span>
        }
        )}
      </div>

      <p>Rating count : {selectedStarCount}</p>
      <p>Rating count on Hover : {selectedStarHoverCount}</p>
    </div>
  );
}

export default App;
