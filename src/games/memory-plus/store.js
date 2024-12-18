import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GAME_LEVELS, SCORING_CONFIG } from "./constants";
import { memoryScoring } from "./strategies/scoring";

// Helper pour gérer l'expiration des bonus
const BONUS_DISPLAY_DURATION = 2000; // 2 secondes d'affichage

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

      // Nouvel état pour les bonus
      activeBonus: {
        bonuses: [],
        timestamp: null,
        score: 0,
      },

      // Actions existantes
      incrementMoves: () => set((state) => ({ moves: state.moves + 1 })),

      initializeGame: () =>
        set({
          gameStartTime: Date.now(),
          lastMatchTime: null,
          currentStreak: 0,
          moves: 0,
          gameOver: false,
          activeBonus: { bonuses: [], timestamp: null, score: 0 },
        }),

      // Action modifiée pour gérer les bonus
      setBonus: ({ bonuses, score }) =>
        set({
          activeBonus: {
            bonuses,
            score,
            timestamp: Date.now(),
          },
        }),

      clearBonus: () =>
        set({
          activeBonus: { bonuses: [], timestamp: null, score: 0 },
        }),

      // Actions modifiées pour utiliser le nouveau système de bonus
      handleMatch: () => {
        const state = get();
        const currentTime = Date.now();

        const { score: matchScore, bonuses } =
          memoryScoring.calculateMatchScore(state, currentTime);

        // Mise à jour du score et des états liés
        set((state) => ({
          score: state.score + matchScore,
          lastMatchTime: currentTime,
          currentStreak:
            state.lastMatchTime && currentTime - state.lastMatchTime < 3000
              ? state.currentStreak + 1
              : 1,
        }));

        // Affichage du bonus
        get().setBonus({ bonuses, score: matchScore });

        // Programmation de l'effacement du bonus
        setTimeout(() => {
          get().clearBonus();
        }, BONUS_DISPLAY_DURATION);

        return { score: matchScore, bonuses };
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

        // Affichage du bonus de fin de niveau
        get().setBonus({ bonuses, score: finalScore });

        // Programmation de l'effacement
        setTimeout(() => {
          get().clearBonus();
        }, BONUS_DISPLAY_DURATION);

        return {
          hasNextLevel,
          bonuses,
          totalScore: finalScore,
        };
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

      resetGame: () =>
        set({
          score: 0,
          moves: 0,
          currentLevel: 0,
          currentStreak: 0,
          gameStartTime: null,
          lastMatchTime: null,
          gameOver: false,
          activeBonus: { bonuses: [], timestamp: null, score: 0 },
        }),
    }),
    {
      name: "memory-game-storage",
      partialize: (state) => ({ highScores: state.highScores }),
    }
  )
);
