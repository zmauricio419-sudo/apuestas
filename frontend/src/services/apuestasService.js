// src/services/apuestasService.js
const API_URL = "http://localhost:4000/api";

export const crearApuesta = async (apuesta) => {
  const res = await fetch(`${API_URL}/apuestas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(apuesta),
  });
  return res.json();
};

export const obtenerApuestasUsuario = async (idUsuario) => {
  const res = await fetch(`${API_URL}/apuestas/usuario/${idUsuario}`);
  return res.json();
};

export const obtenerCompetencias = async () => {
  const res = await fetch(`${API_URL}/competencias`);
  return res.json();
};
