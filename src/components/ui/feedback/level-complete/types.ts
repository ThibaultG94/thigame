/**
 * Props du composant LevelCompleteOverlay
 * @interface LevelCompleteOverlayProps
 * @property {boolean} show - Contrôle la visibilité de l'overlay
 * @property {number} level - Numéro du niveau complété
 * @property {number} score - Score actuel du joueur
 * @property {() => void} onNextLevel - Callback appelé quand le joueur choisit de passer au niveau suivant
 */
interface LevelCompleteOverlayProps {
    show: boolean;
    level: number;
    score: number;
    onNextLevel: () => void;
  }
  
  export type { LevelCompleteOverlayProps };