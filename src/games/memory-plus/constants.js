import {
  Camera,
  Music,
  Heart,
  Star,
  Moon,
  Sun,
  Cloud,
  Umbrella,
  Zap,
  Diamond,
  Crown,
  Gift,
  Flame,
  Leaf,
  Apple,
  Bird,
} from "lucide-react";

// Les icônes pour le jeu
export const ICONS = [
  { id: 1, icon: Heart, color: "#FF6B6B" },
  { id: 2, icon: Star, color: "#FFD93D" },
  { id: 3, icon: Moon, color: "#6C5CE7" },
  { id: 4, icon: Sun, color: "#FFA62B" },
  { id: 5, icon: Cloud, color: "#74B9FF" },
  { id: 6, icon: Umbrella, color: "#A8E6CF" },
  { id: 7, icon: Zap, color: "#F8C291" },
  { id: 8, icon: Diamond, color: "#81ECEC" },
  { id: 9, icon: Crown, color: "#FED330" },
  { id: 10, icon: Gift, color: "#FF7675" },
  { id: 11, icon: Flame, color: "#FF4757" },
  { id: 12, icon: Leaf, color: "#2ECC71" },
  { id: 13, icon: Apple, color: "#E17055" },
  { id: 14, icon: Bird, color: "#00B894" },
  { id: 15, icon: Camera, color: "#6C5CE7" },
  { id: 16, icon: Music, color: "#FF9FF3" },
];

// Fonction pour calculer le temps d'un niveau
export const calculateLevelTime = (level, useProgressiveTime = false) => {
  if (useProgressiveTime) {
    // Option 1: +10 secondes par niveau
    return 60 + (level - 1) * 10;
  } else {
    // Option 2: +60 secondes par niveau
    return 60 * level;
  }
};

// Fonction pour générer les configurations de niveau
export const generateLevelConfig = (level) => {
  return {
    id: level,
    pairs: level + 1, // On commence à 2 paires au niveau 1
    timeLimit: calculateLevelTime(level, true), // true pour utiliser le temps progressif
    name: `Niveau ${level}`,
    description: `${(level + 1) * 2} cartes à associer`,
  };
};

// Configuration simplifiée du scoring
export const SCORING_CONFIG = {
  basePoints: 100, // Points de base pour une paire trouvée
  levelMultiplier: 0.1, // +10% de points par niveau
  streakBonus: {
    multiplier: 0.2, // +20% par combo
    maxMultiplier: 2.5, // Multiplicateur maximum de x2.5
  },
};

// Timings des animations
export const ANIMATION_TIMINGS = {
  flipDuration: 300,
  matchDelay: 500,
  levelTransition: 1000,
  successFlash: 200,
};

// Configuration des niveaux générée dynamiquement
export const GAME_LEVELS = Array.from({ length: 15 }, (_, i) =>
  generateLevelConfig(i + 1)
);
