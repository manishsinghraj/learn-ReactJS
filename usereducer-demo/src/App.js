import './App.css';
import React, { useReducer } from 'react'

const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset'
}


const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };
    case ACTIONS.DECREMENT:
      return { count: state.count - 1 };
    case ACTIONS.RESET:
      return { count: 0 };
    default:
      return state;
  }
}

function App() {

  const [state, dispatch] = useReducer(reducer, { count: 0 });

  const handleIncrement = () => {
    dispatch({ type: ACTIONS.INCREMENT });
  }

  const handleDecrement = () => {
    dispatch({ type: ACTIONS.DECREMENT });
  }

  const handleReset = () => {
    dispatch({ type: ACTIONS.RESET });
  }

  return (
    <div className="App">
      <button onClick={handleIncrement}>+</button>
      <span>{state.count}</span>
      <button onClick={handleDecrement}>-</button>
      <button onClick={handleReset} id='reset'>Reset</button>
    </div>
  );
}

export default App;
