import { useState, useEffect, useCallback } from "react";
import { useMemoryStore } from "../store";
import { ICONS } from "../constants";

export function useMemoryGame() {
  const level = useMemoryStore((state) => state.level);
  const handleMatch = useMemoryStore((state) => state.handleMatch);
  const finishLevel = useMemoryStore((state) => state.finishLevel);
  const incrementMoves = useMemoryStore((state) => state.incrementMoves);

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isChecking, setIsChecking] = useState(false);

  const initializeGame = useCallback(() => {
    const numPairs = Math.min(4 + level, ICONS.length);
    const selectedIcons = ICONS.slice(0, numPairs);
    const gameCards = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        uniqueId: index,
        isMatched: false,
      }));

    setCards(gameCards);
    setFlipped([]);
    setMatched([]);
    setIsChecking(false);
  }, [level]);

  useEffect(() => {
    initializeGame();
  }, [level, initializeGame]);

  const handleCardClick = useCallback(
    (uniqueId) => {
      if (
        isChecking ||
        flipped.length === 2 ||
        flipped.includes(uniqueId) ||
        matched.includes(uniqueId)
      ) {
        return;
      }

      incrementMoves();

      const newFlipped = [...flipped, uniqueId];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setIsChecking(true);
        const [first, second] = newFlipped;
        const firstCard = cards.find((card) => card.uniqueId === first);
        const secondCard = cards.find((card) => card.uniqueId === second);

        if (firstCard.id === secondCard.id) {
          // Match trouvé !
          setTimeout(() => {
            setMatched((prev) => [...prev, first, second]);
            setFlipped([]);
            setIsChecking(false);
            handleMatch();

            // Vérifier si le niveau est terminé
            const newMatchedCount = matched.length + 2;
            if (newMatchedCount === cards.length) {
              setTimeout(() => {
                const result = finishLevel();
                // Attendre un peu avant d'initialiser le nouveau niveau
                setTimeout(initializeGame, 1000);
                // TODO: Afficher une animation de victoire ici
              }, 500);
            }
          }, 500);
        } else {
          // Pas de match
          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
          }, 1000);
        }
      }
    },
    [
      flipped,
      matched,
      cards,
      handleMatch,
      incrementMoves,
      finishLevel,
      initializeGame,
      isChecking,
    ]
  );

  return {
    cards,
    flipped,
    matched,
    isChecking,
    initializeGame,
    handleCardClick,
  };
}
