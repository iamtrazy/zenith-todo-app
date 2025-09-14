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
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('zenith-theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('zenith-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: isDarkMode ? '#6366f1' : '#4f46e5',
      secondary: isDarkMode ? '#ec4899' : '#db2777',
      background: isDarkMode ? '#0f0f23' : '#fafbff',
      surface: isDarkMode ? '#1a1a2e' : '#ffffff',
      surfaceVariant: isDarkMode ? '#16213e' : '#f1f5f9',
      text: isDarkMode ? '#e2e8f0' : '#1e293b',
      textSecondary: isDarkMode ? '#94a3b8' : '#64748b',
      border: isDarkMode ? '#334155' : '#e2e8f0',
      success: isDarkMode ? '#10b981' : '#059669',
      warning: isDarkMode ? '#f59e0b' : '#d97706',
      error: isDarkMode ? '#ef4444' : '#dc2626',
      accent: isDarkMode ? '#8b5cf6' : '#7c3aed',
    },
    gradients: {
      primary: isDarkMode 
        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        : 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
      secondary: isDarkMode
        ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
        : 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
      background: isDarkMode
        ? 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)'
        : 'linear-gradient(135deg, #fafbff 0%, #f1f5f9 50%, #e2e8f0 100%)',
      card: isDarkMode
        ? 'linear-gradient(145deg, rgba(26, 26, 46, 0.8) 0%, rgba(22, 33, 62, 0.6) 100%)'
        : 'linear-gradient(145deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)',
    },
    shadows: {
      small: isDarkMode 
        ? '0 2px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)'
        : '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      medium: isDarkMode
        ? '0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)'
        : '0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
      large: isDarkMode
        ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.4)'
        : '0 8px 32px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.15)',
    },
    glassmorphism: {
      background: isDarkMode
        ? 'rgba(26, 26, 46, 0.25)'
        : 'rgba(255, 255, 255, 0.25)',
      backdrop: 'blur(10px)',
      border: isDarkMode
        ? '1px solid rgba(255, 255, 255, 0.1)'
        : '1px solid rgba(255, 255, 255, 0.2)',
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
