import { Router } from "express";
import pool from "../db";
import { verifyToken } from "../middlewares/auth";
import { isAdmin } from "../middlewares/isAdmin";

const router = Router(); // ✅ Esto primero

// ✅ Obtener todas las competencias (pública)
router.get("/", async (_req, res) => {
  try {
    const q = `SELECT * FROM v_competencia_resumen ORDER BY fecha_hora`;
    const { rows } = await pool.query(q);
    return res.json(rows);
  } catch (err: any) {
    console.error("ERR GET /competencias:", err);
    return res.status(500).json({ error: err.message || "Error al obtener competencias" });
  }
});

// ✅ Crear una nueva competencia (solo admin)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  const { nombre, descripcion, fecha_hora, lugar } = req.body;

  if (!nombre || !fecha_hora) {
    return res.status(400).json({ error: "Nombre y fecha_hora son obligatorios" });
  }

  try {
    const q = `
      INSERT INTO competencias (nombre, descripcion, fecha_hora, lugar)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const { rows } = await pool.query(q, [nombre, descripcion, fecha_hora, lugar]);
    return res.json({ mensaje: "Competencia creada correctamente", competencia: rows[0] });
  } catch (err: any) {
    console.error("ERR POST /competencias:", err);
    return res.status(500).json({ error: "Error al crear competencia" });
  }
});

// ✅ Finalizar competencia (solo admin también, ¿lo aseguramos?)
router.post("/finalizar", verifyToken, isAdmin, async (req, res) => {
  const { id_competencia, id_ave_ganador } = req.body;

  if (!id_competencia || !id_ave_ganador) {
    return res.status(400).json({ error: "Faltan datos para finalizar competencia" });
  }

  try {
    const { rows: apuestas } = await pool.query(
      "SELECT * FROM apuestas WHERE id_competencia = $1",
      [id_competencia]
    );

    if (apuestas.length === 0) {
      return res.status(404).json({ error: "No hay apuestas para esta competencia" });
    }

    for (const apuesta of apuestas) {
      if (apuesta.id_ave === id_ave_ganador) {
        const monto_ganado = apuesta.monto * apuesta.cuota;

        await pool.query(
          "UPDATE apuestas SET estado = 'ganada', monto_ganado = $1 WHERE id_apuesta = $2",
          [monto_ganado, apuesta.id_apuesta]
        );

        await pool.query(
          "UPDATE usuarios SET saldo = saldo + $1 WHERE id_usuario = $2",
          [monto_ganado, apuesta.id_usuario]
        );
      } else {
        await pool.query(
          "UPDATE apuestas SET estado = 'perdida', monto_ganado = 0 WHERE id_apuesta = $1",
          [apuesta.id_apuesta]
        );
      }
    }

    return res.json({ mensaje: "Competencia finalizada y apuestas actualizadas correctamente" });

  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Error al finalizar competencia" });
  }
});

export default router;
