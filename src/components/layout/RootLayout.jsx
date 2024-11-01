import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Gamepad2, Trophy, User, Menu, X, Home } from 'lucide-react';
import { cn } from '@/utils/cn';

const RootLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Accueil', to: '/', icon: Home },
    { name: 'Jeux', to: '/games', icon: Gamepad2 },
    { name: 'Classements', to: '/leaderboard', icon: Trophy },
    { name: 'Profil', to: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar pour mobile */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden",
          isSidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-72 border-r bg-background p-6 shadow-lg transition-transform duration-300 lg:transform-none",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="flex items-center space-x-2">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold">ThiGame</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.to}
                className="flex items-center space-x-2 w-full p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Mobile header */}
        <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
          <div className="container flex h-14 items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-2"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <Gamepad2 className="w-6 h-6 text-primary" />
              <span className="font-bold">ThiGame</span>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="container p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;