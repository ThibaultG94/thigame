import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Brain, Dices, Search, Timer } from "lucide-react";
import { Card, CardContent } from "../components/ui/card";
import { cn } from '@/utils/cn';

const allGames = [
    {
        id: 1,
        title: "Memory Plus",
        description: "Un jeu de mémoire revisité avec des défis modernes",
        icon: Brain,
        players: "1 joueur",
        time: "5-10 min",
        difficulty: "Facile",
        category: "Memory",
        path: "/games/memory"
    },
    {
        id: 2,
        title: "Speed Match",
        description: "Testez vos réflexes dans ce jeu de matching rapide",
        icon: Timer,
        players: "1-2 joueurs",
        time: "2-5 min",
        difficulty: "Moyen",
        category: "Réflexes",
        path: "/games/speed-match"
      },
      {
        id: 3,
        title: "Puzzle Quest",
        description: "Des puzzles logiques avec une twist moderne",
        icon: Dices,
        players: "1 joueur",
        time: "10-15 min",
        difficulty: "Difficile",
        category: "Logique",
        path: "/games/puzzle"
      }
]

function FilterSection({ title, options, value, onChange }) {
    return (
      <div className="flex gap-4 items-center">
        <span className="text-sm font-medium min-w-24">{title}</span>
        <div className="flex flex-wrap gap-2">
          {options.map(option => (
            <button
              key={option}
              onClick={() => onChange(value === option ? '' : option)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm border transition-all",
                value === option ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
}

function FilterButton({ selected, onClick, children }) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "px-4 py-2 rounded-full border transition-all",
          selected ? "bg-primary text-primary-foreground" : "hover:bg-accent"
        )}
      >
        {children}
      </button>
    );
}

function GameCard({ game }) {
    const navigate = useNavigate();
    const IconComponent = game.icon;
  
    return (
      <Card 
        className="hover:shadow-lg transition-all cursor-pointer group"
        onClick={() => navigate(game.path)}
      >
        <CardContent className="p-6">
          <IconComponent className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">{game.title}</h3>
          <p className="text-muted-foreground mb-4">{game.description}</p>
          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
            {[game.players, game.time, game.difficulty].map((info, i) => (
              <span key={i} className="flex items-center">
                {i > 0 && <span className="mr-2">•</span>}
                {info}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

export default function Games() {
    const [searchTerm, setSearchTerm] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [category, setCategory] = useState("");
    const [playerMode, setPlayerMode] = useState("");

    const filteredGames = allGames.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             game.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty = !difficulty || game.difficulty === difficulty;
        const matchesCategory = !category || game.category === category;
        const matchesPlayerMode = !playerMode || game.players === playerMode;
        
        return matchesSearch && matchesDifficulty && matchesCategory && matchesPlayerMode;
    });

    return (
        <div>
          <Navbar />
          <div className="container py-8 space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Tous les Jeux</h1>
              <p className="text-muted-foreground">Trouvez votre prochain défi</p>
            </div>
    
            <div className="space-y-4">
                {/* Barre de recherche */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <input
                    type="text"
                    placeholder="Rechercher un jeu..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filtres horizontaux */}
                <div className="space-y-3 pt-2">
                    <FilterSection
                    title="Difficulté"
                    options={['Facile', 'Moyen', 'Difficile']}
                    value={difficulty}
                    onChange={setDifficulty}
                    />
                    <FilterSection
                    title="Catégorie"
                    options={['Mémoire', 'Réflexes', 'Logique']}
                    value={category}
                    onChange={setCategory}
                    />
                    <FilterSection
                    title="Mode de jeu"
                    options={['1 joueur', '1-2 joueurs', '2 joueurs']}
                    value={playerMode}
                    onChange={setPlayerMode}
                    />
                </div>
            </div>
    
            {/* Grille de jeux */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.map(game => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
    
            {filteredGames.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                Aucun jeu ne correspond à vos critères de recherche.
              </div>
            )}
          </div>
        </div>
    );
}