# MemoBac - Système de répétition espacée

Application web implémentant le système Leitner pour l'apprentissage optimisé

## 🚀 Fonctionnalités clés

- 📝 Création et gestion de fiches Q/R avec tags
- 🧠 Quiz intelligent avec répétition espacée
- 📊 Suivi de progression par catégorie
- 🎉 Feedback personnalisé et ludique
- 🔒 Authentification sécurisée JWT
- 🏷️ Filtrage des fiches par tags
- 📱 Design responsive

## 🛠 Installation

### 1. Cloner le dépôt
```bash
git clone https://github.com/clemzouuu/MemoBac.git
cd memo-bac/client
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Démarrer l'application
```bash
npm start
```

> **Note** : Le serveur backend fonctionne sur `localhost:8080`

## 🌐 Pages principales

| URL      | Description |
|----------|------------|
| `/login` | Connexion/Inscription |
| `/`      | Tableau de bord des fiches + création |
| `/quiz`  | Session de quiz quotidien |

## 📚 Fonctionnement du quiz

### 🏁 Démarrage
- Sélection automatique des fiches éligibles
- Une question à la fois

### ✍️ Réponse
- Saisie libre de la réponse
- Comparaison automatique avec la réponse attendue
- Feedback personnalisé

### ✅ Validation
- Option de forçage de validation
- Mise à jour automatique du système Leitner

### 📊 Récapitulatif
- Score final avec statistiques
- Possibilité de recommencer

## 🎨 Expérience utilisateur

- **Animations** : Transitions fluides entre les états
- **Feedback visuel** :
    - Messages aléatoires motivants (15 variants correct/incorrect)
    - Code couleur explicite (vert/rouge)
    - Indicateur de progression
- **Optimisations** :
    - Mémoization des composants
    - Chargement paresseux
    - Gestion des erreurs réseau

## 🔧 Architecture technique

```
React 18
├── TypeScript
├── Context API (état global)
├── React Router (navigation)
├── Axios (communication API)
└── CSS Modules (styles)
```

---

# Tests et Couverture

## Installation des dépendances

Pour exécuter les tests, commencez par installer les dépendances nécessaires :

```bash
npm install npm install --save-dev @babel/plugin-transform-modules-commonjs
```

## Exécution des tests

Pour lancer les tests, utilisez la commande :

```bash
npm test
```

## Couverture des tests

Cette suite de tests couvre les aspects suivants :

- **Authentification** (succès/échec)
- **Gestion des cartes** (affichage/mise à jour)
- **Flux complet du quiz**
- **Navigation entre les pages**
- **Gestion du contexte d'authentification**
- **Interactions API simulées**
- **Gestion des erreurs**

## Technologies et outils utilisés

Les tests utilisent :

- **Jest** pour l'exécution et les assertions
- **React Testing Library** pour le rendu des composants
- **Mocking des appels API** pour isoler les tests
- **Tests asynchrones** pour les opérations réseau
- **Simulation d'interactions utilisateur** réalistes

---


## 📜 Bonnes pratiques

### 🔹 SOLID
- Single Responsibility Components
- Open/Closed via props
- Dependency Injection des services

### 🔹 Sécurité
- Stockage sécurisé du token JWT
- Validation côté client
- Protection des routes

### 🔹 Performance
- Requêtes API optimisées
- Cache local
- Découpage du code
