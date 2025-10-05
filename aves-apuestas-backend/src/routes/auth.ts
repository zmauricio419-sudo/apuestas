import { Router } from "express";
import pool from "../db";
import bcrypt from "bcrypt";

const router = Router();

// 🔹 Registro de usuario
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Email y contraseña requeridos" });

  try {
    const existing = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      "INSERT INTO usuarios (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, password_hash]
    );

    const user = rows[0];
    delete user.password_hash;
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});

// 🔹 Login de usuario
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y contraseña requeridos" });

  try {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    const user = rows[0];

    // ✅ Validar contraseña con bcrypt
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

    delete user.password_hash;
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

export default router;
