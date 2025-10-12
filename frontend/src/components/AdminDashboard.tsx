import React, { useEffect, useState } from "react";

export function AdminDashboard() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await fetch("https://aves-backend.onrender.com/api/usuarios");
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        console.error("Error cargando usuarios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  if (loading) return <p className="text-white">Cargando usuarios...</p>;

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración 🛠️</h1>

      {/* Sección de usuarios */}
      <div className="bg-slate-800 p-4 rounded-lg shadow-md mb-8">
        <h2 className="text-xl mb-4">Usuarios registrados</h2>
        <table className="w-full text-left border border-slate-700">
          <thead>
            <tr className="bg-slate-700">
              <th className="p-2 border border-slate-600">ID</th>
              <th className="p-2 border border-slate-600">Nombre</th>
              <th className="p-2 border border-slate-600">Email</th>
              <th className="p-2 border border-slate-600">Rol</th>
              <th className="p-2 border border-slate-600">Saldo</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u: any) => (
              <tr key={u.id_usuario} className="hover:bg-slate-700">
                <td className="p-2 border border-slate-600">{u.id_usuario}</td>
                <td className="p-2 border border-slate-600">{u.nombre}</td>
                <td className="p-2 border border-slate-600">{u.email}</td>
                <td className="p-2 border border-slate-600">{u.rol}</td>
                <td className="p-2 border border-slate-600">${u.saldo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Aquí pondremos el formulario para crear competencias */}
      {/* Formulario para crear competencia */}
<form
  className="flex flex-col gap-4"
  onSubmit={async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const res = await fetch("https://aves-backend.onrender.com/api/competencias", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    alert(json.mensaje || json.error);
  }}
>
  <input name="nombre" placeholder="Nombre de la competencia" className="p-2 rounded bg-slate-700" required />
  <input name="descripcion" placeholder="Descripción" className="p-2 rounded bg-slate-700" />
  <input type="datetime-local" name="fecha_hora" className="p-2 rounded bg-slate-700" required />
  <input name="lugar" placeholder="Lugar" className="p-2 rounded bg-slate-700" />

  <button type="submit" className="bg-blue-600 py-2 rounded hover:bg-blue-500">
    Crear competencia
  </button>
</form>

      <div className="bg-slate-800 p-4 rounded-lg shadow-md">
        <h2 className="text-xl mb-4">Crear nueva competencia 🐦🔥</h2>
        {/* Aquí irá el formulario que te armo en el siguiente mensaje */}
      </div>
    </div>
  );
}
