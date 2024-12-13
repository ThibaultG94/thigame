import { useState, useEffect, useRef } from "react";
import { cn } from "@/utils/cn";
import { Card } from "@/components/ui/card";

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
  onAnimationComplete,
}) {
  // État pour l'animation du score
  const [displayedScore, setDisplayedScore] = useState(score);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationRef = useRef(null);

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

      // Fonction d'easing pour une animation plus naturelle
      const easeProgress = animationConfig.countUp
        ? easeOutCubic(progress)
        : progress;

      const currentScore = Math.round(startScore + scoreChange * easeProgress);

      setDisplayedScore(currentScore);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
        onAnimationComplete?.();
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [score, animationConfig, onAnimationComplete]);

  // Calcul du delta pour l'affichage des variations
  const scoreDelta = score - (previousScore ?? score);
  const showPositiveDelta = scoreDelta > 0;

  const getAriaLabel = () => {
    if (scoreDelta === 0) {
      // Score stable
      return `Score actuel : ${score}`;
    }
    // Score qui change
    return `Score actuel : ${score}, ${
      scoreDelta > 0 ? "augmentation" : "diminution"
    } de ${Math.abs(scoreDelta)}`;
  };

  return (
    <div
      className={cn(
        "relative", // On garde seulement les styles essentiels
        variant === "compact" && "text-sm",
        variant === "detailed" && "space-y-2",
        className
      )}
      // ARIA pour l'accessibilité
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

      {/* Affichage des bonus actifs */}
      {variant === "detailed" && bonuses.length > 0 && (
        <div className="space-y-1 text-sm text-muted-foreground">
          {bonuses.map((bonus, index) => (
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
