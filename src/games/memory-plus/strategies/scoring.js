import { GAME_LEVELS, SCORING_CONFIG } from "../constants";

/**
 * Stratégie de scoring pour le jeu Memory Plus
 * Gère le calcul des scores et des bonus de manière centralisée
 */
class MemoryScoring {
  /**
   * Calcule le score pour une paire trouvée
   * @param {Object} state - État actuel du jeu
   * @param {number} currentTime - Timestamp actuel
   * @returns {Object} Score calculé avec détails des bonus
   */
  calculateMatchScore(state, currentTime) {
    const levelConfig = GAME_LEVELS[state.currentLevel];
    let score = SCORING_CONFIG.basePoints;
    const bonuses = [];

    // Bonus de streak (combo)
    if (state.lastMatchTime && currentTime - state.lastMatchTime < 3000) {
      const streakMultiplier = Math.min(1 + state.currentStreak * 0.2, 2.5);
      score *= streakMultiplier;
      bonuses.push({
        type: "streak",
        multiplier: streakMultiplier,
        message: `Combo x${state.currentStreak + 1}!`,
      });
    }

    // Bonus de temps dynamique
    const timeRatio =
      (levelConfig.timeLimit - (currentTime - state.gameStartTime) / 1000) /
      levelConfig.timeLimit;
    if (timeRatio > SCORING_CONFIG.timeBonus.perfect.threshold) {
      score *= SCORING_CONFIG.timeBonus.perfect.multiplier;
      bonuses.push({
        type: "time",
        multiplier: SCORING_CONFIG.timeBonus.perfect.multiplier,
        message: SCORING_CONFIG.timeBonus.perfect.message,
      });
    }

    // Bonus de niveau progressif
    const levelMultiplier =
      1 + state.currentLevel * SCORING_CONFIG.levelMultiplier;
    score *= levelMultiplier;
    bonuses.push({
      type: "level",
      multiplier: levelMultiplier,
      message: `Niveau ${state.currentLevel + 1}`,
    });

    return {
      score: Math.round(score),
      bonuses,
      totalMultiplier: bonuses.reduce((acc, b) => acc * (b.multiplier || 1), 1),
    };
  }

  /**
   * Calcule le score de fin de niveau avec bonus de mouvements
   * @param {Object} state - État actuel du jeu
   * @returns {Object} Score final avec bonus
   */
  calculateLevelEndBonus(state) {
    const levelConfig = GAME_LEVELS[state.currentLevel];
    const perfectMoves = levelConfig.pairs * 2;
    const bonuses = [];
    let multiplier = 1;

    // Bonus pour un nombre parfait de mouvements
    if (state.moves === perfectMoves) {
      multiplier = SCORING_CONFIG.moveBonus.perfect.multiplier;
      bonuses.push({
        type: "perfect",
        multiplier: SCORING_CONFIG.moveBonus.perfect.multiplier,
        message: SCORING_CONFIG.moveBonus.perfect.message,
      });
    }
    // Bonus pour une excellente performance
    else if (state.moves <= perfectMoves + 2) {
      multiplier = SCORING_CONFIG.moveBonus.excellent.multiplier;
      bonuses.push({
        type: "excellent",
        multiplier: SCORING_CONFIG.moveBonus.excellent.multiplier,
        message: SCORING_CONFIG.moveBonus.excellent.message,
      });
    }

    return {
      score: Math.round(state.score * multiplier),
      bonuses,
      multiplier,
    };
  }
}

// Export d'une instance unique pour tout le jeu
export const memoryScoring = new MemoryScoring();
