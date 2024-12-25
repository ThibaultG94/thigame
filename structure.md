# Structure du Projet ThiGame

```
thigame-web/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   └── RootLayout.jsx
│   │   ├── theme/
│   │   │   └── index.jsx
│   │   └── ui/
│   │       ├── core/
│   │       │   ├── button/
│   │       │   │   ├── Button.jsx
│   │       │   │   └── types.ts
│   │       │   ├── card/
│   │       │   │   ├── Card.jsx
│   │       │   │   └── types.ts
│   │       │   └── badge/
│   │       │       ├── Badge.jsx
│   │       │       └── types.ts
│   │       ├── feedback/
│   │       │   ├── level-complete/
│   │       │   │   ├── LevelCompleteOverlay.jsx
│   │       │   │   └── types.ts
│   │       │   ├── level-display/
│   │       │   │   ├── LevelDisplay.jsx
│   │       │   │   └── types.ts
│   │       │   ├── score-display/
│   │       │   │   ├── ScoreDisplay.jsx
│   │       │   │   └── types.ts
│   │       │   └── timer-display/
│   │       │       ├── TimerDisplay.jsx
│   │       │       └── types.ts
│   │       ├── game/
│   │       │   ├── grid/
│   │       │   │   ├── GameGrid.jsx
│   │       │   │   ├── GridStrategy.ts
│   │       │   │   └── types.ts
│   │       │   └── stats/
│   │       │       ├── StatsCard.jsx
│   │       │       └── types.ts
│   │       └── layout/
│   │           ├── flex-container/
│   │           │   └── FlexContainer.jsx
│   │           └── grid-container/
│   │               └── GridContainer.jsx
│   │
│   ├── games/
│   │   ├── core/
│   │   │   ├── factory/
│   │   │   |   ├── GameInterface.jsx
│   │   │   |   └── GameFactory.jsx
│   │   │   ├── strategies/
│   │   │   ├── commands/
│   │   │   ├── components/
│   │   │   └── hooks/
│   │   │
│   │   ├── memory-plus/
│   │   │   ├── components/
│   │   │   ├── strategies/
│   │   │   ├── commands/
│   │   │   ├── hooks/
│   │   │   ├── store.js
│   │   │   ├── MemoryGame.jsx
│   │   │   └── index.jsx
│   │   │
│   │   ├── speed-match/
│   │   └── puzzle-quest/
│   │
│   ├── hooks/
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Games.jsx
│   │   └── Home.jsx
│   │
│   ├── store/
│   │   ├── gameStore.js
│   │   └── themeStore.js
│   │
│   ├── utils/
│   │   ├── patterns/
│   │   └── helpers/
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── structure.md
├── architecture.md
└── guide.md
```
