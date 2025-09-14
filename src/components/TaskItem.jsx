import React, { useState } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  IconButton,
  TextField,
  Chip,
  Fade,
  Slide,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { useTheme } from '../contexts/ThemeContext';
import Card from './Card';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ 
    ...task, 
    dueDate: task.dueDate ? moment(task.dueDate) : null 
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const { colors, gradients, shadows, isDarkMode } = useTheme();

  const handleToggleComplete = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleUpdate = () => {
    const formattedTask = {
      ...editedTask,
      dueDate: editedTask.dueDate ? editedTask.dueDate.format('YYYY-MM-DD') : ''
    };
    onUpdateTask(formattedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ 
      ...task, 
      dueDate: task.dueDate ? moment(task.dueDate) : null 
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDeleteTask(task.id);
    }, 300);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date() && !task.completed;
  };

  if (isEditing) {
    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Card sx={{ mb: 2, p: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              placeholder="Task title..."
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: colors.surface,
                  color: colors.text,
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
                value={editedTask.dueDate}
                onChange={(newValue) => setEditedTask({ ...editedTask, dueDate: newValue })}
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
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
              <IconButton onClick={handleCancel} color="error">
                <CancelIcon />
              </IconButton>
              <IconButton 
                onClick={handleUpdate} 
                sx={{ 
                  background: gradients.primary,
                  color: 'white',
                  '&:hover': {
                    background: gradients.primary,
                    opacity: 0.9,
                  },
                }}
              >
                <SaveIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>
      </Slide>
    );
  }

  return (
    <Fade in={!isDeleting} timeout={300}>
      <Card
        sx={{
          mb: 2,
          p: 3,
          opacity: task.completed ? 0.7 : 1,
          transform: task.completed ? 'scale(0.98)' : 'scale(1)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden',
          '&::before': task.completed ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: gradients.primary,
          } : {},
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Checkbox
            checked={!!task.completed}
            onChange={handleToggleComplete}
            icon={<RadioButtonUncheckedIcon sx={{ fontSize: 28 }} />}
            checkedIcon={<CheckCircleIcon sx={{ fontSize: 28 }} />}
            sx={{
              color: colors.primary,
              '&.Mui-checked': {
                color: colors.success,
              },
              '&:hover': {
                background: 'rgba(99, 102, 241, 0.1)',
              },
            }}
          />
          
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? colors.textSecondary : colors.text,
                fontWeight: task.completed ? 400 : 500,
                mb: task.dueDate ? 1 : 0,
                transition: 'all 0.3s ease',
              }}
            >
              {task.title}
            </Typography>
            
            {task.dueDate && (
              <Chip
                icon={<CalendarTodayIcon sx={{ fontSize: 16 }} />}
                label={formatDate(task.dueDate)}
                size="small"
                sx={{
                  background: isOverdue(task.dueDate) 
                    ? colors.error + '20' 
                    : task.completed 
                      ? colors.success + '20'
                      : colors.primary + '20',
                  color: isOverdue(task.dueDate)
                    ? colors.error
                    : task.completed
                      ? colors.success
                      : colors.primary,
                  border: `1px solid ${isOverdue(task.dueDate) 
                    ? colors.error + '40' 
                    : task.completed 
                      ? colors.success + '40'
                      : colors.primary + '40'}`,
                  '& .MuiChip-icon': {
                    color: 'inherit',
                  },
                }}
              />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              onClick={() => setIsEditing(true)}
              sx={{
                color: colors.textSecondary,
                '&:hover': {
                  color: colors.primary,
                  background: `${colors.primary}10`,
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              sx={{
                color: colors.textSecondary,
                '&:hover': {
                  color: colors.error,
                  background: `${colors.error}10`,
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Fade>
  );
};

export default TaskItem;
