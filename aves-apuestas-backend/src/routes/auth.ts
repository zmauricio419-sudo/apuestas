import { Router } from "express";
import pool from "../db";
const router = Router();


router.post("/login", async (req, res) => {
const { email } = req.body;
if (!email) return res.status(400).json({ error: "email requerido" });
try {
const { rows } = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
const u = rows[0];
delete u.password_hash;
return res.json(u);
} catch (err) {
console.error(err);
return res.status(500).json({ error: "error al consultar usuario" });
}
});
// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
  const { email, nombre } = req.body;

  if (!email) return res.status(400).json({ error: "Email requerido" });

  try {
    // Verificar si el usuario ya existe
    const existing = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    // Insertar nuevo usuario
    const { rows } = await pool.query(
      "INSERT INTO usuarios (email, nombre) VALUES ($1, $2) RETURNING *",
      [email, nombre || "Sin nombre"]
    );

    const u = rows[0];
    delete u.password_hash;
    return res.json(u);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});


export default router;