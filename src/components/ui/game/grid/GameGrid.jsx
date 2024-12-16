import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";

const defaultStrategy = {
  calculateLayout: (items) => {
    const columns = Math.ceil(Math.sqrt(items));
    return {
      columns,
      rows: Math.ceil(items / columns),
    };
  },
  getItemSize: () => "aspect-square",
};

function GameGrid({
  items,
  renderItem,
  strategy = defaultStrategy,
  onItemClick,
  className,
}) {
  const { columns, rows } = strategy.calculateLayout(items.length);

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Le conteneur principal qui s'adapte à l'espace disponible */}
      <div className="w-[min(100%,60vh)] aspect-square p-4">
        <div
          className={cn("grid w-full h-full gap-4", className)}
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {items.map((item, index) => (
            <div key={index} onClick={() => onItemClick?.(item, index)}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameGrid;
