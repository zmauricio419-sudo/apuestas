import { Router } from "express";
import pool from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

/**
 * 🔹 Registro de usuario
 */
router.post("/register", async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  if (!nombre || !email || !password)
    return res.status(400).json({ error: "Nombre, email y contraseña requeridos" });

  try {
    const existing = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      "INSERT INTO usuarios (nombre, email, password_hash, saldo, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, email, password_hash, 0, rol || "usuario"]
    );

    const user = rows[0];
    delete user.password_hash;

    // 🔹 Generar token JWT
    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, rol: user.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" } // Expira en 7 días
    );

    return res.json({ user, token });
  } catch (err) {
    console.error("❌ Error en registro:", err);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});

/**
 * 🔹 Login de usuario
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("🟢 LOGIN REQUEST:", { email, password }); // ✅ Ver qué recibimos del frontend/Postman

  if (!email || !password)
    return res.status(400).json({ error: "Email y contraseña requeridos" });

  try {
    const { rows } = await pool.query("SELECT * FROM usuarios WHERE email = $1 LIMIT 1", [email]);
    
    console.log("🟠 USER FROM DB:", rows); // ✅ Ver qué devuelve la consulta

    if (rows.length === 0) {
      console.log("🔴 Usuario no encontrado en la base de datos"); 
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);

    console.log("🟡 PASSWORD MATCH:", valid); // ✅ Ver si el bcrypt retorna true o false

    if (!valid) {
      console.log("🔴 Contraseña incorrecta para este usuario");
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    delete user.password_hash;

    const token = jwt.sign(
      { id: user.id_usuario, email: user.email, rol: user.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    console.log("✅ LOGIN EXITOSO:", { user, token });

    return res.json({ user, token });
  } catch (err) {
    console.error("❌ Error en login:", err);
    return res.status(500).json({ error: "Error al iniciar sesión" });
  }
});


export default router;
