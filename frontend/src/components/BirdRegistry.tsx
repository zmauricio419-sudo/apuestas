import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Edit2, Eye, Trophy, Calendar } from 'lucide-react';

export function BirdRegistry() {
  const [birds, setBirds] = useState([
    {
      id: 1,
      name: 'El Campeón',
      breed: 'Shamo',
      weight: 2.1,
      age: 3,
      color: 'Rojo',
      owner: 'Juan Pérez',
      wins: 12,
      losses: 2,
      status: 'Activo',
      lastFight: '2025-09-15'
    },
    {
      id: 2,
      name: 'Rayo de Fuego',
      breed: 'Asil',
      weight: 2.3,
      age: 2,
      color: 'Negro',
      owner: 'María García',
      wins: 8,
      losses: 3,
      status: 'Activo',
      lastFight: '2025-09-20'
    },
    {
      id: 3,
      name: 'Trueno Dorado',
      breed: 'Kelso',
      weight: 2.0,
      age: 4,
      color: 'Dorado',
      owner: 'Carlos Rodríguez',
      wins: 15,
      losses: 1,
      status: 'Recuperación',
      lastFight: '2025-09-10'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    weight: '',
    age: '',
    color: '',
    owner: ''
  });

  const handleAddBird = () => {
    const newBird = {
      id: birds.length + 1,
      ...formData,
      weight: parseFloat(formData.weight),
      age: parseInt(formData.age),
      wins: 0,
      losses: 0,
      status: 'Activo',
      lastFight: '-'
    };
    setBirds([...birds, newBird]);
    setFormData({ name: '', breed: '', weight: '', age: '', color: '', owner: '' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activo': return 'bg-green-600';
      case 'Recuperación': return 'bg-yellow-600';
      case 'Retirado': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getWinRate = (wins: number, losses: number) => {
    const total = wins + losses;
    return total > 0 ? ((wins / total) * 100).toFixed(1) : '0.0';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Registro de Aves</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Registrar Ave
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Registrar Nueva Ave</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-gray-300">Nombre</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="breed" className="text-gray-300">Raza</Label>
                <Select value={formData.breed} onValueChange={(value) => setFormData({ ...formData, breed: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Seleccionar raza" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="Shamo">Shamo</SelectItem>
                    <SelectItem value="Asil">Asil</SelectItem>
                    <SelectItem value="Kelso">Kelso</SelectItem>
                    <SelectItem value="Hatch">Hatch</SelectItem>
                    <SelectItem value="Sweater">Sweater</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight" className="text-gray-300">Peso (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-gray-300">Edad (años)</Label>
                  <Input
                    id="age"
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="color" className="text-gray-300">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="owner" className="text-gray-300">Propietario</Label>
                <Input
                  id="owner"
                  value={formData.owner}
                  onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <Button onClick={handleAddBird} className="w-full bg-purple-600 hover:bg-purple-700">
                Registrar Ave
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {birds.map((bird) => (
          <Card key={bird.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-white text-lg">{bird.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{bird.breed}</p>
                </div>
                <Badge className={`${getStatusColor(bird.status)} text-white`}>
                  {bird.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Peso</p>
                  <p className="text-white font-semibold">{bird.weight} kg</p>
                </div>
                <div>
                  <p className="text-gray-400">Edad</p>
                  <p className="text-white font-semibold">{bird.age} años</p>
                </div>
                <div>
                  <p className="text-gray-400">Color</p>
                  <p className="text-white font-semibold">{bird.color}</p>
                </div>
                <div>
                  <p className="text-gray-400">Propietario</p>
                  <p className="text-white font-semibold">{bird.owner}</p>
                </div>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400 text-sm">Récord</span>
                  <span className="text-purple-400 text-sm">{getWinRate(bird.wins, bird.losses)}% victorias</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-400 flex items-center">
                    <Trophy className="h-3 w-3 mr-1" />
                    {bird.wins} V
                  </span>
                  <span className="text-red-400">{bird.losses} D</span>
                </div>
              </div>

              <div className="text-xs text-gray-400 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Última pelea: {bird.lastFight}
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700">
                  <Eye className="h-3 w-3 mr-1" />
                  Ver
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700">
                  <Edit2 className="h-3 w-3 mr-1" />
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}