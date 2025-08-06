import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Eye, Trash2, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { API_URL } from '@/lib/api';

interface Material {
  id: string;
  titulo: string;
  tipo_material: 'planeacion' | 'rubrica' | 'actividad' | 'apoyo';
  ultima_modificacion: string;
}

const MyMaterialsPage: React.FC = () => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [filter, setFilter] = useState<string>('todos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/materials`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data: Material[] = await res.json();
      setMaterials(data);
    } catch (error) {
      toast({ title: "Error", description: "Error al cargar materiales", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setMaterials(prev => prev.filter(m => m.id !== id));
      toast({ title: "Eliminado", description: "Material eliminado correctamente" });
    } catch (error) {
      toast({ title: "Error", description: "Error al eliminar", variant: "destructive" });
    }
  };

  const handleView = (material: Material) => {
    alert(`Ver/Editar: ${material.titulo}`);
  };

  const filteredMaterials = materials.filter(material => 
    filter === 'todos' || material.tipo_material === filter
  );

  const getTipoLabel = (tipo: string) => {
    const labels = {
      planeacion: 'Planeación',
      rubrica: 'Rúbrica',
      actividad: 'Actividad',
      apoyo: 'Material de Apoyo'
    };
    return labels[tipo as keyof typeof labels] || tipo;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Mis Materiales</h1>
          <p className="text-gray-600">Gestiona todos tus materiales didácticos generados</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-orange-600" />
                <span>Biblioteca de Materiales</span>
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos los materiales</SelectItem>
                    <SelectItem value="planeacion">Planeaciones</SelectItem>
                    <SelectItem value="rubrica">Rúbricas</SelectItem>
                    <SelectItem value="actividad">Actividades</SelectItem>
                    <SelectItem value="apoyo">Material de Apoyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Cargando materiales...</p>
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No tienes materiales guardados aún</p>
                <p className="text-sm text-gray-500 mt-2">Comienza generando tu primer material didáctico</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Última Modificación</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMaterials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.titulo}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {getTipoLabel(material.tipo_material)}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(material.ultima_modificacion).toLocaleDateString('es-MX')}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleView(material)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(material.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyMaterialsPage;