/**
 * Description d'un bonus de score
 */
interface ScoreBonus {
    type: string;             // Type de bonus (ex: "time", "combo", "perfect")
    amount: number;           // Valeur du bonus
    multiplier?: number;      // Multiplicateur optionnel
    message?: string;         // Message explicatif du bonus
  }
  
  /**
   * Configuration d'animation pour les changements de score
   */
  interface ScoreAnimationConfig {
    duration?: number;        // Durée de l'animation en ms
    easing?: string;         // Fonction d'easing pour l'animation
    countUp?: boolean;       // Animer le compteur vers le haut
  }
  
  /**
   * Props principales du composant ScoreDisplay
   */
  interface ScoreDisplayProps {
    /** Score actuel */
    score: number;
    
    /** Score précédent pour les animations */
    previousScore?: number;
    
    /** Bonus actifs */
    bonuses?: ScoreBonus[];
    
    /** Variante d'affichage */
    variant?: 'default' | 'compact' | 'detailed';
    
    /** Configuration des animations */
    animationConfig?: ScoreAnimationConfig;
    
    /** Classes CSS additionnelles */
    className?: string;
    
    /** Afficher les variations de score (+/-) */
    showDelta?: boolean;
    
    /** Callback appelé quand les animations sont terminées */
    onAnimationComplete?: () => void;
  }
  
  export type { ScoreDisplayProps, ScoreBonus, ScoreAnimationConfig };