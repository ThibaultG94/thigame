import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

function StatsCard({
  icon: Icon,
  label,
  value,
  tooltip,
  variant = "default",
  className,
  onClick,
}) {
  // Nous définissons d'abord l'objet variantClasses avec les styles pour chaque variante
  const variantClasses = {
    default: "bg-card",
    highlight: "bg-primary/10",
    warning: "bg-destructive/10",
  };

  return (
    <Card
      className={cn(
        "p-2 transition-all",
        // Rendre la carte interactive si onClick est fourni
        onClick && "hover:scale-105 cursor-pointer",
        variantClasses[variant],
        className
      )}
      onClick={onClick}
      {...(tooltip && { "aria-label": tooltip, title: tooltip })}
    >
      <div className="flex items-center justify-center gap-2">
        <Icon className="w-4 h-4 text-primary" />
        <div className="text-center">
          <div className="text-xs text-muted-foreground">{label}</div>
          <div className="text-lg font-bold">{value}</div>
        </div>
      </div>
    </Card>
  );
}

export default StatsCard;
