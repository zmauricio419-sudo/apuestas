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


export default router;