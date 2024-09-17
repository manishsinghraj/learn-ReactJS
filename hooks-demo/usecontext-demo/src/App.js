import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "./context/ThemeContext"

import ThemeChangers from "./components/ThemeChangers";

function App() {

  const [theme, setTheme] = useState(themes.light);


  useEffect(() => {
    const body = document.body;
    const lightThemeClasses = ["bg-light", "text-dark"];
    const darkThemeClasses = ["bg-dark", "text-light"];

    if (theme === themes.light) {
      body.classList.add(...lightThemeClasses);
    } else if (theme === themes.dark) {
      body.classList.add(...darkThemeClasses);
    }

    return () => {
      body.classList.remove(...lightThemeClasses, ...darkThemeClasses);
    };
  }, [theme]);


  const handleOnclick = () => {
    theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light)
  };



  return (
    <>
      <ThemeContext.Provider value={{theme,handleOnclick}}>
        <div className="main-container">
          <h1 className="text-center">Light Dark Toggle Theme</h1>
          <ThemeChangers></ThemeChangers>
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
