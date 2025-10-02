import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();


const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
throw new Error("DATABASE_URL no definida en variables de entorno");
}


const pool = new Pool({
connectionString,
ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});


export default pool;