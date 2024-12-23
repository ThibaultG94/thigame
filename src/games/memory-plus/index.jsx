import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemoryStore } from "./store";
import { useMemoryGame } from "./hooks/useMemoryGame";
import {
  Gamepad2,
  Swords,
  Brain,
  Timer,
  RotateCcw,
  Repeat,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGameTimer } from "../hooks/useGameTimer";
import MemoryGrid from "./components/MemoryGrid";
import { GAME_LEVELS } from "./constants";
import TimerDisplay from "../../components/ui/feedback/timer-display/TimerDisplay";
import StatsCard from "../../components/ui/game/stats/StatCard";
import ScoreDisplay from "../../components/ui/feedback/score-display/ScoreDisplay";
import LevelDisplay from "../../components/ui/feedback/level-display/LevelDisplay";

export default function MemoryPlus() {
  // Récupération des états et actions du store global
  const {
    score,
    moves,
    currentLevel,
    gameOver,
    activeBonus,
    resetGame,
    initializeGame,
    handleMatch,
    completeLevel,
    handleTimeout,
  } = useMemoryStore();

  // Configuration du niveau actuel
  const levelConfig = GAME_LEVELS[currentLevel];

  // État local pour l'animation du score
  const [previousScore, setPreviousScore] = useState(score);

  // Initialisation du timer - IMPORTANT: doit être défini avant son utilisation
  const {
    time,
    isRunning,
    start: startTimer,
    reset: resetTimer,
  } = useGameTimer({
    initialTime: levelConfig.timeLimit,
    countDown: true,
    onTimeUp: handleTimeout,
    autoStart: false,
  });

  // Initialisation du jeu et récupération des états/actions liés aux cartes
  const {
    cards,
    flipped,
    matched,
    hasLevelCompleted,
    initializeGame: initBoard,
    handleCardClick,
  } = useMemoryGame();

  // Effet pour la mise à jour du score précédent (pour les animations)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setPreviousScore(score);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [score]);

  // Effet pour la détection de la fin d'un niveau et la transition
  useEffect(() => {
    if (hasLevelCompleted) {
      const transitionTimer = setTimeout(() => {
        const { hasNextLevel } = completeLevel();

        if (hasNextLevel) {
          initBoard();
          resetTimer();
          startTimer();
        }
      }, 1000); // Délai pour les animations

      return () => clearTimeout(transitionTimer);
    }
  }, [hasLevelCompleted, completeLevel, initBoard, resetTimer, startTimer]);

  // Effet pour la réinitialisation du timer à chaque changement de niveau
  useEffect(() => {
    resetTimer();
    startTimer();
  }, [currentLevel, resetTimer, startTimer]);

  // Effet pour la détection des paires trouvées
  useEffect(() => {
    if (matched.length >= 2 && matched.length % 2 === 0) {
      handleMatch();
    }
  }, [matched.length, handleMatch]);

  // Gestionnaire pour le clic sur une carte
  const handleCardSelection = (uniqueId) => {
    if (!isRunning) return;
    handleCardClick(uniqueId);
  };

  // Gestionnaire pour la réinitialisation du jeu
  const handleReset = () => {
    resetGame();
    resetTimer();
    initBoard();
    startTimer();
  };

  // Rendu de l'écran de fin de partie
  if (gameOver) {
    return (
      <div className="container h-screen flex items-center justify-center">
        <Card className="w-full max-w-md p-6 text-center space-y-6">
          <div className="flex justify-center mb-4">
            <Trophy className="w-16 h-16 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Partie terminée !</h2>
          <div className="space-y-4">
            <ScoreDisplay
              score={score}
              previousScore={0}
              variant="detailed"
              className="text-3xl"
              showDelta={false}
            />
            <div className="text-muted-foreground">
              <p>Niveau atteint : {currentLevel + 1}</p>
              <p>Nombre de coups : {moves}</p>
            </div>
          </div>
          <Button onClick={handleReset} className="w-full">
            Rejouer
          </Button>
        </Card>
      </div>
    );
  }

  // Rendu principal du jeu
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
          <StatsCard
            icon={Brain}
            label="Niveau"
            value={
              <LevelDisplay
                level={currentLevel + 1}
                previousLevel={currentLevel}
              />
            }
          />
          <StatsCard
            icon={Gamepad2}
            label="Score"
            value={
              <ScoreDisplay
                score={score}
                previousScore={previousScore}
                variant="compact"
                showDelta={true}
                bonuses={activeBonus?.bonuses || []}
              />
            }
          />
          <StatsCard
            icon={Timer}
            label="Temps"
            value={<TimerDisplay time={time} countDown={true} />}
          />
          <StatsCard icon={Swords} label="Coups" value={moves} />
          <StatsCard
            icon={Repeat}
            label="Recommencer"
            value={<RotateCcw className="w-4 h-4 mt-2" />}
            onClick={handleReset}
          />
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
