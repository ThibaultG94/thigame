import { cn } from "@/utils/cn";

/**
 * Convertit un nombre de colonnes en classe Tailwind grid-cols
 */
const getGridColsClass = (cols) => {
  if (!cols) return "";
  if (typeof cols === "number") return `grid-cols-${cols}`;
  return Object.entries(cols)
    .map(([breakpoint, value]) => {
      if (breakpoint === "xs") return `grid-cols-${value}`;
      return `${breakpoint}:grid-cols-${value}`;
    })
    .join(" ");
};

/**
 * Composant conteneur en grille avec support responsive
 * Utilisé pour créer des mises en page en grille cohérentes dans l'application
 */
function GridContainer({
  children,
  columns = { xs: 1, sm: 2, md: 3, lg: 4 },
  gap = "md",
  equalHeight = true,
  className,
  padded = false,
  contained = false,
  masonry = false,
}) {
  // Configuration des espacements
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  // Classes pour le conteneur de grille
  const gridClasses = cn(
    "grid",
    getGridColsClass(columns),
    gapClasses[gap],
    equalHeight && "grid-flow-row-dense",
    masonry && "grid-masonry", // Nécessite une configuration Tailwind spécifique
    className
  );

  // Classes pour le conteneur externe
  const containerClasses = cn(
    contained && "container mx-auto",
    padded && "p-4"
  );

  // Si contained=true, on utilise une structure à deux niveaux
  if (contained) {
    return (
      <div className={containerClasses}>
        <div className={gridClasses}>{children}</div>
      </div>
    );
  }

  // Sinon, on retourne directement la grille
  return <div className={cn(containerClasses, gridClasses)}>{children}</div>;
}

export default GridContainer;
