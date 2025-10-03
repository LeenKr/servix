import "dotenv/config";
import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "127.0.0.1",
  port: Number(process.env.MYSQL_PORT || 3306),
  user: process.env.MYSQL_USER ?? "",
  password: process.env.MYSQL_PASSWORD ?? "",
  database: process.env.MYSQL_DB ?? "",
  waitForConnections: true,
  connectionLimit: 10,
});

console.log("🛠 POOL CONFIG:", {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  db: process.env.MYSQL_DB,
});
