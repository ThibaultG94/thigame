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

  // Calculer le nombre de paires en fonction du niveau
  const getNumPairs = useCallback((level) => {
    // Augmenter progressivement le nombre de paires
    if (level <= 3) return 4; // 8 cartes
    if (level <= 6) return 6; // 12 cartes
    return 8; // 16 cartes
  }, []);

  const initializeGame = useCallback(() => {
    // Préparer les nouvelles cartes avant de les afficher
    const numPairs = getNumPairs(level);
    const selectedIcons = ICONS.slice(0, numPairs);
    const gameCards = [...selectedIcons, ...selectedIcons]
      .sort(() => Math.random() - 0.5)
      .map((item, index) => ({
        ...item,
        uniqueId: `${level}-${index}`, // Identifiant unique par niveau
        isMatched: false,
      }));

    // Reset des états
    setFlipped([]);
    setMatched([]);
    setIsChecking(false);

    // Mettre à jour les cartes
    setCards(gameCards);
  }, [level, getNumPairs]);

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
      setFlipped((prev) => [...prev, uniqueId]);

      // Vérifier la paire si c'est la deuxième carte
      if (flipped.length === 1) {
        setIsChecking(true);
        const firstCard = cards.find((card) => card.uniqueId === flipped[0]);
        const secondCard = cards.find((card) => card.uniqueId === uniqueId);

        if (firstCard.id === secondCard.id) {
          // Match trouvé - temps réduit à 300ms
          setTimeout(() => {
            setMatched((prev) => [...prev, flipped[0], uniqueId]);
            handleMatch();
            setFlipped([]);
            setIsChecking(false);

            // Vérifier si le niveau est terminé
            if (matched.length + 2 === cards.length) {
              finishLevel();
            }
          }, 300);
        } else {
          // Pas de match - temps réduit à 600ms
          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
          }, 600);
        }
      }
    },
    [
      cards,
      flipped,
      matched,
      isChecking,
      handleMatch,
      finishLevel,
      incrementMoves,
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
