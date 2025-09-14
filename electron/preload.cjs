const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  getTasks: () => ipcRenderer.invoke("get-tasks"),
  addTask: (task) => ipcRenderer.invoke("add-task", task),
  updateTask: (task) => ipcRenderer.invoke("update-task", task),
  deleteTask: (id) => ipcRenderer.invoke("delete-task", id),
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke("window-minimize"),
  maximizeWindow: () => ipcRenderer.invoke("window-maximize"),
  closeWindow: () => ipcRenderer.invoke("window-close"),
  toggleFullscreen: () => ipcRenderer.invoke("window-toggle-fullscreen"),
  isFullscreen: () => ipcRenderer.invoke("window-is-fullscreen"),
});
