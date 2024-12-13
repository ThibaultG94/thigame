import { cn } from "@/utils/cn";

/**
 * Composant d'affichage du temps pour les jeux
 * @param {import('./types').TimerDisplayProps} props
 */
function TimerDisplay({
  time,
  countDown = false,
  variant = "default",
  className,
  showHours = false,
}) {
  // Formatage du temps avec gestion du compte à rebours
  const formatTime = () => {
    // Pour le compte à rebours, on veut montrer le temps restant
    const timeToShow = countDown ? Math.max(0, time) : time;
    const absTime = Math.abs(timeToShow);

    const hours = Math.floor(absTime / 3600);
    const minutes = Math.floor((absTime % 3600) / 60);
    const seconds = absTime % 60;

    if (showHours) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Texte descriptif pour l'accessibilité
  const getAriaLabel = () => {
    const timeString = formatTime();
    return countDown
      ? `Temps restant : ${timeString}`
      : `Temps écoulé : ${timeString}`;
  };

  // Style variant conditionnel
  const getVariantStyles = () => ({
    "text-sm": variant === "compact",
    "text-2xl font-bold": variant === "large",
    "text-base": variant === "default",
  });

  // Utilisation de <time> pour la sémantique
  return (
    <div
      role="timer"
      aria-live="polite"
      aria-atomic="true"
      aria-label={getAriaLabel()}
      className={cn(
        "inline-flex items-center gap-2 rounded-md px-2 py-1",
        "bg-card text-card-foreground",
        getVariantStyles(),
        // Style d'urgence pour le compte à rebours bas
        {
          "text-destructive animate-pulse": countDown && time <= 10,
        },
        className
      )}
    >
      <time dateTime={`PT${time}S`} className="tabular-nums">
        {formatTime()}
      </time>
    </div>
  );
}

export default TimerDisplay;
