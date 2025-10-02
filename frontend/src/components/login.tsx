console.log("Mostrando login");

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error de inicio de sesión");
        return;
      }

      // GUARDAMOS EL USUARIO
      localStorage.setItem("user", JSON.stringify(data));

      // REDIRECCIÓN
      navigate("/"); // <-- cámbialo si tienes otra ruta principal
    } catch {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <form onSubmit={handleLogin} className="bg-slate-800 p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl mb-4 text-center">Iniciar Sesión</h1>

        <input
          type="email"
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Tu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded font-bold"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
