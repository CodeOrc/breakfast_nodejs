import "dotenv/config";
import mysql from "mysql2/promise";
export const pool = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: process.env.waitForConnections,
  connectionLimit: process.env.connectionLimit,
  maxIdle: process.env.maxIdle,
});
