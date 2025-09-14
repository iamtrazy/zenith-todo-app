const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("./database.cjs");

// Enable Wayland support on Linux
if (process.platform === 'linux') {
  app.commandLine.appendSwitch('--enable-features', 'UseOzonePlatform');
  app.commandLine.appendSwitch('--ozone-platform-hint', 'auto');
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false, // Remove the title bar
    titleBarStyle: 'hidden', // Hide title bar but keep window controls on macOS
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
    win.loadFile(path.join(app.getAppPath(), "dist", "renderer", "index.html"));
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
      "INSERT INTO tasks (title, dueDate, completed) VALUES (?, ?, ?)",
      [task.title, task.dueDate, 0],
      function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, ...task, completed: 0 });
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

// Window control handlers
ipcMain.handle("window-minimize", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.handle("window-maximize", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  }
});

ipcMain.handle("window-close", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});

ipcMain.handle("window-toggle-fullscreen", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) {
    win.setFullScreen(!win.isFullScreen());
  }
});

ipcMain.handle("window-is-fullscreen", () => {
  const win = BrowserWindow.getFocusedWindow();
  return win ? win.isFullScreen() : false;
});
