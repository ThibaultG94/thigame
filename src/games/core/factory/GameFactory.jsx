import { useMemoryStore } from "../../memory-plus/store";
import { useGameTimer } from "../../hooks/useGameTimer";

class GameFactory {
  /**
   * Crée une instance de jeu selon le type demandé
   * @param {'memory' | 'speedMatch' | 'puzzle'} type - Type de jeu à créer
   * @param {Object} config - Configuration optionnelle pour le jeu
   * @returns {GameInterface} Une instance du jeu demandé
   */
  createGame(type, config = {}) {
    // On détermine les dépendances en fonction du type de jeu
    const dependencies = this.createGameDependencies(type);

    // On crée l'instance
    const game = this.createGameInstance(type);

    // On l'initialise avec ses dépendances
    game.initialize({
      ...dependencies,
      ...config,
    });

    return game;
  }

  /**
   * Crée les dépendances nécessaires pour un type de jeu
   * @private
   */
  createGameDependencies(type) {
    switch (type) {
      case "memory":
        return {
          store: useMemoryStore,
          timer: useGameTimer,
        };
      // Autres types de jeux à venir...
      default:
        throw new Error(`Type de jeu non supporté: ${type}`);
    }
  }

  /**
   * Crée l'instance spécifique du jeu
   * @private
   */
  createGameInstance(type) {
    switch (type) {
      case "memory":
        const MemoryGame = require("../../memory-plus/MemoryGame").default;
        return new MemoryGame();
      default:
        throw new Error(`Type de jeu non supporté: ${type}`);
    }
  }
}

export default GameFactory;
