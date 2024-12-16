import GameGrid from "@/components/ui/game/grid/GameGrid";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

function MemoryGrid({ cards, flipped, matched, onCardClick }) {
  // Fonction intermédiaire pour transformer l'appel
  const handleCardClick = (card) => {
    onCardClick(card.uniqueId);
  };

  return (
    <GameGrid
      items={cards}
      strategy={{
        calculateLayout: (items) => {
          const columns = Math.ceil(Math.sqrt(items));
          return { columns, rows: Math.ceil(items / columns) };
        },
        getItemSize: () => "aspect-square",
      }}
      onItemClick={handleCardClick}
      renderItem={(card) => {
        const Icon = card.icon;
        const isFlipped = flipped.includes(card.uniqueId);
        const isMatched = matched.includes(card.uniqueId);

        return (
          <Card
            className={cn(
              "h-full",
              "cursor-pointer transition-all duration-300",
              "hover:scale-[1.02] active:scale-95",
              isFlipped || isMatched
                ? "rotate-0 bg-primary shadow-lg"
                : "rotate-180 bg-secondary hover:bg-secondary/80"
            )}
          >
            <div
              className={cn(
                "h-full flex items-center justify-center",
                "transition-all duration-300",
                isFlipped || isMatched
                  ? "scale-100 rotate-0"
                  : "scale-0 rotate-180"
              )}
            >
              {(isFlipped || isMatched) && (
                <Icon
                  className={cn(
                    "w-8 h-8 md:w-10 md:h-10 transition-opacity",
                    isMatched ? "opacity-50" : "opacity-100"
                  )}
                  color={card.color}
                />
              )}
            </div>
          </Card>
        );
      }}
    />
  );
}

export default MemoryGrid;
