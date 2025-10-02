import { Router } from "express";
import pool from "../db";

const router = Router();

// ✅ Recargar saldo a un usuario
router.post("/recargar", async (req, res) => {
    console.log("Body recibido:", req.body);
  const { id_usuario, monto } = req.body;

  if (!id_usuario || !monto) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    await pool.query(
      "UPDATE usuarios SET saldo = saldo + $1 WHERE id_usuario = $2",
      [monto, id_usuario]
    );
    return res.json({ mensaje: "Saldo recargado correctamente" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error al recargar saldo" });
  }
});

// ✅ Obtener el saldo de un usuario
router.get("/saldo/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT saldo FROM usuarios WHERE id_usuario = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ saldo: result.rows[0].saldo });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error al obtener saldo" });
  }
});

export default router;
