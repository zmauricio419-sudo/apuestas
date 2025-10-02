import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Bird, Calendar, DollarSign, Percent } from 'lucide-react';

export function Statistics() {
  const [selectedPeriod, setSelectedPeriod] = useState('mes');
  const [selectedBird, setSelectedBird] = useState('todos');

  const monthlyData = [
    { name: 'Ene', peleas: 8, victorias: 5, derrotas: 3 },
    { name: 'Feb', peleas: 12, victorias: 8, derrotas: 4 },
    { name: 'Mar', peleas: 10, victorias: 7, derrotas: 3 },
    { name: 'Abr', peleas: 15, victorias: 9, derrotas: 6 },
    { name: 'May', peleas: 18, victorias: 12, derrotas: 6 },
    { name: 'Jun', peleas: 14, victorias: 10, derrotas: 4 },
    { name: 'Jul', peleas: 16, victorias: 11, derrotas: 5 },
    { name: 'Ago', peleas: 20, victorias: 14, derrotas: 6 },
    { name: 'Sep', peleas: 12, victorias: 8, derrotas: 4 }
  ];

  const categoryData = [
    { name: 'Peso Gallo', value: 45, color: '#8b5cf6' },
    { name: 'Peso Pluma', value: 35, color: '#06b6d4' },
    { name: 'Peso Medio', value: 20, color: '#10b981' }
  ];

  const earningsData = [
    { name: 'Ene', ganancias: 1200 },
    { name: 'Feb', ganancias: 1800 },
    { name: 'Mar', ganancias: 1500 },
    { name: 'Abr', ganancias: 2200 },
    { name: 'May', ganancias: 2800 },
    { name: 'Jun', ganancias: 2100 },
    { name: 'Jul', ganancias: 2600 },
    { name: 'Ago', ganancias: 3200 },
    { name: 'Sep', ganancias: 2400 }
  ];

  const topBirds = [
    {
      name: 'El Campeón',
      participations: 15,
      wins: 12,
      losses: 3,
      avgWeight: 2.1,
      winProbability: 82.5,
      earnings: '$3,450'
    },
    {
      name: 'Trueno Dorado',
      participations: 12,
      wins: 10,
      losses: 2,
      avgWeight: 2.0,
      winProbability: 78.3,
      earnings: '$2,890'
    },
    {
      name: 'Rayo de Fuego',
      participations: 10,
      wins: 7,
      losses: 3,
      avgWeight: 2.3,
      winProbability: 71.2,
      earnings: '$2,100'
    },
    {
      name: 'Sombra Negra',
      participations: 8,
      wins: 6,
      losses: 2,
      avgWeight: 1.9,
      winProbability: 75.0,
      earnings: '$1,890'
    }
  ];

  const overallStats = [
    { label: 'Total Participaciones', value: '125', icon: Bird, color: 'text-blue-400' },
    { label: 'Total Victorias', value: '87', icon: Trophy, color: 'text-yellow-400' },
    { label: 'Tasa de Éxito', value: '69.6%', icon: Percent, color: 'text-purple-400' },
    { label: 'Ganancias Totales', value: '$18,450', icon: DollarSign, color: 'text-green-400' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Estadísticas y Reportes</h1>
        <div className="flex gap-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="semana">Semana</SelectItem>
              <SelectItem value="mes">Mes</SelectItem>
              <SelectItem value="trimestre">Trimestre</SelectItem>
              <SelectItem value="año">Año</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedBird} onValueChange={setSelectedBird}>
            <SelectTrigger className="w-40 bg-slate-800 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="todos">Todas las Aves</SelectItem>
              <SelectItem value="el-campeon">El Campeón</SelectItem>
              <SelectItem value="trueno-dorado">Trueno Dorado</SelectItem>
              <SelectItem value="rayo-fuego">Rayo de Fuego</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
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
            <CardTitle className="text-white">Rendimiento Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
                <Bar dataKey="victorias" fill="#10b981" name="Victorias" />
                <Bar dataKey="derrotas" fill="#ef4444" name="Derrotas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Distribución por Categoría</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569',
                    borderRadius: '8px',
                    color: '#ffffff'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Evolución de Ganancias</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  color: '#ffffff'
                }}
                formatter={(value) => [`$${value}`, 'Ganancias']}
              />
              <Line 
                type="monotone" 
                dataKey="ganancias" 
                stroke="#06b6d4" 
                strokeWidth={3}
                dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Ranking de Aves por Rendimiento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topBirds.map((bird, index) => (
              <div key={bird.name} className="bg-slate-700/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{bird.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-green-600 text-white text-xs">
                          {((bird.wins / bird.participations) * 100).toFixed(1)}% victorias
                        </Badge>
                        <span className="text-gray-400 text-sm">{bird.participations} peleas</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">{bird.earnings}</div>
                    <div className="text-gray-400 text-sm">Ganancias</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-gray-400">Participaciones</p>
                    <p className="text-white font-semibold">{bird.participations}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Victorias</p>
                    <p className="text-green-400 font-semibold">{bird.wins}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Derrotas</p>
                    <p className="text-red-400 font-semibold">{bird.losses}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Peso Promedio</p>
                    <p className="text-blue-400 font-semibold">{bird.avgWeight} kg</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-400">Prob. Victoria</p>
                    <p className="text-purple-400 font-semibold">{bird.winProbability}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Análisis de Tendencias</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">Tendencia de Victorias</span>
              <div className="flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12.5%
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">Ganancias Promedio</span>
              <div className="flex items-center text-green-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.3%
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-gray-300">Participación Mensual</span>
              <div className="flex items-center text-blue-400">
                <Calendar className="h-4 w-4 mr-1" />
                15.2 peleas/mes
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Próximos Objetivos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Meta de Victorias (80%)</span>
                <span className="text-white">69.6% / 80%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Meta de Ganancias ($25,000)</span>
                <span className="text-white">$18,450 / $25,000</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Meta de Peleas (150)</span>
                <span className="text-white">125 / 150</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '83%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}