import React, { useState, useRef, useEffect } from 'react';
import { Home, Bird, Trophy, Radio, DollarSign, BarChart3, User, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/birds', label: 'Registro de Aves', icon: Bird },
    { to: '/competitions', label: 'Competencias', icon: Trophy },
    { to: '/live', label: 'En Vivo', icon: Radio },
    { to: '/betting', label: 'Apuestas', icon: DollarSign },
    { to: '/statistics', label: 'Estadísticas', icon: BarChart3 },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Cerrar el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-slate-800/90 backdrop-blur-sm border-b border-purple-500/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <span className="text-xl font-bold text-white">GallosPro</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  pathname === to
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Balance</div>
              <div className="text-lg font-bold text-green-400">$1,250.00</div>
            </div>

            {/* Menú de usuario */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition"
              >
                <User className="h-4 w-4 text-white" />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-slate-800 border border-purple-500/20 rounded-lg shadow-lg overflow-hidden">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
