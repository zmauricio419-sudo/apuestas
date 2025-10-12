import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://aves-backend.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas");
        return;
      }

      // ✅ Guardar correctamente en localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
localStorage.setItem("token", data.token);


      navigate("/dashboard");
      window.location.reload(); // 🔄 Forzar recarga para mostrar el menú
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

        <input
          type="password"
          className="w-full p-2 mb-3 rounded bg-slate-700"
          placeholder="Tu contraseña..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 p-2 rounded font-bold">
          Entrar
        </button>

        <p className="text-sm text-center mt-2">
          ¿No tienes cuenta?{" "}
          <span className="text-green-400 cursor-pointer" onClick={() => navigate("/register")}>
            Registrarse
          </span>
        </p>
      </form>
    </div>
  );
}
