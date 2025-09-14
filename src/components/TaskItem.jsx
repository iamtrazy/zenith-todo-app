import React from "react";
import { ListItem, ListItemText, Checkbox, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function TaskItem({ task, onUpdateTask, onDeleteTask }) {
  const handleToggleComplete = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => onDeleteTask(task.id)}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        checked={!!task.completed}
        tabIndex={-1}
        disableRipple
        onChange={handleToggleComplete}
      />
      <ListItemText
        primary={task.title}
        secondary={task.dueDate}
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      />
    </ListItem>
  );
}

export default TaskItem;
