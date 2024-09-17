import { useState } from 'react';
import './App.css';

function App() {

  // const [count, setCount] = useState(0); //this will render everytime you click
  const [count, setCount] = useState(() => { return 0 }); //use fn method to avoid rerendering on each click


  const handleIncreament = () => {
    setCount(prevCount => prevCount + 1);
  }

  const handleDecrement = () => {
    setCount(prevCount => {
      if (prevCount === 0) {
        alert("counter has reached its end!")
        return prevCount;
      } else {
        return prevCount - 1;
      }
    });
  }

  const handleReset = () => {
    setCount(() => 0);
  }


  return (
    <div className="App">
      <button onClick={handleIncreament}> + </button>
      <span> {count} </span>
      <button onClick={handleDecrement}> - </button>
      <button id='reset' onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
