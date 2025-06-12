dotenv.config();
import * as dotenv from "dotenv";
dotenv.config();
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqlite = new Database(process.env.DB_URL);
const db = drizzle(sqlite);

export { db, sqlite };