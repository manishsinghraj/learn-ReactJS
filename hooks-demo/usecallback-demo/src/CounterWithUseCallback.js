import React, { useState, useCallback } from 'react';

function CounterWithUseCallback() {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState("");

    const handleIncrement = useCallback(() => {
        console.log("With useCallback: Function called!");

        // Simulating a heavy computation
        for (let i = 0; i < 1000000000; i++) {
            Math.sqrt(i);
        }

        setCount((prevCount) => prevCount + 1);
    }, []); // Empty dependency array ensures this function is created only once

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

export default CounterWithUseCallback;
