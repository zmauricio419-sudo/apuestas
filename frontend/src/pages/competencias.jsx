// src/pages/Competencias.jsx
import { useEffect, useState } from "react";
import { obtenerCompetencias, crearApuesta } from "../services/apuestasService";

export default function Competencias() {
  const [competencias, setCompetencias] = useState([]);
  const [monto, setMonto] = useState(0);
  const idUsuario = 1; // 🔑 Aquí deberías traerlo del login

  useEffect(() => {
    obtenerCompetencias().then(setCompetencias);
  }, []);

  const apostar = async (id_competencia, id_ave) => {
    const apuesta = { id_usuario: idUsuario, id_competencia, id_ave, monto: Number(monto) };
    const res = await crearApuesta(apuesta);
    alert(res.mensaje || res.error);
  };

  return (
    <div>
      <h2>🏆 Competencias disponibles</h2>
      <input
        type="number"
        placeholder="Monto a apostar"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <ul>
        {competencias.map((c) => (
          <li key={c.id_competencia}>
            <strong>{c.nombre}</strong> ({new Date(c.fecha_hora).toLocaleString()})
            <button onClick={() => apostar(c.id_competencia, c.id_ave1)}>Apostar Ave 1</button>
            <button onClick={() => apostar(c.id_competencia, c.id_ave2)}>Apostar Ave 2</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
