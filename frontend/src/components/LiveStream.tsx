import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Radio, Users, MessageCircle, Heart, Share2, Volume2, VolumeX } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LiveStream() {
  const [viewers, setViewers] = useState(1234);
  const [messages, setMessages] = useState([
    { id: 1, user: 'GalloFan23', message: '¡Vamos El Campeón!', time: '14:32' },
    { id: 2, user: 'ApostadorPro', message: 'Apuesto por Rayo de Fuego', time: '14:33' },
    { id: 3, user: 'CriadorExpert', message: 'Excelente técnica del rojo', time: '14:34' },
    { id: 4, user: 'FanáticoGallos', message: 'Esta pelea está increíble', time: '14:35' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 10) - 5);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const addMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'Usuario',
        message: newMessage,
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const liveStreams = [
    {
      id: 1,
      title: 'Campeonato Regional - Final',
      fighters: 'El Águila Dorada vs Tornado Rojo',
      viewers: 1234,
      status: 'En Vivo',
      category: 'Peso Gallo'
    },
    {
      id: 2,
      title: 'Copa Primavera - Semifinal',
      fighters: 'Rayo Plateado vs Sombra Azul',
      viewers: 856,
      status: 'En Vivo',
      category: 'Peso Pluma'
    },
    {
      id: 3,
      title: 'Próximo: Torneo Local',
      fighters: 'Viento del Sur vs Relámpago',
      viewers: 0,
      status: 'Próximo',
      category: 'Peso Medio'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Transmisiones en Vivo</h1>
        <div className="flex items-center gap-2">
          <Badge className="bg-red-600 text-white">
            <Radio className="h-3 w-3 mr-1" />
            EN VIVO
          </Badge>
          <span className="text-gray-300 flex items-center">
            <Users className="h-4 w-4 mr-1" />
            {viewers.toLocaleString()} espectadores
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-0">
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1667328167888-123ade490edd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxsaXZlJTIwc3RyZWFtaW5nJTIwc3BvcnRzfGVufDF8fHx8MTc1OTAyMTM3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Transmisión en vivo"
                  className="w-full h-80 lg:h-96 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-red-600 text-white">EN VIVO</Badge>
                </div>
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-black/50 border-white/20 text-white hover:bg-black/70"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 rounded-lg p-3">
                    <h3 className="text-white font-bold">Campeonato Regional - Final</h3>
                    <p className="text-gray-300">El Águila Dorada vs Tornado Rojo</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4">
                    <Button size="sm" variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                      <Heart className="h-4 w-4 mr-1" />
                      Me gusta
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-gray-300 hover:bg-slate-700">
                      <Share2 className="h-4 w-4 mr-1" />
                      Compartir
                    </Button>
                  </div>
                  <Badge variant="outline" className="text-purple-400 border-purple-400">
                    Peso Gallo
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Otras Transmisiones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {liveStreams.slice(1).map((stream) => (
                  <div key={stream.id} className="bg-slate-700/50 rounded-lg p-4 cursor-pointer hover:bg-slate-700/70 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{stream.title}</h4>
                        <p className="text-gray-400 text-sm">{stream.fighters}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={stream.status === 'En Vivo' ? 'bg-red-600' : 'bg-gray-600'}>
                          {stream.status}
                        </Badge>
                        {stream.status === 'En Vivo' && (
                          <span className="text-gray-300 text-sm flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {stream.viewers}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      {stream.category}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Chat en Vivo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-64 overflow-y-auto space-y-2 bg-slate-700/30 rounded-lg p-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-purple-400 font-semibold">{msg.user}</span>
                      <span className="text-gray-500 text-xs">{msg.time}</span>
                    </div>
                    <p className="text-gray-300">{msg.message}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Escribe un mensaje..."
                  className="bg-slate-700 border-slate-600 text-white"
                  onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                />
                <Button onClick={addMessage} className="bg-purple-600 hover:bg-purple-700">
                  Enviar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Estadísticas del Encuentro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-white font-bold text-xl">El Águila Dorada</div>
                  <div className="text-gray-400 text-sm">15-2 récord</div>
                  <div className="text-green-400 text-sm">88% victorias</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-3">
                  <div className="text-white font-bold text-xl">Tornado Rojo</div>
                  <div className="text-gray-400 text-sm">12-3 récord</div>
                  <div className="text-green-400 text-sm">80% victorias</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duración</span>
                  <span className="text-white">08:34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Round</span>
                  <span className="text-white">3 de 5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Apuestas activas</span>
                  <span className="text-yellow-400">$45,230</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}