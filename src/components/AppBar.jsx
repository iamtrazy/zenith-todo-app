import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';
import ViewListIcon from '@mui/icons-material/ViewList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const CustomAppBar = ({ view, onViewChange }) => {
  const { colors, gradients, shadows, isDarkMode } = useTheme();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: isDarkMode
          ? 'rgba(15, 15, 35, 0.8)'
          : 'rgba(250, 251, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${colors.border}`,
        boxShadow: shadows.small,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: gradients.primary,
        },
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: shadows.medium,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: 'white',
                fontWeight: 700,
                fontSize: '1.2rem',
              }}
            >
              Z
            </Typography>
          </Box>
          <Typography
            variant="h5"
            component="div"
            sx={{
              fontWeight: 700,
              background: gradients.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            Zenith To-Do
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          <Button
            variant={view === 'list' ? 'contained' : 'outlined'}
            onClick={() => onViewChange('list')}
            startIcon={<ViewListIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
            sx={{
              borderRadius: 2,
              px: { xs: 1.5, sm: 2 },
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              minWidth: { xs: 'auto', sm: 'auto' },
              ...(view === 'list' ? {
                background: gradients.primary,
                boxShadow: shadows.medium,
                '&:hover': {
                  boxShadow: shadows.large,
                },
              } : {
                borderColor: colors.border,
                color: colors.text,
                '&:hover': {
                  borderColor: colors.primary,
                  background: `${colors.primary}10`,
                },
              }),
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              List
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              L
            </Box>
          </Button>
          <Button
            variant={view === 'calendar' ? 'contained' : 'outlined'}
            onClick={() => onViewChange('calendar')}
            startIcon={<CalendarMonthIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
            sx={{
              borderRadius: 2,
              px: { xs: 1.5, sm: 2 },
              py: 1,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              minWidth: { xs: 'auto', sm: 'auto' },
              ...(view === 'calendar' ? {
                background: gradients.primary,
                boxShadow: shadows.medium,
                '&:hover': {
                  boxShadow: shadows.large,
                },
              } : {
                borderColor: colors.border,
                color: colors.text,
                '&:hover': {
                  borderColor: colors.primary,
                  background: `${colors.primary}10`,
                },
              }),
            }}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Calendar
            </Box>
            <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
              C
            </Box>
          </Button>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
