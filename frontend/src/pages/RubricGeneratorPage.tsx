import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckSquare, Save, Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const RubricGeneratorPage: React.FC = () => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    objetivo: '',
    gradoNivel: ''
  });
  const [generatedContent, setGeneratedContent] = useState('');

  const handleGenerateRubric = async () => {
    if (!formData.objetivo.trim()) {
      toast({
        title: "Error",
        description: "Debes proporcionar un objetivo o actividad a evaluar",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockRubric = `# Rúbrica de Evaluación\n\n## Objetivo: ${formData.objetivo}\n${formData.gradoNivel ? `## Grado/Nivel: ${formData.gradoNivel}\n` : ''}\n## Criterios de Evaluación\n\n| Criterio | Excelente (4) | Bueno (3) | Satisfactorio (2) | Necesita Mejorar (1) |\n|----------|---------------|-----------|-------------------|---------------------|\n| Comprensión | Demuestra comprensión completa | Comprensión adecuada | Comprensión básica | Comprensión limitada |\n| Aplicación | Aplica conceptos correctamente | Aplica con errores menores | Aplica parcialmente | Dificultad para aplicar |\n| Comunicación | Comunica ideas claramente | Comunicación efectiva | Comunicación básica | Comunicación confusa |\n\n## Comentarios Adicionales\nEsta rúbrica ha sido generada automáticamente y puede ser personalizada según las necesidades específicas del docente.`;
      
      setGeneratedContent(mockRubric);
      toast({
        title: "¡Éxito!",
        description: "Rúbrica generada correctamente"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al generar la rúbrica",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!generatedContent.trim()) {
      toast({
        title: "Error",
        description: "No hay contenido para guardar",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Guardado",
      description: "Rúbrica guardada en tu biblioteca"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Generador de Rúbricas</h1>
          <p className="text-gray-600">Crea rúbricas de evaluación personalizadas con IA</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckSquare className="w-5 h-5 text-green-600" />
                <span>Parámetros de la Rúbrica</span>
              </CardTitle>
              <CardDescription>
                Define el objetivo o actividad que deseas evaluar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="objetivo">Objetivo o Actividad a Evaluar *</Label>
                <Textarea
                  id="objetivo"
                  value={formData.objetivo}
                  onChange={(e) => setFormData(prev => ({ ...prev, objetivo: e.target.value }))}
                  placeholder="Describe el objetivo de aprendizaje o la actividad que deseas evaluar...\n\nEjemplo: Evaluar la capacidad del estudiante para resolver problemas matemáticos de fracciones aplicando diferentes estrategias de solución."
                  rows={6}
                  className="resize-none"
                />
              </div>

              <div>
                <Label htmlFor="grado">Grado/Nivel (Opcional)</Label>
                <Input
                  id="grado"
                  value={formData.gradoNivel}
                  onChange={(e) => setFormData(prev => ({ ...prev, gradoNivel: e.target.value }))}
                  placeholder="Ej: 3º Primaria, 1º Secundaria..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleGenerateRubric}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex-1"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4 mr-2" />
                  )}
                  Generar Rúbrica
                </Button>
                <Button
                  onClick={handleSave}
                  variant="outline"
                  disabled={!generatedContent.trim()}
                  className="flex-1 sm:flex-none"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Rúbrica
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Rúbrica Generada</CardTitle>
              <CardDescription>
                Edita y personaliza la rúbrica según tus necesidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                placeholder="La rúbrica generada aparecerá aquí...\n\nPodrás editarla y personalizarla antes de guardarla en tu biblioteca de materiales."
                rows={20}
                className="font-mono text-sm resize-none"
              />
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">💡 Consejos para crear mejores rúbricas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">Objetivos claros:</h4>
                <p>Define específicamente qué quieres evaluar y qué competencias o habilidades esperas medir.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Criterios observables:</h4>
                <p>Usa descriptores que sean fáciles de identificar y medir en el trabajo del estudiante.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Niveles progresivos:</h4>
                <p>Asegúrate de que cada nivel represente una progresión clara en el dominio de la competencia.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Lenguaje apropiado:</h4>
                <p>Adapta el vocabulario al nivel educativo de tus estudiantes para que puedan entender los criterios.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RubricGeneratorPage;