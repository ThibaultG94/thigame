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
} from "lucide-react";
import { useEffect, useState } from "react";
import { useGameTimer } from "../hooks/useGameTimer";
import MemoryGrid from "./components/MemoryGrid";
import { GAME_LEVELS, SCORING_CONFIG } from "./constants";
import TimerDisplay from "../../components/ui/feedback/timer-display/TimerDisplay";
import StatsCard from "../../components/ui/game/stats/StatCard";
import ScoreDisplay from "../../components/ui/feedback/score-display/ScoreDisplay";

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

  // Ajout du suivi du score précédent pour les animations
  const [previousScore, setPreviousScore] = useState(score);

  // Effet pour mettre à jour le score précédent
  useEffect(() => {
    // On attend un peu pour que l'animation actuelle se termine
    const timeoutId = setTimeout(() => {
      setPreviousScore(score);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [score]);

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

  // Construction des bonus actifs pour l'affichage
  const getCurrentBonuses = () => {
    const bonuses = [];
    const levelConfig = GAME_LEVELS[currentLevel];

    // Bonus de niveau
    bonuses.push({
      type: "level",
      multiplier: 1 + currentLevel * SCORING_CONFIG.levelMultiplier,
      message: `Bonus niveau ${currentLevel + 1}`,
    });

    // Bonus de temps si présent
    const timeRatio = time / levelConfig.timeLimit;
    if (timeRatio > SCORING_CONFIG.timeBonus.good.threshold) {
      bonuses.push({
        type: "time",
        multiplier: SCORING_CONFIG.timeBonus.good.multiplier,
        message: SCORING_CONFIG.timeBonus.good.message,
      });
    }

    return bonuses;
  };

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
          <StatsCard icon={Brain} label="Niveau" value={currentLevel + 1} />
          {/* Affichage du score */}
          <StatsCard
            icon={Gamepad2}
            label="Score"
            value={
              <ScoreDisplay
                score={score}
                previousScore={previousScore}
                variant="compact"
                showDelta={true}
              />
            }
          />
          {/* Affichage du timer */}
          <StatsCard
            icon={Timer}
            label="Temps"
            value={<TimerDisplay time={time} countDown={true} />}
          />
          {/* Affichage des coups */}
          <StatsCard icon={Swords} label="Coups" value={moves} />
          {/* Bouton de réinitialisation */}
          <StatsCard
            icon={Repeat}
            label="Recommencer"
            value={
              <div className="flex justify-center items-center pt-2">
                <RotateCcw className="w-4 h-4" />
              </div>
            }
            onClick={handleReset}
            variant="outline"
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
