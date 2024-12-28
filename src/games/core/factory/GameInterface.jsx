/**
 * @typedef {'waiting' | 'running' | 'paused' | 'finished'} GameState
 */

/**
 * Interface définissant le contrat que tous les jeux doivent respecter
 * @interface
 */
export class GameInterface {
  /**
   * Initialise le jeu avec ses dépendances
   * @param {Object} dependencies - Les dépendances du jeu
   * @param {Function} dependencies.store - Le store de gestion d'état
   * @param {Function} dependencies.timer - Factory pour le timer
   */
  initialize(dependencies) {
    throw new Error("La méthode initialize() doit être implémentée");
  }

  /**
   * Démarre le jeu ou le niveau en cours
   */
  start() {
    throw new Error("La méthode start() doit être implémentée");
  }

  /**
   * Met le jeu en pause
   */
  pause() {
    throw new Error("La méthode pause() doit être implémentée");
  }

  /**
   * Reprend le jeu après une pause
   */
  resume() {
    throw new Error("La méthode resume() doit être implémentée");
  }

  /**
   * Réinitialise le jeu
   */
  reset() {
    throw new Error("La méthode reset() doit être implémentée");
  }

  /**
   * Retourne l'état actuel du jeu
   * @returns {Object} État actuel du jeu
   */
  getState() {
    throw new Error("La méthode getState() doit être implémentée");
  }
}
