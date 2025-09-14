import React from 'react';
import { Paper, Box } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const Card = ({ children, sx = {}, ...props }) => {
  const { glassmorphism, shadows, isDarkMode } = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        background: glassmorphism.background,
        backdropFilter: glassmorphism.backdrop,
        border: glassmorphism.border,
        borderRadius: 3,
        boxShadow: shadows.medium,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: isDarkMode
            ? 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)'
            : 'linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.1), transparent)',
        },
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: shadows.large,
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default Card;
