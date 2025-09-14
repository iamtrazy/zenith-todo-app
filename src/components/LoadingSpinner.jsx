import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  const { colors, gradients } = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        gap: 2,
      }}
    >
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          color: colors.primary,
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round',
          },
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: colors.textSecondary,
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
