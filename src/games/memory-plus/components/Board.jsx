import { MemoryCard } from './Card';

export function Board({ cards, flipped, onCardClick }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {cards.map((card) => (
        <MemoryCard 
          key={card.id}
          symbol={card.symbol}
          isFlipped={flipped.includes(card.id)}
          isMatched={card.isMatched}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}