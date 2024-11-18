import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMemoryStore } from './store';
import { useMemoryGame } from './hooks/useMemoryGame';

export default function MemoryPlus() {
  const { score, moves, level, resetGame } = useMemoryStore();
  const { cards, flipped, matched, initializeGame, handleCardClick } = useMemoryGame();

  const handleReset = () => {
    resetGame();
    initializeGame();
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between mb-6">
        <div className="text-lg font-bold">Niveau: {level}</div>
        <div className="text-lg">Score: {score}</div>
        <div className="text-lg">Coups: {moves}</div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(({ uniqueId, icon: Icon, color }) => (
          <Card
            key={uniqueId}
            className={`h-24 flex items-center justify-center cursor-pointer transition-all duration-300 ${
              flipped.includes(uniqueId) || matched.includes(uniqueId)
                ? 'rotate-0'
                : 'rotate-180 bg-gray-700'
            }`}
            onClick={() => handleCardClick(uniqueId)}
          >
            {(flipped.includes(uniqueId) || matched.includes(uniqueId)) && (
              <Icon 
                size={40}
                color={color}
                className={matched.includes(uniqueId) ? 'opacity-50' : ''}
              />
            )}
          </Card>
        ))}
      </div>

      <Button 
        onClick={handleReset}
        className="mt-6 w-full"
      >
        Recommencer
      </Button>
    </div>
  );
}