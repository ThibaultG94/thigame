import { useState, useEffect, useCallback } from "react";
import { useMemoryStore } from "../store";
import { ICONS, GAME_LEVELS } from "../constants";

export function useMemoryGame() {
  const currentLevel = useMemoryStore((state) => state.currentLevel);
  const levelConfig = GAME_LEVELS[currentLevel];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasLevelCompleted, setHasLevelCompleted] = useState(false);

  // Initialisation ou réinitialisation du jeu
  const initializeGame = useCallback(() => {
    const gamePairs = levelConfig.pairs;
    const selectedIcons = ICONS.slice(0, gamePairs);

    const gameCards = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        uniqueId: `${currentLevel}-${index}`,
      }));

    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setIsChecking(false);
    setHasLevelCompleted(false);
  }, [currentLevel, levelConfig.pairs]);

  // Effet pour réinitialiser le jeu quand le niveau change
  useEffect(() => {
    initializeGame();
  }, [currentLevel, initializeGame]);

  const handleCardClick = useCallback(
    (uniqueId) => {
      if (
        isChecking ||
        flipped.length === 2 ||
        matched.includes(uniqueId) ||
        flipped.includes(uniqueId)
      ) {
        return;
      }

      setFlipped((prev) => [...prev, uniqueId]);

      if (flipped.length === 1) {
        setIsChecking(true);
        const firstCard = cards.find((card) => card.uniqueId === flipped[0]);
        const secondCard = cards.find((card) => card.uniqueId === uniqueId);

        if (firstCard.id === secondCard.id) {
          setTimeout(() => {
            const newMatched = [...matched, flipped[0], uniqueId];
            setMatched(newMatched);
            setFlipped([]);
            setIsChecking(false);

            // Vérifier si le niveau est complété
            if (newMatched.length === cards.length) {
              setHasLevelCompleted(true);
            }
          }, 300);
        } else {
          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
          }, 600);
        }
      }
    },
    [cards, flipped, matched, isChecking]
  );

  return {
    cards,
    flipped,
    matched,
    isChecking,
    hasLevelCompleted,
    initializeGame,
    handleCardClick,
  };
}
