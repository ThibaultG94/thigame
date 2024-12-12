# Architecture ThiGame

## Vue d'ensemble

ThiGame est une application React moderne construite avec Vite, offrant une plateforme de jeux en ligne. L'architecture est conçue pour être modulaire, extensible et maintenable, en utilisant des patterns de conception éprouvés.

## Principes Fondamentaux

Notre architecture repose sur plusieurs principes clés :

1. **Modularité** : Chaque jeu est un module indépendant qui respecte une interface commune.
2. **Séparation des préoccupations** : La logique métier, l'interface utilisateur et l'état sont clairement séparés.
3. **Réutilisabilité** : Les composants et logiques communes sont partagés via des abstractions.
4. **Extensibilité** : L'ajout de nouveaux jeux est simplifié par l'utilisation de patterns.

## Patterns de Conception

### 1. Pattern Factory (Games)

Le Factory Pattern est utilisé pour la création standardisée des jeux. Il permet d'avoir une interface commune tout en autorisant des implémentations très différentes.

```typescript
// games/core/factory/GameFactory.ts
interface Game {
  init(): void;
  start(): void;
  pause(): void;
  resume(): void;
  end(): void;
  getScore(): number;
}

class GameFactory {
  createGame(type: GameType): Game {
    switch (type) {
      case "memory":
        return new MemoryGame();
      case "speed-match":
        return new SpeedMatchGame();
      // Extension facile pour de nouveaux jeux
    }
  }
}
```

### 2. Pattern Strategy (Scoring & Rules)

Le Strategy Pattern permet de définir une famille d'algorithmes interchangeables pour le scoring et les règles de jeu.

```typescript
// games/core/strategies/ScoringStrategy.ts
interface ScoringStrategy {
  calculateScore(moves: number, time: number, level: number): number;
}

class TimeBonusScoring implements ScoringStrategy {
  calculateScore(moves: number, time: number, level: number): number {
    const baseScore = moves * 100;
    const timeBonus = time < 30 ? 500 : 0;
    const levelMultiplier = 1 + level * 0.1;
    return (baseScore + timeBonus) * levelMultiplier;
  }
}
```

### 3. Pattern Command (Actions & History)

Le Command Pattern gère l'historique des actions et permet le replay/undo des coups.

```typescript
// games/core/commands/GameCommand.ts
interface GameCommand {
  execute(): void;
  undo(): void;
}

class FlipCardCommand implements GameCommand {
  constructor(private card: Card, private gameState: GameState) {}

  execute(): void {
    this.gameState.flipCard(this.card);
  }

  undo(): void {
    this.gameState.unflipCard(this.card);
  }
}
```

## Architecture des Composants UI

### Philosophie

Nos composants UI suivent une approche composable et réutilisable. Chaque composant :

- A une responsabilité unique
- Est hautement configurable via des props
- Utilise le pattern de composition
- Est stylisé via Tailwind avec une API cohérente

### Composants Principaux

#### 1. Button

```typescript
// components/ui/button/Button.tsx
type ButtonVariant = "default" | "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  // ... autres props
}
```

**Cas d'utilisation** :

- Actions principales (démarrer un jeu, valider)
- Actions secondaires (retour, annulation)
- Navigation (menu, changement de page)
- Contrôles de jeu (pause, reprise)

#### 2. Card

```typescript
// components/ui/card/Card.tsx
interface CardProps {
  variant?: "default" | "interactive";
  padding?: "none" | "normal" | "large";
  // ... autres props
}
```

**Cas d'utilisation** :

- Affichage des jeux dans la galerie
- Cartes de jeu Memory
- Conteneurs de score
- Panneaux d'information

#### 3. Badge

```typescript
// components/ui/badge/Badge.tsx
interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error";
  // ... autres props
}
```

**Cas d'utilisation** :

- Indicateurs de niveau
- Statut de jeu (en cours, terminé)
- Difficulté des jeux
- Accomplissements

## Gestion de l'État

### Zustand Stores

Nous utilisons Zustand pour la gestion d'état, avec une séparation claire des préoccupations :

1. **gameStore** : État global des jeux

   - Scores
   - Progression
   - Statistiques

2. **themeStore** : Préférences utilisateur
   - Thème (clair/sombre)
   - Paramètres d'interface

### État Local des Jeux

Chaque jeu maintient son propre état local via Zustand :

```typescript
// games/memory-plus/store.ts
interface MemoryState {
  cards: Card[];
  flipped: string[];
  matched: string[];
  score: number;
  // ... autres états
}

const useMemoryStore = create<MemoryState>((set) => ({
  // ... implémentation
}));
```

## Hooks Personnalisés

### Hooks Globaux

- `useGameTimer` : Gestion du temps de jeu
- `useGameFactory` : Création des instances de jeu
- `useGameMechanics` : Logique commune des jeux

### Hooks Spécifiques aux Jeux

Chaque jeu peut avoir ses propres hooks pour des mécaniques spécifiques.

## Routes et Navigation

La navigation est gérée via React Router avec une structure hiérarchique :

- Route principale avec RootLayout
- Routes de jeux imbriquées
- Gestion du responsive via le layout

## Prochaines Évolutions

1. Système d'authentification
2. Persistance des scores
3. Mode multijoueur
4. Nouveaux types de jeux

## Conventions et Bonnes Pratiques

1. **Nommage**

   - PascalCase pour les composants
   - camelCase pour les fonctions et variables
   - UPPER_CASE pour les constantes

2. **Tests**

   - Tests unitaires pour les composants UI
   - Tests d'intégration pour les jeux
   - Tests de bout en bout pour les parcours critiques

3. **Documentation**
   - Commentaires JSDoc pour les interfaces publiques
   - Exemples d'utilisation dans les fichiers README
   - Documentation des patterns utilisés
