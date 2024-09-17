import './App.css';
import { useState, useEffect, useRef } from 'react';

function App() {
  const [name, setName] = useState("");

  const inputRef = useRef();
  const focus = () => {
    console.log(inputRef.current.focus())
  }
  



  const prevName = useRef();  // used to strore prevValue
  // used to strore prevValue
  // persit data betwwen renders can only be achieved by useRef
  useEffect(() => {
    prevName.current = name
  }, [name])




  return (
    <div className="App">
      <input ref={inputRef} value={name} onChange={e => setName(e.target.value)}></input>
      <button onClick={focus}>Focus</button>


      <div>My name is {name} and it used to be {prevName.current}</div>
    </div>
  );
}

export default App;

