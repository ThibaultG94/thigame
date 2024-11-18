import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useMemoryStore } from './store';
import { useMemoryGame } from './hooks/useMemoryGame';
import { Gamepad2, Swords, Brain } from 'lucide-react';

export default function MemoryPlus() {
  const { score, moves, level, resetGame } = useMemoryStore();
  const { cards, flipped, matched, initializeGame, handleCardClick } = useMemoryGame();

  const handleReset = () => {
    resetGame();
    initializeGame();
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* En-tête du jeu */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Memory Plus</h1>
          <p className="text-muted-foreground">Testez votre mémoire avec des icônes colorées</p>
        </div>

        {/* Stats du jeu */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-primary/5">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Niveau</div>
                <div className="text-2xl font-bold text-primary">{level}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-primary/5">
            <div className="flex items-center justify-center gap-2">
              <Gamepad2 className="w-5 h-5 text-primary" />
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Score</div>
                <div className="text-2xl font-bold text-primary">{score}</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-primary/5">
            <div className="flex items-center justify-center gap-2">
              <Swords className="w-5 h-5 text-primary" />
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground">Coups</div>
                <div className="text-2xl font-bold text-primary">{moves}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Grille de jeu */}
        <div className="grid grid-cols-4 gap-4">
          {cards.map(({ uniqueId, icon: Icon, color }) => (
            <Card
              key={uniqueId}
              className={`aspect-square flex items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105 ${
                flipped.includes(uniqueId) || matched.includes(uniqueId)
                  ? 'rotate-0 shadow-lg'
                  : 'rotate-180 bg-secondary hover:bg-secondary/80'
              }`}
              onClick={() => handleCardClick(uniqueId)}
            >
              <div className={`transition-all duration-500 ${
                flipped.includes(uniqueId) || matched.includes(uniqueId)
                  ? 'scale-100 rotate-0'
                  : 'scale-0 rotate-180'
              }`}>
                {(flipped.includes(uniqueId) || matched.includes(uniqueId)) && (
                  <Icon 
                    size={48}
                    color={color}
                    className={`transition-opacity duration-300 ${
                      matched.includes(uniqueId) ? 'opacity-50' : 'opacity-100'
                    }`}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Bouton de reset */}
        <Button 
          size="lg"
          onClick={handleReset}
          className="w-full font-semibold"
        >
          Recommencer
        </Button>
      </div>
    </div>
  );
}