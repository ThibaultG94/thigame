import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  Gamepad2,
  Home,
  Trophy,
  User,
  Menu,
  X,
  Settings,
  LayoutGrid,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";

const RootLayout = () => {
  // État pour la gestion de la sidebar et de la navigation mobile
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Fermeture automatique de la sidebar sur mobile lors des changements de route
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location]);

  // Configuration centralisée de la navigation
  const navigation = [
    {
      name: "Accueil",
      to: "/",
      icon: Home,
      description: "Retour à l'accueil",
    },
    {
      name: "Jeux",
      to: "/games",
      icon: LayoutGrid,
      description: "Découvrir tous les jeux",
    },
    {
      name: "Classements",
      to: "/leaderboard",
      icon: Trophy,
      description: "Voir les meilleurs scores",
    },
    {
      name: "À propos",
      to: "/about",
      icon: User,
      description: "En savoir plus",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header principal - toujours visible */}
      <header className="fixed top-0 z-50 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-full flex items-center justify-between">
          {/* Logo et titre */}
          <div className="flex items-center gap-2">
            {/* Bouton menu sur mobile uniquement */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X /> : <Menu />}
            </Button>

            <Link to="/" className="flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">ThiGame</span>
            </Link>
          </div>

          {/* Navigation sur desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navigation.map((item) => (
              <Button
                key={item.to}
                variant="ghost"
                className="text-base"
                onClick={() => navigate(item.to)}
              >
                {item.name}
              </Button>
            ))}
          </div>

          {/* Bouton thème toujours visible */}
          <ThemeToggle />
        </div>
      </header>

      {/* Overlay mobile - s'affiche quand la sidebar est ouverte */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden",
          isSidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Menu mobile */}
      <div
        className={cn(
          "fixed top-16 left-0 right-0 z-40 bg-background border-b md:hidden",
          "transform transition-transform duration-300 ease-in-out",
          isSidebarOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <nav className="container py-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.to}
                variant="ghost"
                className="w-full justify-start gap-2"
                onClick={() => {
                  navigate(item.to);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Button>
            );
          })}
        </nav>
      </div>

      {/* Contenu principal */}
      <main className="pt-16">
        <div className="container py-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default RootLayout;
