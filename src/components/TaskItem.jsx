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
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isDeleting, setIsDeleting] = useState(false);
  const { colors, gradients, shadows, isDarkMode } = useTheme();

  const handleToggleComplete = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleUpdate = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ ...task });
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
            <TextField
              fullWidth
              type="date"
              variant="outlined"
              value={editedTask.dueDate}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: colors.surface,
                  color: colors.text,
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
