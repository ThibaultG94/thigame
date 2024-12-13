import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemoryStore } from "./store";
import { useMemoryGame } from "./hooks/useMemoryGame";
import { Gamepad2, Swords, Brain, Timer } from "lucide-react";
import { useEffect } from "react";
import { useGameTimer } from "../hooks/useGameTimer";
import MemoryGrid from "./components/MemoryGrid";
import { GAME_LEVELS } from "./constants";
import TimerDisplay from "../../components/ui/feedback/timer-display/TimerDisplay";

export default function MemoryPlus() {
  // Récupération des états et actions depuis notre store global
  const {
    score,
    moves,
    currentLevel,
    gameOver,
    resetGame,
    initializeGame,
    handleMatch,
    completeLevel,
    handleTimeout,
  } = useMemoryStore();

  // Configuration du niveau actuel depuis nos constantes
  const levelConfig = GAME_LEVELS[currentLevel];

  // État et actions pour la gestion des cartes
  const {
    cards,
    flipped,
    matched,
    hasLevelCompleted,
    initializeGame: initBoard,
    handleCardClick,
  } = useMemoryGame();

  // Effet pour gérer la complétion du niveau
  useEffect(() => {
    if (hasLevelCompleted) {
      // Donner un peu de temps pour voir la dernière paire
      setTimeout(() => {
        completeLevel();
        // Le store met à jour currentLevel, ce qui déclenchera la réinitialisation
        // via l'effet dans useMemoryGame
      }, 100);
    }
  }, [hasLevelCompleted]);

  // Gestion du timer avec notre hook personnalisé
  const {
    time,
    formattedTime,
    isRunning,
    start: startTimer,
    reset: resetTimer,
  } = useGameTimer({
    initialTime: levelConfig.timeLimit,
    countDown: true,
    onTimeUp: handleTimeout, // Game over quand le temps est écoulé
    autoStart: false,
  });

  // Effet pour gérer l'initialisation du timer à chaque nouveau niveau
  useEffect(() => {
    resetTimer();
    startTimer();
  }, [currentLevel]);

  // Gestion du clic sur une carte
  const handleCardSelection = (uniqueId) => {
    // Ne rien faire si le timer est arrêté
    if (!isRunning) return;

    // Gérer le clic sur la carte
    handleCardClick(uniqueId);

    // Si une paire a été trouvée (vérifié dans useMemoryGame)
    if (matched.length > 0) {
      // Calculer le score pour cette paire
      handleMatch();
    }
  };

  // Fonction de réinitialisation du jeu
  const handleReset = () => {
    resetGame();
    resetTimer();
    initBoard();
    startTimer();
  };

  // Affichage de l'écran de game over
  if (gameOver) {
    return (
      <div className="container h-screen flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center space-y-6">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <div className="space-y-2">
            <p>Score final: {score}</p>
            <p>Niveau atteint: {currentLevel + 1}</p>
            <p>Nombre de coups: {moves}</p>
          </div>
          <Button onClick={handleReset} className="w-full">
            Rejouer
          </Button>
        </Card>
      </div>
    );
  }

  // Affichage principal du jeu
  return (
    <div>
      <div className="container h-[calc(100vh-4rem)] py-4 flex flex-col">
        {/* En-tête avec informations sur le niveau */}
        <div className="text-center space-y-2 mb-4">
          <h1 className="text-3xl font-bold text-primary">Memory Plus</h1>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="outline">Niveau {currentLevel + 1}</Badge>
            <Badge variant="outline">{levelConfig.name}</Badge>
            <Badge variant="outline">{levelConfig.pairs * 2} cartes</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {levelConfig.description}
          </p>
        </div>

        {/* Statistiques du jeu */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {/* Affichage du niveau */}
          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Niveau</div>
                <div className="text-lg font-bold">{currentLevel + 1}</div>
              </div>
            </div>
          </Card>

          {/* Affichage du score */}
          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Score</div>
                <div className="text-lg font-bold">{score}</div>
              </div>
            </div>
          </Card>

          {/* Affichage du timer */}
          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Temps</div>
                <TimerDisplay
                  time={time}
                  countDown={true}
                  variant="default"
                  className="text-lg font-bold"
                />
              </div>
            </div>
          </Card>

          {/* Affichage des coups */}
          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Swords className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Coups</div>
                <div className="text-lg font-bold">{moves}</div>
              </div>
            </div>
          </Card>

          {/* Bouton de réinitialisation */}
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

        {/* Grille de jeu */}
        <div className="flex-1 min-h-0">
          <MemoryGrid
            cards={cards}
            flipped={flipped}
            matched={matched}
            onCardClick={handleCardSelection}
          />
        </div>
      </div>
    </div>
  );
}
