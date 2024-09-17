The primary purpose of this setup is to illustrate how the slow function affects the rendering speed. The number, which changes as part of the state, has to pass through a slow function that doubles it. Even though the slow function isn't directly linked to the theme toggle function, the rendering of the entire component slows down, impacting the overall performance.


```js
import './App.css';
import React, {useState} from 'react';



const slowFunction = (number) => {
  for(let i = 0; i<=100000000; i++){
  }
  return number * 2;
}

function App() {

  const [number, setNumber] = useState(0);
  const [dark,setDark] = useState(false);

  const doubleNumber = slowFunction(number);

  const theme = {
    background : dark ? 'black' : 'white',
    color : dark ? 'white' : 'black',
    width : '40px'
  }

  return (
    <div className="App">
      <input className="custom" type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}></input>
      <button className="custom" onClick={() => setDark(prev => !prev)}>ToggleTheme</button>
      <div style={theme}>{doubleNumber}</div>
    </div>
  );
}

export default App;

```


now we can make use of useMemo and add depedency as number and call slowfunction only when number state changes.
hence we can avoid rendering slowfunction when toggle is clicked.



```js 
import './App.css';
import React, { useState, useMemo } from 'react';



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

  const theme = {
    background: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black',
    width: '40px'
  }

  return (
    <div className="App">
      <input className="custom" type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}></input>
      <button className="custom" onClick={() => setDark(prev => !prev)}>ToggleTheme</button>
      <div style={theme}>{doubleNumber}</div>
    </div>
  );
}

export default App;

```
2 common use cases of useMemo:
1. When you want to make a slow function wrap inside useMemo so that doesn't re-compute every single time you render your component and it only computed when you acually need the value from that function since the inputs actually change
2. Whenever you want to make sure the reference of an object or an array is exactly the same as it was the last time you rendered if none of the internal workings changed, you're gonna want to useMemo here to make sure that you only update the reference of that object whenever the actual contents of the object change instead of updating every single time you render

`so how about calling useMemo for every thing?`
While you technically could use useMemo for everything, it's essential to understand the intended use cases for each React hook and choose the one that best fits the situation. Overusing useMemo for scenarios where it's not necessary can lead to unnecessary complexity and might even hinder performance in some cases.

Use useMemo when:
Memoization is Needed: You have a computationally expensive function, and you want to memoize its result to avoid unnecessary recalculations.

Reference Equality Matters: You want to compare the reference equality of the result between renders.
<br>
means?


If you use useEffect with a dependency on the theme object, it would indeed lead to the useEffect running on every render because objects in JavaScript are reference types, and their reference changes even if the content remains the same.

but to avoid this you can add dependency as dark property, that would work and only renders when dark value changes.

But still thinking of some other case and logic and you want to make use of useMemo you can do  below
<hr>
suppose i want to make use of theme as usememo, assuming it as some complex logic which wouldeffect the performence

hence if you are thinking of using usememo for theme object and its dependency as theme, it would still render for the numbers state changes.



```js  
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

  const theme = {
    background: dark ? 'black' : 'white',
    color: dark ? 'white' : 'black',
    width: '40px'
  }


  useEffect(() => {
    console.log("theme changed")
  }, [theme]);

  return (
    <div className="App">
      <input className="custom" type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))}></input>
      <button className="custom" onClick={() => setDark(prev => !prev)}>ToggleTheme</button>
      <div style={theme}>{doubleNumber}</div>
    </div>
  );
}

export default App;


```
solution?
make ur dependency as dark, for both usememo and useffect
```js 
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

```
