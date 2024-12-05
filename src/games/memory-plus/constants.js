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

// Les icônes pour le jeu - moderne et visuellement distinctes
export const ICONS = [
  { id: 1, icon: Heart, color: "#FF6B6B" }, // Rouge vif - facile à reconnaître
  { id: 2, icon: Star, color: "#FFD93D" }, // Jaune étoile
  { id: 3, icon: Moon, color: "#6C5CE7" }, // Violet profond
  { id: 4, icon: Sun, color: "#FFA62B" }, // Orange soleil
  { id: 5, icon: Cloud, color: "#74B9FF" }, // Bleu ciel
  { id: 6, icon: Umbrella, color: "#A8E6CF" }, // Vert menthe
  { id: 7, icon: Zap, color: "#F8C291" }, // Orange pêche
  { id: 8, icon: Diamond, color: "#81ECEC" }, // Turquoise
  { id: 9, icon: Crown, color: "#FED330" }, // Or royal
  { id: 10, icon: Gift, color: "#FF7675" }, // Rose corail
  { id: 11, icon: Flame, color: "#FF4757" }, // Rouge feu
  { id: 12, icon: Leaf, color: "#2ECC71" }, // Vert nature
  { id: 13, icon: Apple, color: "#E17055" }, // Rouge pomme
  { id: 14, icon: Bird, color: "#00B894" }, // Vert émeraude
  { id: 15, icon: Camera, color: "#6C5CE7" }, // Violet photo
  { id: 16, icon: Music, color: "#FF9FF3" }, // Rose musical
];

// Progression complète des niveaux
export const GAME_LEVELS = [
  {
    id: 1,
    pairs: 2, // 4 cartes
    timeLimit: 45, // 45 secondes
    name: "Débutant",
    description: "Démarrez en douceur avec 4 cartes simples",
  },
  {
    id: 2,
    pairs: 3, // 6 cartes
    timeLimit: 60, // 1 minute
    name: "Novice",
    description: "Un petit défi avec 6 cartes",
  },
  {
    id: 3,
    pairs: 4, // 8 cartes
    timeLimit: 90, // 1min30
    name: "Apprenti",
    description: "Premier vrai challenge avec 8 cartes",
  },
  {
    id: 4,
    pairs: 4, // 8 cartes
    timeLimit: 60, // 1min
    name: "Initié",
    description: "Même nombre de cartes, temps réduit",
  },
  {
    id: 5,
    pairs: 6, // 12 cartes
    timeLimit: 120, // 2min
    name: "Intermédiaire",
    description: "Montée en difficulté avec 12 cartes",
  },
  {
    id: 6,
    pairs: 6, // 12 cartes
    timeLimit: 90, // 1min30
    name: "Avancé",
    description: "La pression monte, temps réduit",
  },
  {
    id: 7,
    pairs: 6, // 12 cartes
    timeLimit: 60, // 1min
    name: "Expert",
    description: "Une minute pour 12 cartes, concentration maximale",
  },
  {
    id: 8,
    pairs: 8, // 16 cartes
    timeLimit: 180, // 3min
    name: "Maître",
    description: "Le défi ultime commence avec 16 cartes",
  },
  {
    id: 9,
    pairs: 8, // 16 cartes
    timeLimit: 120, // 2min
    name: "Grand Maître",
    description: "16 cartes, 2 minutes, pas de place à l'erreur",
  },
  {
    id: 10,
    pairs: 8, // 16 cartes
    timeLimit: 90, // 1min30
    name: "Légendaire",
    description: "Le niveau final, pour les vrais champions",
  },
];

// Configuration du système de score - plus détaillée
export const SCORING_CONFIG = {
  basePoints: 100,
  timeBonus: {
    perfect: {
      multiplier: 2.0,
      threshold: 0.7,
      message: "Temps parfait ! (x2)",
    },
    excellent: {
      multiplier: 1.5,
      threshold: 0.5,
      message: "Excellent timing ! (x1.5)",
    },
    good: { multiplier: 1.2, threshold: 0.3, message: "Bon timing ! (x1.2)" },
    normal: { multiplier: 1.0, threshold: 0, message: "Temps standard" },
  },
  moveBonus: {
    perfect: {
      multiplier: 2.0,
      maxMoves: 0,
      message: "Mémoire parfaite ! (x2)",
    },
    excellent: {
      multiplier: 1.5,
      maxMoves: 2,
      message: "Excellente mémoire ! (x1.5)",
    },
    good: { multiplier: 1.2, maxMoves: 4, message: "Bonne mémoire ! (x1.2)" },
    normal: { multiplier: 1.0, message: "Score standard" },
  },
  levelMultiplier: 0.1, // +10% de points par niveau
};

// Timings des animations et transitions
export const ANIMATION_TIMINGS = {
  flipDuration: 300, // Durée du flip de carte
  matchDelay: 500, // Délai avant de cacher les cartes non matchées
  levelTransition: 1000, // Transition entre niveaux
  successFlash: 200, // Flash de réussite
};
