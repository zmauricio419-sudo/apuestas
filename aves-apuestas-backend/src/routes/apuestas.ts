import { Router } from "express";
import pool from "../db";

const router = Router();

// ✅ Crear una apuesta con validación de saldo y cuota automática
router.post("/", async (req, res) => {
  const { id_usuario, id_competencia, id_ave, monto } = req.body;

  if (!id_usuario || !id_competencia || !id_ave || !monto) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    // 1️⃣ Verificar saldo del usuario
    const saldoResult = await pool.query(
      "SELECT saldo FROM usuarios WHERE id_usuario = $1",
      [id_usuario]
    );

    if (saldoResult.rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const saldoActual = Number(saldoResult.rows[0].saldo);

    if (saldoActual < monto) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    // 2️⃣ Obtener cuota desde tabla `cuotas`
    const cuotaResult = await pool.query(
      "SELECT cuota FROM cuotas WHERE id_competencia = $1 AND id_ave = $2",
      [id_competencia, id_ave]
    );

    if (cuotaResult.rows.length === 0) {
      return res.status(404).json({ error: "Cuota no encontrada para esa competencia y ave" });
    }

    const cuota = Number(cuotaResult.rows[0].cuota);

    // 3️⃣ Descontar saldo
    await pool.query(
      "UPDATE usuarios SET saldo = saldo - $1 WHERE id_usuario = $2",
      [monto, id_usuario]
    );

    // 4️⃣ Insertar apuesta
    const insertQuery = `
      INSERT INTO apuestas (id_usuario, id_competencia, id_ave, monto, cuota, estado, monto_ganado)
      VALUES ($1, $2, $3, $4, $5, 'pendiente', 0) RETURNING *`;
    const { rows } = await pool.query(insertQuery, [
      id_usuario,
      id_competencia,
      id_ave,
      monto,
      cuota
    ]);

    return res.status(201).json({
      mensaje: "Apuesta realizada correctamente",
      apuesta: rows[0],
      saldo_restante: saldoActual - monto
    });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Error al crear apuesta" });
  }
});

// ✅ Obtener apuestas de un usuario
router.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const q = `
      SELECT * FROM v_apuestas_usuarios
      WHERE usuario = (SELECT nombre FROM usuarios WHERE id_usuario = $1)`;
    const { rows } = await pool.query(q, [id]);

    return res.json(rows);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error al obtener apuestas del usuario" });
  }
});

// ✅ Obtener todas las apuestas
router.get("/", async (_req, res) => {
  try {
    const q = `SELECT * FROM v_apuestas_usuarios`;
    const { rows } = await pool.query(q);
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al obtener apuestas" });
  }
});

export default router;
