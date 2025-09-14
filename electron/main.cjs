const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("./database.cjs");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // In development, load the Vite server URL.
  // In production, load the built HTML file.
  if (process.env.VITE_DEV_SERVER_URL) {
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    // Open the DevTools.
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(app.getAppPath(), "dist", "index.html"));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// IPC handlers for database operations
ipcMain.handle("get-tasks", async () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM tasks ORDER BY id DESC", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
});

ipcMain.handle("add-task", async (event, task) => {
  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO tasks (title, dueDate) VALUES (?, ?)",
      [task.title, task.dueDate],
      function (err) {
        if (err) reject(err);
        resolve({ id: this.lastID, ...task });
      }
    );
  });
});

ipcMain.handle("update-task", async (event, task) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE tasks SET title = ?, dueDate = ?, completed = ? WHERE id = ?",
      [task.title, task.dueDate, task.completed, task.id],
      (err) => {
        if (err) reject(err);
        resolve(task);
      }
    );
  });
});

ipcMain.handle("delete-task", async (event, id) => {
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM tasks WHERE id = ?", [id], (err) => {
      if (err) reject(err);
      resolve(id);
    });
  });
});
