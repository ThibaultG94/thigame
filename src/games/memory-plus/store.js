import { create } from "zustand";
import { persist } from "zustand/middleware";
import { GAME_LEVELS, SCORING_CONFIG } from "./constants";

// La durée d'affichage des bonus reste utile pour les combos
const BONUS_DISPLAY_DURATION = 2000;

export const useMemoryStore = create(
  persist(
    (set, get) => ({
      // États du jeu
      score: 0,
      highScores: [],
      moves: 0,
      currentLevel: 0,
      gameOver: false,
      currentStreak: 0,
      gameStartTime: null,
      lastMatchTime: null,
      bonusTime: 0, // Nouveau: stocke le temps bonus accumulé

      // État pour l'affichage des bonus de score
      activeBonus: {
        bonuses: [],
        timestamp: null,
        score: 0,
      },

      // Actions de base
      incrementMoves: () =>
        set((state) => ({
          moves: state.moves + 1,
        })),

      // Initialisation d'une nouvelle partie
      initializeGame: () =>
        set({
          score: 0,
          moves: 0,
          currentLevel: 0,
          currentStreak: 0,
          gameStartTime: Date.now(),
          lastMatchTime: null,
          gameOver: false,
          bonusTime: 0,
          activeBonus: { bonuses: [], timestamp: null, score: 0 },
        }),

      // Gestion des bonus visuels
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

      // Gestion d'une paire trouvée
      handleMatch: () => {
        const state = get();
        const currentTime = Date.now();

        // Calcul du score de base pour la paire
        let matchScore = SCORING_CONFIG.basePoints;
        const bonuses = [];

        // Bonus de niveau
        const levelMultiplier =
          1 + state.currentLevel * SCORING_CONFIG.levelMultiplier;
        matchScore *= levelMultiplier;

        // Bonus de streak si la paire est trouvée rapidement
        if (state.lastMatchTime && currentTime - state.lastMatchTime < 3000) {
          const streakMultiplier = Math.min(
            1 + state.currentStreak * SCORING_CONFIG.streakBonus.multiplier,
            SCORING_CONFIG.streakBonus.maxMultiplier
          );
          matchScore *= streakMultiplier;
          bonuses.push({
            type: "streak",
            multiplier: streakMultiplier,
            message: `Combo x${state.currentStreak + 1}!`,
          });
        }

        // Mise à jour du score et des états
        set((state) => ({
          score: state.score + Math.round(matchScore),
          lastMatchTime: currentTime,
          currentStreak:
            state.lastMatchTime && currentTime - state.lastMatchTime < 3000
              ? state.currentStreak + 1
              : 1,
        }));

        // Affichage du bonus
        get().setBonus({ bonuses, score: Math.round(matchScore) });

        // Nettoyage automatique du bonus
        setTimeout(() => {
          get().clearBonus();
        }, BONUS_DISPLAY_DURATION);

        return { score: matchScore, bonuses };
      },

      // Gestion de la fin d'un niveau
      completeLevel: (remainingTime = 0) => {
        const state = get();
        const nextLevel = state.currentLevel + 1;
        const hasNextLevel = nextLevel < GAME_LEVELS.length;

        if (hasNextLevel) {
          // Ajout du temps restant comme bonus pour le prochain niveau
          set({
            currentLevel: nextLevel,
            bonusTime: remainingTime,
            // Réinitialisation des streaks entre les niveaux
            currentStreak: 0,
            lastMatchTime: null,
          });
        } else {
          // Fin du jeu si plus de niveaux
          set({ gameOver: true });
        }

        return {
          hasNextLevel,
          nextLevel: nextLevel,
        };
      },

      // Gestion de la fin de partie
      handleTimeout: () => {
        set({ gameOver: true });
        const state = get();

        // Sauvegarde du score
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

      // Réinitialisation complète
      resetGame: () =>
        set({
          score: 0,
          moves: 0,
          currentLevel: 0,
          currentStreak: 0,
          gameStartTime: null,
          lastMatchTime: null,
          gameOver: false,
          bonusTime: 0,
          activeBonus: { bonuses: [], timestamp: null, score: 0 },
        }),
    }),
    {
      name: "memory-game-storage",
      partialize: (state) => ({ highScores: state.highScores }),
    }
  )
);
