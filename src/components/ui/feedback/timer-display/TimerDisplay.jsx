import { cn } from "@/utils/cn";

function TimerDisplay({
  time,
  countDown = false,
  variant = "default",
  className,
  showHours = false,
}) {
  // Formatage du temps avec gestion du compte à rebours
  const formatTime = () => {
    const absTime = Math.abs(time);
    const minutes = Math.floor(absTime / 60);
    const seconds = absTime % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div
      role="timer"
      aria-live="polite"
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-md px-2 py-1",
        "bg-card text-card-foreground",
        {
          "text-sm": variant === "compact",
          "text-2xl font-bold": variant === "large",
          "text-base": variant === "default",
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
