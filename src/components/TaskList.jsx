import React from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { useTheme } from '../contexts/ThemeContext';
import TaskItem from './TaskItem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const { colors, gradients } = useTheme();
  
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <Fade in={true} timeout={500}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              opacity: 0.1,
            }}
          >
            <CheckCircleIcon sx={{ fontSize: 60, color: 'white' }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: colors.textSecondary,
              fontWeight: 500,
              mb: 1,
            }}
          >
            No tasks yet
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.textSecondary,
              maxWidth: 300,
            }}
          >
            Click the + button to create your first task and start organizing your day
          </Typography>
        </Box>
      </Fade>
    );
  }

  return (
    <Box sx={{ pb: 10 }}>
      {pendingTasks.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{
              color: colors.text,
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Pending Tasks ({pendingTasks.length})
          </Typography>
          {pendingTasks.map((task, index) => (
            <Fade in={true} timeout={300} style={{ transitionDelay: `${index * 100}ms` }}>
              <div key={task.id}>
                <TaskItem
                  task={task}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                />
              </div>
            </Fade>
          ))}
        </Box>
      )}

      {completedTasks.length > 0 && (
        <Box>
          <Typography
            variant="h6"
            sx={{
              color: colors.textSecondary,
              fontWeight: 600,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            Completed ({completedTasks.length})
          </Typography>
          {completedTasks.map((task, index) => (
            <Fade in={true} timeout={300} style={{ transitionDelay: `${index * 50}ms` }}>
              <div key={task.id}>
                <TaskItem
                  task={task}
                  onUpdateTask={onUpdateTask}
                  onDeleteTask={onDeleteTask}
                />
              </div>
            </Fade>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TaskList;
