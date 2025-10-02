import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DollarSign, TrendingUp, TrendingDown, Clock, Trophy, AlertCircle } from 'lucide-react';

export function BettingSystem() {
  const [betAmount, setBetAmount] = useState('');
  const [selectedBet, setSelectedBet] = useState<number | null>(null);

  const activeBets = [
    {
      id: 1,
      fighter1: 'El Campeón',
      fighter2: 'Rayo de Fuego',
      odds1: 2.1,
      odds2: 1.8,
      category: 'Peso Gallo',
      date: '2025-09-30',
      time: '14:30',
      totalPool: '$12,450'
    },
    {
      id: 2,
      fighter1: 'Trueno Dorado',
      fighter2: 'Sombra Negra',
      odds1: 1.9,
      odds2: 2.0,
      category: 'Peso Pluma',
      date: '2025-09-30',
      time: '15:15',
      totalPool: '$8,750'
    },
    {
      id: 3,
      fighter1: 'Águila Real',
      fighter2: 'Viento del Norte',
      odds1: 2.3,
      odds2: 1.6,
      category: 'Peso Medio',
      date: '2025-10-05',
      time: '16:00',
      totalPool: '$5,200'
    }
  ];

  const myBets = [
    {
      id: 1,
      fighter: 'El Campeón',
      opponent: 'Rayo de Fuego',
      amount: 100,
      odds: 2.1,
      potentialWin: 210,
      status: 'Activa',
      date: '2025-09-30'
    },
    {
      id: 2,
      fighter: 'Sombra Negra',
      opponent: 'Trueno Dorado',
      amount: 50,
      odds: 2.0,
      potentialWin: 100,
      status: 'Ganada',
      date: '2025-09-25'
    },
    {
      id: 3,
      fighter: 'Viento del Sur',
      opponent: 'Relámpago',
      amount: 75,
      odds: 1.8,
      potentialWin: 135,
      status: 'Perdida',
      date: '2025-09-20'
    }
  ];

  const handlePlaceBet = (fightId: number, fighter: string, odds: number) => {
    if (betAmount && parseFloat(betAmount) > 0) {
      const amount = parseFloat(betAmount);
      const potentialWin = amount * odds;
      
      // Simular colocación de apuesta
      alert(`Apuesta colocada: $${amount} por ${fighter}\nGanancia potencial: $${potentialWin.toFixed(2)}`);
      setBetAmount('');
      setSelectedBet(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa': return 'bg-blue-600';
      case 'Ganada': return 'bg-green-600';
      case 'Perdida': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Sistema de Apuestas</h1>
        <div className="text-right">
          <div className="text-sm text-gray-300">Balance Disponible</div>
          <div className="text-2xl font-bold text-green-400">$1,250.00</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Apuestas Activas</p>
                <p className="text-2xl font-bold text-blue-400">3</p>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Ganancias del Mes</p>
                <p className="text-2xl font-bold text-green-400">$450</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Tasa de Éxito</p>
                <p className="text-2xl font-bold text-purple-400">65%</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="active" className="data-[state=active]:bg-purple-600">
            Apuestas Disponibles
          </TabsTrigger>
          <TabsTrigger value="my-bets" className="data-[state=active]:bg-purple-600">
            Mis Apuestas
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeBets.map((bet) => (
              <Card key={bet.id} className="bg-slate-800/50 border-slate-700">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white text-lg">{bet.fighter1} vs {bet.fighter2}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          {bet.category}
                        </Badge>
                        <span className="text-gray-400 text-sm">{bet.date} - {bet.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">Pool Total</div>
                      <div className="text-yellow-400 font-bold">{bet.totalPool}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-white font-semibold mb-2">{bet.fighter1}</div>
                      <div className="text-green-400 text-xl font-bold mb-2">{bet.odds1}</div>
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedBet(bet.id)}
                      >
                        Apostar
                      </Button>
                    </div>
                    <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                      <div className="text-white font-semibold mb-2">{bet.fighter2}</div>
                      <div className="text-green-400 text-xl font-bold mb-2">{bet.odds2}</div>
                      <Button
                        size="sm"
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => setSelectedBet(bet.id)}
                      >
                        Apostar
                      </Button>
                    </div>
                  </div>

                  {selectedBet === bet.id && (
                    <div className="bg-slate-700/50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-sm">Selecciona tu apuesta</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                          onClick={() => handlePlaceBet(bet.id, bet.fighter1, bet.odds1)}
                        >
                          {bet.fighter1} ({bet.odds1})
                        </Button>
                        <Button
                          variant="outline"
                          className="border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                          onClick={() => handlePlaceBet(bet.id, bet.fighter2, bet.odds2)}
                        >
                          {bet.fighter2} ({bet.odds2})
                        </Button>
                      </div>
                      <Input
                        type="number"
                        placeholder="Monto a apostar"
                        value={betAmount}
                        onChange={(e) => setBetAmount(e.target.value)}
                        className="bg-slate-600 border-slate-500 text-white"
                      />
                      {betAmount && (
                        <div className="text-center text-sm">
                          <span className="text-gray-400">Ganancia potencial: </span>
                          <span className="text-green-400 font-bold">
                            ${(parseFloat(betAmount) * Math.max(bet.odds1, bet.odds2)).toFixed(2)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-bets" className="space-y-6">
          <div className="space-y-4">
            {myBets.map((bet) => (
              <Card key={bet.id} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-white font-semibold text-lg">
                        {bet.fighter} vs {bet.opponent}
                      </div>
                      <div className="text-gray-400 text-sm">{bet.date}</div>
                    </div>
                    <Badge className={`${getStatusColor(bet.status)} text-white`}>
                      {bet.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Monto Apostado</p>
                      <p className="text-white font-semibold">${bet.amount}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Cuota</p>
                      <p className="text-green-400 font-semibold">{bet.odds}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Ganancia Potencial</p>
                      <p className="text-yellow-400 font-semibold">${bet.potentialWin}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Estado</p>
                      <div className="flex items-center gap-1">
                        {bet.status === 'Ganada' && <TrendingUp className="h-4 w-4 text-green-400" />}
                        {bet.status === 'Perdida' && <TrendingDown className="h-4 w-4 text-red-400" />}
                        {bet.status === 'Activa' && <Clock className="h-4 w-4 text-blue-400" />}
                        <span className="text-white font-semibold">{bet.status}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            Términos y Condiciones
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-400 text-sm space-y-2">
          <p>• Las apuestas se cierran 5 minutos antes del inicio de cada pelea.</p>
          <p>• Los pagos se procesan automáticamente después de la confirmación del resultado.</p>
          <p>• El monto mínimo de apuesta es $10 y el máximo es $5,000 por evento.</p>
          <p>• Solo usuarios verificados pueden participar en apuestas.</p>
          <p>• Apuesta responsablemente. Si necesitas ayuda, contacta a nuestro equipo de soporte.</p>
        </CardContent>
      </Card>
    </div>
  );
}