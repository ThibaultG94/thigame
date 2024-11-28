import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useMemoryStore } from "./store";
import { useMemoryGame } from "./hooks/useMemoryGame";
import { Gamepad2, Swords, Brain, Timer } from "lucide-react";
import { useEffect } from "react";
import { useGameTimer } from "../hooks/useGameTimer";

const getLevelTimeLimit = (level) => {
  if (level <= 3) return 120;
  if (level <= 6) return 180;
  return 240;
};

export default function MemoryPlus() {
  const {
    score,
    moves,
    level,
    resetGame,
    initializeGame,
    handleMatch,
    finishLevel,
  } = useMemoryStore();

  const {
    cards,
    flipped,
    matched,
    initializeGame: initBoard,
    handleCardClick,
  } = useMemoryGame();

  const {
    time,
    formattedTime,
    isRunning,
    start: startTimer,
    reset: resetTimer,
  } = useGameTimer({
    initialTime: getLevelTimeLimit(level),
    countDown: true,
    onTimeUp: () => {
      // Gestion de la fin du temps
      finishLevel(moves, cards.length / 2);
      resetTimer();
      initBoard();
    },
  });

  // Initialisation du jeu
  useEffect(() => {
    initializeGame();
    initBoard();
    startTimer();
  }, [level]);

  // Gestion du clic sur une carte
  const handleCardSelection = (uniqueId) => {
    if (!isRunning) return;

    handleCardClick(uniqueId);

    // Si une paire est trouvée
    if (matched.length > 0) {
      const timeSpent = getLevelTimeLimit(level) - time;
      handleMatch(timeSpent);

      // Si niveau terminé
      if (matched.length === cards.length) {
        const result = finishLevel(moves, cards.length / 2);
        // TODO: Afficher animation de victoire avec result
      }
    }
  };

  const handleReset = () => {
    resetGame();
    resetTimer();
    initBoard();
    startTimer();
  };

  return (
    <div>
      <Navbar />
      <div className="container h-[calc(100vh-4rem)] py-4 flex flex-col">
        <div className="text-center space-y-1 mb-4">
          <h1 className="text-3xl font-bold text-primary">Memory Plus</h1>
          <p className="text-sm text-muted-foreground">
            Testez votre mémoire avec des icônes colorées
          </p>
        </div>

        {/* Stats du jeu */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Niveau</div>
                <div className="text-lg font-bold">{level}</div>
              </div>
            </div>
          </Card>

          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Score</div>
                <div className="text-lg font-bold">{score}</div>
              </div>
            </div>
          </Card>

          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Temps</div>
                <div className="text-lg font-bold">{formattedTime}</div>
              </div>
            </div>
          </Card>

          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Swords className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Coups</div>
                <div className="text-lg font-bold">{moves}</div>
              </div>
            </div>
          </Card>

          <Card className="p-2 flex items-center justify-center">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <div className="w-full h-full flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <div className="text-center">
                  <div className="text-xs">Recommencer</div>
                </div>
              </div>
            </Button>
          </Card>
        </div>

        {/* Conteneur centré pour la grille */}
        <div className="flex-1 min-h-0 flex items-center justify-center p-4">
          <div className="h-full aspect-[4/3] min-h-0">
            <div className="h-full w-full grid grid-cols-4 gap-2">
              {cards.map(({ uniqueId, icon: Icon, color }) => (
                <Card
                  key={uniqueId}
                  className={`
                    aspect-square flex items-center justify-center 
                    cursor-pointer transition-all duration-300 
                    hover:scale-[1.02] ${
                      flipped.includes(uniqueId) || matched.includes(uniqueId)
                        ? "rotate-0 bg-primary shadow-lg"
                        : "rotate-180 bg-secondary hover:bg-secondary/80"
                    }
                  `}
                  onClick={() => handleCardClick(uniqueId)}
                >
                  <div
                    className={`transition-all duration-300 ${
                      flipped.includes(uniqueId) || matched.includes(uniqueId)
                        ? "scale-100 rotate-0"
                        : "scale-0 rotate-180"
                    }`}
                  >
                    {(flipped.includes(uniqueId) ||
                      matched.includes(uniqueId)) && (
                      <Icon
                        className={`w-8 h-8 md:w-10 md:h-10 transition-opacity duration-300 ${
                          matched.includes(uniqueId)
                            ? "opacity-50"
                            : "opacity-100"
                        }`}
                        color={color}
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
