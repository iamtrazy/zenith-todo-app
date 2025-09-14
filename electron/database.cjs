const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const { app } = require("electron");

const dbPath = app.isPackaged
  ? path.join(app.getPath("userData"), "database.db")
  : path.resolve(__dirname, "..", "database.db");

if (app.isPackaged) {
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Database opening error: ", err);
  }
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      dueDate TEXT,
      completed INTEGER NOT NULL DEFAULT 0
    )
  `);
});

module.exports = db;