import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import AddIcon from '@mui/icons-material/Add';

const FloatingActionButton = ({ onClick, ...props }) => {
  const { gradients, shadows, isDarkMode } = useTheme();

  return (
    <Tooltip title="Add New Task" placement="left">
      <Fab
        onClick={onClick}
        sx={{
          position: 'fixed',
          bottom: { xs: 16, sm: 24 },
          right: { xs: 16, sm: 24 },
          background: gradients.primary,
          color: 'white',
          boxShadow: shadows.large,
          width: { xs: 56, sm: 64 },
          height: { xs: 56, sm: 64 },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'scale(1.1) rotate(90deg)',
            boxShadow: `${shadows.large}, 0 0 20px rgba(99, 102, 241, 0.4)`,
          },
          '&:active': {
            transform: 'scale(0.95)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '50%',
            background: isDarkMode
              ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent)'
              : 'linear-gradient(45deg, rgba(255, 255, 255, 0.2), transparent)',
            opacity: 0,
            transition: 'opacity 0.3s ease',
          },
          '&:hover::before': {
            opacity: 1,
          },
        }}
        {...props}
      >
        <AddIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
      </Fab>
    </Tooltip>
  );
};

export default FloatingActionButton;
