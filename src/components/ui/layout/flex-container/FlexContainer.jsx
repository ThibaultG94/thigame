import { cn } from "@/utils/cn";

/**
 * Composant conteneur flexible réutilisable pour la mise en page
 * Fournit des configurations communes de flexbox avec une API simple
 */
function FlexContainer({
  children,
  preset = "row",
  gap = "md",
  className,
  innerClassName,
  padded = false,
  contained = false,
}) {
  // Configuration des espacements
  const gapClasses = {
    none: "gap-0",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  // Configurations prédéfinies des mises en page
  const presetClasses = {
    row: "flex flex-row",
    column: "flex flex-col",
    center: "flex items-center justify-center",
    start: "flex items-start justify-start",
    end: "flex items-end justify-end",
    space: "flex justify-between items-center",
    responsive: "flex flex-col md:flex-row",
  };

  // Classes pour le conteneur externe (gère le padding et la largeur max)
  const containerClasses = cn(
    contained && "container mx-auto", // Centre et limite la largeur si contained=true
    padded && "p-4", // Ajoute du padding si padded=true
    className
  );

  // Classes pour le conteneur interne (gère la disposition flex)
  const flexClasses = cn(
    presetClasses[preset],
    gapClasses[gap],
    innerClassName
  );

  // Si contained=true, on utilise une structure à deux niveaux
  // pour gérer correctement le padding et la largeur max
  if (contained) {
    return (
      <div className={containerClasses}>
        <div className={flexClasses}>{children}</div>
      </div>
    );
  }

  // Sinon, on retourne directement le conteneur flex
  return <div className={cn(containerClasses, flexClasses)}>{children}</div>;
}

export default FlexContainer;
