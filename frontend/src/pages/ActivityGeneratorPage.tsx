import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Activity, Save, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ActivityGeneratorPage: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ tema: '', gradoNivel: '' });
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerate = async () => {
    if (!formData.tema.trim()) {
      toast({ title: "Error", description: "Debes proporcionar un tema", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const mockActivity = `# Actividades Sugeridas\n\n## Tema: ${formData.tema}\n${formData.gradoNivel ? `## Nivel: ${formData.gradoNivel}\n` : ''}\n### Actividad 1: Exploración\nLos estudiantes explorarán el tema mediante...\n\n### Actividad 2: Práctica\nActividad práctica para reforzar conceptos...\n\n### Actividad 3: Evaluación\nActividad de cierre y evaluación...`;
      setGeneratedContent(mockActivity);
      toast({ title: "¡Éxito!", description: "Actividades generadas" });
    } catch (error) {
      toast({ title: "Error", description: "Error al generar", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Generador de Actividades</h1>
          <p className="text-gray-600">Crea actividades educativas innovadoras con IA</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-purple-600" />
                <span>Parámetros</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tema o PDA *</Label>
                <Textarea
                  value={formData.tema}
                  onChange={(e) => setFormData(prev => ({ ...prev, tema: e.target.value }))}
                  placeholder="Describe el tema o PDA para generar actividades..."
                  rows={4}
                />
              </div>
              <div>
                <Label>Grado/Nivel (Opcional)</Label>
                <Input
                  value={formData.gradoNivel}
                  onChange={(e) => setFormData(prev => ({ ...prev, gradoNivel: e.target.value }))}
                  placeholder="Ej: 2º Primaria"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 flex-1"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  Sugerir Actividades
                </Button>
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Actividades Generadas</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                placeholder="Las actividades aparecerán aquí..."
                rows={15}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActivityGeneratorPage;