import { useRef, useState, useEffect } from "react";
import GameFactory from "../../core/factory/GameFactory";

export const useMemoryGameInstance = () => {
  const gameRef = useRef(null);

  // Initialisation unique de l'instance
  if (!gameRef.current) {
    const factory = new GameFactory();
    gameRef.current = factory.createGame("memory");
  }

  const [gameState, setGameState] = useState(() => gameRef.current.getState());

  // Abonnement aux changements d'état du jeu
  useEffect(() => {
    const updateState = () => {
      setGameState(gameRef.current.getState());
    };

    // On s'abonne aux changements d'état via le store
    const unsubscribe = gameRef.current.store.subscribe(updateState);

    return () => {
      unsubscribe();
    };
  }, []);

  return [gameRef.current, gameState];
};
