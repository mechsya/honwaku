import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

async function initDatabase() {
  db = await SQLite.openDatabaseAsync("database.sqlite");

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      username TEXT,
      email TEXT,
      image_url TEXT,
      coin INTEGER DEFAULT 0
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS opened_chapters (
      id TEXT PRIMARY KEY NOT NULL,
      novel_id TEXT
    );
  `);
}

export { db, initDatabase };
