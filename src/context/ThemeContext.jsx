import React, { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider(props) {
  const [theme, setTheme] = useState("light");

  useEffect(
    function () {
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
    },
    [theme]
  );

  function toggleTheme() {
    setTheme(function (prev) {
      return prev === "light" ? "dark" : "light";
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
