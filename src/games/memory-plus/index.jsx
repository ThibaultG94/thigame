import { Button } from '@/components/ui/button';
import { useMemoryStore } from './store';
import { useMemoryGame } from './hooks/useMemoryGame';
import { Board } from './components/Board';

export default function MemoryPlus() {
  const { score, gameStatus, setGameStatus, resetGame } = useMemoryStore();
  const { cards, flipped, initializeGame, handleCardClick } = useMemoryGame();

  const handleGameStart = () => {
    if (gameStatus === 'playing') {
      resetGame();
    }
    initializeGame();
    setGameStatus('playing');
  };

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Memory Plus</h1>
        <div className="flex justify-center gap-4 mb-4">
          <div className="text-xl">Score: {score}</div>
          <Button onClick={handleGameStart}>
            {gameStatus === 'playing' ? 'Restart' : 'Start Game'}
          </Button>
        </div>
      </div>

      {gameStatus === 'playing' && (
        <Board 
          cards={cards}
          flipped={flipped}
          onCardClick={handleCardClick}
        />
      )}
    </div>
  );
}