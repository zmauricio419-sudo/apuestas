import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Plus, Calendar, Clock, MapPin, Users, Trophy } from 'lucide-react';

import ApuestaForm from "./ui/ApuestaForm"; // 👈 Asegúrate de que esto apunta al archivo correcto

export function CompetitionManagement() {
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      name: 'Campeonato Regional Sur',
      date: '2025-09-30',
      time: '14:00',
      location: 'Arena Central',
      category: 'Peso Gallo',
      participants: 8,
      prize: '$5,000',
      status: 'Próximo',
      description: 'Campeonato regional con los mejores exponentes del peso gallo'
    },
    {
      id: 2,
      name: 'Copa Primavera',
      date: '2025-10-05',
      time: '15:30',
      location: 'Coliseo Norte',
      category: 'Peso Pluma',
      participants: 12,
      prize: '$8,000',
      status: 'Inscripción Abierta',
      description: 'Torneo de eliminación directa para peso pluma'
    },
    {
      id: 3,
      name: 'Festival de Campeones',
      date: '2025-09-25',
      time: '16:00',
      location: 'Arena del Sur',
      category: 'Libre',
      participants: 16,
      prize: '$12,000',
      status: 'Finalizado',
      description: 'El evento más prestigioso del año'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    category: '',
    prize: '',
    description: ''
  });

  const handleAddCompetition = () => {
    const newCompetition = {
      id: competitions.length + 1,
      ...formData,
      participants: 0,
      status: 'Inscripción Abierta'
    };
    setCompetitions([...competitions, newCompetition]);
    setFormData({
      name: '',
      date: '',
      time: '',
      location: '',
      category: '',
      prize: '',
      description: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Próximo': return 'bg-blue-600';
      case 'Inscripción Abierta': return 'bg-green-600';
      case 'En Curso': return 'bg-yellow-600';
      case 'Finalizado': return 'bg-gray-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gestión de Competencias</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Nueva Competencia
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Crear Nueva Competencia</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* FORMULARIO PARA NUEVA COMPETENCIA */}
              {/* ... (todo lo que ya tenías aquí sigue igual) */}
              <Button onClick={handleAddCompetition} className="w-full bg-purple-600 hover:bg-purple-700">
                Crear Competencia
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {competitions.map((comp) => (
          <Card key={comp.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-xl mb-2">{comp.name}</CardTitle>
                  <Badge className={`${getStatusColor(comp.status)} text-white`}>
                    {comp.status}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-bold">{comp.prize}</div>
                  <div className="text-gray-400 text-sm">Premio</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300 text-sm">{comp.description}</p>

              {/* INFO */}
              {/* ... resto igual */}

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Ver Detalles
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700">
                  Editar
                </Button>

                {/* ✅ BOTÓN DE APUESTA */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                      Apostar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-white">Apostar en {comp.name}</DialogTitle>
                    </DialogHeader>
                    <ApuestaForm id_usuario={1} id_competencia={comp.id} />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ... restos igual */}
      
    </div>
  );
}
