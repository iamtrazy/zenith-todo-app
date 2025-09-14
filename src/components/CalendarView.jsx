import React from "react";
import { Box, Typography } from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useTheme } from "../contexts/ThemeContext";
import Card from "./Card";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarView({ tasks }) {
  const { colors, gradients, isDarkMode } = useTheme();
  
  const events = tasks
    .filter(task => task.dueDate)
    .map((task) => ({
    id: task.id,
    title: task.title,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    allDay: true,
      completed: task.completed,
    }));

  const eventStyleGetter = (event) => {
    const isCompleted = event.completed;
    const isOverdue = new Date(event.start) < new Date() && !isCompleted;
    
    let backgroundColor = colors.primary;
    let borderColor = colors.primary;
    let textColor = isDarkMode ? '#ffffff' : '#ffffff';
    
    if (isCompleted) {
      backgroundColor = colors.success;
      borderColor = colors.success;
      textColor = '#ffffff';
    } else if (isOverdue) {
      backgroundColor = colors.error;
      borderColor = colors.error;
      textColor = '#ffffff';
    } else {
      textColor = '#ffffff';
    }
    
    return {
      style: {
        backgroundColor: backgroundColor,
        border: `2px solid ${borderColor}`,
        borderRadius: '8px',
        color: textColor,
        fontWeight: 600,
        fontSize: '0.75rem',
        padding: '4px 8px',
        boxShadow: isDarkMode 
          ? '0 2px 8px rgba(0, 0, 0, 0.3)' 
          : '0 2px 8px rgba(0, 0, 0, 0.15)',
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
      },
    };
  };

  return (
    <Card sx={{ p: 4, minHeight: 700, position: 'relative', overflow: 'hidden' }}>
      {/* Header with gradient background */}
      <Box
        sx={{
          background: gradients.primary,
          borderRadius: 3,
          p: 3,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), transparent)',
            pointerEvents: 'none',
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: 'white',
            fontWeight: 800,
            textAlign: 'center',
            mb: 1,
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            letterSpacing: '-0.02em',
          }}
        >
          Task Calendar
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          Visualize your tasks and deadlines
        </Typography>
      </Box>
      
      <Box
        sx={{
          width: '100%',
          '& .rbc-calendar': {
            background: 'transparent',
            color: colors.text,
            fontFamily: 'Inter, system-ui, sans-serif',
            width: '100%',
          },
          '& .rbc-toolbar': {
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            '& .rbc-toolbar-label': {
              color: colors.text,
              fontWeight: 800,
              fontSize: '1.5rem',
              background: gradients.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.01em',
              order: 2,
            },
            '& .rbc-btn-group': {
              order: 1,
              display: 'flex',
              gap: 1,
              '& button': {
                color: colors.text,
                backgroundColor: colors.surface,
                border: `2px solid ${colors.border}`,
                borderRadius: 3,
                padding: '8px 16px',
                fontWeight: 600,
                fontSize: '0.875rem',
                textTransform: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  backgroundColor: `${colors.primary}10`,
                  borderColor: colors.primary,
                  transform: 'translateY(-1px)',
                  boxShadow: `0 4px 12px ${colors.primary}20`,
                },
                '&.rbc-active': {
                  background: gradients.primary,
                  color: 'white',
                  borderColor: colors.primary,
                  boxShadow: `0 4px 12px ${colors.primary}30`,
                },
              },
            },
          },
          '& .rbc-month-view': {
            borderRadius: '16px',
            overflow: 'hidden',
            background: colors.surface,
            boxShadow: `0 8px 32px ${colors.primary}10`,
            border: `1px solid ${colors.border}`,
            width: '100%',
            tableLayout: 'fixed',
          },
          '& .rbc-month-view table': {
            width: '100%',
            tableLayout: 'fixed',
          },
          '& .rbc-month-view tbody': {
            width: '100%',
          },
          '& .rbc-month-view tr': {
            width: '100%',
          },
          '& .rbc-month-view td': {
            width: '14.28%',
            verticalAlign: 'top',
          },
          '& .rbc-header': {
            background: isDarkMode 
              ? 'linear-gradient(135deg, rgba(26, 26, 46, 0.9) 0%, rgba(22, 33, 62, 0.8) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(241, 245, 249, 0.8) 100%)',
            color: colors.text,
            fontWeight: 700,
            padding: '16px 12px',
            borderBottom: `2px solid ${colors.border}`,
            fontSize: '0.875rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textAlign: 'center',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '2px',
              background: gradients.primary,
              borderRadius: '1px',
            },
          },
          '& .rbc-date-cell': {
            color: colors.text,
            padding: '12px 8px',
            fontWeight: 500,
            fontSize: '0.875rem',
            position: 'relative',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: `${colors.primary}08`,
              transform: 'scale(1.02)',
            },
          },
          '& .rbc-off-range-bg': {
            background: isDarkMode ? 'rgba(26, 26, 46, 0.1)' : 'rgba(241, 245, 249, 0.2)',
          },
          '& .rbc-off-range': {
            color: colors.textSecondary,
            opacity: 0.5,
          },
          '& .rbc-current-time-indicator': {
            background: gradients.primary,
            height: '3px',
            borderRadius: '2px',
          },
          '& .rbc-event': {
            borderRadius: '8px',
            border: 'none',
            padding: '6px 10px',
            fontSize: '0.75rem',
            fontWeight: 600,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
            },
          },
          '& .rbc-event-content': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: 'inherit',
            fontWeight: 'inherit',
          },
          '& .rbc-today': {
            background: isDarkMode 
              ? `${colors.primary}15` 
              : `${colors.primary}10`,
            backgroundColor: isDarkMode 
              ? `${colors.primary}15` 
              : `${colors.primary}10`,
            fontWeight: 600,
            color: colors.primary,
            borderRadius: '6px',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '2px',
              left: '2px',
              right: '2px',
              bottom: '2px',
              border: `2px solid ${colors.primary}`,
              borderRadius: '4px',
              opacity: 0.3,
            },
          },
        }}
      >
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
          eventPropGetter={eventStyleGetter}
          views={['month']}
          defaultView="month"
          style={{ height: 600, width: '100%', maxWidth: '100%' }}
        />
      </Box>
      
      {events.length === 0 && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            textAlign: 'center',
            background: `linear-gradient(135deg, ${colors.surfaceVariant} 0%, ${colors.surface} 100%)`,
            borderRadius: 4,
            border: `2px dashed ${colors.border}`,
            mt: 4,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: gradients.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
              opacity: 0.1,
            }}
          >
            <CalendarTodayIcon sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: colors.text,
              fontWeight: 700,
              mb: 2,
              background: gradients.primary,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            No tasks scheduled
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.textSecondary,
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            Add due dates to your tasks to see them beautifully displayed on the calendar
          </Typography>
        </Box>
      )}
    </Card>
  );
}

export default CalendarView;
