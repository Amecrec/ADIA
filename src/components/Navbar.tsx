import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, BookOpen, FileText, CheckSquare, Activity } from 'lucide-react';

const Navbar: React.FC = () => {
  const { logout, user } = useAuth();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BookOpen },
    { path: '/generate/planning', label: 'Planeaciones', icon: FileText },
    { path: '/generate/rubric', label: 'Rúbricas', icon: CheckSquare },
    { path: '/generate/activity', label: 'Actividades', icon: Activity },
    { path: '/materials', label: 'Mis Materiales', icon: BookOpen },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-white font-bold text-xl">
              ADIA
            </Link>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-white/90 text-sm">
              Hola, {user?.nombre}
            </span>
            <Button
              onClick={logout}
              variant="outline"
              size="sm"
              className="text-white border-white/30 hover:bg-white/10"
            >
              <LogOut size={16} className="mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;