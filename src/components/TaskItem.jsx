import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

function TaskItem({ task, onUpdateTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleToggleComplete = () => {
    onUpdateTask({ ...task, completed: !task.completed });
  };

  const handleUpdate = () => {
    onUpdateTask(editedTask);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <ListItem>
        <Box component="form" sx={{ display: "flex", width: "100%", gap: 2 }}>
          <TextField
            variant="standard"
            fullWidth
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
          />
          <TextField
            type="date"
            variant="standard"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
          />
          <IconButton onClick={handleUpdate}>
            <SaveIcon />
          </IconButton>
        </Box>
      </ListItem>
    );
  }

  return (
    <ListItem
      secondaryAction={
        <>
          <IconButton edge="end" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => onDeleteTask(task.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
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
