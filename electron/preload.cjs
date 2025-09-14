const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getTasks: () => ipcRenderer.invoke("get-tasks"),
  addTask: (task) => ipcRenderer.invoke("add-task", task),
  updateTask: (task) => ipcRenderer.invoke("update-task", task),
  deleteTask: (id) => ipcRenderer.invoke("delete-task", id),
});
