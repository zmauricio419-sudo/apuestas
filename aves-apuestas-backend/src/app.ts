import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import competenciasRouter from "./routes/competencias";
import apuestasRouter from "./routes/apuestas";
import authRouter from "./routes/auth";
import usuariosRouter from "./routes/usuarios";   // 👈 NUEVO
import pool from "./db";  // Conexión a la BD

dotenv.config();

const app = express();
app.use(express.json());

// Configuración de CORS
app.use(cors());


// ✅ Ruta de prueba de conexión a la BD
app.get("/api/test-db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ connected: true, time: result.rows[0].now });
  } catch (error) {
    console.error(error);
    res.status(500).json({ connected: false, error });
  }
});

// ✅ Rutas principales
app.use("/api/competencias", competenciasRouter);
app.use("/api/apuestas", apuestasRouter);
app.use("/api/auth", authRouter);
app.use("/api/usuarios", usuariosRouter);  // 👈 NUEVO

// Ruta base
app.get("/", (_req, res) => res.send("Aves Backend OK"));

export default app;
