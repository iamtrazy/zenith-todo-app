import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TaskForm = ({ open, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const { colors, gradients, shadows, isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTask({ title, dueDate });
    setTitle('');
    setDueDate('');
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDueDate('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: `linear-gradient(145deg, ${colors.surface} 0%, ${colors.surfaceVariant} 100%)`,
          borderRadius: 4,
          boxShadow: shadows.large,
          border: `1px solid ${colors.border}`,
        },
      }}
    >
      <DialogTitle
        sx={{
          background: gradients.primary,
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '60px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <CalendarTodayIcon />
          <Typography variant="h6" component="span">
            Create New Task
          </Typography>
        </Box>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'white',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            autoFocus
            fullWidth
            label="Task Title"
            placeholder="What needs to be done?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: colors.surface,
                color: colors.text,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary,
                  borderWidth: 2,
                },
                '& .MuiOutlinedInput-input': {
                  color: colors.text,
                  '&::placeholder': {
                    color: colors.textSecondary,
                    opacity: 1,
                  },
                },
              },
              '& .MuiInputLabel-root': {
                color: colors.textSecondary,
                '&.Mui-focused': {
                  color: colors.primary,
                },
              },
            }}
          />
          <TextField
            fullWidth
            type="date"
            label="Due Date (Optional)"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: colors.surface,
                color: colors.text,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: colors.primary,
                  borderWidth: 2,
                },
                '& .MuiOutlinedInput-input': {
                  color: colors.text,
                  '&::-webkit-calendar-picker-indicator': {
                    filter: isDarkMode ? 'invert(1)' : 'none',
                    cursor: 'pointer',
                  },
                  '&::-webkit-datetime-edit': {
                    color: colors.text,
                  },
                  '&::-webkit-datetime-edit-fields-wrapper': {
                    color: colors.text,
                  },
                  '&::-webkit-datetime-edit-text': {
                    color: colors.text,
                  },
                  '&::-webkit-datetime-edit-month-field': {
                    color: colors.text,
                  },
                  '&::-webkit-datetime-edit-day-field': {
                    color: colors.text,
                  },
                  '&::-webkit-datetime-edit-year-field': {
                    color: colors.text,
                  },
                },
              },
              '& .MuiInputLabel-root': {
                color: colors.textSecondary,
                '&.Mui-focused': {
                  color: colors.primary,
                },
              },
            }}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1,
              borderColor: colors.border,
              color: colors.text,
              '&:hover': {
                borderColor: colors.primary,
                background: `${colors.primary}10`,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!title.trim()}
            sx={{
              background: gradients.primary,
              borderRadius: 2,
              px: 3,
              py: 1,
              boxShadow: shadows.medium,
              '&:hover': {
                boxShadow: shadows.large,
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: colors.border,
                color: colors.textSecondary,
              },
            }}
          >
            Create Task
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default TaskForm;
