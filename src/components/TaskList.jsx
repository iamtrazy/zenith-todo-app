import React from "react";
import { List } from "@mui/material";
import TaskItem from "./TaskItem";

function TaskList({ tasks, onUpdateTask, onDeleteTask }) {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateTask={onUpdateTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </List>
  );
}

export default TaskList;
