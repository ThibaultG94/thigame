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
│   ├── games/          # Logique et composants des jeux
│   ├── hooks/          # Custom hooks React
│   ├── pages/          # Pages de l'application
│   │   ├── Games.jsx   # Page de liste des jeux
│   │   └── Home.jsx    # Page d'accueil
│   ├── store/          # État global (futur Zustand)
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
├── tailwind.config.js  # Configuration Tailwind
└── vite.config.js      # Configuration Vite
```

## Description des Dossiers Clés

### `/components`

Composants React réutilisables organisés en trois catégories :

- `layout` : Structures de mise en page
- `theme` : Gestion du thème (clair/sombre)
- `ui` : Composants d'interface utilisateur

### `/pages`

Pages principales de l'application, chacune correspondant à une route.

### `/games` (À venir)

Contiendra l'implémentation des jeux :

- Memory Plus
- Speed Match
- Puzzle Quest

### `/store` (À venir)

Gestion de l'état global avec Zustand.

### `/hooks`

Hooks React personnalisés pour la logique réutilisable.

### `/utils`

Fonctions utilitaires, dont `cn.js` pour la gestion des classes Tailwind.
