import DataBase from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Resolve path to the database file
const dbPath = path.resolve(__dirname, "library.db");

// Initialize the database connection
const db = new DataBase(dbPath);

// Create the Shelves table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Shelves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
`
).run();

// Create the Books table if it doesn't exist
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS Books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    currentPage INTEGER NOT NULL DEFAULT 1,
    isOver BOOLEAN NOT NULL DEFAULT 0,
    isFavorite BOOLEAN NOT NULL DEFAULT 0,
    shelf_id INTEGER NOT NULL,
    FOREIGN KEY(shelf_id) REFERENCES Shelves(id)
  );
`
).run();

console.log("Database initialization complete!");
