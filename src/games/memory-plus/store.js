import { create } from "zustand";
import { persist } from "zustand/middleware";

const SCORE_MULTIPLIERS = {
  MATCH: 100,
  PERFECT: 1.5,
  SPEED_BONUS: 1.25,
  STREAK_BONUS: 1.1,
};

const TIME_LIMITS = {
  EASY: 120,
  MEDIUM: 180,
  HARD: 240,
};

export const useMemoryStore = create(
  persist(
    (set, get) => ({
      // État du jeu
      score: 0,
      highScores: [],
      moves: 0,
      level: 1,
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
        }),

      handleMatch: () => {
        const state = get();
        const currentTime = Date.now();
        let bonus = 1;

        // Bonus de streak
        if (state.lastMatchTime && currentTime - state.lastMatchTime < 3000) {
          bonus *= SCORE_MULTIPLIERS.STREAK_BONUS;
          set({ currentStreak: state.currentStreak + 1 });
        } else {
          set({ currentStreak: 1 });
        }

        // Calcul du bonus de temps
        const timeSpent = (currentTime - state.gameStartTime) / 1000;
        const timeLimit =
          state.level <= 3
            ? TIME_LIMITS.EASY
            : state.level <= 6
            ? TIME_LIMITS.MEDIUM
            : TIME_LIMITS.HARD;

        if (timeSpent < timeLimit * 0.6) {
          bonus *= SCORE_MULTIPLIERS.SPEED_BONUS;
        }

        // Score final
        const matchScore = Math.round(
          SCORE_MULTIPLIERS.MATCH * state.level * bonus
        );

        set((state) => ({
          score: state.score + matchScore,
          lastMatchTime: currentTime,
        }));

        return matchScore;
      },

      finishLevel: () => {
        const state = get();
        const timeSpent = (Date.now() - state.gameStartTime) / 1000;

        // Calcul du score final
        let finalMultiplier = 1;
        const perfectLevel = state.moves === state.level * 2;
        if (perfectLevel) {
          finalMultiplier = SCORE_MULTIPLIERS.PERFECT;
        }

        const levelScore = Math.round(state.score * finalMultiplier);

        // Mise à jour des high scores
        const newHighScore = {
          level: state.level,
          score: levelScore,
          moves: state.moves,
          time: timeSpent,
          date: new Date().toISOString(),
        };

        const updatedHighScores = [...state.highScores, newHighScore]
          .sort((a, b) => b.score - a.score)
          .slice(0, 10);

        set({
          highScores: updatedHighScores,
          level: state.level + 1,
        });

        return {
          levelScore,
          isHighScore: updatedHighScores[0].score === levelScore,
          perfectBonus: perfectLevel,
        };
      },

      resetGame: () =>
        set({
          score: 0,
          moves: 0,
          level: 1,
          currentStreak: 0,
          gameStartTime: null,
          lastMatchTime: null,
        }),
    }),
    {
      name: "memory-game-storage",
      partialize: (state) => ({ highScores: state.highScores }),
    }
  )
);
