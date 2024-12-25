import GameInterface from "../core/factory/GameInterface";
import { useMemoryStore } from "./store";
import { useGameTimer } from "../hooks/useGameTimer";
import { GAME_LEVELS } from "./constants";

/**
 * Implémentation du jeu Memory Plus
 * Encapsule la logique du jeu et utilise le store Zustand
 * @extends GameInterface
 */
class MemoryGame extends GameInterface {
  constructor() {
    super();
    this.state = "waiting";
    this.store = useMemoryStore.getState(); // On garde notre store Zustand
    this.currentLevel = 0; // Niveau par défaut
  }

  /**
   * Initialise ou réinitialise le jeu
   */
  initialize() {
    this.state = "waiting";
    this.store.initializeGame();
  }

  /**
   * Démarre le jeu ou le niveau en cours
   */
  start() {
    if (this.state !== "waiting" && this.state !== "paused") return;

    this.state = "running";
    const levelConfig = GAME_LEVELS[this.currentLevel];

    // On initialise le timer pour ce niveau
    this.timer = useGameTimer({
      initialTime: levelConfig.timeLimit,
      countDown: true,
      onTimeUp: () => this.handleTimeout(),
      autoStart: true,
    });
  }

  /**
   * Met le jeu en pause
   */
  pause() {
    if (this.state !== "running") return;
    this.state = "paused";
    this.timer?.pause();
  }

  /**
   * Reprend le jeu après une pause
   */
  resume() {
    if (this.state !== "paused") return;
    this.state = "running";
    this.timer?.resume();
  }

  /**
   * Réinitialise complètement le jeu
   */
  reset() {
    this.store.resetGame();
    this.initialize();
  }

  /**
   * Retourne le score actuel
   */
  getScore() {
    return this.store.getState().score;
  }

  /**
   * Gère une paire trouvée
   */
  handleMatch() {
    return this.store.handleMatch();
  }

  /**
   * Passe au niveau suivant
   */
  nextLevel() {
    const { hasNextLevel, nextLevel } = this.store.completeLevel(
      this.timer?.time || 0
    );
    if (hasNextLevel) {
      this.currentLevel = nextLevel;
      return true;
    }
    this.state = "finished";
    return false;
  }

  /**
   * Gère la fin du temps imparti
   */
  handleTimeout() {
    this.state = "finished";
    return this.store.handleTimeout();
  }

  /**
   * Retourne l'état actuel du jeu
   */
  getState() {
    return {
      gameState: this.state,
      score: this.getScore(),
      level: this.currentLevel,
      ...this.store.getState(),
    };
  }
}

export default MemoryGame;
