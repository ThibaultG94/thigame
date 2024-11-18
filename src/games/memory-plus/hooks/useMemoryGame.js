import { useState, useEffect } from "react";
import { useMemoryStore } from "../store";
import { ICONS } from "../constants";

export function useMemoryGame() {
  const { level, incrementScore, incrementMoves, incrementLevel } =
    useMemoryStore();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);

  useEffect(() => {
    initializeGame();
  }, [level]);

  const initializeGame = () => {
    const numPairs = Math.min(4 + level, ICONS.length);
    const selectedIcons = ICONS.slice(0, numPairs);
    const gameCards = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({ ...item, uniqueId: index }));

    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
  };

  const handleCardClick = (uniqueId) => {
    if (
      flipped.length === 2 ||
      flipped.includes(uniqueId) ||
      matched.includes(uniqueId)
    )
      return;

    const newFlipped = [...flipped, uniqueId];
    setFlipped(newFlipped);
    incrementMoves();

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      const firstCard = cards.find((card) => card.uniqueId === first);
      const secondCard = cards.find((card) => card.uniqueId === second);

      if (firstCard.id === secondCard.id) {
        setMatched([...matched, first, second]);
        incrementScore(100 * level);
        setFlipped([]);

        if (matched.length + 2 === cards.length) {
          setTimeout(() => {
            incrementLevel();
          }, 1000);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return {
    cards,
    flipped,
    matched,
    initializeGame,
    handleCardClick,
  };
}
