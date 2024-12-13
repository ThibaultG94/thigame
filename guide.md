# Guide du Projet ThiGame

## État Actuel (13/12/2024)

### Ce qui est fait

- Structure de base React + Vite
- Système de navigation avec React Router
- Système de thème (light/dark)
- Composants UI de base :
  - TimerDisplay (complet)
  - StatsCard (complet)
  - ScoreDisplay (complet)
  - Card, Button, Badge (basiques)
- Premier jeu (Memory Plus) implémenté avec :
  - Logique de base du jeu
  - Timer
  - Niveaux progressifs

### En cours

- Nouvelle architecture des composants UI
- Système de score et bonus à affiner
- Implémentation des patterns de conception
- Migration des composants existants vers la nouvelle architecture

### Problèmes identifiés

#### Système de Score à Revoir

Le système actuel présente plusieurs limitations :

1. Manque de clarté dans le calcul des scores
2. Bonus et multiplicateurs pas assez intuitifs
3. Feedback visuel insuffisant lors des gains de points
4. Besoin d'une meilleure gestion des combos et des streaks

## Prochaines Étapes (par ordre de priorité)

### 1. Refonte du Système de Score

- [ ] Définir une formule de score claire et équilibrée
- [ ] Implémenter un système de combo
- [ ] Ajouter des bonus spéciaux pour les performances exceptionnelles
- [ ] Améliorer le feedback visuel des gains de points
- [ ] Documenter la logique de scoring dans constants.js

### 2. Finalisation des Composants UI

- [ ] GameGrid : composant générique pour les grilles de jeu
- [ ] GameControls : composant pour les contrôles de jeu
- [ ] GameStats : regroupement cohérent des statistiques
- [ ] GameOverlay : pour les messages et animations

### 3. Patterns et Architecture

- [ ] Pattern Factory pour les jeux
- [ ] Pattern Strategy pour les layouts et règles
- [ ] Pattern Command pour l'historique
- [ ] Meilleure séparation des responsabilités dans les stores

### 4. Nouveaux Jeux

- [ ] Speed Match : conception et développement
- [ ] Puzzle Quest : conception initiale

### 5. Tests et Documentation

- [ ] Tests unitaires pour les composants
- [ ] Tests d'intégration pour les jeux
- [ ] Documentation technique complète
- [ ] Guide de contribution

## Organisation du Développement

### Phase 1 : Fondations (En cours)

1. ✓ Composants UI de base
2. → Système de score robuste
3. → Architecture évolutive

### Phase 2 : Expansion

1. Nouveaux composants spécialisés
2. Implémentation des patterns
3. Tests automatisés

### Phase 3 : Nouveaux Jeux

1. Speed Match
2. Puzzle Quest
3. Système de progression global

## Notes Importantes

- Maintenir la cohérence visuelle entre les composants
- Privilégier la réutilisabilité
- Documenter au fur et à mesure
- Tester chaque nouvelle fonctionnalité
