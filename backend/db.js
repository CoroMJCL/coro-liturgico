import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const db = await open({
  filename: './coro.db',
  driver: sqlite3.Database
})

await db.exec(`
CREATE TABLE IF NOT EXISTS cantos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  tiempo TEXT,
  momento TEXT,
  archivo TEXT
);

CREATE TABLE IF NOT EXISTS misas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  fecha TEXT,
  tiempo TEXT,
  entrada INTEGER,
  salmo INTEGER,
  ofertorio INTEGER,
  comunion INTEGER,
  salida INTEGER,
  token TEXT
);
`)

export { db }
