import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, FileText, Save, RotateCcw, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const PlanningGeneratorPage: React.FC = () => {
  const { toast } = useToast();
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nivelAcademico: '',
    grado: '',
    campoFormativo: '',
    asignatura: '',
    temaDetonador: '',
    pda: '',
    numeroSesiones: 1,
    duracionSesion: '',
    materialApoyo: 'no',
    rubricas: 'no',
    formatoSalida: 'estandar'
  });
  
  const [generatedContent, setGeneratedContent] = useState({
    planeacion: '',
    materialApoyo: '',
    rubricas: ''
  });

  const niveles = {
    'preescolar': ['1º', '2º', '3º'],
    'primaria': ['1º', '2º', '3º', '4º', '5º', '6º'],
    'secundaria': ['1º', '2º', '3º']
  };

  const camposFormativos = [
    'Lenguajes',
    'Saberes y Pensamiento Científicos',
    'Ética, Naturaleza y Sociedades',
    'De lo Humano y lo Comunitario'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'nivelAcademico') {
      setFormData(prev => ({ ...prev, grado: '' }));
    }
  };

  const handleGenerateDraft = async () => {
    if (!formData.temaDetonador && !formData.pda) {
      toast({
        title: "Error",
        description: "Debes proporcionar un Tema Detonador o PDA",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockContent = {
        planeacion: `# Planeación Didáctica\n\n## Información General\n- **Nivel:** ${formData.nivelAcademico}\n- **Grado:** ${formData.grado}\n- **Campo Formativo:** ${formData.campoFormativo}\n\n## Tema\n${formData.temaDetonador || formData.pda}\n\n## Desarrollo\nEsta es una planeación generada automáticamente.`,
        materialApoyo: formData.materialApoyo === 'si' ? '# Material de Apoyo\n\nRecursos necesarios.' : '',
        rubricas: formData.rubricas === 'si' ? '# Rúbrica\n\nCriterios de evaluación.' : ''
      };
      
      setGeneratedContent(mockContent);
      toast({ title: "¡Éxito!", description: "Borrador generado correctamente" });
    } catch (error) {
      toast({ title: "Error", description: "Error al generar", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Generador de Planeaciones</h1>
          <p className="text-gray-600">Crea planeaciones didácticas personalizadas con IA</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Parámetros</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nivel Académico</Label>
                  <Select value={formData.nivelAcademico} onValueChange={(value) => handleInputChange('nivelAcademico', value)}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="preescolar">Preescolar</SelectItem>
                      <SelectItem value="primaria">Primaria</SelectItem>
                      <SelectItem value="secundaria">Secundaria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Grado</Label>
                  <Select value={formData.grado} onValueChange={(value) => handleInputChange('grado', value)} disabled={!formData.nivelAcademico}>
                    <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                    <SelectContent>
                      {formData.nivelAcademico && niveles[formData.nivelAcademico as keyof typeof niveles]?.map(grado => (
                        <SelectItem key={grado} value={grado}>{grado}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Campo Formativo</Label>
                <Select value={formData.campoFormativo} onValueChange={(value) => handleInputChange('campoFormativo', value)}>
                  <SelectTrigger><SelectValue placeholder="Seleccionar" /></SelectTrigger>
                  <SelectContent>
                    {camposFormativos.map(campo => (
                      <SelectItem key={campo} value={campo}>{campo}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tema Detonador</Label>
                <Input
                  value={formData.temaDetonador}
                  onChange={(e) => handleInputChange('temaDetonador', e.target.value)}
                  placeholder="Tema principal"
                />
              </div>

              <div>
                <Label>PDA</Label>
                <Textarea
                  value={formData.pda}
                  onChange={(e) => handleInputChange('pda', e.target.value)}
                  placeholder="Procesos de desarrollo..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleGenerateDraft}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-green-500 to-green-600"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                  Generar
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
              <CardTitle>Contenido Generado</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="planeacion">
                <TabsList>
                  <TabsTrigger value="planeacion">Planeación</TabsTrigger>
                  {formData.materialApoyo === 'si' && <TabsTrigger value="material">Material</TabsTrigger>}
                  {formData.rubricas === 'si' && <TabsTrigger value="rubricas">Rúbricas</TabsTrigger>}
                </TabsList>
                <TabsContent value="planeacion">
                  <Textarea
                    value={generatedContent.planeacion}
                    onChange={(e) => setGeneratedContent(prev => ({ ...prev, planeacion: e.target.value }))}
                    rows={12}
                    className="font-mono"
                  />
                </TabsContent>
                {formData.materialApoyo === 'si' && (
                  <TabsContent value="material">
                    <Textarea
                      value={generatedContent.materialApoyo}
                      onChange={(e) => setGeneratedContent(prev => ({ ...prev, materialApoyo: e.target.value }))}
                      rows={12}
                      className="font-mono"
                    />
                  </TabsContent>
                )}
                {formData.rubricas === 'si' && (
                  <TabsContent value="rubricas">
                    <Textarea
                      value={generatedContent.rubricas}
                      onChange={(e) => setGeneratedContent(prev => ({ ...prev, rubricas: e.target.value }))}
                      rows={12}
                      className="font-mono"
                    />
                  </TabsContent>
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlanningGeneratorPage;