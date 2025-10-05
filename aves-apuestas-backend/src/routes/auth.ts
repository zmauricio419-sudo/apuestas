import { Router } from "express";
import pool from "../db";
import bcrypt from "bcrypt";

const router = Router();

// 🔹 Registro de usuario (REEMPLAZA ESTA PARTE COMPLETA por la siguiente)
router.post("/register", async (req, res) => {
  console.log("📥 RECIBIENDO REGISTRO:", req.body);  // 👈 LOG NUEVO

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("❌ Falta email o password");
    return res.status(400).json({ error: "Email y contraseña requeridos" });
  }

  try {
    console.log("🔎 Verificando si existe el usuario...");
    const existing = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
    console.log("Resultado SELECT:", existing.rows);

    if (existing.rows.length > 0) {
      console.log("⚠ Usuario ya existe");
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    console.log("🔐 Hasheando contraseña...");
    const password_hash = await bcrypt.hash(password, 10);

    console.log("📝 Insertando nuevo usuario...");
    const { rows } = await pool.query(
      "INSERT INTO usuarios (email, password_hash) VALUES ($1, $2) RETURNING *",
      [email, password_hash]
    );

    console.log("✅ Registro exitoso:", rows[0]);
    const user = rows[0];
    delete user.password_hash;
    return res.json(user);
  } catch (err) {
    console.error("🔥 ERROR DE REGISTRO:", err);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});


// 🔹 Login (DEJA ESTA PARTE IGUAL)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email y contraseña requeridos" });

  try {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    const user = rows[0];

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
