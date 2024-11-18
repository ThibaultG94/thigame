import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { ArrowRight, Badge, Brain, Dices, Search, SlidersHorizontal, Timer } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

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

const difficulties = ['Facile', 'Moyen', 'Difficile'];
const categories = ['Mémoire', 'Réflexes', 'Logique'];
const playerModes = ['1 joueur', '1-2 joueurs', "2 joueurs"];

export default function Games() {
    const navigate = useNavigate();
    const [searchTheme, setSearchTheme] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPlayerMode, setSelectedPlayerMode] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const filteredGames = allGames.filter(game => {
        const matchesSearch = game.title.toLowerCase().includes(searchTheme.toLowerCase()) || game.description.toLowerCase().includes(searchTheme.toLowerCase());
        const matchesDifficulty = selectedDifficulty ? game.difficulty === selectedDifficulty : true;
        const matchesCategory = selectedCategory ? game.category === selectedCategory : true;
        const matchesPlayerMode = selectedPlayerMode ? game.players === selectedPlayerMode : true;

        return matchesSearch && matchesDifficulty && matchesCategory && matchesPlayerMode;
    });

    return (
        <div>
            <Navbar />
            <div className="container py-8 space-y-8">
                {/* Header */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Tous les Jeux</h1>
                    <p className="text-muted-foreground">Trouvez votre prochain défi</p>
                </div>

                {/* Search and Filters */}
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-2 text-muted-foreground h-4 w-4" />
                            <input 
                                type="text" 
                                placeholder="Rechercher un jeu..." 
                                className="w-full pl-10 pr-4 py-2 rounded-md border bg-background"
                                value={searchTheme}
                                onChange={(e) => setSearchTheme(e.target.value)} />
                        </div>
                    </div>

                    {/* Toggle Filters Button */}
                    <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filtres
                    </Button>
                </div>

                {/* Filters */}
                {showFilters && (
                    <div className="grid sm:grid-cols-3 gap-4 p-4 border rounded-md bg-background/50">
                        <div className="space-y-2">
                            <h3 className="font-medium mb-2">Difficulté</h3>
                            <div className="flex flex-wrap gap-2">
                                {difficulties.map(diff => (
                                    <Badge 
                                        key={diff} 
                                        variant={selectedDifficulty === diff ? "default" : "outline"}
                                        className="cursor-pointer"
                                        onClick={() => setSelectedDifficulty(selectedDifficulty === diff ? "" : diff)}>
                                        {diff}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium mb-2">Catégorie</h3>
                            <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <Badge
                                key={cat}
                                variant={selectedCategory === cat ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedCategory(selectedCategory === cat ? "" : cat)}
                                >
                                {cat}
                                </Badge>
                            ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="font-medium mb-2">Mode de jeu</h3>
                            <div className="flex flex-wrap gap-2">
                            {playerModes.map(mode => (
                                <Badge
                                key={mode}
                                variant={selectedPlayerMode === mode ? "default" : "outline"}
                                className="cursor-pointer"
                                onClick={() => setSelectedPlayerMode(selectedPlayerMode === mode ? "" : mode)}
                                >
                                {mode}
                                </Badge>
                            ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Games Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGames.map(game => {
                    const IconComponent = game.icon;
                    return (
                        <Card 
                            key={game.id}
                            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                            onClick={() => navigate(game.path)}>
                                <CardContent className="p-6">
                                    <div className="mb-6">
                                        <IconComponent className="w-12 h-12 text-primary mb-4" />
                                        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                                        <p className="text-muted-foreground">{game.description}</p>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex gap-2 flex-wrap">
                                        <Badge>{game.category}</Badge>
                                        <Badge variant="secondary">{game.players}</Badge>
                                        <Badge variant="secondary">{game.time}</Badge>
                                        <Badge variant="secondary">{game.difficulty}</Badge>
                                        </div>
                                        <Button className="w-full gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        Jouer maintenant <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                        </Card>
                    )
                })}
            </div>

            {filteredGames.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    Aucun jeu ne correspond à vos critères de recherche.
                </div>
            )}
        </div>
    )
}