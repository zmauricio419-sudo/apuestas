import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Trophy, Bird, DollarSign, TrendingUp, Calendar, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Dashboard() {
  const location = useLocation();
  const [welcomeMessage, setWelcomeMessage] = useState(location.state?.welcome || "¡Bienvenido a GallosPro!");

  // 🔹 Ocultar mensaje automáticamente después de 3 segundos
  useEffect(() => {
    if (welcomeMessage) {
      const timer = setTimeout(() => setWelcomeMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [welcomeMessage]);

  const upcomingFights = [
    {
      id: 1,
      fighter1: 'El Campeón',
      fighter2: 'Rayo de Fuego',
      time: '14:30',
      date: '2025-09-28',
      odds1: 2.1,
      odds2: 1.8,
      category: 'Peso Gallo'
    },
    {
      id: 2,
      fighter1: 'Trueno Dorado',
      fighter2: 'Sombra Negra',
      time: '15:15',
      date: '2025-09-28',
      odds1: 1.9,
      odds2: 2.0,
      category: 'Peso Pluma'
    }
  ];

  const stats = [
    { label: 'Aves Registradas', value: '24', icon: Bird, color: 'text-blue-400' },
    { label: 'Peleas este Mes', value: '12', icon: Trophy, color: 'text-yellow-400' },
    { label: 'Ganancias Totales', value: '$3,450', icon: DollarSign, color: 'text-green-400' },
    { label: 'Tasa de Victoria', value: '68%', icon: TrendingUp, color: 'text-purple-400' }
  ];

  return (
    <div className="space-y-6">

      {/* 🔹 Mensaje de bienvenida con auto-ocultamiento */}
      {welcomeMessage && (
        <div className="text-center py-4 bg-green-600 text-white rounded-lg font-bold animate-fade-out">
          {welcomeMessage} 👋
        </div>
      )}

      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-2">Bienvenido a GallosPro</h1>
        <p className="text-gray-300">La plataforma líder en competencias de gallos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Próximas Peleas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingFights.map((fight) => (
              <div key={fight.id} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    {fight.category}
                  </Badge>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {fight.time}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-center">
                    <div className="text-white font-semibold">{fight.fighter1}</div>
                    <div className="text-green-400">{fight.odds1}</div>
                  </div>
                  <div className="text-center text-gray-400">VS</div>
                  <div className="text-center">
                    <div className="text-white font-semibold">{fight.fighter2}</div>
                    <div className="text-green-400">{fight.odds2}</div>
                  </div>
                </div>
                <Button className="w-full mt-3 bg-purple-600 hover:bg-purple-700">
                  Ver Detalles
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Transmisión Destacada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative rounded-lg overflow-hidden mb-4">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1701855486412-4e92cd3fcf1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWdodGluZyUyMHJvb3N0ZXJzJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzU5MDIxMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Competencia en vivo"
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-600 text-white">EN VIVO</Badge>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-sm">
                1,234 espectadores
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-white font-semibold">Campeonato Regional - Final</h3>
              <p className="text-gray-400 text-sm">
                El Águila Dorada vs Tornado Rojo en la gran final del campeonato regional
              </p>
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Ver Transmisión
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
