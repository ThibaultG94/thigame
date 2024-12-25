import GameInterface from "../core/factory/GameInterface";
import { useMemoryStore } from "./store";

/**
 * Implémentation du jeu Memory Plus
 * @extends GameInterface
 */
class MemoryGame extends GameInterface {
  constructor() {
    super();
    this.state = "waiting";
    this.store = useMemoryStore.getState(); // On garde notre store Zustand
  }

  initialize() {
    this.store.initializeGame();
  }

  start() {
    this.state = "running";
    // La logique existante de démarrage
  }

  // ... autres méthodes de l'interface
}

export default MemoryGame;
