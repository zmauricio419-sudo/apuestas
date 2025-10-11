import { Router } from "express";
import pool from "../db";

const router = Router();

/* ✅ Obtener todos los usuarios (para el panel de administración) */
router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "SELECT id_usuario, nombre, email, rol, saldo FROM usuarios ORDER BY id_usuario ASC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

/* ✅ Recargar saldo a un usuario */
router.post("/recargar", async (req, res) => {
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
  } catch (err) {
    console.error("❌ Error al recargar saldo:", err);
    return res.status(500).json({ error: "Error al recargar saldo" });
  }
});

/* ✅ Obtener el saldo de un usuario */
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
  } catch (err) {
    console.error("❌ Error al obtener saldo:", err);
    return res.status(500).json({ error: "Error al obtener saldo" });
  }
});

/* ✅ Actualizar rol de un usuario (solo admin) */
router.put("/:id/rol", async (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  if (!rol) {
    return res.status(400).json({ error: "Debe especificar el nuevo rol" });
  }

  try {
    const result = await pool.query(
      "UPDATE usuarios SET rol = $1 WHERE id_usuario = $2 RETURNING *",
      [rol, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    return res.json({ mensaje: "Rol actualizado correctamente", usuario: result.rows[0] });
  } catch (err) {
    console.error("❌ Error al actualizar rol:", err);
    return res.status(500).json({ error: "Error al actualizar rol" });
  }
});

export default router;
