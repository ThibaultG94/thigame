import { useMemo } from "react";

export const useMemoryGameAdapter = (gameInstance, gameState) => {
  return useMemo(
    () => ({
      // État du jeu
      cards: gameState.cards,
      flipped: gameState.flippedCards,
      matched: gameState.matchedPairs,
      isChecking: gameState.isChecking,
      hasLevelCompleted: gameState.hasLevelCompleted,

      // Méthodes adaptées
      handleCardClick: (cardId) => {
        if (!gameState.isRunning || gameState.isChecking) return;
        gameInstance.handleCardSelection(cardId);
      },

      initializeGame: () => {
        gameInstance.initialize();
      },

      resetGame: () => {
        gameInstance.reset();
      },

      // Stats du jeu
      score: gameState.score,
      moves: gameState.moves,
      currentLevel: gameState.currentLevel,
    }),
    [gameInstance, gameState]
  );
};
