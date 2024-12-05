import { useState, useEffect, useCallback } from "react";
import { useMemoryStore } from "../store";
import { ICONS, GAME_LEVELS } from "../constants";

export function useMemoryGame() {
  // Récupération des états et actions depuis le store
  const currentLevel = useMemoryStore((state) => state.currentLevel);
  const incrementMoves = useMemoryStore((state) => state.incrementMoves);
  const levelConfig = GAME_LEVELS[currentLevel];

  // États locaux pour la gestion des cartes
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [hasLevelCompleted, setHasLevelCompleted] = useState(false);

  // Initialisation ou réinitialisation du jeu
  const initializeGame = useCallback(() => {
    const gamePairs = levelConfig.pairs;
    const selectedIcons = ICONS.slice(0, gamePairs);

    // Création du jeu de cartes avec doublons et mélange
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

  // Réinitialisation du jeu lors du changement de niveau
  useEffect(() => {
    initializeGame();
  }, [currentLevel, initializeGame]);

  // Gestion du clic sur une carte
  const handleCardClick = useCallback(
    (uniqueId) => {
      // Vérification des conditions qui empêchent de retourner une carte
      if (
        isChecking ||
        flipped.length === 2 ||
        matched.includes(uniqueId) ||
        flipped.includes(uniqueId)
      ) {
        return;
      }

      // On retourne la carte cliquée
      setFlipped((prev) => [...prev, uniqueId]);

      // Si c'est la première carte du tour, on incrémente juste le compteur
      if (flipped.length === 0) {
        incrementMoves();
      }

      // Si c'est la deuxième carte, on vérifie la paire
      if (flipped.length === 1) {
        setIsChecking(true);

        const firstCard = cards.find((card) => card.uniqueId === flipped[0]);
        const secondCard = cards.find((card) => card.uniqueId === uniqueId);

        // Vérifiation si les cartes correspondent
        if (firstCard.id === secondCard.id) {
          setTimeout(() => {
            const newMatched = [...matched, flipped[0], uniqueId];
            setMatched(newMatched);
            setFlipped([]);
            setIsChecking(false);

            // Vérification de la completion du niveau
            if (newMatched.length === cards.length) {
              setHasLevelCompleted(true);
            }
          }, 300);
        } else {
          // Si les cartes ne correspondent pas
          setTimeout(() => {
            setFlipped([]);
            setIsChecking(false);
          }, 600);
        }
      }
    },
    [cards, flipped, matched, isChecking, incrementMoves]
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
