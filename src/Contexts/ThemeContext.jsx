import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  const toggleTheme = () => {
    setIsDarkMode(prev => {
      const newTheme = !prev;
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
      return newTheme;
    });
  };

  // Apply theme to document for DaisyUI and custom classes
  useEffect(() => {
    const html = document.querySelector('html');
    
    // Set DaisyUI theme attribute
    html.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // Add/remove dark class for custom styling
    if (isDarkMode) {
      html.classList.add('dark');
      // Ensure dark mode has proper background
      document.body.style.backgroundColor = '#1f2937'; // gray-800
      document.body.style.color = '#f9fafb'; // gray-50
    } else {
      html.classList.remove('dark');
      // Ensure light mode has proper background
      document.body.style.backgroundColor = '#ffffff'; // white
      document.body.style.color = '#111827'; // gray-900
    }
    
    // Save to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const value = {
    isDarkMode,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;