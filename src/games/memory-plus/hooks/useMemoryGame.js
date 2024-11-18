import { useState } from "react";
import { useMemoryStore } from "../store";

export function useMemoryGame() {
  const { incrementScore } = useMemoryStore();
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);

  const initializeGame = () => {
    const symbols = ["★", "♦", "♥", "♠", "♣", "⬟", "▲", "●"];
    const gameCards = [...symbols, ...symbols]
      .map((symbol, index) => ({ id: index, symbol, isMatched: false }))
      .sort(() => Math.random() - 0.5);
    setCards(gameCards);
  };

  const handleCardClick = (cardId) => {
    if (flipped.length === 2 || flipped.includes(cardId)) return;

    const newFlipped = [...flipped, cardId];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        setCards(
          cards.map((card) =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          )
        );
        incrementScore();
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return {
    cards,
    flipped,
    initializeGame,
    handleCardClick,
  };
}
