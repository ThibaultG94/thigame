# Structure du Projet ThiGame

## Organisation des Dossiers

```
thigame-web/
├── node_modules/          # Dépendances du projet
├── public/               # Fichiers statiques
├── src/                 # Code source de l'application
│   ├── assets/          # Images, fonts, et autres ressources
│   │
│   ├── components/      # Composants React réutilisables
│   │   ├── layout/
│   │   │   └── RootLayout.jsx    # Layout principal avec navigation
│   │   ├── theme/
│   │   │   └── index.jsx         # Gestion du thème
│   │   └── ui/                   # Composants UI réutilisables
│   │       ├── button/           # Chaque composant dans son dossier
│   │       │   ├── Button.jsx    # Composant principal
│   │       │   └── types.ts      # Types et interfaces
│   │       ├── card/
│   │       │   ├── Card.jsx
│   │       │   └── types.ts
│   │       └── badge/
│   │           ├── Badge.jsx
│   │           └── types.ts
│   │
│   ├── games/           # Logique et composants des jeux
│   │   ├── core/       # Nouveau dossier pour le code commun
│   │   │   ├── factory/          # Pattern Factory
│   │   │   │   ├── GameFactory.js
│   │   │   │   └── types.ts
│   │   │   ├── strategies/       # Pattern Strategy
│   │   │   │   ├── ScoringStrategy.js
│   │   │   │   ├── LevelStrategy.js
│   │   │   │   └── types.ts
│   │   │   ├── commands/         # Pattern Command
│   │   │   │   ├── CommandManager.js
│   │   │   │   ├── GameCommand.js
│   │   │   │   └── types.ts
│   │   │   ├── components/       # Composants partagés
│   │   │   │   ├── GameContainer.jsx
│   │   │   │   ├── ScoreDisplay.jsx
│   │   │   │   └── GameTimer.jsx
│   │   │   └── hooks/           # Hooks communs
│   │   │       ├── useGameFactory.js
│   │   │       ├── useGameMechanics.js
│   │   │       └── useGameTimer.js
│   │   │
│   │   ├── memory-plus/         # Jeu Memory
│   │   │   ├── components/
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Grid.jsx
│   │   │   ├── strategies/      # Stratégies spécifiques
│   │   │   │   ├── MemoryScoringStrategy.js
│   │   │   │   └── MemoryLevelStrategy.js
│   │   │   ├── commands/        # Commandes spécifiques
│   │   │   │   └── FlipCardCommand.js
│   │   │   ├── store.js        # État local avec Zustand
│   │   │   └── index.jsx       # Point d'entrée
│   │   │
│   │   ├── speed-match/        # Même structure que memory-plus
│   │   └── puzzle-quest/       # Même structure que memory-plus
│   │
│   ├── hooks/                  # Hooks globaux
│   │   └── useLocalStorage.js  # Persistance locale
│   │
│   ├── pages/                  # Pages de l'application
│   │   ├── About.jsx
│   │   ├── Games.jsx
│   │   └── Home.jsx
│   │
│   ├── store/                  # État global (Zustand)
│   │   ├── gameStore.js       # État des jeux
│   │   └── themeStore.js      # Préférences de thème
│   │
│   ├── utils/                  # Fonctions utilitaires
│   │   ├── patterns/          # Implémentations de patterns
│   │   │   └── observer.js    # Pattern Observer
│   │   └── helpers/           # Fonctions helpers
│   │       └── className.js   # Utilitaire de classe CSS
│   │
│   ├── App.jsx                # Composant racine
│   └── main.jsx              # Point d'entrée React
│
├── index.html
└── vite.config.js
```

## Points clés de la restructuration

### Composants UI

Les composants UI sont maintenant organisés par dossier plutôt qu'en fichiers isolés, permettant d'ajouter facilement des sous-composants, types et tests. Seuls les composants réellement utilisés sont conservés.

### Pattern Factory (/games/core/factory)

Standardise la création des jeux tout en permettant des implémentations spécifiques. Chaque jeu implémente une interface commune tout en gardant sa propre logique.

### Pattern Strategy (/games/core/strategies)

Permet de définir différentes stratégies pour :

- Le calcul des scores
- La progression des niveaux
- Les règles de jeu

### Pattern Command (/games/core/commands)

Gère l'historique des actions et permet :

- L'annulation (undo)
- Le replay des parties
- L'enregistrement des actions

### Organisation des jeux

Chaque jeu suit la même structure avec :

- Ses propres composants
- Ses stratégies spécifiques
- Ses commandes personnalisées
- Son store local

### État global

Séparé en stores distincts pour :

- Les données des jeux
- Les préférences de thème
- Les scores globaux (à venir)

Cette structure permet une meilleure séparation des responsabilités et facilite l'ajout de nouveaux jeux ou fonctionnalités.
