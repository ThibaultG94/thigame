import MemoryGame from "../../memory-plus/MemoryGame";

/**
 * Factory responsable de la création des différents types de jeux
 * C'est notre "usine" qui va produire les instances de jeux
 */
class GameFactory {
  /**
   * Crée une instance de jeu selon le type demandé
   * @param {'memory' | 'speedMatch' | 'puzzle'} type - Type de jeu à créer
   * @returns {GameInterface} Une instance du jeu demandé
   */
  createGame(type) {
    switch (type) {
      case "memory":
        return new MemoryGame();
      // Les autres jeux seront ajoutés ici au fur et à mesure
      default:
        throw new Error(`Type de jeu non supporté: ${type}`);
    }
  }
}

export default GameFactory;
