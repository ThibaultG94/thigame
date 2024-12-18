import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GAME_LEVELS } from "./constants";
import { memoryScoring } from "./strategies/scoring";

export const useMemoryStore = create(
  persist(
    (set, get) => ({
      // État du jeu
      score: 0,
      highScores: [],
      moves: 0,
      currentLevel: 0,
      gameOver: false,
      currentStreak: 0,
      gameStartTime: null,
      lastMatchTime: null,

      // Actions
      incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),

      initializeGame: () =>
        set({
          gameStartTime: Date.now(),
          lastMatchTime: null,
          currentStreak: 0,
          moves: 0,
          gameOver: false,
        }),

      handleMatch: () => {
        const state = get();
        const currentTime = Date.now();

        const { score: matchScore, bonuses } =
          memoryScoring.calculateMatchScore(state, currentTime);

        set((state) => ({
          score: state.score + matchScore,
          lastMatchTime: currentTime,
          currentStreak:
            state.lastMatchTime && currentTime - state.lastMatchTime < 3000
              ? state.currentStreak + 1
              : 1,
        }));

        return { score: matchScore, bonuses };
      },

      handleTimeout: () => {
        set({ gameOver: true });
        const state = get();

        // Sauvegarder le score
        const newHighScore = {
          level: state.currentLevel + 1,
          score: state.score,
          moves: state.moves,
          date: new Date().toISOString(),
        };

        const updatedHighScores = [...state.highScores, newHighScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        set({ highScores: updatedHighScores });

        return {
          finalScore: state.score,
          isHighScore: updatedHighScores[0] === newHighScore,
          level: state.currentLevel + 1,
        };
      },

      completeLevel: () => {
        const state = get();

        // Calcul du bonus de fin de niveau
        const { score: finalScore, bonuses } =
          memoryScoring.calculateLevelEndBonus(state);

        // Passage au niveau suivant si possible
        const nextLevel = state.currentLevel + 1;
        const hasNextLevel = nextLevel < GAME_LEVELS.length;

        set({
          currentLevel: hasNextLevel ? nextLevel : state.currentLevel,
          score: finalScore,
        });

        return {
          hasNextLevel,
          bonuses,
          totalScore: finalScore,
        };
      },

      resetGame: () =>
        set({
          score: 0,
          moves: 0,
          currentLevel: 0,
          currentStreak: 0,
          gameStartTime: null,
          lastMatchTime: null,
          gameOver: false,
        }),
    }),
    {
      name: "memory-game-storage",
      partialize: (state) => ({ highScores: state.highScores }),
    }
  )
);
