/**
 * Props du composant LevelDisplay
 * @interface LevelDisplayProps
 * @property {number} level - Niveau actuel à afficher
 * @property {number} [previousLevel] - Niveau précédent, utilisé pour les animations de transition
 * @property {('default' | 'compact' | 'large')} [variant] - Style d'affichage du niveau
 * @property {string} [className] - Classes CSS additionnelles pour la personnalisation
 * @property {boolean} [showDelta] - Afficher ou non la différence avec le niveau précédent
 */
export interface LevelDisplayProps {
    level: number;
    previousLevel?: number;
    variant?: 'default' | 'compact' | 'large';
    className?: string;
    showDelta?: boolean;
  }