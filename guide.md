# Guide du Projet ThiGame

## État Actuel (12/12/2024)

### Ce qui est fait

- Structure de base React + Vite
- Système de navigation avec React Router
- Système de thème (light/dark)
- Premier jeu (Memory Plus) implémenté avec :
  - Logique de base
  - Gestion des scores
  - Timer
  - Niveaux progressifs

### En cours

- Nouvelle architecture des composants UI
- Implémentation des patterns de conception
- Migration des composants existants vers la nouvelle architecture
- Développement des composants génériques

## Prochaines Étapes

### 1. Réorganisation UI (En cours)

- [x] Nettoyer structure.md
- [x] Créer architecture.md
- [ ] Réorganiser les composants UI :
  - [x] Identifier les cas d'utilisation précis
  - [x] Créer la nouvelle structure par dossiers
  - [ ] Implémenter les stratégies de layout
  - [ ] Migrer les composants existants
  - [ ] Créer les nouveaux composants génériques

### 2. Implémentation des Patterns

- [ ] Mettre en place le Pattern Factory pour les jeux
- [ ] Implémenter le Pattern Strategy pour :
  - [ ] Règles de jeu
  - [x] Layouts de grille
  - [ ] Systèmes de score
- [ ] Ajouter le Pattern Command pour l'historique

### 3. Développement des Fonctionnalités

- [ ] Compléter le système de scores
- [ ] Ajouter le système de replay
- [ ] Préparer la structure pour les nouveaux jeux

### 4. Tests et Documentation

- [ ] Mettre en place les tests unitaires pour les nouveaux composants
- [ ] Documenter l'utilisation des nouveaux patterns
- [ ] Créer des exemples d'utilisation
