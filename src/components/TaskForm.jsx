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
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useTheme } from '../contexts/ThemeContext';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TaskForm = ({ open, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const { colors, gradients, shadows, isDarkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const formattedDate = dueDate ? dueDate.format('YYYY-MM-DD') : '';
    onAddTask({ title, dueDate: formattedDate });
    setTitle('');
    setDueDate(null);
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDueDate(null);
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
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DatePicker
              label="Due Date (Optional)"
              value={dueDate}
              onChange={(newValue) => setDueDate(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: 'outlined',
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: colors.surface,
                      color: colors.text,
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.primary,
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: colors.primary,
                        borderWidth: 2,
                      },
                      '& .MuiOutlinedInput-input': {
                        color: `${colors.text} !important`,
                        '&::placeholder': {
                          color: `${colors.textSecondary} !important`,
                          opacity: 1,
                        },
                      },
                      '& .MuiInputAdornment-root': {
                        '& .MuiIconButton-root': {
                          color: `${colors.text} !important`,
                          '&:hover': {
                            backgroundColor: 'transparent',
                          },
                        },
                        '& .MuiSvgIcon-root': {
                          color: `${colors.text} !important`,
                        },
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: `${colors.textSecondary} !important`,
                      '&.Mui-focused': {
                        color: `${colors.primary} !important`,
                      },
                    },
                    // Force override for DatePicker specific elements
                    '& .MuiInputBase-input': {
                      color: `${colors.text} !important`,
                    },
                    '& .MuiInputBase-root': {
                      color: `${colors.text} !important`,
                    },
                    '& input': {
                      color: `${colors.text} !important`,
                    },
                    '& .MuiInputAdornment-root .MuiSvgIcon-root': {
                      color: `${colors.text} !important`,
                    },
                  },
                },
                popper: {
                  sx: {
                    '& .MuiPaper-root': {
                      backgroundColor: colors.surface,
                      color: colors.text,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 2,
                      boxShadow: shadows.medium,
                    },
                    '& .MuiPickersCalendarHeader-root': {
                      color: colors.text,
                    },
                    '& .MuiPickersDay-root': {
                      color: colors.text,
                      '&:hover': {
                        backgroundColor: `${colors.primary}20`,
                      },
                      '&.Mui-selected': {
                        backgroundColor: colors.primary,
                        color: 'white',
                        '&:hover': {
                          backgroundColor: colors.primary,
                        },
                      },
                    },
                    '& .MuiDayCalendar-weekContainer': {
                      color: colors.text,
                    },
                    '& .MuiPickersCalendarHeader-label': {
                      color: colors.text,
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
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
