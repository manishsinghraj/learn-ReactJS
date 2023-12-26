import './App.css';
import React, { useEffect, useState } from 'react'
import { SearchBar } from './components/SeachBar';


function App() {

  const [result, setResult] = useState(null)

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
        setResult(data);
        console.log(data)
      })
      .catch(error => console.error(error))
  }, [])



  return (
    <div className="App">
      <SearchBar result={result} />
    </div>
  );
}

export default App;
