/**
 * Stratégie de disposition pour la grille
 */
interface GridStrategy {
    /**
     * Calcule la disposition optimale en fonction du nombre d'éléments
     * @param items Nombre total d'éléments à disposer
     * @returns Configuration de la grille (colonnes, lignes)
     */
    calculateLayout(items: number): {
      columns: number;
      rows: number;
    };
    
    /**
     * Détermine les dimensions des éléments de la grille
     * @param containerSize Taille du conteneur parent
     * @returns Classes CSS pour dimensionner les éléments
     */
    getItemSize(containerSize: number): string;
  }
  
  /**
   * Configuration des animations de la grille
   */
  interface GridAnimationConfig {
    /** Durée de l'animation en ms */
    duration?: number;
    /** Type d'animation ('fade' | 'slide' | 'scale') */
    type?: string;
    /** Délai entre les animations d'éléments */
    staggerDelay?: number;
  }
  
  /**
   * Props principales du composant GameGrid
   */
  interface GameGridProps<T> {
    /** Éléments à afficher dans la grille */
    items: T[];
    
    /** Fonction de rendu pour chaque élément */
    renderItem: (item: T, index: number) => React.ReactNode;
    
    /** Stratégie de disposition (optionnelle) */
    strategy?: GridStrategy;
    
    /** Configuration des animations */
    animationConfig?: GridAnimationConfig;
    
    /** Fonction appelée lors du clic sur un élément */
    onItemClick?: (item: T, index: number) => void;
    
    /** Classes CSS additionnelles */
    className?: string;
    
    /** État des éléments (pour les animations) */
    itemStates?: Record<string, any>;
  }
  
  export type { GameGridProps, GridStrategy, GridAnimationConfig };