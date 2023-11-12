import { useReducer } from 'react';
import './App.css';

const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: 'reset'
}


const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return { count: state.count + 1 };

    case ACTIONS.DECREMENT:
      if (state.count === 0) {
        alert("Counter has reached its end!");
        return state;
      } else {
        return { count: state.count - 1 };
      }

    case ACTIONS.RESET:
      return { count: 0 };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { count: 0 })


  const handleIncreament = () => {
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
      <button onClick={handleIncreament}> + </button>
      <span> {state.count} </span>
      <button onClick={handleDecrement}> - </button>
      <button id='reset' onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
