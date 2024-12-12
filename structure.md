# Structure du Projet ThiGame

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
│   │       ├── button/
│   │       │   ├── Button.jsx
│   │       │   └── types.ts
│   │       ├── card/
│   │       │   ├── Card.jsx
│   │       │   └── types.ts
│   │       └── badge/
│   │           ├── Badge.jsx
│   │           └── types.ts
│   │
│   ├── games/
│   │   ├── core/
│   │   │   ├── factory/
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
