import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, CheckSquare, Activity, BookOpen, Sparkles, TrendingUp } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      title: 'Planeaciones Didácticas',
      description: 'Genera planeaciones completas adaptadas a la Nueva Escuela Mexicana',
      icon: FileText,
      path: '/generate/planning',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Rúbricas de Evaluación',
      description: 'Crea rúbricas personalizadas para evaluar el aprendizaje',
      icon: CheckSquare,
      path: '/generate/rubric',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Actividades Educativas',
      description: 'Diseña actividades innovadoras y engaging para tus estudiantes',
      icon: Activity,
      path: '/generate/activity',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Mis Materiales',
      description: 'Accede y gestiona todos tus materiales generados',
      icon: BookOpen,
      path: '/materials',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              ¡Bienvenido, {user?.nombre}!
            </h1>
          </div>
          <p className="text-lg text-gray-600">
            Tu asistente de IA está listo para ayudarte a crear materiales didácticos excepcionales.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Materiales Creados</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Planeaciones</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rúbricas</p>
                  <p className="text-2xl font-bold text-gray-900">0</p>
                </div>
                <CheckSquare className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.path} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardHeader className={`${feature.bgColor} rounded-t-lg`}>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 bg-gradient-to-r ${feature.color} rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-800">
                        {feature.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardDescription className="text-gray-600 mb-4 text-base">
                    {feature.description}
                  </CardDescription>
                  <Button
                    asChild
                    className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200`}
                  >
                    <Link to={feature.path}>Comenzar</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;