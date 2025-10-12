import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("usuario"); // campo nuevo
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://aves-backend.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password, rol }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Este correo ya está registrado");
        return;
      }

      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch {
      setError("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900 text-white">
      <form onSubmit={handleRegister} className="bg-slate-800 p-6 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl mb-4 text-center">Registrarse</h1>

        <input
          type="text"
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Tu nombre..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="email"
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Tu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Tu contraseña..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Selector de rol (temporal) */}
        <label className="text-sm text-gray-300 mb-1">Rol</label>
        <select
          className="w-full p-2 mb-3 rounded bg-slate-700"
          value={rol}
          onChange={(e) => setRol(e.target.value)}
        >
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 p-2 rounded font-bold">
          Crear Cuenta
        </button>

        <p className="text-sm text-center mt-2">
          ¿Ya tienes cuenta?{" "}
          <span className="text-purple-400 cursor-pointer" onClick={() => navigate("/login")}>
            Iniciar Sesión
          </span>
        </p>
      </form>
    </div>
  );
}
