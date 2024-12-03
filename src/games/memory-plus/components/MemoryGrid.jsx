import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

const MemoryGrid = ({ cards, flipped, matched, onCardClick }) => {
  // Calculer le nombre optimal de colonnes/lignes
  const columns = Math.ceil(Math.sqrt(cards.length));
  const rows = Math.ceil(cards.length / columns);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[min(100%,65vh)] aspect-square p-4">
        <div
          className="grid w-full h-full gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            const isFlipped = flipped.includes(card.uniqueId);
            const isMatched = matched.includes(card.uniqueId);

            return (
              <Card
                key={card.uniqueId}
                className={cn(
                  "flex items-center justify-center",
                  "cursor-pointer transition-all duration-300",
                  "hover:scale-[1.02] active:scale-95",
                  isFlipped || isMatched
                    ? "rotate-0 bg-primary shadow-lg"
                    : "rotate-180 bg-secondary hover:bg-secondary/80"
                )}
                onClick={() => onCardClick(card.uniqueId)}
              >
                <div
                  className={cn(
                    "transition-all duration-300",
                    isFlipped || isMatched
                      ? "scale-100 rotate-0"
                      : "scale-0 rotate-180"
                  )}
                >
                  {(isFlipped || isMatched) && (
                    <Icon
                      className={cn(
                        "w-8 h-8 md:w-10 md:h-10 transition-opacity duration-300",
                        isMatched ? "opacity-50" : "opacity-100"
                      )}
                      color={card.color}
                    />
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MemoryGrid;
