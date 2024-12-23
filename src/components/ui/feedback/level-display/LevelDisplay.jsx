import { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

function LevelDisplay({
  level,
  previousLevel,
  variant = "default",
  className,
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (level !== previousLevel && level > previousLevel) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [level, previousLevel]);

  return (
    <div
      className={cn("relative inline-flex items-center", className)}
      role="status"
      aria-label={`Niveau ${level}`}
    >
      {/* Affichage principal du niveau */}
      <span className="tabular-nums text-lg font-bold">{level}</span>

      {/* Animation du changement de niveau - maintenant à droite */}
      {isAnimating && (
        <div
          className={cn(
            "absolute -right-6", // Positionné à droite du niveau
            "text-xs font-medium text-blue-500 dark:text-blue-400", // Couleur bleue avec support du mode sombre
            "animate-in fade-in-0 slide-in-from-left-2 duration-300"
          )}
        >
          +1
        </div>
      )}
    </div>
  );
}

export default LevelDisplay;
