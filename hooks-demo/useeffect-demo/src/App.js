import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;

const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=delhi&apiKey=${API_KEY}`;

function App() {
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(URL);
        const data = await result.json();
        console.log(data)
        setTemp(data.main.temp);
        console.log("hi")
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div className="App">
      Delhi temp now: {temp} ℃
    </div>
  );
}

export default App;
