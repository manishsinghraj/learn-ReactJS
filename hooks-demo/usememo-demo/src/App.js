import './App.css';
import React, { useState, useMemo, useEffect } from 'react';



const slowFunction = (number) => {
  console.log("calling slow fn")
  for (let i = 0; i <= 100000000; i++) {
  }
  return number * 2;
}

function App() {

  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  const doubleNumber = useMemo(() => { return slowFunction(number) }, [number]);

  const theme = useMemo(() => {
    return {
      background: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black',
      width: '40px'
    }
  }, [dark])

  



  useEffect(() => {
    console.log("theme changed")
  }, [dark]);

  return (
    <div className="App">
      <input className="custom" type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}></input>
      <button className="custom" onClick={() => setDark(prev => !prev)}>ToggleTheme</button>
      <div style={{...theme, width:"400px", textAlign:'center'}}>{doubleNumber}</div>
    </div>
  );
}

export default App;
