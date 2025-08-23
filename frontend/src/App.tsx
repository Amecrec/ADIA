import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import RequireAuth from "@/components/RequireAuth";
import Navbar from "@/components/Navbar";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import PlanningGeneratorPage from "@/pages/PlanningGeneratorPage";
import RubricGeneratorPage from "@/pages/RubricGeneratorPage";
import ActivityGeneratorPage from "@/pages/ActivityGeneratorPage";
import MyMaterialsPage from "@/pages/MyMaterialsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';

  return (
    <div className="min-h-screen">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<RequireAuth><DashboardPage /></RequireAuth>} />
        <Route path="/generate/planning" element={<RequireAuth><PlanningGeneratorPage /></RequireAuth>} />
        <Route path="/generate/rubric" element={<RequireAuth><RubricGeneratorPage /></RequireAuth>} />
        <Route path="/generate/activity" element={<RequireAuth><ActivityGeneratorPage /></RequireAuth>} />
        <Route path="/materials" element={<RequireAuth><MyMaterialsPage /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => (
  <ThemeProvider defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;