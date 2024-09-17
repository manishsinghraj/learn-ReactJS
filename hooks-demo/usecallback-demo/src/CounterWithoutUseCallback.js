import React, { useState } from 'react';

function CounterWithoutUseCallback() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");

    const handleIncrement = () => {
        console.log("Without useCallback: Function recreated!");

        // Simulating a heavy computation
        for (let i = 0; i < 1000000000; i++) {
            Math.sqrt(i);
        }

        setCount((prevCount) => prevCount + 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleIncrement}>Increment</button>

            {/* Input field that causes re-render without triggering the heavy function */}
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type something..."
            />
        </div>
    );
}

export default CounterWithoutUseCallback;
