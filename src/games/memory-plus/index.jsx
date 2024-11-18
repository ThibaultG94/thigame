import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
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
    <div>
      <Navbar />
      <div className="container h-[calc(100vh-4rem)] py-4 flex flex-col">
        <div className="text-center space-y-1 mb-4">
          <h1 className="text-3xl font-bold text-primary">Memory Plus</h1>
          <p className="text-sm text-muted-foreground">Testez votre mémoire avec des icônes colorées</p>
        </div>

        {/* Stats du jeu */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Niveau</div>
                <div className="text-lg font-bold">{level}</div>
              </div>
            </div>
          </Card>
          
          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Gamepad2 className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Score</div>
                <div className="text-lg font-bold">{score}</div>
              </div>
            </div>
          </Card>

          <Card className="p-2">
            <div className="flex items-center justify-center gap-2">
              <Swords className="w-4 h-4 text-primary" />
              <div className="text-center">
                <div className="text-xs text-muted-foreground">Coups</div>
                <div className="text-lg font-bold">{moves}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Conteneur centré pour la grille */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-xl aspect-[4/3]">
            <div className="grid grid-cols-4 gap-2 h-full">
              {cards.map(({ uniqueId, icon: Icon, color }) => (
                <Card
                  key={uniqueId}
                  className={`aspect-square flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 ${
                    flipped.includes(uniqueId) || matched.includes(uniqueId)
                      ? 'rotate-0 shadow-lg'
                      : 'rotate-180 bg-secondary hover:bg-secondary/80'
                  }`}
                  onClick={() => handleCardClick(uniqueId)}
                >
                  <div className={`transition-all duration-300 ${
                    flipped.includes(uniqueId) || matched.includes(uniqueId)
                      ? 'scale-100 rotate-0'
                      : 'scale-0 rotate-180'
                  }`}>
                    {(flipped.includes(uniqueId) || matched.includes(uniqueId)) && (
                      <Icon 
                        className={`transition-opacity duration-300 ${
                          matched.includes(uniqueId) ? 'opacity-50' : 'opacity-100'
                        }`}
                        color={color}
                      />
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <Button 
          onClick={handleReset}
          className="mt-4"
          variant="outline"
        >
          Recommencer
        </Button>
      </div>
    </div>
  );
}