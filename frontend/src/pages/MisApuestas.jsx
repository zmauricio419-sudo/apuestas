// src/pages/MisApuestas.jsx
import { useEffect, useState } from "react";
import { obtenerApuestasUsuario } from "../services/apuestasService";

export default function MisApuestas() {
  const [apuestas, setApuestas] = useState([]);
  const idUsuario = 1; // 🔑 Cambiar cuando tengas login real

  useEffect(() => {
    obtenerApuestasUsuario(idUsuario).then(setApuestas);
  }, []);

  return (
    <div>
      <h2>📜 Mis Apuestas</h2>
      <ul>
        {apuestas.map((a) => (
          <li key={a.id_apuesta}>
            Competencia {a.id_competencia} - Ave {a.id_ave} - 
            <strong>{a.estado}</strong> - Ganado: {a.monto_ganado}
          </li>
        ))}
      </ul>
    </div>
  );
}
