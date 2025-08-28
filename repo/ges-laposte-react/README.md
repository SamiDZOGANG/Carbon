# Calculateur Bilan GES - La Poste (Version React)

## 📋 Description

Application web React pour le calcul et le suivi des émissions de gaz à effet de serre (GES) des entités La Poste. Cette version React est une migration complète de l'application HTML/CSS/JS originale, conservant toutes les fonctionnalités tout en offrant une architecture moderne et maintenable.

## 🚀 Fonctionnalités

### ✅ Fonctionnalités principales
- **Calcul multi-catégories** des émissions GES
- **9 catégories d'émissions** : Bâtiments, Flotte en propre, Transport sous-traité, etc.
- **Formulaires dynamiques** adaptés à chaque catégorie
- **Calcul automatique** avec facteurs d'émission ADEME
- **Visualisation des résultats** avec répartition par scope et catégorie
- **Recommandations personnalisées** basées sur les résultats
- **Export des données** (PDF, Excel, Email)
- **Sauvegarde automatique** en sessionStorage

### 🎨 Interface utilisateur
- Design moderne et responsive
- Thème La Poste (jaune #FFD100, bleu #003366)
- Navigation intuitive avec menu mobile
- Animations fluides et transitions
- Notifications en temps réel
- Bouton retour en haut

### ♿ Accessibilité
- Support complet du clavier
- ARIA labels appropriés
- Contrastes WCAG AA respectés
- Navigation au clavier optimisée

## 🛠️ Technologies utilisées

- **React 18** avec TypeScript
- **React Router** pour la navigation
- **Context API** pour la gestion d'état global
- **CSS Modules** pour le styling
- **Session Storage** pour la persistance des données

## 📦 Installation

### Prérequis
- Node.js 14+ et npm 6+
- Git

### Installation du projet

```bash
# Cloner le repository
git clone [url-du-repo]

# Accéder au dossier
cd ges-laposte-react

# Installer les dépendances
npm install

# Lancer l'application en développement
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🏗️ Structure du projet

```
ges-laposte-react/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── CategorySelector/
│   │   ├── CategoryForm/
│   │   │   └── forms/       # Formulaires par catégorie
│   │   ├── NotificationContainer/
│   │   └── BackToTop/
│   ├── contexts/            # Contextes React (état global)
│   │   └── AppContext.tsx
│   ├── pages/               # Pages de l'application
│   │   ├── Home/
│   │   ├── Tool/
│   │   ├── Results/
│   │   ├── About/
│   │   └── FAQ/
│   ├── config/              # Configuration et constantes
│   ├── utils/               # Fonctions utilitaires
│   ├── styles/              # Styles globaux
│   └── App.tsx              # Composant racine
├── public/
├── package.json
└── README.md
```

## 💻 Utilisation

### 1. Page d'accueil
- Présentation de l'outil
- Accès rapide au calculateur

### 2. Outil de calcul
- Sélection des catégories pertinentes
- Remplissage des formulaires spécifiques
- Validation et sauvegarde automatique

### 3. Page de résultats
- Vue d'ensemble des émissions totales
- Répartition par catégorie et scope
- Recommandations prioritaires
- Export des données

### 4. Pages d'information
- À propos : méthodologie et objectifs
- FAQ : questions fréquentes

## 🔧 Configuration

### Variables d'environnement (optionnel)
Créer un fichier `.env` à la racine :

```env
REACT_APP_API_URL=https://api.laposte.fr/ges
REACT_APP_VERSION=2.0
```

### Personnalisation des couleurs
Modifier les variables dans `src/styles/global.css` :

```css
:root {
  --primary-color: #FFD100;    /* Jaune La Poste */
  --secondary-color: #003366;  /* Bleu La Poste */
  --text-dark: #333;
  --bg-light: #f9f9f9;
}
```

## 📊 Facteurs d'émission

Les facteurs d'émission utilisés proviennent de :
- Base Carbone® ADEME
- GHG Protocol
- Données internes La Poste

Mise à jour régulière via l'équipe expertise-carbone.

## 🚀 Déploiement

### Build de production

```bash
# Créer le build optimisé
npm run build

# Le dossier build/ contient les fichiers statiques
```

### Déploiement sur serveur

```bash
# Copier le contenu du dossier build/ sur votre serveur
scp -r build/* user@server:/var/www/ges-laposte/
```

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Lancer les tests avec coverage
npm test -- --coverage
```

## 📈 Évolutions prévues

- [ ] Intégration API backend
- [ ] Mode hors ligne (PWA)
- [ ] Comparaison inter-entités
- [ ] Historique et tendances
- [ ] Module de formation intégré
- [ ] Dashboard manager
- [ ] Export API pour reporting groupe

## 👥 Support

- **Support technique** : support-ges@laposte.fr
- **Questions méthodologiques** : expertise-carbone@laposte.fr
- **Documentation** : Intranet GES La Poste

## 📝 Licence

Propriété de La Poste - Usage interne uniquement

## 🤝 Contribution

Pour contribuer au projet :
1. Créer une branche feature
2. Commiter les changements
3. Créer une Pull Request
4. Review par l'équipe GES

---

**Développé par La Poste - Engagement pour la neutralité carbone**