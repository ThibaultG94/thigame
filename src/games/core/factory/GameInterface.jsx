/**
 * @typedef {'waiting' | 'running' | 'paused' | 'finished'} GameState
 */

/**
 * Interface commune pour tous les <jeux></jeux>
 * C'est comme un contrat que chaque jeu doit respecter
 * @interface
 */
class GameInterface {
  /**
   * Initialise ou réinitialise le jeu
   * @abstract
   */
  initialize() {
    throw new Error("La méthode initialize() doit être implémentée");
  }

  /**
   * Démarre le jeu
   * @abstract
   */
  start() {
    throw new Error("La méthode start() doit être implémentée");
  }

  /**
   * Met le jeu en pause
   * @abstract
   */
  pause() {
    throw new Error("La méthode pause() doit être implémentée");
  }

  /**
   * Reprend le jeu après une pause
   * @abstract
   */
  resume() {
    throw new Error("La méthode resume() doit être implémentée");
  }

  /**
   * Réinitialise le jeu
   * @abstract
   */
  reset() {
    throw new Error("La méthode reset() doit être implémentée");
  }

  /**
   * Retourne le score actuel
   * @abstract
   * @returns {number}
   */
  getScore() {
    throw new Error("La méthode getScore() doit être implémentée");
  }
}

export default GameInterface;
