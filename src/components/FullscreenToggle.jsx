import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useTheme } from '../contexts/ThemeContext';

const FullscreenToggle = () => {
  const { colors, gradients, shadows, isDarkMode } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Check initial fullscreen state
  useEffect(() => {
    const checkFullscreenState = async () => {
      if (window.electronAPI) {
        try {
          const fullscreenState = await window.electronAPI.isFullscreen();
          setIsFullscreen(fullscreenState);
        } catch (error) {
          console.error('Error checking fullscreen state:', error);
        }
      }
    };
    checkFullscreenState();
  }, []);

  const handleToggleFullscreen = async () => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.toggleFullscreen();
        // Update state after a short delay to allow the window to update
        setTimeout(async () => {
          const fullscreenState = await window.electronAPI.isFullscreen();
          setIsFullscreen(fullscreenState);
        }, 100);
      } catch (error) {
        console.error('Error toggling fullscreen:', error);
      }
    }
  };

  return (
    <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}>
      <IconButton
        onClick={handleToggleFullscreen}
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
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default FullscreenToggle;
