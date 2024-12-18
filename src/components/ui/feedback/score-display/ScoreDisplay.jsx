import { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";

/**
 * Composant d'affichage des scores avec animations et gestion des bonus
 * @param {import('./types').ScoreDisplayProps} props
 */
function ScoreDisplay({
  score,
  previousScore,
  bonuses = [],
  variant = "default",
  animationConfig = {
    duration: 1000,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    countUp: true,
  },
  className,
  showDelta = true,
}) {
  // État pour l'animation du score
  const [displayedScore, setDisplayedScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

  // États pour gérer l'animation des bonus
  const [visibleBonuses, setVisibleBonuses] = useState([]);
  const [isShowingBonus, setIsShowingBonus] = useState(false);

  // Gestion de l'animation des bonus
  useEffect(() => {
    if (bonuses.length > 0) {
      setVisibleBonuses(bonuses);
      setIsShowingBonus(true);

      // Animation de disparition progressive des bonus
      const timer = setTimeout(() => {
        setIsShowingBonus(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [bonuses]);

  // Gestion de l'animation du score
  useEffect(() => {
    if (score === displayedScore) return;

    setIsAnimating(true);
    const startTime = performance.now();
    const startScore = displayedScore;
    const scoreChange = score - startScore;

    // Animation fluide du score
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationConfig.duration, 1);

      const easeProgress = animationConfig.countUp
        ? easeOutCubic(progress)
        : progress;

      const currentScore = Math.round(startScore + scoreChange * easeProgress);

      setDisplayedScore(currentScore);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [score, animationConfig]);

  // Calcul du delta pour l'affichage des variations
  const scoreDelta = score - (previousScore ?? score);
  const showPositiveDelta = scoreDelta > 0;

  // Formatage pour l'accessibilité
  const getAriaLabel = () => {
    if (scoreDelta === 0) return `Score actuel : ${score}`;
    return `Score actuel : ${score}, ${
      scoreDelta > 0 ? "augmentation" : "diminution"
    } de ${Math.abs(scoreDelta)}`;
  };

  return (
    <div
      className={cn("relative", className)}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label={getAriaLabel()}
    >
      {/* Score principal */}
      <div className="flex items-center justify-center gap-2">
        <span className="font-bold tabular-nums text-2xl">
          {displayedScore.toLocaleString()}
        </span>

        {/* Variation du score */}
        {showDelta && scoreDelta !== 0 && (
          <span
            className={cn(
              "text-sm font-medium transition-opacity duration-300",
              isAnimating ? "opacity-100" : "opacity-0",
              showPositiveDelta ? "text-green-500" : "text-red-500"
            )}
          >
            {showPositiveDelta ? "+" : ""}
            {scoreDelta.toLocaleString()}
          </span>
        )}
      </div>
      {/* Affichage flottant des bonus */}
      {isShowingBonus && visibleBonuses.length > 0 && (
        <div
          className={cn(
            "absolute -top-6 left-1/2 -translate-x-1/2",
            "text-sm text-primary-foreground/80",
            "transition-all duration-300",
            "animate-in fade-in-0 slide-in-from-bottom-1"
          )}
        >
          {visibleBonuses.map((bonus, index) => (
            <span key={index} className="inline-block px-1">
              {bonus.multiplier ? `×${bonus.multiplier}` : `+${bonus.amount}`}
            </span>
          ))}
        </div>
      )}
      {/* Bonus détaillés (pour la variante detailed) */}
      {variant === "detailed" && visibleBonuses.length > 0 && (
        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          {visibleBonuses.map((bonus, index) => (
            <div
              key={`${bonus.type}-${index}`}
              className="flex justify-between items-center"
            >
              <span>{bonus.message || bonus.type}</span>
              <span className="font-medium">
                {bonus.multiplier ? `×${bonus.multiplier}` : `+${bonus.amount}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Fonction d'easing pour des animations plus naturelles
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

export default ScoreDisplay;
