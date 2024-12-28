export class BaseGame extends GameInterface {
  constructor() {
    super();
    this.state = "waiting";
    this.store = null;
    this.timer = null;
    this.currentLevel = 0;
  }

  initialize({ store, timer }) {
    this.store = store;
    this.timer = timer;
    this.state = "waiting";
    this.initializeGameState();
  }

  initializeGameState() {
    throw new Error("La méthode initializeGameState() doit être implémentée");
  }

  start() {
    if (this.state !== "waiting" && this.state !== "paused") return;
    this.state = "running";
    this.onGameStart();
  }

  onGameStart() {}

  pause() {
    if (this.state !== "running") return;
    this.state = "paused";
    this.timer?.pause();
    this.onGamePause();
  }

  onGamePause() {}

  resume() {
    if (this.state !== "paused") return;
    this.state = "running";
    this.timer?.resume();
    this.onGameResume();
  }

  onGameResume() {}

  reset() {
    this.state = "waiting";
    this.currentLevel = 0;
    this.onGameReset();
    this.initializeGameState();
  }

  onGameReset() {}

  getState() {
    return {
      gameState: this.state,
      currentLevel: this.currentLevel,
      ...this.getGameState(),
    };
  }

  getGameState() {
    throw new Error("La méthode getGameState() doit être implémentée");
  }
}
