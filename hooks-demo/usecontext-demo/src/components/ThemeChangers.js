import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';


const ThemeChangers = () => {
  const { theme, handleOnclick } = useContext(ThemeContext);

  return (
    <>
      <h4>My current Theme is: {theme}</h4>
      <button
        onClick={handleOnclick}
        className={`btn  ${theme === "light" ? "btn-dark" : "btn-light light"}`}
      >
        {theme === 'dark' ? "Light" : "Dark"}
      </button>
    </>
  );
};

export default ThemeChangers;
