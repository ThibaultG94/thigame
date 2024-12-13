/**
 * @typedef {Object} StatsCardProps
 * @property {React.ReactNode} icon - Icône à afficher (composant Lucide)
 * @property {string} label - Label de la statistique (ex: "Score", "Temps", etc.)
 * @property {React.ReactNode} value - Valeur à afficher (peut être un nombre, un composant comme TimerDisplay, etc.)
 * @property {string} [tooltip] - Texplication optionnelle au survol
 * @property {'default' | 'highlight' | 'warning'} [variant] - Style visuel de la carte
 * @property {string} [className] - Classes CSS additionnelles
 * @property {() => void} [onClick] - Gestionnaire de clic optionnel pour les stats interactives
 */