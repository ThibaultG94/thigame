import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GAME_LEVELS, SCORING_CONFIG } from "./constants";

export const useMemoryStore = create(
  persist(
    (set, get) => ({
      // État du jeu
      score: 0,
      highScores: [],
      moves: 0,
      currentLevel: 0, // Index du niveau actuel (0-9)
      gameOver: false, // Nouvel état pour gérer la fin de partie
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
        let bonus = 1;
        const levelConfig = GAME_LEVELS[state.currentLevel];

        // Bonus de streak
        if (state.lastMatchTime && currentTime - state.lastMatchTime < 3000) {
          bonus *= SCORING_CONFIG.timeBonus.excellent.multiplier;
          set({ currentStreak: state.currentStreak + 1 });
        } else {
          set({ currentStreak: 1 });
        }

        // Calcul du bonus de temps
        const timeSpent = (currentTime - state.gameStartTime) / 1000;
        const timeRatio =
          (levelConfig.timeLimit - timeSpent) / levelConfig.timeLimit;

        if (timeRatio > SCORING_CONFIG.timeBonus.perfect.threshold) {
          bonus *= SCORING_CONFIG.timeBonus.perfect.multiplier;
        } else if (timeRatio > SCORING_CONFIG.timeBonus.excellent.threshold) {
          bonus *= SCORING_CONFIG.timeBonus.excellent.multiplier;
        } else if (timeRatio > SCORING_CONFIG.timeBonus.good.threshold) {
          bonus *= SCORING_CONFIG.timeBonus.good.multiplier;
        }

        // Score final avec multiplicateur de niveau
        const levelMultiplier =
          1 + state.currentLevel * SCORING_CONFIG.levelMultiplier;
        const matchScore = Math.round(
          SCORING_CONFIG.basePoints * bonus * levelMultiplier
        );

        set((state) => ({
          score: state.score + matchScore,
          lastMatchTime: currentTime,
        }));

        return {
          score: matchScore,
          bonus: bonus,
          message:
            timeRatio > 0.7
              ? SCORING_CONFIG.timeBonus.perfect.message
              : timeRatio > 0.5
              ? SCORING_CONFIG.timeBonus.excellent.message
              : timeRatio > 0.3
              ? SCORING_CONFIG.timeBonus.good.message
              : SCORING_CONFIG.timeBonus.normal.message,
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

      completeLevel: () => {
        const state = get();
        const levelConfig = GAME_LEVELS[state.currentLevel];
        const perfectMoves = levelConfig.pairs * 2;

        // Bonus de mouvements
        let moveBonus = 1;
        if (state.moves === perfectMoves) {
          moveBonus = SCORING_CONFIG.moveBonus.perfect.multiplier;
        } else if (state.moves <= perfectMoves + 2) {
          moveBonus = SCORING_CONFIG.moveBonus.excellent.multiplier;
        } else if (state.moves <= perfectMoves + 4) {
          moveBonus = SCORING_CONFIG.moveBonus.good.multiplier;
        }

        // Passage au niveau suivant si possible
        const nextLevel = state.currentLevel + 1;
        const hasNextLevel = nextLevel < GAME_LEVELS.length;

        set({
          currentLevel: hasNextLevel ? nextLevel : state.currentLevel,
          score: state.score * moveBonus,
        });

        return {
          hasNextLevel,
          moveBonus,
          totalScore: state.score,
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
