import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');

  const toggleTheme = () => setDarkMode((prevMode) => !prevMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
