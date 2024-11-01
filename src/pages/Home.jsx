import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Sparkles,
  ArrowRight,
  Timer,
  Brain,
  Dices
} from "lucide-react"

const featuredGames = [
  {
    id: 1,
    title: "Memory Plus",
    description: "Un jeu de mémoire revisité avec des défis modernes",
    icon: Brain,
    players: "1 joueur",
    time: "5-10 min",
    difficulty: "Facile",
    category: "Mémoire"
  },
  {
    id: 2,
    title: "Speed Match",
    description: "Testez vos réflexes dans ce jeu de matching rapide",
    icon: Timer,
    players: "1-2 joueurs",
    time: "2-5 min",
    difficulty: "Moyen",
    category: "Réflexes"
  },
  {
    id: 3,
    title: "Puzzle Quest",
    description: "Des puzzles logiques avec une twist moderne",
    icon: Dices,
    players: "1 joueur",
    time: "10-15 min",
    difficulty: "Difficile",
    category: "Logique"
  }
]

const features = [
  {
    icon: Gamepad2,
    title: "Jeux Classiques Revisités",
    description: "Redécouvrez vos jeux préférés avec une touche moderne et des mécaniques innovantes"
  },
  {
    icon: Trophy,
    title: "Compétition Amicale",
    description: "Défiez vos amis et grimpez dans les classements mondiaux"
  },
  {
    icon: Users,
    title: "Communauté Active",
    description: "Rejoignez une communauté passionnée de joueurs du monde entier"
  },
  {
    icon: Sparkles,
    title: "Nouveaux Défis",
    description: "Du contenu frais et des défis quotidiens pour plus de fun"
  }
]

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in">
          Redécouvrez le Plaisir du Jeu
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Des jeux classiques réinventés pour une nouvelle génération.
          Jouez, défiez, et progressez dans une expérience unique.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" className="gap-2">
            Commencer à jouer <ArrowRight className="w-4 h-4" />
          </Button>
          <Button size="lg" variant="outline">
            En savoir plus
          </Button>
        </div>
      </section>

      {/* Featured Games Section */}
      <section>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Jeux à l'Affiche</h2>
          <p className="text-muted-foreground">Découvrez notre sélection de jeux du moment</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGames.map(game => {
            const IconComponent = game.icon
            return (
              <Card key={game.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <IconComponent className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                    <p className="text-muted-foreground">{game.description}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
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
      </section>

      {/* Features Section */}
      <section className="bg-accent/50 py-16 -mx-6 px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Pourquoi ThiGame ?</h2>
          <p className="text-muted-foreground">Une expérience de jeu unique et moderne</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <Card key={index} className="bg-background/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <IconComponent className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center bg-primary text-primary-foreground py-16 -mx-6 px-6 rounded-lg">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Prêt à Jouer ?</h2>
          <p className="text-primary-foreground/90">
            Rejoignez des milliers de joueurs et commencez votre aventure dès maintenant.
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            Créer un compte <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </div>
  )
}