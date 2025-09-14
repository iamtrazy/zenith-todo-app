import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundArt = () => {
  const { isDarkMode, gradients } = useTheme();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: gradients.background,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          background: isDarkMode
            ? `radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
            : `radial-gradient(circle at 20% 80%, rgba(79, 70, 229, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.05) 0%, transparent 50%),
               radial-gradient(circle at 40% 40%, rgba(124, 58, 237, 0.05) 0%, transparent 50%)`,
          animation: 'float 20s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isDarkMode
            ? `linear-gradient(45deg, transparent 30%, rgba(99, 102, 241, 0.03) 50%, transparent 70%),
               linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.03) 50%, transparent 70%)`
            : `linear-gradient(45deg, transparent 30%, rgba(79, 70, 229, 0.02) 50%, transparent 70%),
               linear-gradient(-45deg, transparent 30%, rgba(236, 72, 153, 0.02) 50%, transparent 70%)`,
          animation: 'shimmer 15s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '33%': {
            transform: 'translate(30px, -30px) rotate(120deg)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) rotate(240deg)',
          },
        },
        '@keyframes shimmer': {
          '0%, 100%': {
            opacity: 0.3,
          },
          '50%': {
            opacity: 0.6,
          },
        },
      }}
    />
  );
};

export default BackgroundArt;
