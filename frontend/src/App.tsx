console.log("App cargó");

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { BirdRegistry } from "./components/BirdRegistry";
import { CompetitionManagement } from "./components/CompetitionManagement";
import { LiveStream } from "./components/LiveStream";
import { BettingSystem } from "./components/BettingSystem";
import { Statistics } from "./components/Statistics";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { Register } from "./components/Register"; // ✅ Nuevo

import { AdminRoute } from "./components/AdminRoute";
import { AdminDashboard } from "./components/AdminDashboard";




import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  const isLogged = Boolean(localStorage.getItem("user"));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {isLogged && <Navigation />}

      <main className="container mx-auto px-4 py-8">
        <Routes>
          {/* ✅ Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* ✅ Nueva ruta */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* ✅ Rutas protegidas */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/birds" element={<ProtectedRoute><BirdRegistry /></ProtectedRoute>} />
          <Route path="/competitions" element={<ProtectedRoute><CompetitionManagement /></ProtectedRoute>} />
          <Route path="/live" element={<ProtectedRoute><LiveStream /></ProtectedRoute>} />
          <Route path="/betting" element={<ProtectedRoute><BettingSystem /></ProtectedRoute>} />
          <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        </Routes>
      </main>
    </div>
  );
}
