import './App.css';
import CounterWithUseCallback from './CounterWithUseCallback';
import CounterWithoutUseCallback from './CounterWithoutUseCallback';

function App() {
  return (
    <div className="App">
      <CounterWithoutUseCallback/>
      <CounterWithUseCallback />

    </div>
  );
}

export default App;
