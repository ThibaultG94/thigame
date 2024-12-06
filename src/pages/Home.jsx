import { useNavigate } from "react-router-dom";
import {
  Gamepad2,
  Trophy,
  Users,
  Sparkles,
  ArrowRight,
  Timer,
  Brain,
  Dices,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const featuredGames = [
  {
    id: 1,
    title: "Memory Plus",
    description: "Un jeu de mémoire revisité avec des défis modernes",
    icon: Brain,
    players: "1 joueur",
    time: "5-10 min",
    difficulty: "Facile",
    path: "/games/memory",
  },
  {
    id: 2,
    title: "Speed Match",
    description: "Testez vos réflexes dans ce jeu de matching rapide",
    icon: Timer,
    players: "1-2 joueurs",
    time: "2-5 min",
    difficulty: "Moyen",
    path: "/games/speed-match",
  },
  {
    id: 3,
    title: "Puzzle Quest",
    description: "Des puzzles logiques avec une twist moderne",
    icon: Dices,
    players: "1 joueur",
    time: "10-15 min",
    difficulty: "Difficile",
    path: "/games/puzzle",
  },
];

const features = [
  {
    icon: Gamepad2,
    title: "Jeux Classiques Revisités",
    description:
      "Redécouvrez vos jeux préférés avec une touche moderne et des mécaniques innovantes",
  },
  {
    icon: Trophy,
    title: "Défis Quotidiens",
    description:
      "De nouveaux challenges chaque jour pour tester vos compétences",
  },
  {
    icon: Users,
    title: "Mode Solo ou Multi",
    description: "Jouez seul pour vous améliorer ou défiez vos amis en local",
  },
  {
    icon: Sparkles,
    title: "100% Gratuit",
    description: "Tous nos jeux sont gratuits et accessibles sans inscription",
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="container space-y-16 py-8">
        {/* Hero Section */}
        <section className="text-center space-y-6 pt-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in">
            Redécouvrez le Plaisir du Jeu
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des jeux classiques réinventés pour une nouvelle génération. Jouez
            gratuitement, sans inscription !
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="gap-2"
              onClick={() => navigate("/games")}
            >
              Jouer maintenant <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              En savoir plus
            </Button>
          </div>
        </section>

        {/* Featured Games Section */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Jeux à l'Affiche</h2>
            <p className="text-muted-foreground">
              Découvrez notre sélection de jeux du moment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredGames.map((game) => {
              const IconComponent = game.icon;
              return (
                <Card
                  key={game.id}
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  onClick={() => navigate(game.path)}
                >
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <IconComponent className="w-12 h-12 text-primary mb-4" />
                      <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                      <p className="text-muted-foreground">
                        {game.description}
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">{game.players}</Badge>
                        <Badge variant="secondary">{game.time}</Badge>
                        <Badge variant="secondary">{game.difficulty}</Badge>
                      </div>
                      <Button className="w-full gap-2">
                        Jouer maintenant <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Features Section */}
        {/* <section id="features" className="bg-accent/50 py-16 -mx-6 px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Pourquoi ThiGame ?</h2>
            <p className="text-muted-foreground">Une expérience de jeu unique et moderne</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section> */}
      </div>
    </div>
  );
}
