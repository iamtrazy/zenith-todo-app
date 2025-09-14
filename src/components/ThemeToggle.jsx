import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, colors, gradients } = useTheme();

  return (
    <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: colors.text,
          background: isDarkMode 
            ? 'rgba(255, 255, 255, 0.1)' 
            : 'rgba(0, 0, 0, 0.05)',
          border: `1px solid ${colors.border}`,
          borderRadius: 2,
          WebkitAppRegion: 'no-drag', // Prevent dragging on interactive elements
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.05)',
            background: isDarkMode 
              ? 'rgba(255, 255, 255, 0.2)' 
              : 'rgba(0, 0, 0, 0.1)',
            borderColor: colors.primary,
            boxShadow: `0 4px 12px ${colors.primary}20`,
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
        }}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
