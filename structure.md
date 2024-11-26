# Structure du Projet ThiGame

## Organisation des Dossiers

```
thigame-web/
├── node_modules/          # Dépendances du projet
├── public/               # Fichiers statiques
│   ├── vite.svg         # Logo Vite
│   └── react.svg        # Logo React
├── src/                 # Code source de l'application
│   ├── assets/          # Images, fonts, et autres ressources
│   ├── components/      # Composants React réutilisables
│   │   ├── layout/      # Composants de mise en page
│   │   │   └── RootLayout.jsx
│   │   ├── theme/      # Composants liés au thème
│   │   │   └── index.jsx
│   │   └── ui/         # Composants UI réutilisables
│   │       ├── badge.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       └── Navbar.jsx
│   ├── games/           # Logique et composants des jeux
│   │   ├── components/  # Composants partagés entre les jeux
│   │   │   ├── GameLayout.jsx    # Layout commun (score, timer, etc.)
│   │   │   ├── ScoreDisplay.jsx  # Affichage du score
│   │   │   └── Timer.jsx         # Composant timer réutilisable
│   │   ├── hooks/      # Hooks partagés entre les jeux
│   │   │   ├── useGameTimer.js   # Gestion du temps de jeu
│   │   │   ├── useGameState.js   # État de base du jeu
│   │   │   └── useLocalStorage.js # Persistance locale
│   │   ├── memory-plus/ # Jeu Memory Plus
│   │   │   ├── components/       # Composants spécifiques
│   │   │   │   ├── Card.jsx     # Carte de mémoire
│   │   │   │   └── Board.jsx    # Plateau de jeu
│   │   │   ├── hooks/           # Hooks spécifiques
│   │   │   │   └── useMemoryGame.js
│   │   │   ├── store.js         # État local avec Zustand
│   │   │   └── index.jsx        # Point d'entrée du jeu
│   │   ├── speed-match/ # Jeu Speed Match
│   │   │   ├── components/      # Structure identique à memory-plus
│   │   │   ├── hooks/
│   │   │   ├── store.js
│   │   │   └── index.jsx
│   │   └── puzzle-quest/# Jeu Puzzle Quest
│   │       ├── components/      # Structure identique à memory-plus
│   │       ├── hooks/
│   │       ├── store.js
│   │       └── index.jsx
│   ├── hooks/          # Custom hooks globaux
│   ├── pages/          # Pages de l'application
│   │   ├── About.jsx   # Page À propos
│   │   ├── Games.jsx   # Page de liste des jeux
│   │   └── Home.jsx    # Page d'accueil
│   ├── store/          # État global (Zustand)
│   │   └── index.js    # Store principal
│   ├── styles/         # Styles globaux et variables
│   ├── utils/          # Fonctions utilitaires
│   │   └── cn.js       # Utilitaire de classe CSS
│   ├── App.jsx         # Composant racine React
│   ├── index.css       # Styles CSS globaux
│   └── main.jsx        # Point d'entrée React
├── .gitignore          # Fichiers ignorés par Git
├── eslint.config.js    # Configuration ESLint
├── index.html          # Page HTML racine
├── package.json        # Configuration npm
├── postcss.config.js   # Configuration PostCSS
├── README.md           # Documentation du projet
├── structure.md        # Ce fichier
├── tailwind.config.js  # Configuration Tailwind
└── vite.config.js      # Configuration Vite
```

## Description des Dossiers Clés

### `/games`

Organisation standardisée pour tous les jeux :

- `components/` : Composants partagés entre tous les jeux
- `hooks/` : Hooks réutilisables pour tous les jeux
- Chaque jeu (memory-plus, speed-match, puzzle-quest) suit la même structure :
  - `components/` : Composants spécifiques au jeu
  - `hooks/` : Hooks spécifiques au jeu
  - `store.js` : État local avec Zustand
  - `constants.js` : Constantes, configurations et assets du jeu
  - `index.jsx` : Point d'entrée du jeu

### `/components`

- `layout/` : Structures de mise en page
- `theme/` : Gestion du thème (clair/sombre)
- `ui/` : Composants d'interface utilisateur

### `/pages`

Pages principales de l'application :

- `About.jsx` : Présentation et FAQ
- `Games.jsx` : Liste et filtres des jeux
- `Home.jsx` : Page d'accueil

### `/store`

Gestion de l'état global avec Zustand :

- Thème
- Préférences utilisateur
- Scores globaux

### `/utils`

Fonctions utilitaires, notamment pour la gestion des classes CSS avec Tailwind.
